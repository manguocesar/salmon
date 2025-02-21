'use client';
import Image from "next/image";

const renderProducts = (urls: (string)[], urlRoot: string) => {

    return urls.map((url, id) => {
        const src = urlRoot === "products" ? `/${url}` : `/${urlRoot}/${url}`;
        return (
            <Image
                key={id}
                src={src}
                alt="fish product"
                width={300}
                height={300}
                className="h-40 md:h-64 rounded-lg hover:border-2 hover:border-orange-600"
            />
        );
    });
};

export const ProductSlider = ({ products, urlRoot }: { products: string[]; urlRoot: string, }) => {

    products = [...products, ...products, ...products, ...products];

    return (
        <>
            <style jsx>{`
                @keyframes slideLeft {
                    from {
                        transform: translateX(-10vw);
                    }
                    to {
                        transform: translateX(-550vw);
                    }
                }
                .slide-left {
                    animation: slideLeft 70s linear infinite;
                }
            `}</style>
            <div className="flex flex-row space-x-2 my-2 md:my-6 md:space-x-6 w-[200vw] slide-left">
                {renderProducts(products, urlRoot)}
            </div>
        </>
    );
};
