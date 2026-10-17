# Deploy frontend on Render

## Fix: build succeeds but the site is 404

That usually means a **Web Service** is running **`npm start`** without a **`dist`** folder (Build Command never ran `npm run build`), or the service type is wrong.

| Symptom | Cause | Fix |
|--------|--------|-----|
| Empty **404**, `vary: Origin` | Vite preview with no `dist` | Build Command: **`npm run build`** · Start: **`npm start`** (or use Static Site below) |
| **No open ports** | **`npm run dev`** on Render | Never use dev on Render |
| Build never finishes | Build Command is **`npm start`** | Build must exit; use **`npm run build`** only |

After changing settings: **Clear build cache & deploy**.

---

## Option A — Static Site (recommended)

1. Render → **New → Static Site** (not Web Service).
2. Connect repo `College-review-system-frontend`.
3. Settings:

| Field | Value |
|--------|--------|
| **Build Command** | `npm run render-build` (or `npm install --include=dev && npm run build`) |
| **Publish Directory** | `dist` |
| **Start Command** | *(leave empty)* |

If the log says **`dist/index.html is missing`**, the build step did not run or failed (often because **`vite` / `typescript` are devDependencies** and Render skipped them). Use the build command above and env **`NPM_CONFIG_PRODUCTION=false`**.

4. **Environment** → **`VITE_API_URL`** = `https://college-review-system-backend-4qtm.onrender.com`  
   (Vite bakes this in at **build** time — redeploy after changing it.)

5. SPA routing is handled by `public/_redirects` and/or **Redirects/Rewrites**: `/*` → `/index.html` (200).

Or apply this repo’s **`render.yaml`** Blueprint (`runtime: static`).

---

## Option B — Web Service

Only if you cannot use a Static Site:

| Field | Value |
|--------|--------|
| **Build Command** | `npm run render-build` |
| **Start Command** | `npm start` |

Do **not** add a root **Dockerfile** (Render would ignore Node build settings).  
`npm start` serves **`dist`** with SPA fallback via **`serve`**. If `dist` is missing, deploy fails in **`prestart`** with a clear error.

Set **`VITE_API_URL`** before build (same as Option A).

---

## Local development

```bash
npm run dev
```

Open http://localhost:5173 — use `.env` with `VITE_API_URL` pointing at Render or local backend.

Production check locally:

```bash
npm run build
npm start
```
