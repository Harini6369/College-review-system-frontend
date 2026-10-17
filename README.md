# College Review System Frontend

React client for the College Review System API. It uses the latest React 19 toolchain, native ES modules, and a small set of readable pages that map one-to-one with the backend routes.

This UI is for local evaluation. It is not a production frontend.

## Technology stack

- Node.js 20+
- React 19
- TypeScript 5
- Vite 7
- React Router 7
- Native `fetch` against the Express API

## Prerequisites

- Node.js 20 or later
- The backend API running on `http://localhost:5000`

## Installation

```bash
cd College-review-system-frontend
cp .env.example .env
npm install
npm run dev
```

The app starts at [http://localhost:5173](http://localhost:5173).

Vite proxies `/api` to the backend, so local requests do not need CORS changes. If the API is on another origin, set `VITE_API_URL` in `.env`.

## Production build (local)

```bash
npm run build
npm start
```

Deploy on Render: see [RENDER.md](./RENDER.md).

## What you can do

- Browse colleges with search, location, sorting, and pagination
- Open a college and read rating statistics plus reviews
- Register as a student or teacher
- Sign in and manage your own review
- Admin users can create, edit, and delete colleges
- Admin users can view the user list

Admin accounts are not created from the UI. Use the backend seed script first.

## Suggested local flow

1. Start MongoDB and the API from `College-review-system-backend`.
2. Run `npm run seed` in the backend.
3. Start this app with `npm run dev`.
4. Sign in with the seeded admin or student from the backend `.env`.

## Project structure

```text
src/
  api/           thin fetch wrappers (.ts)
  types/         shared API and domain types
  context/       auth session (.tsx)
  components/    reusable UI pieces (.tsx)
  pages/         route screens (.tsx)
  styles/        one readable stylesheet
```

Keep new work in the same layers. Pages load data. Components render it. API files talk to the backend.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```
