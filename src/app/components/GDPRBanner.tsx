'use client';

import { useState, useEffect } from 'react';

export function GDPRBanner() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const gdprAccepted = localStorage.getItem('gdprAccepted');
    if (gdprAccepted) {
      setAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('gdprAccepted', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <p className="mr-4 text-sm">
          Ce site web est conforme au RGPD. En utilisant notre site, vous
          acceptez que nous puissions collecter et traiter vos informations
          personnelles à des fins de traitement des commandes et de livraison.
        </p>
        <button
          onClick={handleAccept}
          className="rounded bg-white px-4 py-2 text-gray-800 transition duration-300 hover:bg-gray-200"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
