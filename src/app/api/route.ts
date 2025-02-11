import Stripe from "stripe";

if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key is not defined");
}
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return Response.json("data");
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const itemList = body.map((item: any) => ({
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
      payment_method_types: ["card"],
      phone_number_collection: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
      billing_address_collection: "auto" as "auto" | "required",
      shipping_options: [
        { shipping_rate: "shr_1LAZWeAZSYffeW1toZSqsS2W" },
        { shipping_rate: "shr_1LAZVmAZSYffeW1tdCdnyBh1" },
      ],
      line_items: itemList,
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
    });

    return Response.json(session);
  } catch (err) {
    console.log("err", err);
  }
}
