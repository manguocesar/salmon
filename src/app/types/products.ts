export type Product = {
  id: number;
  name: string;
  img: string;
  price: number;
  description: string;
  available: boolean;
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
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
};
