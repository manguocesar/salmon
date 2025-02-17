'use client';

import Link from 'next/link';
import { runFireworks } from '../lib/utils';
import { useEffect } from 'react';
import Image from 'next/image';

const Success = () => {
    useEffect(() => {
        localStorage.clear();
        runFireworks();
    }, []);

    return (
        <div className="min-h-60 text-2xl text-black w-9/12 flex justify-center items-center flex-col mx-auto mt-20">
            <Image className="m-4 rounded-xl" src="/logo.jpg" alt="Mikael Hertz Poissons Fumés Artisanaux" width={400} height={400} />
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
        </div>
    )
}

export default Success