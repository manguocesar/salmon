import Link from 'next/link';
import React from 'react'
import { products } from '../constants/products';
import { ProductSlider } from '../components/ProductSlider';

const Cancel = () => {
    const images = products.map((product) => product.imgUrl);
    return (
        <div className="text-black my-5 md:text-center">
            <h2 className='m-3  text-2xl'>L'achat n'a pas eu lieu, veuillez réessayer</h2>
            <Link href="/" className=" m-3 text-orange-600 font-bold text-3xl hover:underline">Retour à la page d'accueil</Link>
            <ProductSlider urlRoot="products" products={images} />
        </div>
    );
}

export default Cancel