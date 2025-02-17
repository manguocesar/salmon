export type Product = {
  id: number;
  name: string;
  img: string;
  price: number;
  description: string;
  available: boolean;
  url: string;
};

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (id: number, newQuantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
};
