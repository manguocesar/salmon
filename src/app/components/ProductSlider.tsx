'use client';
import Image from "next/image";
import { products } from "../constants/products"
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
                {products.map((product) => (
                    <Link key={product.id} href={`/products/${product.url}`} className="w-1/2">
                        <Image
                            src={`/products/${product.img}`}
                            alt={product.name}
                            width={300}
                            height={200}
                            className="w-full h-48 mb-4 rounded hover:border-2 hover:border-blue-600"
                        />
                    </Link>
                ))}
                {products.map((product) => (
                    <Link key={product.id} href={`/products/${product.url}`} className="w-1/2">
                        <Image
                            src={`/products/${product.img}`}
                            alt={product.name}
                            width={300}
                            height={200}
                            className="w-full h-48 mb-4 rounded hover:border-2 hover:border-blue-600"
                        />
                    </Link>
                ))}

            </div>
        </>
    )
}
