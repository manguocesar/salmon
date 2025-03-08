import Stripe from 'stripe';

const stripeSecretKey: string | undefined = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('Stripe secret key is not defined');
}
const stripe = new Stripe(stripeSecretKey, { apiVersion: '2025-02-24.acacia' });

export const fetchAllCheckoutSessions = async (): Promise<
  Stripe.Checkout.Session[]
> => {
  const allSessions: Stripe.Checkout.Session[] = [];
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
    allSessions.push(...sessions.data);

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
