# Deploy frontend on Render

## Why you see “No open ports detected on 0.0.0.0”

That happens when a **Web Service** runs **`npm run dev`**. The Vite dev server is for local development only: it binds to **localhost**, not **0.0.0.0**, and Render cannot route traffic to it.

**Do not use `npm run dev` on Render.**

---

## Option A — Static Site (recommended)

1. Render → **New → Static Site** (not Web Service).
2. Connect repo `College-review-system-frontend`.
3. Settings:

| Field | Value |
|--------|--------|
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |
| **Start Command** | *(leave empty)* |

4. **Environment** → add **`VITE_API_URL`** = `https://college-review-system-backend-4qtm.onrender.com`  
   (Vite bakes this in at **build** time — change it and **redeploy** if the API URL changes.)

5. **Redirects/Rewrites** (SPA): `/*` → `/index.html` (200).

Or use **Blueprint** from this repo’s `render.yaml` (`runtime: static`).

---

## Option B — Web Service (only if you must)

Use production build + preview, not dev:

| Field | Value |
|--------|--------|
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |

`npm start` runs `vite preview` on **`0.0.0.0`** and **`PORT`** (required by Render).

Still set **`VITE_API_URL`** before build (same as Option A).

---

## Local development

```bash
npm run dev
```

Open http://localhost:5173 — use `.env` with `VITE_API_URL` pointing at Render or local backend.
