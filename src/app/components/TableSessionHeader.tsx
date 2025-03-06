export function TableSessionHeader() {
    const headers = [
        "Name", "Total", "Entreprise", "Email", "Phone", "Address",
        "Produit A", "Produit B", "Produit C", "Produit D",
        "Produit F", "Produit H"
    ];

    return (
        <thead>
            <tr className="w-full bg-gray-200 text-left">
                {headers.map((header) => (
                    <th key={header} className="py-2 px-1">{header}</th>
                ))}
            </tr>
        </thead>
    );
}
