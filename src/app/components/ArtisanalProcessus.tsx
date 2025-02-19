'use server';
import React from 'react';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
        <h3 className="text-2xl text-orange-500">{title}</h3>
        <p className="text-gray-700 md:mb-4">{children}</p>
    </div>
);

export const ArtisanalProcessus = async () => {
    return (
        <div className="bg-gray-100 p-2 md:p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 mt-2 md:mt-3">
            <Section title="Techniques Traditionnelles:">
                Fumage perfectionné au fil des générations, utilisant des méthodes traditionnelles faisant ressortir les meilleures saveurs de chaque poisson.
            </Section>
            <Section title="Excellence Artisanale:">
                Préparé à la main, haute qualité & attention aux détails pour chaque filet.
            </Section>
        </div>
    );
};