export type MenuCategory =
  | "pizza"
  | "spicy_pizza"
  | "børne_pizza"
  | "deep_pan"
  | "pasta"
  | "indbagt"
  | "ufo"
  | "pizza_sandwich"
  | "tilbehør"
  | "drikkevare";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  price_large?: number;
  category: MenuCategory;
  available: boolean;
  number?: number;
}

export interface OrderItem {
  menu_item_id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer_name: string;
  items: OrderItem[];
  total: number;
  status: "afventer" | "bekræftet" | "under_tilberedning" | "klar" | "leveret";
  created_at: string;
  notes?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  pizza: "🍕 Pizza",
  spicy_pizza: "🌶️ Spicy Pizza",
  børne_pizza: "👶 Børne Pizza",
  deep_pan: "🥘 Deep Pan",
  pasta: "🍝 Pasta",
  indbagt: "📦 Indbagt / Calzone",
  ufo: "🛸 UFO",
  pizza_sandwich: "🥪 Pizza Sandwich",
  tilbehør: "🥗 Tilbehør",
  drikkevare: "🥤 Drikkevarer",
};
