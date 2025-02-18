import Link from 'next/link';
import React from 'react'

const Cancel = () => {
    return (
        <div className="text-black">
            <h2 className='my-3 text-2xl'>L'achat n'a pas eu lieu, veuillez réessayer</h2>

            <Link href="/" className="text-orange-600 font-bold text-xl hover:underline">Retour à la page d'accueil</Link>
        </div>
    );
}

export default Cancel