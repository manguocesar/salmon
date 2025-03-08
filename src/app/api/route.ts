import { verifyToken } from '../lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { CartItem, LineItem } from '../types/products';
import { wednesdayThursdayDelivery } from '../constants/deliveries';
import { defaultUrl } from '../constants/nextUrl';
import { fetchAllCheckoutSessions } from '../lib/fetchAllCheckout';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('Stripe secret key is not defined');
}
const stripe = new Stripe(stripeSecretKey);

const extractSessionData = (session: Stripe.Checkout.Session) => ({
  name: session.customer_details?.name ?? '',
  email: session.customer_details?.email ?? '',
  phone: session.customer_details?.phone ?? '',
  line1: session.customer_details?.address?.line1 ?? '',
  postalCode: session.customer_details?.address?.postal_code ?? '',
  city: session.customer_details?.address?.city ?? '',
  amountTotal: (session.amount_total ?? 0) / 100,
  companyName:
    session.custom_fields?.find(item => item.key === 'companyName')?.text
      ?.value ?? '',
  contactPerson:
    session.custom_fields?.find(item => item.key === 'contactPerson')?.text
      ?.value ?? '',
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
    item => item.description === 'F - Saumon Mariné (gravad lax) Prétranché',
  ),
  productH: session?.line_items?.data.find(
    item => item.description === 'H - Saumon Mi-Cuit Poivre Pavé',
  ),
});

export const GET = async (req: NextRequest) => {
  const token = req.cookies?.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'No Token' },
      { status: 401, statusText: 'No auth Token' },
    );
  }

  const verifiedToken = await verifyToken(token);

  if (!verifiedToken) {
    return NextResponse.json(
      { error: 'No verified Token' },
      { status: 401, statusText: 'No verified Token' },
    );
  }

  try {
    const sessions = await fetchAllCheckoutSessions();
    const successfulCheckouts = sessions.filter(
      session => session.payment_status === 'paid',
    );
    const extractedData = successfulCheckouts.map(extractSessionData);

    return NextResponse.json({ success: true, extractedData }, { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message;
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500, statusText: 'Internal Server Error' },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body: CartItem[] = await req.json();

    const options = wednesdayThursdayDelivery;

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
    }));

    const session = await stripe.checkout.sessions.create({
      submit_type: 'pay',
      mode: 'payment',
      customer_creation: 'always',
      allow_promotion_codes: false,
      payment_method_types: ['card'],
      phone_number_collection: { enabled: true },
      tax_id_collection: { enabled: true },
      invoice_creation: { enabled: true },
      shipping_address_collection: { allowed_countries: ['FR'] },
      custom_text: {
        submit: {
          message:
            "Vous recevrez un email de confirmation d'achat juste après votre commande",
        },
      },
      custom_fields: [
        {
          key: 'companyName',
          label: { type: 'custom', custom: "Nom de l'entreprise" },
          type: 'text',
          optional: true,
        },
        {
          key: 'contactPerson',
          label: { type: 'custom', custom: 'Personne de contact' },
          type: 'text',
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

    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500, statusText: 'Internal Server Error' },
    );
  }
};
