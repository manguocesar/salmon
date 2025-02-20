'use client';
import Image from "next/image";
import { Product } from "../types/products";
import { useEffect, useState } from "react";

const shuffleArray = (array: string[], randomNum: number) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(randomNum * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};



const renderProducts = (products: (Product | string)[], urlRoot: string) => {

    const isProductArray = (arr: (Product | string)[]) => {
        return arr.length > 0 && typeof arr[0] === 'object' && 'url' in arr[0];
    };

    const isProduct = isProductArray(products as (Product | string)[]);
    return products.concat(products).map((product, id) => {
        const src = isProduct ? `/products/${(product as Product).img}` : `/${urlRoot}/${product}`;
        const alt = isProduct ? (product as Product).name || 'fishProduct' : 'fishProduct';

        return (
            <Image
                key={id}
                src={src}
                alt={alt}
                width={300}
                height={300}
                className="h-40 md:h-64 rounded-lg hover:border-2 hover:border-orange-600"
            />
        );
    });
};

export const ProductSlider = ({ products, urlRoot, isArrayMixed }: { products: Product[] | string[]; urlRoot: string, isArrayMixed: boolean }) => {

    const [randomNum, setRandomNum] = useState(0.5);

    useEffect(() => {
        setRandomNum(Math.random());
    }, []);

    const mixedProducts = isArrayMixed ? shuffleArray([...products.filter(p => typeof p === 'string') as string[]], randomNum) : [...products];
    return (
        <>
            <style jsx>{`
                @keyframes slideLeft {
                    from {
                        transform: translateX(-10vw);
                    }
                    to {
                        transform: translateX(-350vw);
                    }
                }
                .slide-left {
                    animation: slideLeft 80s linear infinite;
                }
            `}</style>
            <div className="flex flex-row space-x-2 my-2 md:my-6 md:space-x-6 w-[1400vw] md:w-[2000vw] slide-left">
                {renderProducts(mixedProducts, urlRoot)}
            </div>
        </>
    );
};
