import Anthropic from "@anthropic-ai/sdk";
import { getMenuItems } from "@/lib/supabase";

const client = new Anthropic();

const BASE_SYSTEM_PROMPT = `Du er en venlig og hjælpsom pizzeriaassistent for Spicy Pizza & Grill. Du kommunikerer udelukkende på dansk.

Din opgave:
- Hjælpe kunder med at se menuen og få anbefalinger
- Tage imod bestillinger og bekræfte dem tydeligt
- Besvare spørgsmål om ingredienser og allergener
- Være imødekommende og professionel

STØRRELSER — spørg ALTID om størrelse når kunden bestiller:
- PIZZA: "Alm." (1 person) eller "3 Pers." (stor, til 3 personer)
  Eksempel: "Vil du have Margherita som Alm. (70 kr) eller 3 Pers. (140 kr)?"
- BURGER: "Alm." (kun burger) eller "Menu" (burger + pommes frites + sodavand)
  Eksempel: "Vil du have Cheese Burger som Alm. (55 kr) eller Menu med pommes frites og sodavand (90 kr)?"
- Alle andre varer: ingen størrelsesvalgmulighed — bare bekræft prisen

Regler:
- Svar altid på dansk
- Vær kortfattet og præcis
- Spørg om størrelse INDEN du bekræfter pizza eller burger i ordren
- Bekræft altid bestillinger tydeligt med varenavn, størrelse, antal og pris
- Spørg om kundens navn ved bestilling
- Opsummer ordren og totalbeløb, når kunden er klar til at bestille
- Ekstra topping på pizza: Kød +10 kr, Grøntsager +5 kr, Chili +5 kr

Spicy Pizza & Grill er åben alle dage kl. 11:00-22:00.
Leveringstid: ca. 30-45 minutter. Afhentning: ca. 15-20 minutter.`;

export async function POST(request: Request) {
  const { messages } = await request.json();

  let menuContext = "";
  try {
    const menuItems = await getMenuItems();
    if (menuItems.length > 0) {
      const grouped = menuItems.reduce(
        (acc, item) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push(item);
          return acc;
        },
        {} as Record<string, typeof menuItems>
      );

      menuContext = "\n\nAKTUEL MENU:\n";
      for (const [category, items] of Object.entries(grouped)) {
        menuContext += `\n${category.toUpperCase()}:\n`;
        for (const item of items) {
          menuContext += `- ${item.name}: ${item.description} — ${item.price} kr.\n`;
        }
      }
    }
  } catch {
    menuContext = "\n\n(Menuen kunne ikke hentes lige nu — beklager ulejligheden.)";
  }

  const systemPrompt = BASE_SYSTEM_PROMPT + menuContext;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const anthropicStream = await client.messages.create({
        model: "claude-haiku-4-5",
        max_tokens: 1024,
        system: [
          {
            type: "text",
            text: systemPrompt,
            cache_control: { type: "ephemeral" },
          },
        ],
        messages,
        stream: true,
      });

      for await (const event of anthropicStream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(event.delta.text));
        }
        if (event.type === "message_stop") {
          controller.close();
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
