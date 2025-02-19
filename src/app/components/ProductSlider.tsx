'use client';
import Image from "next/image";
import { Product } from "../types/products";

export const ProductSlider = ({ products, urlRoot }: { products: Product[] | string[]; urlRoot: string }) => {

    const isProductArray = (arr: (Product | string)[]) => {
        return arr.length > 0 && typeof arr[0] === 'object' && 'url' in arr[0];
    };

    const renderProducts = (products: (Product | string)[]) => {
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

    return (
        <>
            <style jsx>{`
                @keyframes slideLeft {
                    from {
                        transform: translateX(0);
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
                {renderProducts(products)}
            </div>
        </>
    );
};
