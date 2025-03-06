import { CheckoutItem, ProductSession } from "../types/products";

function renderProductDetails(product: ProductSession | null): string {
    return product ? `${product.quantity} * ${product.price.unit_amount / 100} = ${product.amount_total / 100}€` : '';
}

export function TableSessionRow({ item }: { item: CheckoutItem }) {
    const products = [item.productA, item.productB, item.productC, item.productD, item.productF, item.productH];

    return (
        <tr className="border-b">
            <td className="py-2 px-1">{item.name}</td>
            <td className="py-2 px-1">{item.amountTotal}€</td>
            <td className="py-2 px-1">{item.companyName}</td>
            <td className="py-2 px-1">{item.email}</td>
            <td className="py-2 px-1">{item.phone}</td>
            <td className="py-2 px-1">
                {item.line1}<br />
                {item.postalCode} {item.city}
            </td>
            {products.map((product, index) => (
                <td key={index} className="py-2 px-1">{renderProductDetails(product)}</td>
            ))}
        </tr>
    );
}
