'use server';
import React from 'react';

const MentionsLegales = async () => {
    return (
        <main className='container mx-auto my-3 space-y-4'>
            <h1 className='text-3xl'>Mentions Légales</h1>
            <section className='space-y-2 ml-2'>
                <h2 className='text-xl font-semibold'>1. Informations légales</h2>
                <p className='ml-2'>
                    Le site web <a href="https://www.mikaelhertz.com/">https://www.mikaelhertz.com/</a> est édité par :<br />
                    <strong>HERTZ MIKAEL (ACTION COMMERCIALE INTERNATIONALE A.C.I.)</strong><br />
                    <strong>Forme juridique :</strong> Entrepreneur individuel<br />
                    <strong>Adresse :</strong> 21 ROUTE DE CREST, 26400 SAOU<br />
                    <strong>Numéro SIRET :</strong> 38351950100043<br />
                    <strong>TVA intracommunautaire :</strong> FR96383519501
                </p>
            </section>

            <section className='space-y-2 ml-2'>
                <h2 className='text-xl font-semibold'>2. Directeur de la publication</h2>
                <p className='ml-2'>
                    Le directeur de la publication est :<br />
                    <strong>César HERTZ</strong>
                </p>
            </section>

            <section className='space-y-2 ml-2'>
                <h2 className='text-xl font-semibold'>3. Hébergement</h2>
                <p className='ml-2'>
                    Le site est hébergé par :<br />
                    <strong>Vercel</strong><br />
                    Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
                </p>
            </section>

            <section className='space-y-2 ml-2'>
                <h2 className='text-xl font-semibold'>4. Médiation des litiges</h2>
                <p className='ml-2'>
                    Conformément à l'article L. 612-1 du Code de la consommation, le consommateur a la possibilité de recourir à un médiateur de la consommation en cas de litige. Pour plus d'informations, veuillez consulter [site du médiateur] ou contacter [nom du médiateur] à [adresse/contacts].
                </p>
            </section>

            <section className='space-y-2 ml-2'>
                <h2 className='text-xl font-semibold'>5. Protection des données personnelles</h2>
                <p className='ml-2'>
                    HERTZ MIKAEL (ACTION COMMERCIALE INTERNATIONALE A.C.I.) collecte des données personnelles afin de pouvoir livrer les commandes, rembourser les clients si nécessaire, ou les aider dans les démarches de leur commande. Vous pouvez exercer vos droits d'accès, de rectification, de suppression de vos données en nous contactant à l'adresse suivante : <a href="mailto:mikaelhertz@me.com">mikaelhertz@me.com</a>.
                </p>
            </section>

            <section className='space-y-2 ml-2'>
                <h2 className='text-xl font-semibold'>6. Conditions particulières de vente</h2>
                <ul className='ml-2'>
                    <li>La livraison des produits frais se fait à une date fixe, communiquée lors de la commande, soit quelques jours avant Noël, soit quelques jours avant Pâques.</li>
                    <li>Les produits alimentaires frais sont souvent non remboursables, sauf en cas de problème avec la qualité ou la livraison.</li>
                    <li>La date de consommation du saumon est de 10 jours après ouverture et 3 semaines après réception du produit.</li>
                </ul>
            </section>

            <section className='space-y-2 ml-2'>
                <h2 className='text-xl font-semibold'>7. Traitement des paiements</h2>
                <p className='ml-2'>
                    Les paiements sur ce site sont traités par Stripe, conformément à leurs conditions de service et à leur politique de confidentialité.
                </p>
            </section>
        </main>
    );
};

export default MentionsLegales;
