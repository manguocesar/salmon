'use client';

import { useCart } from '../contexts/CartContext';
import Link from 'next/link';
import getStripe from '../lib/getStripe';
import toast from 'react-hot-toast';
import { ProductSlider } from '../components/ProductSlider';
import { bgUrls } from '../constants/bgSaumonUrls';
import { Delete } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, getCartTotal, updateQuantity } = useCart();
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),
    });

    if (!response.ok) {
      toast.error('Something went wrong. Please try again.');
      return;
    }

    const data = await response.json();

    if (response.status === 500) return;
    toast.loading('Redirection...');
    if (stripe) {
      stripe.redirectToCheckout({ sessionId: data.id });
    } else {
      toast.error('Payment initialization failed.');
    }
  };

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
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:px-6">
                    Produit
                  </th>
                  <th className="py-3 pr-1 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:px-6">
                    Quantité
                  </th>
                  <th className="py-3 pr-1 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:px-6">
                    Prix
                  </th>
                  <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:px-6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {cart.map(item => (
                  <tr className="" key={item.id}>
                    <td className="block whitespace-pre-wrap px-1 py-4 font-semibold text-orange-600 md:hidden md:px-6">
                      {item.shortName}
                    </td>
                    <td className="hidden whitespace-pre-wrap px-2 py-4 font-semibold text-orange-600 md:block md:px-6">
                      {item.name}
                    </td>
                    <td className="whitespace-nowrap md:px-6 md:py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="rounded-l border px-2 py-1 text-gray-500 hover:text-gray-700"
                        >
                          -
                        </button>
                        <span className="border-b border-t px-2 py-1 text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="rounded-r border px-2 py-1 text-gray-500 hover:text-gray-700"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="hidden whitespace-nowrap px-2 py-4 text-black md:block md:px-6">
                      {(item.price * item.quantity).toFixed(2)} €
                    </td>
                    <td className="block whitespace-nowrap py-4 pr-1 text-black md:hidden md:px-6">
                      {item.price * item.quantity}€
                    </td>
                    <td className="whitespace-nowrap py-4 md:px-6">
                      <Delete
                        onClick={() => removeFromCart(item)}
                        className="ml-3 cursor-pointer text-red-700 hover:text-red-900"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="m-4 flex flex-col items-center md:mt-8">
            <p className="text-xl font-semibold text-black">
              Total TTC : {getCartTotal().toFixed(2)} €
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Date de livraison : Jeudi 17 Avril 2025
            </p>
            <div className="md:mt-8">
              <button
                type="button"
                className="rounded-lg bg-orange-600 px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-orange-700"
                onClick={handleCheckout}
              >
                Payer votre commande
              </button>
            </div>
          </div>
        </>
      )}
      <ProductSlider urlRoot="bg" products={bgUrls} />
    </div>
  );
}
