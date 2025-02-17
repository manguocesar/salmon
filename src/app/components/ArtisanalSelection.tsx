'use server';
import { ProductCard } from "./ProductCard";
import { products } from "../constants/products"

export const ArtisanalSelection = async () => {
    return (
        <div className="p-2 md:p-4 rounded-lg">
            <h2 className="text-3xl">Sélection Artisanale</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div >
    )
}