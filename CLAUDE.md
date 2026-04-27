@AGENTS.md

# Spicy Pizza & Grill — Bestillingssystem

## Stack
- Next.js 16 (App Router, TypeScript, Tailwind CSS)
- Claude Haiku (`claude-haiku-4-5`) med streaming og prompt caching
- Supabase (PostgreSQL) — menu_items og orders tabeller
- Deploy: Render.com — https://bella-pizza-agent.onrender.com

## Vigtige filer
- `src/app/api/chat/route.ts` — Claude Haiku streaming API
- `src/components/ChatUI.tsx` — Chat UI med streaming
- `src/components/MenuDisplay.tsx` — Menuvisning med kategorier
- `src/lib/supabase.ts` — Supabase klient
- `src/lib/types.ts` — TypeScript interfaces
- `supabase/schema.sql` — Database schema med alle menupunkter

## Miljøvariabler
```
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_SUPABASE_URL=https://wvkmtxwomsdxrtoacvft.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## Chatbot-regler
- Svarer altid på dansk
- Spørger om størrelse: pizza (Alm./3 Pers.) og burger (Alm./Menu)
- Ekstra topping: Kød +10kr, Grøntsager +5kr, Chili +5kr
