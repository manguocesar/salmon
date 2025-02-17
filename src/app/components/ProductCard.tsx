
import Link from "next/link";
import { Product } from "../types/products";
import Image from "next/image";

export const ProductCard = ({ product }: { product: Product }) => (
    <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
        <Image
            src={`/products/${product.img}`}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-48 mb-4 rounded"
        />
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">
            {product.description}
        </p>
        <Link href={`/products/${product.url}`} className="text-blue-600 font-semibold hover:underline">
            En Savoir Plus
        </Link>
    </div>
)
