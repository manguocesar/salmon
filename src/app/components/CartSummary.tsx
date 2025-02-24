'use client';

import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';

export function CartSummary() {
  const [hidden, setHidden] = useState(false);
  const { cart, getCartTotal } = useCart();

  const pathname = usePathname();

  if (pathname === '/cart') return null;
  if (cart.length === 0) return null;

  return (
    <div
      className={cn(
        hidden && 'translate-x-56 opacity-30',
        'right-4 top-24 hidden w-64 rounded-lg bg-white p-2 text-black shadow-md transition-all sm:fixed sm:block md:p-4',
      )}
    >
      <div className="flex items-center justify-between">
        <button
          className={
            'rounded-full border-2 border-slate-600 bg-slate-400 px-2 font-bold text-white'
          }
          onClick={() => setHidden(!hidden)}
        >
          X
        </button>
        <h3 className="mb-2 text-left text-lg font-semibold">Panier</h3>
      </div>
      <ul className="mb-4">
        {cart.map(item => (
          <li key={item.id} className="flex justify-between text-sm">
            <span>
              {item.name} x{item.quantity}
            </span>
            <span className="sm:hidden">
              {(item.price * item.quantity).toFixed(2)} €
            </span>
          </li>
        ))}
      </ul>
      <p className="flex justify-between font-semibold text-black">
        Total: {getCartTotal().toFixed(2)} €
      </p>
      <Link
        href="/cart"
        className="mt-4 block rounded bg-orange-600 px-4 py-2 text-center text-white transition duration-300 hover:bg-orange-700"
      >
        Voir le panier
      </Link>
    </div>
  );
}
