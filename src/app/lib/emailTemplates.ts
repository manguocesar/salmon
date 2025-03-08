export function generateOrderConfirmationEmail(params: {
  customerName: string | undefined;
  shippingAddress: {
    line1?: string;
    postalCode?: string;
    city?: string;
  };
  shippingMessage: string;
  customFields?: {
    label: string;
    value: string;
  }[];
  paymentDate: string;
  currencyCode: string;
  amount: string;
  items: {
    description: string;
    quantity: number;
    amount: string;
  }[];
}) {
  const {
    customerName,
    shippingAddress,
    shippingMessage,
    customFields,
    paymentDate,
    currencyCode,
    amount,
    items,
  } = params;

  const formatDate = (date: string) =>
    new Date(date)
      .toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      .replace(
        /(\d+)(?=\D+$)/,
        d => `${d}${['e', 'er', 'e', 'e'][((Number(d) % 10) - 1) % 10] || 'e'}`,
      );

  // Helper function to escape HTML
  const escapeHtml = (unsafe: string): string => {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const customFieldsHtml =
    customFields
      ?.map(
        field =>
          `<p><strong>${escapeHtml(field.label)}:</strong> ${escapeHtml(field.value)}</p>`,
      )
      .join('') || '';

  const itemsHtml = items
    .map(
      item => `
                  <hr>
                  <p>${escapeHtml(item.description)}</p>
                  <p><strong>Quantité :</strong> ${item.quantity}</p>
                  <p><strong>Montant :</strong> ${currencyCode} ${item.amount}</p>
              `,
    )
    .join('');

  return `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <img src="https://www.mikaelhertz.com/logo.jpg" alt="MikaelHERTZ" style="max-width: 200px; border-radius: 20px;">
              <h1>Reçu pour votre commande</h1>
              <p>Bonjour ${customerName || 'Cher Client'},</p>
              <p>Votre commande a bien été prise en compte</p>
              <p>Vous pouvez trouver un récapitulatif ci-dessous:</p>
              <p><strong>Adresse de livraison :</strong> ${shippingAddress.line1 || ''}, ${shippingAddress.postalCode || ''}, ${shippingAddress.city || ''}</p>
              <p><strong>Livraison:</strong> ${shippingMessage}</p>
              ${customFieldsHtml}
              <p>Merci pour votre commande.</p>
              <p>Voici les détails de votre commande :</p>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
                  <p><strong>Date du paiement :</strong> ${formatDate(paymentDate)}</p>
                  <p><strong>Total de la commande :</strong> ${currencyCode} ${amount}</p>
                  ${itemsHtml || '<p>Aucun détail de produit disponible</p>'}
              </div>
              <p>Si vous avez des questions, veuillez me contacter</p>
              <p>Cordialement,<br>Mikael HERTZ</p>
              <p>${process.env.NEXT_PUBLIC_MIKAEL_EMAIL}</p>
              <p>06 62 19 63 58</p>
              <p>26400 SAOU</p>
              <p>SIREN: 383 519 501</p>
          </div>
      `;
}
