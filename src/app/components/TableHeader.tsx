export const TableHeader = () => (
    <thead className="bg-gray-50">
        <tr>
            <th className="py-3 text-left text-base font-semibold uppercase tracking-wider text-black md:px-6">
                Produit
            </th>
            <th className="py-3 text-center text-base font-semibold uppercase tracking-wider text-black md:px-6">
                Quantité
            </th>
            <th className="py-3 text-center md:text-left text-base font-semibold uppercase tracking-wider text-black md:px-6">
                Prix
            </th>
            <th className="hidden md:block py-3 text-left text-base font-semibold uppercase tracking-wider text-black">
                Retirer
            </th>
        </tr>
    </thead>
);