# FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion built for a frontend assignment. Browse a library of twelve lifts, open any workout to see full instructions and stats, lock a lift into **Today's Plan** or **Save it for later**, and track everything from one clean "My Plan" page — all of it saved in your browser so it's still there after a refresh.

## 🔗 Live Demo

https://fitlog-nine-pink.vercel.app/

## 🛠️ Technologies Used

- **Next.js 14** (App Router) — routing, server components, data fetching
- **React 18** — UI and client-side interactivity
- **Tailwind CSS** — styling and full responsiveness
- **lucide-react** — icon set used across the whole app
- **react-hot-toast** — toast notifications for user actions
- **Browser `localStorage`** — persists the plan/saved data across reloads
- **FitLog REST API** — `https://api.abcz.workers.dev/api/fitlog` (with an automatic fallback to `https://api.api-store.workers.dev/api/fitlog` if the main one is down)

## ✨ Key Features

1. **Responsive workout library** — all 12 workouts load from the API and render as cards in a 3-column grid on desktop that collapses cleanly on tablet and mobile.
2. **Sort by Duration / Calories / Rating** — a "Sort By" dropdown on the library re-orders the visible cards instantly, no page reload.
3. **Detailed workout pages** — every workout has its own page with a big hero image, a specs table (equipment, difficulty, sets, reps, duration, calories, rating), and numbered step-by-step instructions.
4. **Plan & Save workflow with a 5-lift cap** — "Add to Today's Plan" and "Save for Later" buttons update the navbar badge counts live, show a toast, and the Add button disables itself once today's plan hits 5 lifts.
5. **My Plan dashboard** — live Exercises / Minutes / Calories summary, tabs for Today's Plan vs Saved, a "Mark as Done" action, a remove (✕) action, and a friendly empty state when a tab has nothing in it.
6. **Persistent data** — the plan and saved lists are written to `localStorage`, so closing the tab or refreshing the page never loses your progress.
7. **Polished loading & error states** — a spinner while the library fetches, a "Loading workouts…" state on My Plan, and a custom 404 page for any unknown route.

## 📦 Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open http://localhost:3000 in your browser
```

To build and run a production version locally:

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
app/
  layout.js            # root layout: fonts, navbar, footer, providers
  page.js               # home page (hero + library)
  loading.js             # loading state for the home page
  not-found.js            # custom 404 page
  my-plan/page.js          # My Plan page (tabs, metrics, lists)
  workout/[id]/page.js      # dynamic workout detail page
components/
  Navbar.js, Footer.js
  WorkoutCard.js, LibrarySection.js, SortDropdown.js
  DetailActions.js, PlanWorkoutCard.js, EmptyState.js
  PlanProvider.js         # React context + localStorage persistence
lib/
  data.js               # API fetch helpers (with fallback API)
```

## 🚀 Deployment

This project is ready to deploy on **Vercel** (recommended, since it's a Next.js app):

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com), click **New Project**, and import the repo.
3. Keep the default settings (Framework Preset: Next.js) and click **Deploy**.
4. Once deployed, copy the live URL into the "Live Demo" section above.

It also deploys fine on Netlify or Cloudflare Pages using their standard Next.js build settings (`npm run build`).

## 🎨 Design

UI is based on the provided Figma file. Colors: dark background with a lime-green (`#ccff00`) accent, `Oswald` for headings and `Inter` for body text.

---

Built as a frontend assignment project. Train hard, log honest. 💪
