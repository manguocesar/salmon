import Stripe from "stripe";

if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key is not defined");
}
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

import { NextRequest } from "next/server";
import { CartItem, LineItem } from "../types/products";

export async function POST(req: NextRequest) {
  const body: CartItem[] = await req.json();

  const items: LineItem[] = body.map((item: CartItem) => ({
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
