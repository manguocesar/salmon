'use client';
import Image from "next/image";
import { products } from "../constants/products";
import Link from "next/link";

export const ProductSlider = () => {
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
                {products.concat(products).map((product, id) => (
                    <Link key={id} href={`/products/${product.url}`} className="">
                        <Image
                            src={`/products/${product.img}`}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="w-full h-64  rounded hover:border-2 hover:border-orange-600"
                        />
                    </Link>
                ))}
            </div>
        </>
    );
};
