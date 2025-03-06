'use client';
import { useState, useEffect, useCallback } from "react";

type ProductSession = {
    quantity: number;
    price: {
        unit_amount: number;
    };
    amount_total: number;
}

type CheckoutItem = {
    email: string;
    amountTotal: string;
    line1: string;
    postalCode: string;
    city: string;
    phone: string;
    name: string;
    productA: ProductSession;
    productB: ProductSession;
    productC: ProductSession;
    productD: ProductSession;
    productF: ProductSession;
    productH: ProductSession;
}

export default function CheckoutSummary() {
    const [checkoutData, setCheckoutData] = useState<CheckoutItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api");
                if (!response.ok) {

                    if (response.statusText == 'No Token') {
                        throw new Error("You need to log in first");

                    }

                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                if (data.success) {
                    setCheckoutData(data.extractedData);
                } else {
                    throw new Error("Data fetch was not successful");
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred");
                }
                console.error("Error fetching checkout summary:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const downloadCSV = useCallback(() => {
        const csvContent =
            "data:text/csv;charset=utf-8," +
            ["Name, Total, Email, Phone, Street, Postal Code, City, Quantité A - 60€, Total A, Quantité B - 65€, Total B, Quantité C - 19€, Total C, Quantité D - 48€, Total D, Quantité F - 65€, Total F, Quantité H - 48€, total H"]
                .concat(
                    checkoutData.map(item =>
                        `${item.name},${item.amountTotal} €,${item.email},${item.phone},${item.line1},${item.postalCode},${item.city},${item.productA?.quantity ?? ''},${item.productA?.amount_total ? item.productA.amount_total / 100 + '€' : ''},${item.productB?.quantity ?? ''},${item.productB?.amount_total ? item.productB.amount_total / 100 + '€' : ''},${item.productC?.quantity ?? ''},${item.productC?.amount_total ? item.productC.amount_total / 100 + '€' : ''},${item.productD?.quantity ?? ''},${item.productD?.amount_total ? item.productD.amount_total / 100 + '€' : ''},${item.productF?.quantity ?? ''},${item.productF?.amount_total ? item.productF.amount_total / 100 + '€' : ''},${item.productH?.quantity ?? ''},${item.productH?.amount_total ? item.productH.amount_total / 100 + '€' : ''}`
                    )
                )
                .join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "checkout_product_details.csv");
        document.body.appendChild(link);
        link.click();
    }, [checkoutData]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto p-4 space-y-4">
            <h1 className="text-3xl">Checkout Summary</h1>
            <button onClick={downloadCSV} className="bg-blue-500 text-white px-4 py-2 rounded">Download CSV</button>
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="w-full bg-gray-200 text-left">
                        <th className="py-2 px-1">Name</th>
                        <th className="py-2 px-1">Total</th>
                        <th className="py-2 px-1">Email</th>
                        <th className="py-2 px-1">Phone</th>
                        <th className="py-2 px-1">Address</th>
                        <th className="py-2 px-1">Produit A</th>
                        <th className="py-2 px-1">Produit B</th>
                        <th className="py-2 px-1">Produit C</th>
                        <th className="py-2 px-1">Produit D</th>
                        <th className="py-2 px-1">Produit F</th>
                        <th className="py-2 px-1">Produit H</th>
                    </tr>
                </thead>
                <tbody>
                    {checkoutData.map((item, index) => (
                        <tr className="border-b" key={index}>
                            <td className="py-2 px-1">{item.name}</td>
                            <td className="py-2 px-1">{item.amountTotal}€</td>
                            <td className="py-2 px-1">{item.email}</td>
                            <td className="py-2 px-1">{item.phone}</td>
                            <td className="py-2 px-1">
                                {item.line1}<br />
                                {item.postalCode} {item.city}
                            </td>
                            <td className="py-2 px-1">{item?.productA ? `${item.productA.quantity} * ${item.productA.price.unit_amount / 100} = ${item.productA.amount_total / 100}€` : ''}</td>
                            <td className="py-2 px-1">{item?.productB ? `${item.productB.quantity} * ${item.productB.price.unit_amount / 100} = ${item.productB.amount_total / 100}€` : ''}</td>
                            <td className="py-2 px-1">{item?.productC ? `${item.productC.quantity} * ${item.productC.price.unit_amount / 100} = ${item.productC.amount_total / 100}€` : ''}</td>
                            <td className="py-2 px-1">{item?.productD ? `${item.productD.quantity} * ${item.productD.price.unit_amount / 100} = ${item.productD.amount_total / 100}€` : ''}</td>
                            <td className="py-2 px-1">{item?.productF ? `${item.productF.quantity} * ${item.productF.price.unit_amount / 100} = ${item.productF.amount_total / 100}€` : ''}</td>
                            <td className="py-2 px-1">{item?.productH ? `${item.productH.quantity} * ${item.productH.price.unit_amount / 100} = ${item.productH.amount_total / 100}€` : ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}
