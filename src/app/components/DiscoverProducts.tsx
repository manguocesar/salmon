import Link from "next/link";

export const DiscoverProducts = () => (
    <div className="text-center p-2 md:p-4 rounded-lg">
        <h1 className="text-4xl">Poissons Fumés Artisanalement</h1>
        <p className="text-2xl m-8">Saumons, truites et flétans exquis</p>
        <Link
            href="/products"
            className="bg-blue-600  text-white p-5 rounded-lg md:text-3xl font-semibold hover:bg-blue-700 transition-all duration-300"
        >
            Découvrir Nos Produits
        </Link>
    </div>
)