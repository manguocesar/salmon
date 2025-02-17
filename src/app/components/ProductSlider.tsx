'use client';
import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/products";

export const ProductSlider = ({ products }: { products: Product[] | string[] }) => {

    const isProductArray = (arr: any[]): arr is Product[] => {
        return arr.length > 0 && typeof arr[0] === 'object' && 'url' in arr[0];
    };

    const getProductDetails = (product: Product | string, isProduct: boolean) => {
        if (isProduct) {
            const prod = product as Product;
            return {
                href: `/products/${prod.url}`,
                src: `/products/${prod.img}`,
                alt: prod.name || 'fishProduct'
            };
        } else {
            return {
                href: `/products/${product}`,
                src: `/products/${product}`,
                alt: 'fishProduct'
            };
        }
    };

    const renderProducts = (products: (Product | string)[]) => {
        const isProduct = isProductArray(products);
        return products.concat(products).map((product, id) => {
            const { href, src, alt } = getProductDetails(product, isProduct);

            return (
                <Link key={id} href={href} className="">
                    <Image
                        src={src}
                        alt={alt}
                        width={300}
                        height={300}
                        className="w-full h-64 rounded-lg hover:border-2 hover:border-orange-600"
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
            <div className="flex flex-row space-x-4 w-[1200vw] md:w-[800vw] slide-left">
                {renderProducts(products)}
            </div>
        </>
    );
};
