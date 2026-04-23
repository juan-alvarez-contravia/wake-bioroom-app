# Wake BioHotel — BioRoom Experience App

Estoy construyendo la Wake BioHotel BioRoom Experience App.
Es una PWA en React + Vite + Tailwind CSS desplegada en Vercel.

**Repositorio:** https://github.com/juan-alvarez-contravia/wake-bioroom-app
**Deploy:** https://wake-bioroom-app.vercel.app
**Rama principal:** main
**Ruta local:** ~/Downloads/wake-bioroom-app

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

Node.js v25.9.0 instalado. No hay framework de tests configurado.

## Stack

- React 19 + Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`, sin `tailwind.config.js` — customización en `index.css` vía `@theme`)
- Framer Motion
- React Router DOM v7
- Zustand (instalado, aún sin usar — AppContext usa useState/localStorage)

## Contexto de negocio

Wake BioHotel es el primer BioHotel de Latinoamérica en Medellín, Colombia.
La BioRoom es una habitación premium con 7 gadgets de biohacking.
La app reemplaza un instructivo físico de 20 páginas con una experiencia gamificada.
Se instala como PWA en una tablet iPad dentro de la habitación.
El huésped **no necesita hacer login** en ninguna app de la tablet.

## Módulos de la app

- **Módulo A:** Rutina AM → 5 pasos (Circadian Light, Difusor, Grounding Mat + Red Light, SmartGoggles, Amenities)
- **Módulo B:** Rutina PM → 7 pasos (Difusor, SmartGoggles, Grounding Mat + Red Light, Amenities, SILO, DockPro, Hatch)
- **Módulo C:** Gadgets → galería + 7 fichas individuales
- **Módulo D:** Soporte → FAQ + contacto recepción

## Estado actual de páginas (`src/pages/`)

| Archivo | Estado | Notas |
|---|---|---|
| `Splash.jsx` | ✅ Completo | Auto-navega a /home después de 3.2s |
| `Home.jsx` | ✅ Completo | Progress AM/PM, acceso gadgets/ayuda/idioma |
| `RoutineIntro.jsx` | ✅ Completo | Intro compartida AM/PM con lista de pasos |
| `RoutineStep.jsx` | ✅ Completo | Paso individual con todos los tipos de contenido |
| `RoutineComplete.jsx` | ✅ Completo | Resumen + reiniciar rutina |
| `Gadgets.jsx` | ✅ Completo | Galería de 7 gadgets |
| `GadgetDetail.jsx` | ✅ Completo | Ficha individual por gadget |
| `Help.jsx` | ✅ Completo | FAQ acordeón + contacto recepción |
| `Language.jsx` | ✅ Completo | Selector ES/EN |

## Arquitectura

### Router (`src/App.jsx`)

`AppProvider` y `BrowserRouter` viven dentro de `App.jsx`. `main.jsx` solo monta el root.

Rutas:
```
/                → Splash
/home            → Home
/am              → RoutineIntro (routine="am")
/pm              → RoutineIntro (routine="pm")
/am/paso/:step   → RoutineStep (routine="am", step 1-based)
/pm/paso/:step   → RoutineStep (routine="pm", step 1-based)
/am/completa     → RoutineComplete (routine="am")
/pm/completa     → RoutineComplete (routine="pm")
/gadgets         → Gadgets
/gadgets/:id     → GadgetDetail
/ayuda           → Help
/idioma          → Language
```

### Content layer (`src/data/content.js`)

Single source of truth. Estructura `content.es.*` (completa) / `contentEN.*` (stub).

- `content.es.routineAM.steps` — 5 steps (`am-1`…`am-5`)
- `content.es.routinePM.steps` — 7 steps (`pm-1`…`pm-7`)
  - Cada step tiene: `id`, `title`, `tag`, `description`, `icon`
  - Opcionales según el gadget: `benefits[]`, `steps[]`, `tip`, `warning`, `appLink`, `modes[]`, `options[]`, `temperatures[]`, `phases[]`, `amenities[]`, `protocol`, `pending`
- `content.es.gadgets.items` — 7 gadgets con `id`, `name`, `icon`, `tags[]`, `whatIs`, `benefits[]`, `steps[]`, `recommendation`, `warning`, `appLink`, `routines[]`
- `content.es.support.faq[]` — preguntas frecuentes
- `content.es.language` — strings del selector de idioma

### Global state (`src/context/AppContext.jsx`)

Consume con `useApp()`. Persiste en `localStorage` bajo `wake_completed_steps`.

- `lang` / `setLang` — idioma actual (`'es'` por defecto)
- `completedSteps` — `{ [stepId]: boolean }` (claves como `"am-1"`, `"pm-3"`)
- `toggleStep(stepId)` — marcar/desmarcar un paso
- `isCompleted(stepId)` — boolean
- `getProgress(stepsArray)` — devuelve `{ done, total, pct }`
- `resetRoutine('am' | 'pm')` — borra todos los pasos de esa rutina

### UI components (`src/components/UI.jsx`)

`ProgressBar`, `SectionLabel`, `Tag`, `BtnPrimary`, `BtnSecondary`, `BtnAppLink`, `WarningBox`, `TipBox`, `CheckItem`, `BenefitItem`, `BackBtn`, `StepHeader`, `BottomNav`

`BtnAppLink` abre apps nativas vía deep link (`window.location.href = scheme`).
Deep links: `therabody://`, `sleepme://`, `hatch://`

`BottomNav` acepta props `active` (string) y `onNav(id)` (callback). Cada página define su propio `navGo`:
```js
const navGo = (id) => {
  const map = { home: '/home', am: '/am', pm: '/pm', gadgets: '/gadgets', help: '/ayuda' }
  navigate(map[id] || '/home')
}
```

### Convenciones de estilo

- **Colores:** siempre usar CSS variables (`var(--green)`, `var(--red)`, `var(--bg)`, `var(--surface)`, `var(--card)`, `var(--border)`, `var(--muted)`, `var(--black)`). Solo hardcodear `#F1F0EB` para texto blanco/crema sobre fondos oscuros.
- **Tipografía:** Montserrat es el default del body. `font-lora` para títulos. `font-mono-dm` para labels/tags/uppercase tracking. Definidas en `index.css` como clases CSS, no utilidades de Tailwind.
- **Tailwind v4:** las clases utilidad funcionan normal. Sin archivo config — customización en `index.css`.

### Paleta de colores

```
--bg:      #F1F0EB  (fondo crema dominante)
--surface: #E8E7E1
--card:    #E4E2DB
--border:  #D0CEC6
--muted:   #8C8980
--green:   #616652  (botones, progreso, activos)
--red:     #722F15  (labels, pasos, alertas)
--black:   #141414  (textos)
```

### Modelo de completado de pasos

- Sub-pasos instruccionales (`step.steps[]`) usan `useState` local — no persisten.
- El paso completo (`step.id`) se marca en AppContext vía `toggleStep`. RoutineStep llama `toggleStep(step.id)` y navega al siguiente en una acción.
- La ProgressBar en Home y RoutineIntro refleja los pasos completados en AppContext/localStorage.

## Deep links a apps nativas

| App | Scheme |
|---|---|
| Sleepme | `sleepme://` |
| Therabody | `therabody://` |
| Hatch Sleep | `hatch://` |

## Comportamiento especial

- El difusor aparece en AM (paso 2) y PM (paso 1) con instrucciones diferentes.
- Las SmartGoggles muestran modos Focus/SmartRelax en AM (paso 4) y modo Sleep en PM (paso 2).
- La app funciona en modo PWA pantalla completa en iPad (sin barra del navegador).
- El SILO (pm-5) tiene contenido pendiente — solo muestra un notice de `step.pending`.
