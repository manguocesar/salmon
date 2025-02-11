'use client';

import Link from 'next/link';

import { useCart } from '../contexts/CartContext';
import { runFireworks } from '../lib/utils';
import { useEffect } from 'react';
import Image from 'next/image';

const Success = () => {
    const { } = useCart();

    useEffect(() => {
        // localStorage.clear();
        // setCartItems([]);
        // setTotalPrice(0);
        // setTotalQuantities(0);
        runFireworks();
    }, []);

    return (
        <div className="min-h-60 text-black">
            <div className="w-9/12 flex justify-center items-center flex-col mx-auto mt-20">
                <Image className="rounded-xl" src="/logo.jpg" alt="Mikael Hertz Poissons Fumés Artisanaux" width={200} height={80} />

                <h2>Merci pour votre commande!</h2>
                <p className="email-msg">Verifiez vos emails pour la commande.</p>
                <p className="description">
                    Si vous avez des questions, n'hésitez pas à nous contacter:
                    <a className="email" href="mailto:cesar.hertz@icloud.com">
                        cesar.hertz@icloud.com
                    </a>
                </p>
                <Link href="/">
                    <button type="button" style={{ width: '300px' }} className="btn">
                        Continuer à Shopping
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Success