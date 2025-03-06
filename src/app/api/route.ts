import Stripe from 'stripe';
import { verifyToken } from '../lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { CartItem, LineItem } from '../types/products';
import { freeDelivreryThreshold } from '../constants/enums';
import { liveFreeDelivery } from '../constants/deliveries';
import { defaultUrl } from '../constants/nextUrl';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Stripe secret key is not defined');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const fetchAllCheckoutSessions = async () => {
  let allSessions: Stripe.Checkout.Session[] = [];
  let hasMore = true;
  let lastSessionId: string | undefined = undefined;

  while (hasMore) {
    const params: Stripe.Checkout.SessionListParams = {
      limit: 100, // Maximum allowed by Stripe API
      expand: ['data.line_items'],
    };

    if (lastSessionId) {
      params.starting_after = lastSessionId;
    }

    const sessions = await stripe.checkout.sessions.list(params);

    hasMore = sessions.has_more;
    allSessions = [...allSessions, ...sessions.data];

    if (sessions.data.length > 0) {
      lastSessionId = sessions.data[sessions.data.length - 1].id;
    } else {
      hasMore = false;
    }
    const safetyLimit = 10000;
    if (allSessions.length > safetyLimit) {
      console.warn('Reached safety limit of 10,000 sessions');
      break;
    }
  }
  return allSessions;
};

export const GET = async (req: NextRequest) => {
  const token = req.cookies?.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'No Token' },
      { status: 401, statusText: 'No Token' },
    );
  }

  const verifiedToken = await verifyToken(token);

  if (!verifiedToken) {
    return NextResponse.json(
      { error: 'No verifiedToken' },
      { status: 401, statusText: 'No verifiedToken' },
    );
  }

  try {
    const sessions = await fetchAllCheckoutSessions();

    const successfulCheckouts = sessions.filter(
      session => session.payment_status === 'paid',
    );

    const extractedData = successfulCheckouts.map(session => {
      return {
        name: session?.customer_details?.name,
        email: session?.customer_details?.email,
        phone: session?.customer_details?.phone,
        line1: session?.customer_details?.address?.line1,
        postalCode: session?.customer_details?.address?.postal_code,
        city: session?.customer_details?.address?.city,
        amountTotal: (session.amount_total ?? 0) / 100,
        companyName:
          session.custom_fields?.find(item => item.key === 'company_name')?.text
            ?.value ?? '',
        department:
          session.custom_fields?.find(item => item.key === 'department')
            ?.dropdown?.value ?? '',
        productA: session?.line_items?.data.find(
          item => item.description === 'A - Saumon Fumé Entier',
        ),
        productB: session?.line_items?.data.find(
          item => item.description === 'B - Saumon Fumé Prétranché',
        ),
        productC: session?.line_items?.data.find(
          item => item.description === 'C - Cœur de Saumon',
        ),
        productD: session?.line_items?.data.find(
          item => item.description === 'D - Saumon Fumé Pavé',
        ),
        productF: session?.line_items?.data.find(
          item =>
            item.description === 'F - Saumon Mariné (gravad lax) Prétranché',
        ),
        productH: session?.line_items?.data.find(
          item => item.description === 'H - Saumon Mi-Cuit Poivre Pavé',
        ),
      };
    });

    return NextResponse.json({ success: true, extractedData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 500, statusText: 'Internal Server Error' },
    );
  }
};

export async function POST(req: NextRequest) {
  const body: CartItem[] = await req.json();

  const totalValue = body
    .map(item => item.price * item.quantity)
    .reduce((a, b) => a + b, 0);

  const options =
    totalValue < freeDelivreryThreshold ? liveFreeDelivery : liveFreeDelivery;

  const items: LineItem[] = body.map((item: CartItem) => ({
    price_data: {
      currency: 'eur',
      unit_amount: 1 * 100,
      // unit_amount: item.price * 100,
      product_data: {
        name: item.name,
        images: [`https://www.mikaelhertz.com/${item.imgUrl}`],
      },
    },
    adjustable_quantity: {
      enabled: true,
      minimum: 1,
    },
    quantity: item.quantity,
    tax_rates: ['txr_1QywioAZSYffeW1tSfHPit8U'],
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      submit_type: 'pay',
      mode: 'payment',
      customer_creation: 'always',
      allow_promotion_codes: false,
      payment_method_types: ['card'],
      phone_number_collection: {
        enabled: true,
      },
      tax_id_collection: {
        enabled: true,
      },
      invoice_creation: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: ['FR'],
      },

      custom_fields: [
        {
          key: 'company_name',
          label: {
            type: 'custom',
            custom: "Nom de l'entreprise",
          },
          type: 'text',
          optional: true,
        },
        {
          key: 'department',
          label: {
            type: 'custom',
            custom: 'Department',
          },
          type: 'dropdown',
          dropdown: {
            options: [
              { label: 'Marketing', value: 'marketing' },
              { label: 'Sales', value: 'sales' },
              { label: 'Engineering', value: 'engineering' },
              { label: 'Other', value: 'other' },
            ],
          },
          optional: true,
        },
      ],

      locale: 'fr',
      billing_address_collection: 'required' as 'auto' | 'required',
      shipping_options: options,
      line_items: items,
      success_url: `${defaultUrl}success`,
      cancel_url: `${defaultUrl}cancel`,
    });

    return Response.json(session);
  } catch (err) {
    console.log('err', err);
  }
}
