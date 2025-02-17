import Stripe from "stripe";

if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key is not defined");
}
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  type Item = {
    price: number;
    name: string;
    quantity: number;
  };

  type PriceData = {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
      images: string[];
    };
  };

  type LineItem = {
    price_data: PriceData;
    adjustable_quantity: {
      enabled: boolean;
      minimum: number;
    };
    quantity: number;
  };

  const body: Item[] = await req.json();

  const items: LineItem[] = body.map((item: Item) => ({
    price_data: {
      currency: "eur",
      unit_amount: item.price * 100,
      product_data: {
        name: item.name,
        images: [
          "https://cdn.sanity.io/images/4s5h2pxp/production/fc3ef6580411ef013a7f5783e3712a0d3be2de62-1510x1278.jpg",
        ],
      },
    },
    adjustable_quantity: {
      enabled: true,
      minimum: 1,
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      submit_type: "pay",
      mode: "payment",
      customer_creation: "always",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      phone_number_collection: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
      locale: "fr",
      billing_address_collection: "required" as "auto" | "required",
      shipping_options: [
        { shipping_rate: "shr_1QtTI2AZSYffeW1tvIkJZMx4" },
        { shipping_rate: "shr_1LAZVmAZSYffeW1tdCdnyBh1" },
        { shipping_rate: "shr_1QtTFcAZSYffeW1tIhEhf9tx" },
      ],
      line_items: items,
      success_url: `${process.env.NEXT_PUBLIC_URL}success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}cancel`,
    });

    return Response.json(session);
  } catch (err) {
    console.log("err", err);
  }
}
