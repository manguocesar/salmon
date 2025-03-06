import { CheckoutItem } from "../types/products";

export const generateCSVRow = async (item: CheckoutItem) => {
    return `${item.name},${item.amountTotal} €,${item.email},${item.phone},${item.line1},${item.postalCode},${item.city},${item.productA?.quantity ?? ''},${item.productA?.amount_total ? item.productA.amount_total / 100 + '€' : ''},${item.productB?.quantity ?? ''},${item.productB?.amount_total ? item.productB.amount_total / 100 + '€' : ''},${item.productC?.quantity ?? ''},${item.productC?.amount_total ? item.productC.amount_total / 100 + '€' : ''},${item.productD?.quantity ?? ''},${item.productD?.amount_total ? item.productD.amount_total / 100 + '€' : ''},${item.productF?.quantity ?? ''},${item.productF?.amount_total ? item.productF.amount_total / 100 + '€' : ''},${item.productH?.quantity ?? ''},${item.productH?.amount_total ? item.productH.amount_total / 100 + '€' : ''}`;
};

export const generateCSVHeader = () => {
    return "Name, Total, Email, Phone, Street, Postal Code, City, Quantité A - 60€, Total A, Quantité B - 65€, Total B, Quantité C - 19€, Total C, Quantité D - 48€, Total D, Quantité F - 65€, Total F, Quantité H - 48€, total H";
};

export const downloadCSV = async (checkoutData: CheckoutItem[]) => {
    const csvContent =
        "data:text/csv;charset=utf-8," +
        [generateCSVHeader()]
            .concat(await Promise.all(checkoutData.map(generateCSVRow)))
            .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "checkout_product_details.csv");
    document.body.appendChild(link);
    link.click();
};