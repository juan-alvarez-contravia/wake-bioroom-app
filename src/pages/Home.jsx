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
      <div className="pt-8 pb-6" style={{ paddingLeft: '40px', paddingRight: '40px', borderBottom: '1px solid var(--border)' }}>
        <h1
          className="font-lora text-3xl leading-tight mb-2"
          style={{ color: 'var(--black)', fontWeight: 400 }}
        >
          Tu rutina de bienestar comienza aquí
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
          {/* AM */}
          <button
            onClick={() => navigate('/am')}
            className="text-left p-4 flex flex-col justify-between transition-all duration-200 active:scale-[0.97]"
            style={{ background: 'var(--green)', minHeight: '190px' }}
          >
            <div>
              <img
                src={domSvg}
                alt="Mañana"
                style={{
                  width: '28px',
                  height: '28px',
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.85,
                  marginBottom: '14px',
                }}
              />
              <div
                className="font-lora text-base leading-snug"
                style={{ color: '#F1F0EB', fontWeight: 600, marginBottom: '4px' }}
              >
                Rutina de la Mañana
              </div>
              <div
                className="font-mono-dm text-[9px] tracking-wider uppercase"
                style={{ color: 'rgba(241,240,235,0.55)' }}
              >
                5 pasos · 45–60 min
              </div>
            </div>
            <div className="mt-4">
              <ProgressBar done={amProg.done} total={amProg.total} light />
            </div>
          </button>

          {/* PM */}
          <button
            onClick={() => navigate('/pm')}
            className="text-left p-4 flex flex-col justify-between transition-all duration-200 active:scale-[0.97]"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', minHeight: '190px' }}
          >
            <div>
              <img
                src={lunaSvg}
                alt="Noche"
                style={{
                  width: '26px',
                  height: '26px',
                  opacity: 0.45,
                  marginBottom: '14px',
                }}
              />
              <div
                className="font-lora text-base leading-snug"
                style={{ color: 'var(--black)', fontWeight: 600, marginBottom: '4px' }}
              >
                Rutina de la Noche
              </div>
              <div
                className="font-mono-dm text-[9px] tracking-wider uppercase"
                style={{ color: 'var(--muted)' }}
              >
                7 pasos · 60–90 min
              </div>
            </div>
            <div className="mt-4">
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
    </div>
  )
}
