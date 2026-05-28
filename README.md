# AtlasOS

A **fictional portfolio demo** of a SaaS-style operating platform for service businesses. Showcases premium marketing site, multi-role interactive demo (owner, client, team), CRM, scheduling, messaging, automations, billing, analytics, and more.

## Tech stack

- [Next.js](https://nextjs.org) 15 (App Router)
- TypeScript
- Tailwind CSS v4
- [shadcn/ui](https://ui.shadcn.com)
- Zustand (local demo state)
- Recharts
- Framer Motion
- Lucide icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the marketing site. Use **Launch demo** or go to `/demo`.

## Demo flow (Sarah Mitchell story)

1. Open **Owner dashboard** → follow the guided banner
2. Go to **Intake** → open Sarah Mitchell → **Convert to client**
3. Open Sarah's profile → **Schedule appointment**
4. Switch role to **Client** → see onboarding checklist
5. **Messages** → send a message
6. **Automations** → run test on "New Client Welcome"

All data is in-memory and resets on page refresh.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Marketing homepage |
| `/demo` | Role selector |
| `/demo/owner/*` | Business owner app |
| `/demo/client` | Client portal |
| `/demo/team` | Team member view |

## Deploy on Vercel

```bash
npm run build
```

Connect the repo to [Vercel](https://vercel.com). Framework preset: Next.js. No environment variables required for the demo.

## Note

This is **not** a real product. No authentication, payments, email, or database — all interactions are simulated for portfolio purposes.
