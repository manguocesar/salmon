export default function Contact() {
    return (
        <div className="max-w-2xl text-black mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Contactez-nous</h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <p className="mb-6">Pour toute demande ou pour passer une commande, veuillez contacter directement Mikael Hertz :</p>
                <ul className="space-y-2 mb-6">
                    <li>
                        <strong>Téléphone :</strong> +33 1 23 45 67 89
                    </li>
                    <li>
                        <strong>Email :</strong> mikael.hertz@example.com
                    </li>
                    <li>
                        <strong>Adresse :</strong> 123 Rue de la Poissonnerie, 69000 Lyon, France
                    </li>
                </ul>
                <p className="mb-6">
                    Nous livrons nos produits de poisson fumé et d'élevage de qualité supérieure dans la région lyonnaise avant Noël et Pâques.
                </p>
                <p>
                    N'hésitez pas à nous contacter pour toute question sur nos produits ou pour passer votre commande. Nous sommes là pour vous fournir du poisson de la meilleure qualité pour vos délices culinaires !
                </p>
            </div>
        </div>
    )
}

