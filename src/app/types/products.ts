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

export type ProductSession = {
  quantity: number;
  price: {
    unit_amount: number;
  };
  amount_total: number;
};

export type CheckoutItem = {
  email: string;
  amountTotal: string;
  line1: string;
  postalCode: string;
  city: string;
  phone: string;
  name: string;
  companyName: string;
  productA: ProductSession;
  productB: ProductSession;
  productC: ProductSession;
  productD: ProductSession;
  productF: ProductSession;
  productH: ProductSession;
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

export type PaymentData = {
  object: string;
  amount_paid?: number;
  currency?: string;
  customer?: string;
  customer_details?: {
    email: string;
    name: string;
  };
  amount_total?: number;
  shipping_rate?: string;
  lines?: {
    data: LineItemInfo[];
  };
  collected_information?: {
    shipping_details: {
      address: {
        line1: string;
        postal_code: string;
        city: string;
      };
    };
  };
  custom_fields?: {
    label: {
      custom: string;
    };
    text: {
      value: string | null;
    };
  }[];
  id?: string;
};

export type StripeEvent = {
  type: string;
  data: {
    object: PaymentData;
  };
};

export type LineItemInfo = {
  description: string;
  quantity: number;
  amount_total: number;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (id: number, newQuantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
};
