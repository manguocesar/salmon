import Stripe from 'stripe';

if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
  throw new Error('Stripe secret key is not defined');
}
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

import { NextRequest } from 'next/server';
import { CartItem, LineItem } from '../types/products';
import { freeDelivreryThreshold } from '../constants/enums';
import { liveFreeDelivery } from '../constants/deliveries';

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

  console.log('stripe', stripe);

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
      locale: 'fr',
      billing_address_collection: 'required' as 'auto' | 'required',
      shipping_options: options,
      line_items: items,
      success_url: `${process.env.NEXT_PUBLIC_URL}success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}cancel`,
    });

    return Response.json(session);
  } catch (err) {
    console.log('err', err);
  }
}
