import { type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

function isAuthorized(request: NextRequest) {
  return request.headers.get("x-admin-token") === process.env.ADMIN_PASSWORD;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return Response.json({ error: "Ikke autoriseret" }, { status: 401 });
  const { data, error } = await getClient().from("menu_items").select("*").order("number");
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) return Response.json({ error: "Ikke autoriseret" }, { status: 401 });
  const body = await request.json();
  const { data, error } = await getClient().from("menu_items").insert(body).select().single();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) return Response.json({ error: "Ikke autoriseret" }, { status: 401 });
  const { id, ...updates } = await request.json();
  const { error } = await getClient().from("menu_items").update(updates).eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) return Response.json({ error: "Ikke autoriseret" }, { status: 401 });
  const { id } = await request.json();
  const { error } = await getClient().from("menu_items").delete().eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
