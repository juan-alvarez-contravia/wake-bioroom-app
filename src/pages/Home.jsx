import { useNavigate } from 'react-router-dom'
import { content } from '../data/content'
import { useApp } from '../context/AppContext'
import { ProgressBar, BottomNav } from '../components/UI'
import logoBio from '../assets/Logo-Bio-Negro.webp'
import domSvg from '../assets/dom.svg'
import lunaSvg from '../assets/luna.svg'
import gbMat from '../assets/WB-mat.webp'
import gbLuzBlanca from '../assets/WB-luz-blanca.webp'
import gbAroma from '../assets/WB-aroma.webp'
import gbGafas from '../assets/WB-gafas.webp'
import gbLuzRoja from '../assets/WB-luz-roja.webp'
import gbColchon from '../assets/WB-Colchon.webp'
import gbHatch from '../assets/WB-hatch.webp'

const GADGET_CARDS = [
  { id: 'grounding-mat',   name: 'Grounding Mat',  img: gbMat },
  { id: 'circadian-light', name: 'Luz Circadiana', img: gbLuzBlanca },
  { id: 'diffuser',        name: 'Difusor',         img: gbAroma },
  { id: 'smartgoggles',    name: 'SmartGoggles',    img: gbGafas },
  { id: 'red-light',       name: 'Red Light',       img: gbLuzRoja },
  { id: 'dockpro',         name: 'DockPro',         img: gbColchon },
  { id: 'hatch',           name: 'Hatch Clock',     img: gbHatch },
]

export default function Home() {
  const navigate = useNavigate()
  const { getProgress } = useApp()
  const amSteps = content.es.routineAM.steps
  const pmSteps = content.es.routinePM.steps
  const amProg = getProgress(amSteps)
  const pmProg = getProgress(pmSteps)

  const navGo = (id) => {
    const map = { home: '/home', am: '/am', pm: '/pm', gadgets: '/gadgets', help: '/ayuda' }
    navigate(map[id] || '/home')
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--bg)' }}>

      {/* Logo header */}
      <div
        className="flex items-center justify-center py-5"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <img
          src={logoBio}
          alt="Wake BioHotel"
          style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
        />
      </div>

      {/* Hero */}
      <div
        className="pt-8 pb-6"
        style={{ paddingLeft: '40px', paddingRight: '40px', borderBottom: '1px solid var(--border)' }}
      >
        <h1
          className="font-lora text-3xl leading-tight mb-2"
          style={{ color: 'var(--black)', fontWeight: 400 }}
        >
          TU RUTINA DE BIENESTAR EMPIEZA AQUÍ
        </h1>
        <p
          className="text-sm"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, color: 'var(--muted)' }}
        >
          Elige el momento del día para comenzar
        </p>
      </div>

      {/* Main content */}
      <div className="pt-6 space-y-6" style={{ paddingLeft: '40px', paddingRight: '40px' }}>

        {/* AM + PM two-column */}
        <div className="grid grid-cols-2 gap-3">

          {/* ── AM card ── */}
          <button
            onClick={() => navigate('/am')}
            className="text-left p-4 flex flex-col justify-between transition-all duration-200 active:scale-[0.97] relative overflow-hidden"
            style={{ background: 'var(--card)', minHeight: '190px' }}
          >
            {/* Terracota blob 1 — top right */}
            <div
              className="pointer-events-none absolute"
              style={{
                width: '170px', height: '170px',
                top: '-25%', right: '-20%',
                background: 'radial-gradient(circle at 50% 50%, #D4622B 0%, #A84015 55%, transparent 78%)',
                filter: 'blur(42px)',
                opacity: 0.45,
                animation: 'blobAmA 12s ease-in-out infinite',
              }}
            />
            {/* Terracota blob 2 — bottom left */}
            <div
              className="pointer-events-none absolute"
              style={{
                width: '130px', height: '130px',
                bottom: '-15%', left: '-10%',
                background: 'radial-gradient(circle at 50% 50%, #E8834A 0%, #D4622B 55%, transparent 78%)',
                filter: 'blur(36px)',
                opacity: 0.32,
                animation: 'blobAmB 16s ease-in-out infinite',
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              <img
                src={domSvg}
                alt="Mañana"
                style={{
                  width: '28px', height: '28px',
                  opacity: 0.55,
                  marginBottom: '14px',
                }}
              />
              <div
                className="font-lora text-base leading-snug"
                style={{ color: 'var(--black)', fontWeight: 400, marginBottom: '4px' }}
              >
                RUTINA DE LA MAÑANA
              </div>
              <div
                className="font-mono-dm text-[9px] tracking-wider uppercase"
                style={{ color: 'var(--muted)' }}
              >
                5 pasos · 45–60 min
              </div>
            </div>
            <div className="relative z-10 mt-4">
              <ProgressBar done={amProg.done} total={amProg.total} />
            </div>
          </button>

          {/* ── PM card ── */}
          <button
            onClick={() => navigate('/pm')}
            className="text-left p-4 flex flex-col justify-between transition-all duration-200 active:scale-[0.97] relative overflow-hidden"
            style={{ background: 'var(--card)', minHeight: '190px' }}
          >
            {/* Azul rey blob 1 — top right */}
            <div
              className="pointer-events-none absolute"
              style={{
                width: '160px', height: '160px',
                top: '-25%', right: '-20%',
                background: 'radial-gradient(circle at 50% 50%, #1A5CB0 0%, #0D3878 55%, transparent 78%)',
                filter: 'blur(40px)',
                opacity: 0.38,
                animation: 'blobPmA 14s ease-in-out infinite',
              }}
            />
            {/* Azul rey blob 2 — bottom left */}
            <div
              className="pointer-events-none absolute"
              style={{
                width: '120px', height: '120px',
                bottom: '-15%', left: '-10%',
                background: 'radial-gradient(circle at 50% 50%, #2470C8 0%, #1A5CB0 55%, transparent 78%)',
                filter: 'blur(32px)',
                opacity: 0.26,
                animation: 'blobPmB 18s ease-in-out infinite',
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              <img
                src={lunaSvg}
                alt="Noche"
                style={{
                  width: '26px', height: '26px',
                  opacity: 0.50,
                  marginBottom: '14px',
                }}
              />
              <div
                className="font-lora text-base leading-snug"
                style={{ color: 'var(--black)', fontWeight: 400, marginBottom: '4px' }}
              >
                RUTINA EN LA NOCHE
              </div>
              <div
                className="font-mono-dm text-[9px] tracking-wider uppercase"
                style={{ color: 'var(--muted)' }}
              >
                7 pasos · 60–90 min
              </div>
            </div>
            <div className="relative z-10 mt-4">
              <ProgressBar done={pmProg.done} total={pmProg.total} />
            </div>
          </button>
        </div>

        {/* Gadgets carousel */}
        <div>
          <div
            className="font-mono-dm text-[10px] tracking-widest uppercase mb-3"
            style={{ color: 'var(--muted)' }}
          >
            Gadgets de la BioRoom
          </div>
          <div
            className="flex gap-3 pb-1"
            style={{
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {GADGET_CARDS.map(g => (
              <button
                key={g.id}
                onClick={() => navigate(`/gadgets/${g.id}`)}
                className="shrink-0 flex flex-col overflow-hidden transition-all duration-200 active:scale-[0.97]"
                style={{
                  width: '120px',
                  scrollSnapAlign: 'start',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ height: '96px', overflow: 'hidden' }}>
                  <img
                    src={g.img}
                    alt={g.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="px-2 py-2">
                  <div
                    className="font-mono-dm text-[9px] tracking-wide uppercase leading-tight"
                    style={{ color: 'var(--black)' }}
                  >
                    {g.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Total progress */}
        <div className="pt-1 pb-1">
          <div
            className="font-mono-dm text-[10px] tracking-widest uppercase mb-3"
            style={{ color: 'var(--muted)' }}
          >
            Actividades de bienestar realizadas
          </div>
          <ProgressBar
            done={amProg.done + pmProg.done}
            total={amProg.total + pmProg.total}
          />
        </div>

        {/* Help link */}
        <button
          onClick={() => navigate('/ayuda')}
          className="w-full py-3 flex items-center justify-center font-mono-dm text-[10px] tracking-widest uppercase transition-all duration-200 active:scale-[0.98]"
          style={{ color: 'var(--muted)', borderTop: '1px solid var(--border)' }}
        >
          ¿Necesitas ayuda?
        </button>
      </div>

      <BottomNav active="home" onNav={navGo} />

      {/* Blob keyframe animations — scoped to this page */}
      <style>{`
        @keyframes blobAmA {
          0%, 100% {
            border-radius: 62% 38% 34% 66% / 58% 32% 68% 42%;
            transform: translate(0, 0) scale(1);
          }
          30% {
            border-radius: 42% 58% 62% 38% / 44% 66% 34% 56%;
            transform: translate(-12%, 14%) scale(1.08);
          }
          65% {
            border-radius: 55% 45% 38% 62% / 62% 38% 58% 42%;
            transform: translate(8%, -16%) scale(0.92);
          }
        }
        @keyframes blobAmB {
          0%, 100% {
            border-radius: 48% 52% 44% 56% / 42% 62% 38% 58%;
            transform: translate(0, 0) scale(1);
          }
          40% {
            border-radius: 66% 34% 56% 44% / 58% 42% 62% 38%;
            transform: translate(18%, -10%) scale(1.12);
          }
          75% {
            border-radius: 34% 66% 48% 52% / 66% 34% 54% 46%;
            transform: translate(-10%, 18%) scale(0.88);
          }
        }
        @keyframes blobPmA {
          0%, 100% {
            border-radius: 55% 45% 35% 65% / 55% 35% 65% 45%;
            transform: translate(0, 0) scale(1);
          }
          35% {
            border-radius: 45% 55% 65% 35% / 45% 65% 35% 55%;
            transform: translate(-10%, 12%) scale(1.06);
          }
          70% {
            border-radius: 65% 35% 45% 55% / 65% 45% 55% 35%;
            transform: translate(10%, -14%) scale(0.94);
          }
        }
        @keyframes blobPmB {
          0%, 100% {
            border-radius: 45% 55% 55% 45% / 55% 45% 55% 45%;
            transform: translate(0, 0) scale(1);
          }
          45% {
            border-radius: 55% 45% 35% 65% / 45% 65% 45% 55%;
            transform: translate(16%, -8%) scale(1.14);
          }
          80% {
            border-radius: 35% 65% 55% 45% / 65% 35% 55% 45%;
            transform: translate(-8%, 16%) scale(0.86);
          }
        }
      `}</style>
    </div>
  )
}
