'use client';

import { useCallback, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import Link from 'next/link';
import { ProductSlider } from '../components/ProductSlider';
import { bgUrls } from '../constants/bgSaumonUrls';
import { TableCartHeader } from '../components/TableCartHeader';
import { TableRow } from '../components/TableRow';
import { handleCheckout } from '../lib/handleCheckout';

export default function Cart() {
  const { cart, removeFromCart, getCartTotal, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckoutCallback = useCallback(() => handleCheckout(cart, setLoading), [cart]);

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
            <table className="w-full mx-1">
              <TableCartHeader />
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
              Date de livraison : mercredi 16 ou jeudi 17 AVRIL
            </p>
            <div className="md:mt-8">
              <button
                type="button"
                className="rounded-lg bg-orange-600 px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-orange-700"
                onClick={handleCheckoutCallback}
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
