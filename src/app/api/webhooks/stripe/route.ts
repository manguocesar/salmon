import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { NextRequest } from 'next/server';
import { getNextWednesdayOrThursday } from '@/app/lib/getNextWednesdayOrThursday';

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

const { formattedWednesday, formattedThursday } = getNextWednesdayOrThursday();

/**
 * Processes incoming Stripe webhook POST requests.
 *
 * This handler reads the raw request body and retrieves the 'stripe-signature' header to verify the event
 * against the configured webhook secret. If verification succeeds and the event type is 'checkout.session.completed',
 * the session data is passed to sendCustomReceipt for further processing. On verification failure or a missing signature,
 * an error is logged and a JSON response with a 400 status is returned.
 *
 * @returns A JSON response indicating whether the webhook was successfully processed or an error occurred.
 */
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
  } catch (err: unknown) {
    const errorMessage = (err as Error).message;
    console.error(`Webhook Error: ${errorMessage}`);
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

/**
 * Sends a custom receipt email to the customer based on Stripe payment data.
 *
 * This function processes payment information from a Stripe webhook, handling both invoice and checkout session objects.
 * It calculates payment totals, retrieves and verifies customer details from Stripe as needed, and fetches line item information.
 * A shipping message is created based on the shipping rate provided, and an HTML email with the order summary and shipping details is sent via Resend.
 * If a customer email cannot be determined or an error occurs during processing, the email is not sent and the issue is logged.
 *
 * @param paymentData - An object containing Stripe payment details, including amounts, currency, customer data, line items, and shipping rate.
 */
async function sendCustomReceipt(paymentData: PaymentData) {
  try {
    const {
      object,
      amount_paid,
      currency,
      customer,
      customer_details,
      amount_total,
      lines,
      collected_information,
      custom_fields,
      id,
      shipping_rate,
    } = paymentData;

    let customerEmail: string | undefined = customer_details?.email;
    let customerName: string | undefined = customer_details?.name;
    let amount: string | undefined;
    let currencyCode: string | undefined;
    let items: LineItem[] = [];

    if (object === 'invoice') {
      amount = (amount_paid! / 100).toFixed(2);
      currencyCode = currency!.toUpperCase();

      if (customer) {
        const customerData = await stripe.customers.retrieve(customer);
        if (customerData.deleted) {
          throw new Error('Customer has been deleted');
        }
        customerEmail = customerData.email ?? '';
        customerName = customerData.name ?? '';
      }

      items = lines?.data || [];
    } else if (object === 'checkout.session') {
      amount = (amount_total! / 100).toFixed(2);
      currencyCode = currency!.toUpperCase();

      if (!customer || !amount_total || !currency) {
        throw new Error('Missing required checkout session data');
      }
      const customerData = await stripe.customers.retrieve(customer);
      if (customerData.deleted) {
        throw new Error('Customer has been deleted');
      }
      customerEmail = customerData.email ?? '';
      customerName = customerData.name ?? '';
    }

    if (!customerEmail) {
      console.error('No customer email found in the payment data');
      return;
    }

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(id!);
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
          amount_total: amount_total!,
        },
      ];
    }

    const shippingMessage =
      shipping_rate === process.env.LIVRAISON_MERCREDI
        ? formattedWednesday
        : shipping_rate === process.env.LIVRAISON_JEUDI
          ? formattedThursday
          : `${formattedWednesday} ou ${formattedThursday}`;

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
                    <p><strong>Adresse de livraison :</strong> ${collected_information?.shipping_details?.address?.line1 || ''}, ${collected_information?.shipping_details?.address?.postal_code || ''}, ${collected_information?.shipping_details?.address?.city || ''}</p>
                    <p><strong>Livraison:</strong> ${shippingMessage}</p>
                    ${
                      custom_fields && custom_fields?.length > 0
                        ? custom_fields
                            .filter(field => field.text.value !== null)
                            .map(
                              field =>
                                `<p><strong>${field.label.custom}:</strong> ${field.text.value}</p>`,
                            )
                            .join('')
                        : ''
                    }
                    <p>Merci pour votre commande.</p>
                    <p>Voici les détails de votre commande :</p>
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
                        <p><strong>Date du paiement :</strong> ${new Date()
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
                        <p><strong>Total de la commande :</strong> ${currencyCode} ${amount}</p>
                        ${
                          items && items.length > 0
                            ? items
                                .map(
                                  item => `
                            <hr>
                            <p>${item.description}</p>
                            <p><strong>Quantité :</strong> ${item.quantity}</p>
                            <p><strong>Montant :</strong> ${currencyCode} ${(item.amount_total / 100).toFixed(2)}</p>
                        `,
                                )
                                .join('')
                            : '<p>Aucun détail de produit disponible</p>'
                        }
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
