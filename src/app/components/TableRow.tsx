import { Delete } from "lucide-react";
import { CartItem } from "../types/products";

export const TableRow = ({ item, updateQuantity, removeFromCart }: { item: CartItem; updateQuantity: (id: number, quantity: number) => void; removeFromCart: (item: CartItem) => void; }) => (
    <tr key={item.id}>
        <td className="px-1 font-semibold text-orange-600 md:px-6 w-6/12">
            <span className="block sm:hidden text-sm flex-wrap">{item.name}</span>   <span className="hidden sm:block">{item.name}</span>
        </td>

        <td className="md:px-6 py-3">
            <div className="flex items-center justify-center">
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
        <td className=" px-1 text-center md:text-left font-semibold text-orange-600 md:px-6">
            <span className="block md:hidden"> {item.price * item.quantity} €</span>   <span className="hidden md:block">{(item.price * item.quantity).toFixed(2)}€</span>
        </td>
        <td className="hidden md:table">
            <Delete
                onClick={() => removeFromCart(item)}
                className="mx-auto mt-3 w-8 h-8 cursor-pointer text-red-700 hover:text-red-900"
            />
        </td>
    </tr>
);