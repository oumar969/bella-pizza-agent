import { getMenuItems } from "@/lib/supabase";
import MenuDisplay from "@/components/MenuDisplay";
import type { MenuItem } from "@/lib/types";
import Link from "next/link";

export default async function MenuPage() {
  let items: MenuItem[] = [];
  try {
    items = await getMenuItems();
  } catch {
    // Supabase ikke konfigureret endnu
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <Link
          href="/"
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg transition-colors"
        >
          💬 Bestil nu
        </Link>
      </div>
      <MenuDisplay items={items} />
    </>
  );
}
