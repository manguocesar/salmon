import { ProductSlider } from "../components/ProductSlider";
import { processUrls } from "../constants/processUrls";
import { products } from "../constants/products";

export default function Contact() {
    return (
        <div className="max-w-2xl text-black mx-auto">
            <h1 className="text-orange-600 text-3xl font-bold my-2 md:my-4 text-center">Contactez moi</h1>
            <div className="bg-white p-1 m-2 md:p-6 rounded-lg shadow-md">
                <p>Pour toute question, recette ou demande, veuillez contacter directement</p>
                <p className=" mb-3 md:mb-6"><strong>Mikael Hertz</strong> :</p>
                <ul className="md:space-y-2 mb-3 md:mb-6">
                    <li>
                        <strong>Téléphone :</strong> 06 62 19 63 58
                    </li>
                    <li>
                        <strong>Email :</strong> mikaelhertz@me.com
                    </li>
                    <li>
                        <strong>Adresse :</strong> 21 ROUTE DE CREST, 26400 SAOU
                    </li>
                </ul>
            </div>

            <ProductSlider isArrayMixed={false} urlRoot="process" products={processUrls} />

            <div className="bg-white m-1 p-2 md:p-8 rounded-lg shadow-md md:mt-8">
                <p className="mb-6">
                    Nous livrons nos produits de poisson fumé et d'élevage de qualité supérieure dans la région lyonnaise avant Noël et Pâques.
                </p>
                <p className="">
                    Le saumon, le flétan du Groenland, les crevettes & la truite de la meilleure qualité deviennent des spécialités gastronomiques après avoir été fumés dans le fumoir au Danemark.
                </p>
                <p className="mb-6">
                    Des années d'expérience et de tradition, associées à un traitement sans compromis de la matière première, le poisson est fumé sur des copeaux de hêtre entre 10 et 36 heures.
                </p>
                <p className="mb-6">
                    Le vent et la météo du jour, ainsi que les connaissances et l'expérience du maître de la fumée détermineront quand le poisson aura atteint l'arôme de fumée délicat et légèrement épicé.
                </p>
                <p className="mb-6">
                    Nous fournissons des produits fumés à froid et à chaud à des clients du monde entier - du saumon entier ou tranché salé à la main, avec la queue suspendue, au flétan du Groenland le plus délicat dans des variétés spéciales coupées verticalement.
                </p>
                <p className="mb-6">
                    Le saumon norvégien fumé à chaud (Salmo salar). Du saumon norvégien : Forfaits de vente au détail Taille des forfaits de restauration Côtés entiers Portions Saumon effiloché   </p>
                <p>
                    N'hésitez pas à nous contacter pour toute question sur nos produits ou pour passer votre commande. Nous sommes là pour vous fournir du poisson de la meilleure qualité pour vos délices culinaires !
                </p>
            </div>
            <ProductSlider isArrayMixed={false} urlRoot="products" products={products} />

        </div>
    )
}

