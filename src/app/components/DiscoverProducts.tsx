'use server';

import Link from "next/link";
import { Suspense } from "react";
import { SVGAnimation } from "./SVGAnimation";

export const DiscoverProducts = async () => {

    return (
        <div className="text-center my-2 md:my-4 md:p-4 rounded-lg">
            <div className="flex flex-row justify-center items-center">
                <Suspense fallback={<div>Loading...</div>}>
                    <SVGAnimation translateX={-10} />
                    <h1 className="text-orange-600 mx-4 text-2xl font-semibold md:text-4xl ">Poissons Artisanaux</h1>
                    <SVGAnimation translateX={10} />
                </Suspense>
            </div>
            <Link href="/products" >
                <p className="duration-300 bg-orange-500 w-10/12 mx-auto md:w-6/12 md:mx-auto font-bold text-xl text-white p-5 m-2 rounded-lg md:text-3xl md:font-semibold hover:bg-orange-700 transition-all">Découvrir Nos Produits</p>
            </Link>
        </div>
    )
}