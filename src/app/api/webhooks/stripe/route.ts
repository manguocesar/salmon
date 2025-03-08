import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { NextRequest } from 'next/server';
import { sendCustomReceipt } from '@/app/lib/sendCustomReceipt';
import { StripeEvent } from '@/app/types/products';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const resendApiKey = process.env.RESEND_API_KEY;

if (!stripeSecretKey || !webhookSecret || !resendApiKey) {
  throw new Error('Missing required environment variables');
}

const stripe = new Stripe(stripeSecretKey);

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 },
    );
  }

  let event: StripeEvent;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      webhookSecret!,
    ) as StripeEvent;
  } catch (err) {
    console.error(`Webhook Error: ${(err as Error).message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${(err as Error).message}` },
      { status: 400 },
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await sendCustomReceipt(session);
  }

  return NextResponse.json({ received: true });
}
