'use server';

export const ArtisanalProcessus = async () => {
    return (
        <div className="bg-gray-100 p-2 md:p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 mt-2 md:mt-3">
            <div>
                <h3 className="text-2xl text-orange-500">Techniques Traditionnelles</h3>
                <p className="text-gray-700 md:mb-4">
                    Un processus de fumage perfectionné au fil des générations, utilisant des méthodes
                    traditionnelles qui font ressortir les meilleures saveurs de chaque filet de poisson.
                </p>
            </div>
            <div>
                <h3 className="text-2xl text-orange-500">Excellence Artisanale</h3>
                <p className="text-gray-700 md:mb-4">
                    Chaque produit est préparé à la main, garantissant la plus haute qualité et une attention aux détails dans
                    chaque tranche et filet.
                </p>
            </div>
        </div>
    );
};