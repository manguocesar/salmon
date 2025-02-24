import { ProductSlider } from '../components/ProductSlider';
import { processUrls } from '../constants/processUrls';
import { products } from '../constants/products';

export default function Contact() {
  const images = products.map(product => product.imgUrl);
  return (
    <div className="mx-auto max-w-2xl text-black">
      <h1 className="my-2 text-center text-3xl font-bold text-orange-600 md:my-4">
        Contactez moi
      </h1>
      <div className="m-2 rounded-lg bg-white p-1 shadow-md md:p-6">
        <p>
          Pour toute question, recette ou demande, veuillez contacter
          directement
        </p>
        <p className="mb-3 md:mb-6">
          <strong>Mikael Hertz</strong> :
        </p>
        <ul className="mb-3 md:mb-6 md:space-y-2">
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

      <ProductSlider urlRoot="process" products={processUrls} />

      <div className="m-1 rounded-lg bg-white p-2 shadow-md md:mt-8 md:p-8">
        <p className="mb-6">
          Fournisseur de saumon depuis <strong>30 ans</strong> dans la région
          lyonnaise <strong>pour Noël et Pâques</strong>.
        </p>
        <p className="">
          Nos <strong>origines danoises</strong> nous amènent à vous proposer les saumons &
          produits scandinaves au meilleur goût
        </p>
        <p className="mb-6">
          <strong>Evenement d'entreprises, réceptions, événements familiaux, mariages,
            anniversaires</strong>  ..., nous assurons des produits frais livrés et servis
          au plus près de vos évenements.
        </p>
        <p>
          N'hésitez pas à nous contacter pour toute question sur nos produits ou
          pour passer votre commande. Nous sommes là pour vous fournir du
          poisson de la meilleure qualité pour vos délices culinaires !
        </p>
      </div>

      <ProductSlider urlRoot="products" products={images} />

      <div className="m-1 rounded-lg bg-white p-2 shadow-md md:mt-8 md:p-8">
        <p className="mb-6">
          Poisson <strong>fumé et d'élevage</strong> de qualité supérieure.
          <strong>
            Le saumon, le flétan du Groenland, les crevettes & la truite
          </strong> en tant que spécialités gastronomiques après avoir été fumés au <strong>Danemark</strong>.
        </p>
        <p className="mb-6">
          Des années d'expérience et de tradition, le poisson est fumé sur des
          copeaux de hêtre entre <strong>10 et 36 heures</strong>.
        </p>
        <p className="mb-6">
          La météo du jour, ainsi que les connaissances et l'expérience du
          fumage détermineront quand le poisson aura atteint l'arôme de fumée souhaité.
        </p>
        <p>
          N'hésitez pas à nous contacter pour toute question sur nos produits ou
          pour passer votre commande. Nous sommes là pour vous fournir du
          poisson de la meilleure qualité pour vos délices culinaires !
        </p>
      </div>
    </div>
  );
}
