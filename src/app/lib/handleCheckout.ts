import toast from 'react-hot-toast';
import getStripe from './getStripe';
import { CartItem } from '../types/products';

export async function handleCheckout(
  cart: CartItem[],
  setLoading: (loading: boolean) => void,
) {
  setLoading(true);
  try {
    const stripe = await getStripe();

    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),
    });

    if (!response.ok) {
      throw new Error('Something went wrong. Please try again.');
    }

    const data = await response.json();

    if (response.status === 500) return;
    toast.loading('Redirection...');
    if (stripe) {
      stripe.redirectToCheckout({ sessionId: data.id });
    } else {
      toast.error('Payment initialization failed.');
    }
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('An unknown error occurred.');
    }
  } finally {
    setLoading(false);
  }
}
