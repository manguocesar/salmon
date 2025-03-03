export type Product = {
  id: number;
  name: string;
  shortName: string;
  img: string;
  imgUrl: string;
  price: number;
  description: string;
  available: boolean;
  url: string;
  details: string;
};

export type DetailsProduct = Product & {
  video: string;
  consumption: string;
  size?: string;
};

export type CartItem = {
  id: number;
  name: string;
  shortName: string;
  imgUrl: string;
  price: number;
  quantity: number;
};

export type PriceData = {
  currency: string;
  unit_amount: number;
  product_data: {
    name: string;
    images: string[];
  };
};

export type AdjustableQuantity = {
  enabled: boolean;
  minimum: number;
};

export type LineItem = {
  price_data: PriceData;
  adjustable_quantity: AdjustableQuantity;
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
