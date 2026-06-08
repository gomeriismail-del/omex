# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Single-service **Next.js 14** e-commerce frontend (Omex Store / `tn-front`). No Docker, database, or backend in this repo. Product catalog is served from `public/products.txt` via `/api/notion`.

### Running the app

```bash
npm run dev    # http://localhost:3000
```

Use a tmux session for long-running dev servers (e.g. `nextjs-dev-server`).

### Lint / build / test

| Command | Purpose |
|---------|---------|
| `npm run lint` | ESLint (warnings only; exits 0) |
| `npm run build` | Production build |
| `npm run start` | Serve production build (run `build` first) |

There is no automated test suite in this repo.

### External dependencies (not local)

- **dmtart.pro** — auth and orders (`/api/auth/*`, `/api/orders`). Required for checkout, login, and `/dashboard`. Endpoints are hardcoded; no `.env` for the API base URL.
- **api.codtoop.com** — delivery registration after checkout (optional; checkout succeeds if it fails).
- **Facebook Conversions API** — optional analytics; hardcoded fallbacks exist.

Browsing static pages, product catalog, and `/api/notion` work with only the Next.js dev server.

### Optional env vars

Only used for Facebook tracking (see `src/services/facebookConversions.ts`):

- `NEXT_PUBLIC_FB_PIXEL_ID`
- `FB_ACCESS_TOKEN`

No `.env.example` in repo; these are not required for local dev.

### Gotchas

- `npm run build` triggers some test API routes that call `dmtart.pro` at build time; build still succeeds if those return 404/401.
- Default language is Arabic (RTL). Language switcher is in the navbar.
- `/dashboard` is protected by middleware; valid dmtart.pro credentials are needed for admin flows.
