import { Delete } from "lucide-react";
import { CartItem } from "../types/products";

export const TableRow = ({ item, updateQuantity, removeFromCart }: { item: CartItem; updateQuantity: (id: number, quantity: number) => void; removeFromCart: (item: CartItem) => void; }) => (
    <tr key={item.id}>
        <td className="block whitespace-pre-wrap px-1 py-4 font-semibold text-orange-600 md:hidden md:px-6">
            {item.shortName}
        </td>
        <td className="hidden whitespace-pre-wrap px-2 py-4 font-semibold text-orange-600 md:block md:px-6">
            {item.name}
        </td>
        <td className="whitespace-nowrap md:px-6 md:py-4">
            <div className="flex items-center">
                <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="rounded-l border font-bold px-2 py-1 text-gray-500 hover:text-gray-700"
                >
                    -
                </button>
                <span className="border-b border-t px-2 py-1 text-black">
                    {item.quantity}
                </span>
                <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="rounded-r font-bold border px-2 py-1 text-gray-500 hover:text-gray-700"
                >
                    +
                </button>
            </div>
        </td>
        <td className="hidden whitespace-nowrap px-2 py-4 text-black md:block md:px-6">
            {(item.price * item.quantity).toFixed(2)} €
        </td>
        <td className="block text-center whitespace-nowrap py-4 pr-1 text-black md:hidden md:px-6">
            {item.price * item.quantity}€
        </td>
        <td className="hidden md:block whitespace-nowrap py-4 md:px-6">
            <Delete
                onClick={() => removeFromCart(item)}
                className="ml-3 cursor-pointer text-red-700 hover:text-red-900"
            />
        </td>
    </tr>
);