import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { NextRequest } from 'next/server';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing Stripe Secret Key');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
if (!webhookSecret) {
  throw new Error('Missing Stripe Webhook Secret');
}

type StripeEvent = {
  type: string;
  data: {
    object: PaymentData;
  };
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event: StripeEvent;
  try {
    if (!sig) {
      throw new Error('Missing stripe-signature header');
    }
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      webhookSecret,
    ) as StripeEvent;
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 },
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await sendCustomReceipt(session);
  }

  return NextResponse.json({ received: true });
}

const resend = new Resend(process.env.RESEND_API_KEY);

type PaymentData = {
  object: string;
  amount_paid?: number;
  currency?: string;
  customer?: string;
  customer_details?: {
    email: string;
    name: string;
  };
  amount_total?: number;
  shipping_rate?: string;
  lines?: {
    data: LineItem[];
  };
  collected_information?: {
    shipping_details: {
      address: {
        line1: string;
        postal_code: string;
        city: string;
      };
    };
  };
  custom_fields?: {
    label: {
      custom: string;
    };
    text: {
      value: string | null;
    };
  }[];
  id?: string;
};

type LineItem = {
  description: string;
  quantity: number;
  amount_total: number;
};

async function sendCustomReceipt(paymentData: PaymentData) {
  try {
    let customerEmail: string | undefined,
      customerName: string | undefined,
      amount: string | undefined,
      currency: string | undefined,
      items: LineItem[] = [];

    if (paymentData.object === 'invoice') {
      const invoice = paymentData;
      amount = (invoice.amount_paid! / 100).toFixed(2);
      currency = invoice.currency!.toUpperCase();

      if (invoice.customer) {
        const customer = await stripe.customers.retrieve(invoice.customer);
        if (customer.deleted) {
          throw new Error('Customer has been deleted');
        }
        customerEmail = customer.email ?? '';
        customerName = customer.name ?? '';
      }

      items = invoice.lines?.data || [];
    } else if (paymentData.object === 'checkout.session') {
      amount = (paymentData.amount_total! / 100).toFixed(2);
      currency = paymentData.currency!.toUpperCase();

      if (!paymentData.customer) {
        throw new Error('Missing customer ID');
      }
      const customer = await stripe.customers.retrieve(paymentData.customer);
      if (customer.deleted) {
        throw new Error('Customer has been deleted');
      }
      customerEmail = customer.email ?? '';
      customerName = customer.name ?? '';
    } else if (paymentData.customer_details) {
      customerEmail = paymentData.customer_details.email;
      customerName = paymentData.customer_details.name;
    }

    if (paymentData.customer) {
      const customer = await stripe.customers.retrieve(paymentData.customer);
      if (customer.deleted) {
        throw new Error('Customer has been deleted');
      }
      customerEmail = customer.email ?? '';
      customerName = customer.name ?? '';
    }

    if (!customerEmail) {
      console.error('No customer email found in the payment data');
      return;
    }

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(
        paymentData.id!,
      );
      items = lineItems.data
        .map(item => ({
          description: item.description ?? 'Produit sans nom',
          quantity: item.quantity ?? 1,
          amount_total: item.amount_total,
        }))
        .sort((a, b) => a.description.localeCompare(b.description));
    } catch (error) {
      console.error('Error fetching line items:', (error as Error).message);
      items = [
        {
          description: 'Your purchase',
          quantity: 1,
          amount_total: paymentData.amount_total!,
        },
      ];
    }

    const shippingMessage =
      paymentData.shipping_rate === process.env.LIVRAISON_MERCREDI
        ? 'Mercredi 16 Avril 2025'
        : paymentData.shipping_rate === process.env.LIVRAISON_JEUDI
          ? 'Jeudi 17 Avril 2025'
          : 'Mercredi 16 ou Jeudi 17 Avril 2025';

    const emailResponse = await resend.emails.send({
      from: 'Mikael HERTZ <info@cesarhertz.com>',
      to: customerEmail,
      subject: 'Merci pour votre achat!',
      html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <img src="https://www.mikaelhertz.com/logo.jpg" alt="MikaelHERTZ" style="max-width: 200px; border-radius: 20px;">
                        <h1>Reçu pour votre commande</h1>
                        <p>Bonjour ${customerName || 'Cher Client'},</p>
                        <p>Votre commande a bien été prise en compte</p>
                        <p>Vous pouvez trouver un récapitulatif ci-dessous:</p>
                        <p><strong>Adresse de livraison :</strong> ${paymentData.collected_information!.shipping_details.address.line1}, ${paymentData.collected_information!.shipping_details.address.postal_code}, ${paymentData.collected_information!.shipping_details.address.city}</p>

                        <p><strong>Livraison:</strong> ${shippingMessage}</p>
                        
                        ${paymentData
                          .custom_fields!.filter(
                            field => field.text.value !== null,
                          )
                          .map(
                            field =>
                              `<p><strong>${field.label.custom}:</strong> ${field.text.value}</p>`,
                          )
                          .join('')}

                        <p>Merci pour votre commande.</p>
                        <p>Voici les détails de votre commande :</p>
                        
                        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">

                            <p>
                            <strong>Date du paiement :</strong> ${new Date()
                              .toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })
                              .replace(
                                /(\d+)(?=\D+$)/,
                                d =>
                                  `${d}${['e', 'er', 'e', 'e'][((Number(d) % 10) - 1) % 10] || 'e'}`,
                              )}</p>

                            <p><strong>Total de la commande :</strong> ${currency} ${amount}</p>
                        ${items
                          .map(
                            item => `
                                <hr>
                                                <p>${item.description}</p>
                                                <p><strong>Quantité :</strong> ${item.quantity}</p>
                                                <p><strong>Montant :</strong> ${currency} ${(item.amount_total / 100).toFixed(2)}</p>
                                        `,
                          )
                          .join('')}
                        </div>
                        
                        <p>Si vous avez des questions, veuillez me contacter</p>
                        <p>Cordialement,<br>Mikael HERTZ</p>
                        <p>${process.env.NEXT_PUBLIC_MIKAEL_EMAIL}</p>
                        <p>06 62 19 63 58</p>
                        <p>26400 SAOU</p>
                        <p>SIREN: 383 519 501</p>
                    </div>
                `,
    });

    console.log('Resend API response:', emailResponse);
  } catch (error) {
    console.error('Error in sendCustomReceipt:', error);
  }
}
