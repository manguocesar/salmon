import { LineItemInfo, PaymentData } from '../types/products';
import { generateOrderConfirmationEmail } from '@/app/lib/emailTemplates';
import { getNextWednesdayOrThursday } from './getNextWednesdayOrThursday';
import Stripe from 'stripe';
import { Resend } from 'resend';

const { formattedWednesday, formattedThursday } = getNextWednesdayOrThursday();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const resendApiKey = process.env.RESEND_API_KEY;

if (!stripeSecretKey || !webhookSecret || !resendApiKey) {
  throw new Error('Missing required environment variables');
}

const stripe = new Stripe(stripeSecretKey);
const resend = new Resend(resendApiKey);

export async function sendCustomReceipt(paymentData: PaymentData) {
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

    let customerEmail = customer_details?.email;
    let customerName = customer_details?.name;
    let amount: string | undefined;
    let currencyCode: string | undefined;
    let items: LineItemInfo[] = [];

    const shippingMessage =
      shipping_rate === process.env.LIVRAISON_MERCREDI
        ? formattedWednesday
        : shipping_rate === process.env.LIVRAISON_JEUDI
          ? formattedThursday
          : `${formattedWednesday} ou ${formattedThursday}`;

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

    const emailResponse = await resend.emails.send({
      from: 'Mikael HERTZ <info@cesarhertz.com>',
      to: customerEmail,
      subject: 'Merci pour votre achat!',
      html: generateOrderConfirmationEmail({
        customerName,
        shippingAddress: {
          line1: collected_information?.shipping_details.address.line1,
          postalCode:
            collected_information?.shipping_details.address.postal_code,
          city: collected_information?.shipping_details.address.city,
        },
        shippingMessage,
        customFields: custom_fields?.map(field => ({
          label: field.label.custom,
          value: field.text.value ?? '',
        })),
        paymentDate: new Date().toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        currencyCode: currencyCode!,
        amount: amount!,
        items: items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          amount: (item.amount_total / 100).toFixed(2),
        })),
      }),
    });

    console.log('Resend API response:', emailResponse);
  } catch (error) {
    console.error('Error in sendCustomReceipt:', error);
  }
}
