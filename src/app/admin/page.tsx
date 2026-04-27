"use client";

import { useState, useEffect, useCallback } from "react";
import type { MenuItem, MenuCategory } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import type { Order } from "@/lib/types";

const STATUS_LABELS: Record<string, string> = {
  afventer: "⏳ Afventer",
  bekræftet: "✅ Bekræftet",
  under_tilberedning: "👨‍🍳 Tilberedes",
  klar: "🔔 Klar",
  leveret: "🚚 Leveret",
};

const STATUS_COLORS: Record<string, string> = {
  afventer: "bg-yellow-100 text-yellow-800",
  bekræftet: "bg-blue-100 text-blue-800",
  under_tilberedning: "bg-orange-100 text-orange-800",
  klar: "bg-green-100 text-green-800",
  leveret: "bg-gray-100 text-gray-600",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [tab, setTab] = useState<"ordrer" | "menu">("ordrer");
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const headers = { "x-admin-token": token, "Content-Type": "application/json" };

  const fetchOrders = useCallback(async () => {
    const res = await fetch("/api/admin/orders", { headers: { "x-admin-token": token } });
    if (res.ok) setOrders(await res.json());
  }, [token]);

  const fetchMenu = useCallback(async () => {
    const res = await fetch("/api/admin/menu", { headers: { "x-admin-token": token } });
    if (res.ok) setMenuItems(await res.json());
  }, [token]);

  useEffect(() => {
    if (!token) return;
    if (tab === "ordrer") fetchOrders();
    else fetchMenu();
  }, [token, tab, fetchOrders, fetchMenu]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/orders", {
      headers: { "x-admin-token": password },
    });
    if (res.ok) {
      setToken(password);
      setOrders(await res.json());
      setError("");
    } else {
      setError("Forkert adgangskode");
    }
    setLoading(false);
  }

  async function updateOrderStatus(id: string, status: string) {
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers,
      body: JSON.stringify({ id, status }),
    });
    fetchOrders();
  }

  async function toggleAvailable(item: MenuItem) {
    await fetch("/api/admin/menu", {
      method: "PATCH",
      headers,
      body: JSON.stringify({ id: item.id, available: !item.available }),
    });
    fetchMenu();
  }

  if (!token) {
    return (
      <main className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <span className="text-4xl">🔐</span>
            <h1 className="text-white text-xl font-bold mt-2">Admin Login</h1>
            <p className="text-gray-400 text-sm">Spicy Pizza & Grill</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Adgangskode"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
            >
              {loading ? "Logger ind..." : "Log ind"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🍕</span>
          <div>
            <h1 className="font-bold">Admin Panel</h1>
            <p className="text-gray-400 text-xs">Spicy Pizza & Grill</p>
          </div>
        </div>
        <button
          onClick={() => setToken("")}
          className="text-xs text-gray-400 hover:text-white border border-white/20 px-3 py-1.5 rounded-full transition-colors"
        >
          Log ud
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-6 py-4 border-b border-white/10">
        {(["ordrer", "menu"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              tab === t ? "bg-orange-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {t === "ordrer" ? "📋 Ordrer" : "🍕 Menu"}
          </button>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* ORDRER */}
        {tab === "ordrer" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg">Indkomne ordrer ({orders.length})</h2>
              <button onClick={fetchOrders} className="text-xs text-orange-400 hover:text-orange-300">
                ↻ Opdater
              </button>
            </div>
            {orders.length === 0 && (
              <div className="text-center py-16 text-gray-500">Ingen ordrer endnu</div>
            )}
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-900 border border-white/10 rounded-xl p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold">{order.customer_name}</p>
                    <p className="text-gray-400 text-xs">
                      {new Date(order.created_at).toLocaleString("da-DK")}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                    {STATUS_LABELS[order.status]}
                  </span>
                </div>
                <div className="space-y-1 mb-4">
                  {(order.items as { name: string; quantity: number; price: number }[]).map((item, i) => (
                    <div key={i} className="flex justify-between text-sm text-gray-300">
                      <span>{item.quantity}x {item.name}</span>
                      <span>{item.price * item.quantity} kr</span>
                    </div>
                  ))}
                  <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-orange-400">
                    <span>Total</span>
                    <span>{order.total} kr</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {Object.keys(STATUS_LABELS).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateOrderStatus(order.id, s)}
                      disabled={order.status === s}
                      className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                        order.status === s
                          ? "bg-orange-500 text-white"
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                    >
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MENU */}
        {tab === "menu" && (
          <div className="space-y-4">
            <h2 className="font-bold text-lg">Menustyring ({menuItems.length} varer)</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-gray-900 border rounded-xl p-4 transition-all ${
                    item.available ? "border-white/10" : "border-red-500/30 opacity-60"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {item.number && (
                          <span className="text-xs text-gray-500">#{item.number}</span>
                        )}
                        <p className="font-semibold text-sm">{item.name}</p>
                      </div>
                      <p className="text-gray-400 text-xs mt-0.5">{item.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {CATEGORY_LABELS[item.category as MenuCategory]}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-orange-400 font-bold text-sm">{item.price} kr</p>
                      {item.price_large && (
                        <p className="text-gray-500 text-xs">{item.price_large} kr</p>
                      )}
                      <button
                        onClick={() => toggleAvailable(item)}
                        className={`mt-2 text-xs px-3 py-1 rounded-full font-semibold transition-colors ${
                          item.available
                            ? "bg-green-500/20 text-green-400 hover:bg-red-500/20 hover:text-red-400"
                            : "bg-red-500/20 text-red-400 hover:bg-green-500/20 hover:text-green-400"
                        }`}
                      >
                        {item.available ? "Aktiv" : "Inaktiv"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
