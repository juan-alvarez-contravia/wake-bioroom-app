# Wake BioHotel — BioRoom Experience App

PWA en React + Vite + Tailwind CSS desplegada en Vercel. Se instala en una tablet iPad dentro de la BioRoom — sin login, sin cuentas.

**Repo:** https://github.com/juan-alvarez-contravia/wake-bioroom-app  
**Deploy:** https://wake-bioroom-app.vercel.app  
**Rama:** main | **Local:** `~/Documents/wake-bioroom-app`

## Comandos

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
```

Node.js v25.9.0. Sin framework de tests.

## Stack

- React 19 + Vite 8 + React Router DOM v7
- Tailwind CSS v4 (sin `tailwind.config.js` — customización en `index.css`)
- Framer Motion (usado en Splash y RoutineComplete)
- AppContext con `useState` + `localStorage` (Zustand instalado pero sin usar)

---

## Reglas globales — aplicar siempre

1. **Sin emojis** en ningún JSX ni en `content.js`.
2. **`font-lora`** — siempre en mayúsculas (`.font-lora` tiene `text-transform: uppercase` en CSS). Nunca añadir `uppercase` inline.
3. **`font-lora-subtitulo`** — Lora sin uppercase (para subtítulos en Lora minúscula).
4. **`font-mono-dm`** — está mapeada a Montserrat 500 en CSS. Usarla para labels/tags/uppercase tracking.
5. **`font-montserrat`** — Montserrat regular. Usarla en textos de cuerpo, checklist, beneficios.
6. **`font-sans`** — no usar en componentes nuevos; reemplazar siempre por `font-montserrat`.
7. **Colores** — solo CSS variables: `var(--bg)`, `var(--surface)`, `var(--card)`, `var(--border)`, `var(--muted)`, `var(--green)`, `var(--red)`, `var(--black)`. Hardcodear solo `#F1F0EB` para texto blanco/crema sobre fondos oscuros.
8. **Padding horizontal** — 40px en todos los módulos (`paddingLeft: '40px', paddingRight: '40px'`). No usar `px-6`.
9. **BottomNav** en todas las páginas. Cada página define su propio `navGo` con el mapa estándar.
10. **No TipBox** en RoutineStep — eliminados de todos los pasos.
11. **No BtnSecondary** en RoutineStep — reemplazado por el layout dividido ANTERIOR/SIGUIENTE.

---

## Paleta de colores

```
--bg:      #F1F0EB  (crema dominante)
--surface: #E8E7E1
--card:    #E4E2DB
--border:  #D0CEC6
--muted:   #8C8980
--green:   #616652  (botones, progreso, activos)
--red:     #722F15  (SectionLabel, alertas)
--black:   #141414
```

## Estado de páginas

| Página | Estado | Notas clave |
|---|---|---|
| `Splash.jsx` | ✅ | CTA manual → /home |
| `Home.jsx` | ✅ | `h-screen overflow-hidden`; cards AM/PM con imagen+overlay; carousel gadgets |
| `RoutineIntro.jsx` | ✅ | 40px padding; dom/luna SVG; pasos con Lora Light |
| `RoutineStep.jsx` | ✅ | Video Cloudinary; ANTERIOR 30%/SIGUIENTE 70%; checklist en sessionStorage |
| `RoutineComplete.jsx` | ✅ | Framer Motion entrada; dom/luna SVG; botones 50/50 |
| `Gadgets.jsx` | ✅ | Galería 7 gadgets |
| `GadgetDetail.jsx` | ✅ | Ficha individual |
| `Help.jsx` | ✅ | FAQ acordeón; "Reiniciar app" borra todo y va a Splash |
| `Language.jsx` | ✅ | Selector ES/EN |

---

## Arquitectura

### Rutas (`src/App.jsx`)

```
/              → Splash
/home          → Home
/am            → RoutineIntro (routine="am")
/pm            → RoutineIntro (routine="pm")
/am/paso/:n    → RoutineStep  (routine="am", 1-based)
/pm/paso/:n    → RoutineStep  (routine="pm", 1-based)
/am/completa   → RoutineComplete (routine="am")
/pm/completa   → RoutineComplete (routine="pm")
/gadgets       → Gadgets
/gadgets/:id   → GadgetDetail
/ayuda         → Help
/idioma        → Language
```

### Content (`src/data/content.js`)

Single source of truth en `content.es.*`.

**Campos de cada step:**
- Requeridos: `id`, `title`, `tag`, `description`
- Opcionales: `benefits[]`, `steps[]`, `warning`, `appLink`, `video`
- Especiales: `modes[]` (SmartGoggles PM), `temperatures[]` (DockPro), `phases[]` (Hatch), `amenities[]` (am-5, pm-4), `protocol`, `options` (null en pm-3), `pending` (null en pm-5)

**Campo `video`:** URL de Cloudinary. Si es null, RoutineStep usa `VIDEO_DEFAULT` (el video del panel de luz). Al agregar videos individuales, basta con `video: "url"` en el step.

**Campo `image` en amenities:** null por defecto. Al agregar imágenes, poner `image: importedUrl` en el amenity. El mapeo base por nombre está en `AMENITY_IMAGES` dentro de RoutineStep.jsx.

### Estado global (`src/context/AppContext.jsx`)

`useApp()` expone:
- `completedSteps` — persiste en `localStorage` (`wake_completed_steps`)
- `toggleStep(stepId)` / `isCompleted(stepId)` / `getProgress(steps)` / `resetRoutine('am'|'pm')`

**Checklist de sub-pasos:** persiste en `sessionStorage` bajo `wake_checked_{step.id}`. Se limpia al reiniciar app.

**Reiniciar app completo** (Help.jsx): borra `localStorage` + todas las claves `wake_checked_*` de sessionStorage → `window.location.href = '/'`.

### UI Components (`src/components/UI.jsx`)

`ProgressBar` · `SectionLabel` · `Tag` · `BtnPrimary` · `BtnSecondary` · `BtnAppLink` · `WarningBox` · `TipBox` · `CheckItem` · `BenefitItem` · `BackBtn` · `StepHeader` · `BottomNav`

- `ProgressBar` acepta prop `light` para fondo oscuro (texto/barra en blanco).
- `BtnAppLink`: deep links con `window.location.href`; URLs `http*` se abren con `window.open(_blank)`.
- `StepHeader`: sin emoji, título en Lora Light.
- `BenefitItem`: bullet `→` en lugar de punto.

### Deep links

| App | Scheme |
|---|---|
| Therabody | `therabody://` |
| Sleepme | `sleepme://` |
| Hatch Sleep | `hatch://` |
| SILO (web) | `https://linktr.ee/silo.cocina` |

### Assets clave

| Archivo | Uso |
|---|---|
| `WBdia.webp` / `WBnoche.webp` | Fondo tarjetas AM/PM en Home |
| `dom.svg` / `luna.svg` | Ícono AM/PM en BottomNav, RoutineIntro, RoutineComplete |
| `Logo-Bio-Negro.webp` | Header Home |
| `Cold.webp` · `Contraste.webp` · `Suauna-Infrarojo.webp` · `Piscina.webp` | Imágenes amenities |
| `WB-*.webp` | Carousel gadgets Home + ficha GadgetDetail |

## Comportamiento especial

- **am-4 SmartGoggles AM:** `modes: null`; muestra solo appLink Therabody antes del checklist.
- **pm-2 SmartGoggles PM:** tiene `modes[]` con label "Terapias recomendadas".
- **pm-3 Grounding Mat PM:** `options: null` — no muestra "Opciones de uso".
- **pm-5 SILO:** `pending: null`; tiene appLink a linktr.ee (abre en Safari).
- **Home:** `h-screen overflow-hidden` — sin scroll (confirmado que todo cabe en iPad).
- **RoutineStep:** scroll to top automático al cambiar de paso (`window.scrollTo instant`).
