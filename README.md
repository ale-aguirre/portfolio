# ale-aguirre.dev — Portfolio

Personal portfolio of **Alexis Aguirre**, frontend engineer building AI agents, SaaS products and browser experiences.

**Live demo:** https://ale-aguirre.vercel.app

## Branches

| Branch | Description |
|--------|-------------|
| `main` | Original version — multi-mode portfolio (AI / Developer / Gaming) with Three.js backgrounds |
| `redesign/opcion-b` | **Current active** — AI-focused redesign, no WebGL, faster, cleaner |

## Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **Language:** TypeScript
- **Animations:** Framer Motion
- **Styles:** CSS variables + Tailwind v4 (minimal usage)
- **Analytics:** PostHog
- **Deploy:** Vercel

## Tracked events (PostHog)

| Event | Trigger |
|-------|---------|
| `$pageview` | Every page load |
| `click_cta_work` | "View work" button in hero |
| `click_cta_contact` | "Get in touch" button in hero |
| `view_project` | Click on a project card link |
| `click_email` | Email link in contact section |
| `click_social` | LinkedIn or GitHub links |
| `click_cv_download` | CV download button |

## Local setup

```bash
npm install

# Copy env vars
cp .env.example .env.local
# Add: NEXT_PUBLIC_POSTHOG_KEY=<your-key>

npm run dev     # localhost:3000
npm run build   # production build
```

## Projects featured

| Project | Type | Stack |
|---------|------|-------|
| CORTEX | AI agent dashboard | Next.js 16, Groq, SQLite, SSE |
| job-hunter | Autonomous job agent | Node.js, Playwright, Claude Haiku |
| Forgix | AI browser game | Three.js, R3F, Groq SDK, Supabase |
| LadyManager | Image generation pipeline | FastAPI, RunPod, Stable Diffusion XL |
| SKUscribe | Amazon listing SaaS | Claude API, Amazon SP-API, Stripe |
| nuggets-core | AI memory layer | LanceDB, OpenRouter, Telegram Bot |

## Deploy to Vercel

1. Connect repo to Vercel
2. Set env var: `NEXT_PUBLIC_POSTHOG_KEY`
3. Deploy branch `redesign/opcion-b` (or merge to main)
