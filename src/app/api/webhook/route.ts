import Stripe from "stripe";
import { type NextRequest } from "next/server";
import { createOrder } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return new Response("Webhook fejl", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    const items = lineItems.data.map((item) => ({
      menu_item_id: "",
      name: item.description ?? "",
      quantity: item.quantity ?? 1,
      price: (item.amount_total ?? 0) / 100 / (item.quantity ?? 1),
    }));

    const total = (session.amount_total ?? 0) / 100;

    await createOrder({
      customer_name: session.metadata?.customerName ?? "Ukendt",
      items,
      total,
      status: "bekræftet",
    });
  }

  return new Response("OK", { status: 200 });
}
