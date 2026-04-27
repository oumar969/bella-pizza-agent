import ChatUI from "@/components/ChatUI";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg h-[700px] flex flex-col">
        <ChatUI />
      </div>
      <div className="mt-4 flex items-center gap-4">
        <p className="text-xs text-gray-400">
          Spicy Pizza & Grill · Leveringstid 30-45 min · Åben 11-22
        </p>
        <Link
          href="/menu"
          className="text-xs text-orange-500 hover:text-orange-600 font-semibold underline underline-offset-2"
        >
          Se hele menuen →
        </Link>
      </div>
    </main>
  );
}
