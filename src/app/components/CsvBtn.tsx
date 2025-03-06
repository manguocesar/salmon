'use client';
import { downloadCSV } from "../lib/generateCsv";
import { CheckoutItem } from "../types/products";

export const CsvBtn = ({ checkoutData }: { checkoutData: CheckoutItem[] }) => {
    return (
        <button onClick={() => downloadCSV(checkoutData)} className="bg-blue-500 text-white px-4 py-2 rounded">
            Download Spreadsheet
        </button>
    );
}