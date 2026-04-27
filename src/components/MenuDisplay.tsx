"use client";

import { useState } from "react";
import type { MenuItem, MenuCategory } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";

interface Props {
  items: MenuItem[];
}

const CATEGORY_ORDER: MenuCategory[] = [
  "pizza",
  "spicy_pizza",
  "børne_pizza",
  "deep_pan",
  "indbagt",
  "ufo",
  "pizza_sandwich",
  "pita",
  "rulle",
  "pasta",
  "grill",
  "nachos",
  "burger",
  "snacks",
  "tilbehør",
  "drikkevare",
];

const CATEGORY_COLORS: Record<MenuCategory, string> = {
  pizza:          "from-orange-500 to-red-500",
  spicy_pizza:    "from-red-600 to-rose-700",
  børne_pizza:    "from-yellow-400 to-orange-400",
  deep_pan:       "from-amber-600 to-orange-600",
  pasta:          "from-yellow-500 to-amber-500",
  indbagt:        "from-green-600 to-emerald-600",
  ufo:            "from-purple-600 to-indigo-600",
  pizza_sandwich: "from-teal-500 to-cyan-500",
  pita:           "from-lime-600 to-green-600",
  rulle:          "from-emerald-500 to-teal-500",
  grill:          "from-orange-700 to-red-700",
  nachos:         "from-yellow-600 to-amber-600",
  burger:         "from-red-500 to-orange-500",
  snacks:         "from-pink-500 to-rose-500",
  tilbehør:       "from-lime-500 to-green-500",
  drikkevare:     "from-blue-500 to-cyan-500",
};

export default function MenuDisplay({ items }: Props) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "alle">("alle");

  const grouped = CATEGORY_ORDER.reduce(
    (acc, cat) => {
      const catItems = items.filter((i) => i.category === cat);
      if (catItems.length > 0) acc[cat] = catItems;
      return acc;
    },
    {} as Record<MenuCategory, MenuItem[]>
  );

  const categories = Object.keys(grouped) as MenuCategory[];

  const displayed =
    activeCategory === "alle"
      ? grouped
      : { [activeCategory]: grouped[activeCategory] };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-600 via-red-600 to-red-800 py-12 px-6 text-center">
        <p className="text-orange-200 text-sm font-medium tracking-widest uppercase mb-2">
          Spicy Pizza & Grill
        </p>
        <h1 className="text-4xl md:text-5xl font-black mb-3">Vores Menu</h1>
        <p className="text-orange-100 text-sm">
          Åben alle dage 11:00 – 22:00 · Levering 30-45 min
        </p>
        <div className="mt-4 inline-block bg-black/20 rounded-full px-4 py-1.5 text-xs text-orange-200">
          Ekstra topping: Kød +10kr · Grøntsager +5kr · Chili +5kr
        </div>
      </div>

      {/* Kategori tabs */}
      <div className="sticky top-0 z-10 bg-gray-950/95 backdrop-blur border-b border-white/10">
        <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
          <button
            onClick={() => setActiveCategory("alle")}
            className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
              activeCategory === "alle"
                ? "bg-orange-500 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            Alle
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                activeCategory === cat
                  ? "bg-orange-500 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Menu sektioner */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {(Object.entries(displayed) as [MenuCategory, MenuItem[]][]).map(
          ([cat, catItems]) => (
            <section key={cat}>
              {/* Kategori header */}
              <div
                className={`inline-flex items-center gap-2 bg-gradient-to-r ${CATEGORY_COLORS[cat]} text-white text-sm font-bold px-4 py-2 rounded-full mb-5 shadow-lg`}
              >
                {CATEGORY_LABELS[cat]}
              </div>

              {/* Grid med menupunkter */}
              <div className="grid gap-3 sm:grid-cols-2">
                {catItems
                  .sort((a, b) => (a.number ?? 99) - (b.number ?? 99))
                  .map((item) => (
                    <div
                      key={item.id}
                      className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/40 rounded-xl p-4 transition-all"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {item.number && (
                              <span className="text-xs text-gray-500 font-mono">
                                #{item.number}
                              </span>
                            )}
                            <h3 className="font-bold text-white text-sm leading-tight">
                              {item.name}
                            </h3>
                          </div>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          {item.price_large ? (
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1.5 justify-end">
                                <span className="text-xs text-gray-500 font-medium">
                                  {cat === "burger" ? "Alm." : "Alm."}
                                </span>
                                <span className="text-orange-400 font-black text-sm">
                                  {item.price} kr
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 justify-end">
                                <span className="text-xs text-gray-500 font-medium">
                                  {cat === "burger" ? "Menu" : "3 Pers."}
                                </span>
                                <span className="text-orange-300 font-black text-sm">
                                  {item.price_large} kr
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-orange-400 font-black text-base">
                              {item.price} kr
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          )
        )}
      </div>

      {/* Bund info */}
      <div className="border-t border-white/10 text-center py-8 text-gray-500 text-xs">
        <p>Spicy Pizza & Grill · Ring og bestil eller chat med os online</p>
        <p className="mt-1">Alle priser er i DKK inkl. moms</p>
      </div>
    </div>
  );
}
