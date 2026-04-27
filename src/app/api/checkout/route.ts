import Stripe from "stripe";
import { type NextRequest } from "next/server";
import type { OrderItem } from "@/lib/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const { items, customerName } = await request.json() as {
    items: OrderItem[];
    customerName: string;
  };

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "dkk",
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/bekræftelse?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    metadata: { customerName },
  });

  return Response.json({ url: session.url });
}
