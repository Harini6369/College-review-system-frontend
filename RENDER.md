# Deploy frontend on Render

## Why you see “No open ports detected on 0.0.0.0”

That happens when a **Web Service** runs **`npm run dev`**. The Vite dev server is for local development only: it binds to **localhost**, not **0.0.0.0**, and Render cannot route traffic to it.

**Do not use `npm run dev` on Render.**

## Build stuck 10+ minutes (`npm start` in Build Command)

Render runs the **Build Command** once and waits until it **exits**.  
If Build Command is **`npm start`** (or **`npm run dev`**), that starts a web server and **never exits**, so the deploy looks “in progress” forever.

| Field | Wrong | Correct |
|--------|--------|--------|
| **Build Command** | `npm start` | `npm install && npm run build` (or `npm run render-build`) |
| **Start Command** | empty or `npm run dev` | **Static Site:** leave empty · **Web Service:** `npm start` |

The log line `Running build command 'npm start'...` means Build Command is wrong — fix it in **Settings → Build & Deploy**, then **Clear build cache & deploy**.

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

If the site shows **“Blocked request… not allowed”**, `vite.config.ts` must set `preview.allowedHosts` (already `true` in this repo). Push and redeploy.

---

## Local development

```bash
npm run dev
```

Open http://localhost:5173 — use `.env` with `VITE_API_URL` pointing at Render or local backend.
