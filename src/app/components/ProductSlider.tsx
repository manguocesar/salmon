'use client';
import Image from 'next/image';
import { slideLeft } from '../constants/animation';

export const ProductSlider = ({
  products,
  urlRoot,
}: {
  products: string[];
  urlRoot: string;
}) => {
  // lengthening the array to make the animation last longer
  products = [...products, ...products, ...products, ...products];

  return (
    <>
      <style jsx>{slideLeft}</style>
      <div className="slide-left my-2 flex w-[200vw] flex-row space-x-2 md:my-6 md:space-x-6">
        {products.map((url, id) => {
          const src = urlRoot === 'products' ? `/${url}` : `/${urlRoot}/${url}`;
          return (
            <Image
              key={id}
              src={src}
              alt={urlRoot + id}
              width={300}
              height={300}
              className="h-40 rounded-lg hover:border-2 hover:border-orange-600 md:h-64"
            />
          );
        })}
      </div>
    </>
  );
};
