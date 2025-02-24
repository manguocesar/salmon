'use server';
import React from 'react';
import { Section } from './Section';

export const ArtisanalProcessus = async () => {
  return (
    <div className="container mx-auto mt-2 grid grid-cols-1 gap-3 rounded-lg bg-gray-100 p-2 md:mt-3 md:grid-cols-2 md:gap-8 md:p-4">
      <Section title="Techniques Traditionnelles:">
        Fumage perfectionné au fil des générations, utilisant des méthodes
        traditionnelles faisant ressortir les meilleures saveurs de chaque
        poisson.
      </Section>
      <Section title="Excellence Artisanale:">
        Préparé à la main, haute qualité & détails minutieux pour chaque filet.
      </Section>
    </div>
  );
};
