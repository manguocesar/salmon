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
  while (products.length < 25) {
    products = [...products, ...products];
  }

  return (
    <>
      <style jsx>{slideLeft}</style>
      <div className="slide-left my-2 flex w-[200vw] flex-row space-x-2 md:my-6 md:space-x-4">
        {products.map((url, id) => {
          const src = urlRoot === 'products' ? `/${url}` : `/${urlRoot}/${url}`;
          {/* Placeholder Support: -- layout="responsive" */ }


          return (

            <Image
              key={id}
              src={src}
              alt={urlRoot + id}
              width={250}
              height={200}
              className="rounded-lg hover:border-2 hover:border-orange-600 "
            />
          );
        })}
      </div>
    </>
  );
};
