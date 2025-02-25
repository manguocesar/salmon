'use client';

import { useCallback, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import Link from 'next/link';
import getStripe from '../lib/getStripe';
import toast from 'react-hot-toast';
import { ProductSlider } from '../components/ProductSlider';
import { bgUrls } from '../constants/bgSaumonUrls';
import { TableHeader } from '../components/TableHeader';
import { TableRow } from '../components/TableRow';

export default function Cart() {
  const { cart, removeFromCart, getCartTotal, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = useCallback(async () => {
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
  }, [cart]);

  return (
    <div className="mx-1 max-w-4xl md:mx-auto">
      <h1 className="mb-4 text-center text-3xl font-bold text-orange-600 md:mb-8">
        Votre Panier
      </h1>
      {cart.length === 0 ? (
        <div className="text-center text-lg text-black">
          Votre panier est vide...
          <p>
            <Link
              href="/products"
              className="cursor-pointer text-orange-600 underline underline-offset-4"
            >
              Continuer vos achats
            </Link>
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <table className="w-full mx-2">
              <TableHeader />
              <tbody className="divide-y divide-gray-200 bg-white">
                {cart.map(item => (
                  <TableRow
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="m-4 flex flex-col items-center md:mt-8">
            <p className="text-xl font-semibold text-black">
              Total TTC : {getCartTotal()} €
            </p>
            <p className="m-2 text-base text-gray-600">
              Date de livraison : Jeudi 17 Avril 2025
            </p>
            <div className="md:mt-8">
              <button
                type="button"
                className="rounded-lg bg-orange-600 px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-orange-700"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Payer votre commande'}
              </button>
            </div>
          </div>
        </>
      )}
      <ProductSlider urlRoot="bg" products={bgUrls} />
    </div>
  );
}
