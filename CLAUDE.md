# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (see Node caveat below)
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

**Node.js caveat:** Local Node.js 20.4.0 is below Vite 8's minimum (20.19+). `npm run dev` and `npm run build` will fail locally. Deploy a PR to Vercel to test visually — builds run on CI without issue.

There is no test framework configured.

## Architecture

**Stack:** React 19 + Vite 8 + Tailwind CSS v4 (`@tailwindcss/vite`, no `tailwind.config.js`) + Framer Motion + React Router DOM v7. Deployed as an iPad PWA at Wake BioHotel BioRoom.

### Content layer (`src/data/content.js`)
Single source of truth for all UI text, structured as `content.es.*` (complete) and `contentEN.*` (stub). Modules:
- `content.es.splash` / `home` — base screens
- `content.es.routineAM.steps` — 5 steps (`am-1` … `am-5`), each with `id`, `title`, `tag`, `description`, `benefits[]`, `steps[]`, `tip`, `warning`, `appLink`, `icon`
- `content.es.routinePM.steps` — 7 steps (`pm-1` … `pm-7`), same shape plus `modes[]`, `options[]`, `temperatures[]`, `phases[]`, `amenities[]`
- `content.es.gadgets.items` — 7 gadgets, each with `id`, `whatIs`, `benefits[]`, `steps[]`, `recommendation`, `warning`, `appLink`, `routines[]`
- `content.es.support.faq[]` — FAQ items
- `content.es.language` — language screen strings

### Global state (`src/context/AppContext.jsx`)
`AppProvider` wraps the app; consume with `useApp()`. Persists to `localStorage` under `wake_completed_steps`.
- `lang` / `setLang` — current language (`'es'` default)
- `completedSteps` — `{ [stepId]: boolean }` (keys like `"am-1"`, `"pm-3"`)
- `toggleStep(stepId)` — mark/unmark a step
- `isCompleted(stepId)` — boolean check
- `getProgress(stepsArray)` — returns `{ done, total, pct }`
- `resetRoutine('am' | 'pm')` — clears all steps for that routine

### UI components (`src/components/UI.jsx`)
All shared primitives live here — import by name:
`ProgressBar`, `SectionLabel`, `Tag`, `BtnPrimary`, `BtnSecondary`, `BtnAppLink`, `WarningBox`, `TipBox`, `CheckItem`, `BenefitItem`, `BackBtn`, `StepHeader`, `BottomNav`

`BtnAppLink` opens native apps via deep link (`window.location.href = scheme`). Gadget app links have `{ label, scheme }` shape (e.g. `therabody://`, `sleepme://`, `hatch://`).

### Pages (`src/pages/`)
Currently built: `Splash.jsx`, `Home.jsx`. Pages receive an `onNav(routeName)` callback prop for navigation (React Router integration in `App.jsx` is not yet wired — `App.jsx` still contains the Vite default template and needs to be replaced).

### Styling conventions
- **Colors:** always use CSS variables (`var(--green)`, `var(--red)`, `var(--bg)`, `var(--surface)`, `var(--card)`, `var(--border)`, `var(--muted)`, `var(--black)`), never hardcode except `#F1F0EB` (cream/white text on dark backgrounds)
- **Fonts:** Montserrat is the body default; use `font-lora` for headings/titles, `font-mono-dm` for labels/tags/uppercase tracking. These are defined as plain CSS classes in `index.css`, not Tailwind utilities.
- **Tailwind v4:** utility classes work as normal. No config file — customization goes in `index.css` via `@theme` or plain CSS.

### Navigation pattern
Pages use `useNavigate()` from react-router-dom — no prop-based `onNav` callbacks. The shared nav mapping used in every page with a `BottomNav`:
```js
const navGo = (id) => {
  const map = { home: '/home', am: '/am', pm: '/pm', gadgets: '/gadgets', help: '/ayuda' }
  navigate(map[id] || '/home')
}
```

### Step completion model
Instruction sub-steps (`step.steps[]`) use local `useState` checkboxes — not persisted. The whole gadget step (`step.id`) is marked complete in AppContext via `toggleStep`. RoutineStep fires `toggleStep(step.id)` and navigates forward together in one action.
