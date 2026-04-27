import { type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

function isAuthorized(request: NextRequest) {
  const token = request.headers.get("x-admin-token");
  return token === process.env.ADMIN_PASSWORD;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return Response.json({ error: "Ikke autoriseret" }, { status: 401 });

  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) return Response.json({ error: "Ikke autoriseret" }, { status: 401 });

  const { id, status } = await request.json();
  const supabase = getAdminClient();
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
