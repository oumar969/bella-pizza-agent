"use client";

import { useState, useRef, useEffect } from "react";
import type { ChatMessage, OrderItem } from "@/lib/types";

function detectOrder(text: string): OrderItem[] {
  const keywords = [
    "betal", "bestil", "ordre", "total", "kr.", "stk",
    "margherita", "pepperoni", "hawaii", "kylling", "kebab",
  ];
  const lower = text.toLowerCase();
  if (!keywords.some((k) => lower.includes(k))) return [];

  const lines = text.split("\n");
  const items: OrderItem[] = [];
  const priceRegex = /(.+?)\s*[-–]\s*(\d+)\s*kr/gi;
  let match;
  while ((match = priceRegex.exec(text)) !== null) {
    items.push({
      menu_item_id: "",
      name: match[1].trim(),
      quantity: 1,
      price: parseInt(match[2]),
    });
  }
  return items;
}

export default function ChatUI() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hej og velkommen til Spicy Pizza & Grill! 🍕 Jeg hjælper dig gerne med at bestille eller svare på spørgsmål om vores menu. Hvad kan jeg gøre for dig?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    const assistantMessage: ChatMessage = { role: "assistant", content: "" };
    setMessages([...updatedMessages, assistantMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.body) throw new Error("Ingen svarstream");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        setMessages([
          ...updatedMessages,
          { role: "assistant", content: fullText },
        ]);
      }

      const detectedItems = detectOrder(fullText);
      if (detectedItems.length > 0) setPendingOrder(detectedItems);
    } catch {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Beklager, der opstod en fejl. Prøv venligst igen.",
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  async function handleCheckout() {
    if (!pendingOrder.length) return;
    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: pendingOrder, customerName }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      alert("Betalingsfejl — prøv igen.");
    } finally {
      setIsCheckingOut(false);
    }
  }

  const orderTotal = pendingOrder.reduce(
    (sum, i) => sum + i.price * i.quantity, 0
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-4 text-white">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🍕</span>
          <div>
            <h2 className="text-lg font-bold">Spicy Pizza & Grill</h2>
            <p className="text-orange-100 text-sm">Din digitale pizzabud</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-orange-100">Åben</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-orange-50/30">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <span className="mr-2 mt-1 text-xl flex-shrink-0">🍕</span>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-orange-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 shadow-sm border border-orange-100 rounded-bl-none"
              }`}
            >
              {msg.content || (
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Betalingspanel */}
      {pendingOrder.length > 0 && (
        <div className="mx-4 mb-3 bg-orange-50 border border-orange-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-orange-700 mb-2">Din ordre</p>
          {pendingOrder.map((item, i) => (
            <div key={i} className="flex justify-between text-xs text-gray-700">
              <span>{item.name}</span>
              <span>{item.price} kr</span>
            </div>
          ))}
          <div className="border-t border-orange-200 mt-2 pt-2 flex justify-between font-bold text-sm text-orange-700">
            <span>Total</span>
            <span>{orderTotal} kr</span>
          </div>
          <input
            type="text"
            placeholder="Dit navn"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mt-3 w-full rounded-lg border border-orange-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={handleCheckout}
            disabled={!customerName.trim() || isCheckingOut}
            className="mt-2 w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
          >
            {isCheckingOut ? "Sender til betaling..." : `Betal ${orderTotal} kr med kort 💳`}
          </button>
        </div>
      )}

      {/* Quick suggestions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {["Se menuen", "Bestil pizza", "Åbningstider", "Leveringstid"].map(
            (suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setInput(suggestion);
                  setTimeout(() => inputRef.current?.form?.requestSubmit(), 0);
                }}
                className="text-xs px-3 py-1.5 rounded-full border border-orange-300 text-orange-600 hover:bg-orange-50 transition-colors"
              >
                {suggestion}
              </button>
            )
          )}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="px-4 py-4 border-t border-orange-100 bg-white flex gap-3"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Skriv din besked..."
          disabled={isLoading}
          className="flex-1 rounded-full border border-orange-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
        >
          <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
