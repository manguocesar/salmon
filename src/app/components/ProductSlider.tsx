'use client';
import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/products";

export const ProductSlider = ({ products }: { products: Product[] | string[] }) => {
    console.log("products", products);

    const isProductArray = (arr: any[]): arr is Product[] => {
        return arr.length > 0 && typeof arr[0] === 'object' && 'url' in arr[0];
    };

    const renderProducts = (products: (Product | string)[]) => {
        return products.concat(products).map((product, id) => {
            const href = isProductArray(products) ? `/products/${(product as Product).url}` : `/products/${product}`;
            const src = isProductArray(products) ? `/products/${(product as Product).img}` : `/products/${product}`;
            const alt = isProductArray(products) ? (product as Product).name || 'fishProduct' : 'fishProduct';

            return (
                <Link key={id} href={href} className="">
                    <Image
                        src={src}
                        alt={alt}
                        width={300}
                        height={300}
                        className="w-full h-64 rounded hover:border-2 hover:border-orange-600"
                    />
                </Link>
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
                        transform: translateX(-150vw);
                    }
                }
                .slide-left {
                    animation: slideLeft 30s linear infinite;
                }
            `}</style>
            <div className="flex flex-row space-x-4 w-[400vw] slide-left">
                {renderProducts(products)}
            </div>
        </>
    );
};
