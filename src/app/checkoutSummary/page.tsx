"use server";
import { CheckoutItem } from "../types/products";
import { CsvBtn } from "../components/CsvBtn";
import { fetchCheckoutData } from "../lib/fetchCheckoutData";
import { TableSessionHeader } from "../components/TableSessionHeader";
import { TableSessionRow } from "../components/TableSessionRow";

export default async function CheckoutSummary() {
    let checkoutData: CheckoutItem[] = [];
    let error: string | null = null;

    try {
        checkoutData = await fetchCheckoutData();
    } catch (err) {
        if (err instanceof Error) {
            error = err.message;
        } else {
            error = "An unknown error occurred";
        }
        console.error("Error fetching checkout summary:", err);
    }

    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto p-4 space-y-4">
            <h1 className="text-3xl">Checkout Summary</h1>
            <CsvBtn checkoutData={checkoutData} />
            <CheckoutTable checkoutData={checkoutData} />
        </div>
    );
}

function CheckoutTable({ checkoutData }: { checkoutData: CheckoutItem[] }) {
    return (
        <table className="min-w-full bg-white">
            <TableSessionHeader />
            <tbody>
                {checkoutData.map((item, index) => (
                    <TableSessionRow key={index} item={item} />
                ))}
            </tbody>
        </table>
    );
}



