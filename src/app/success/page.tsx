'use client';

import Link from 'next/link';
import { runFireworks } from '../lib/utils';
import { useEffect } from 'react';
import Image from 'next/image';
import { ProductSlider } from '../components/ProductSlider';
import { products } from '../constants/products';

const Success = () => {
    useEffect(() => {
        localStorage.clear();
        runFireworks();
    }, []);

    const images = products.map((product) => product.img);

    return (
        <div className="text-2xl text-center text-black w-9/12 flex justify-center items-center flex-col mx-auto">
            <Image className="my-4 rounded-xl" src="/logo.jpg" alt="Mikael Hertz Poissons Fumés Artisanaux" width={400} height={400} />
            <h2>Merci pour votre commande!</h2>
            <p className="email-msg">Verifiez vos emails pour la commande.</p>
            <p className="description">
                Si vous avez des questions, n'hésitez pas à me contacter:
            </p>
            <a className="font-bold m-3" href="mailto:mikaelhertz@me.com">
                mikaelhertz@me.com
            </a>
            <p>06 62 19 63 58</p>
            <Link href="/">
                <button type="button" className="bg-orange-700 text-white p-3 rounded-lg hover:opacity-70 m-5 text-3xl">
                    Retour à l'Accueil
                </button>
            </Link>
            <ProductSlider urlRoot="products" products={images} />
        </div>
    )
}

export default Success