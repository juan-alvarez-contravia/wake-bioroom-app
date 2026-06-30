import { useNavigate } from 'react-router-dom'
import { content } from '../data/content'
import { useApp } from '../context/AppContext'
import { ProgressBar, BottomNav } from '../components/UI'
import logoBio from '../assets/Logo-Bio-Negro.webp'
import domSvg from '../assets/dom.svg'
import lunaSvg from '../assets/luna.svg'
import wbDiaImg from '../assets/WBdia.webp'
import wbNocheImg from '../assets/WBnoche.webp'
import gbMat from '../assets/WB-mat.webp'
import gbLuzBlanca from '../assets/WB-luz-blanca.webp'
import gbAroma from '../assets/WB-aroma.webp'
import gbGafas from '../assets/WB-gafas.webp'
import gbLuzRoja from '../assets/WB-luz-roja.webp'
import gbColchon from '../assets/WB-Colchon.webp'
import gbHatch from '../assets/WB-hatch.webp'

const GADGET_CARDS = [
  { id: 'grounding-mat',   name: 'Grounding Mat',  img: gbMat },
  { id: 'circadian-light', name: 'Circadian Light Panel', img: gbLuzBlanca },
  { id: 'diffuser',        name: 'Oil Diffuser',          img: gbAroma },
  { id: 'smartgoggles',    name: 'SmartGoggles',    img: gbGafas },
  { id: 'red-light',       name: 'Red Light',       img: gbLuzRoja },
  { id: 'dockpro',         name: 'DockPro',         img: gbColchon },
  { id: 'hatch',           name: 'Hatch Clock',     img: gbHatch },
]

const ICON_WHITE = 'brightness(0) invert(1)'

export default function Home() {
  const navigate = useNavigate()
  const { lang, getProgress } = useApp()
  const ui = content[lang].ui
  const amSteps = content[lang].routineAM.steps
  const pmSteps = content[lang].routinePM.steps
  const amProg = getProgress(amSteps)
  const pmProg = getProgress(pmSteps)

  const navGo = (id) => {
    const map = { home: '/home', am: '/am', pm: '/pm', gadgets: '/gadgets', help: '/ayuda' }
    navigate(map[id] || '/home')
  }

  return (
    <div className="h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>

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
          {ui.heroTitle}
        </h1>
        <p
          className="text-sm"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, color: 'var(--muted)' }}
        >
          {ui.heroSubtitle}
        </p>
      </div>

      {/* Main content */}
      <div className="pt-6 space-y-6" style={{ paddingLeft: '40px', paddingRight: '40px' }}>

        {/* AM + PM two-column */}
        <div className="grid grid-cols-2 gap-3">

          {/* ── AM card ── */}
          <button
            onClick={() => navigate('/am')}
            className="p-4 flex flex-col justify-between text-left transition-all duration-200 active:scale-[0.97] relative overflow-hidden"
            style={{ minHeight: '210px' }}
          >
            <img
              src={wbDiaImg}
              alt=""
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ objectFit: 'cover', objectPosition: 'center center' }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'rgba(10,10,10,0.42)' }}
            />
            <div className="relative z-10">
              <img
                src={domSvg}
                alt=""
                style={{
                  width: '26px', height: '26px',
                  filter: ICON_WHITE,
                  opacity: 0.85,
                  marginBottom: '12px',
                }}
              />
              <div
                className="font-lora text-sm leading-snug mb-1"
                style={{ color: '#F1F0EB', fontWeight: 300 }}
              >
                {ui.amCardTitle}
              </div>
              <div
                className="font-montserrat text-[9px] tracking-wider uppercase"
                style={{ color: 'rgba(241,240,235,0.65)' }}
              >
                {ui.amDuration}
              </div>
            </div>
            <div className="relative z-10 w-full">
              <ProgressBar done={amProg.done} total={amProg.total} light />
            </div>
          </button>

          {/* ── PM card ── */}
          <button
            onClick={() => navigate('/pm')}
            className="p-4 flex flex-col justify-between text-left transition-all duration-200 active:scale-[0.97] relative overflow-hidden"
            style={{ minHeight: '210px' }}
          >
            <img
              src={wbNocheImg}
              alt=""
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ objectFit: 'cover', objectPosition: 'center center' }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'rgba(10,10,10,0.42)' }}
            />
            <div className="relative z-10">
              <img
                src={lunaSvg}
                alt=""
                style={{
                  width: '24px', height: '24px',
                  filter: ICON_WHITE,
                  opacity: 0.85,
                  marginBottom: '12px',
                }}
              />
              <div
                className="font-lora text-sm leading-snug mb-1"
                style={{ color: '#F1F0EB', fontWeight: 400 }}
              >
                {ui.pmCardTitle}
              </div>
              <div
                className="font-montserrat text-[9px] tracking-wider uppercase"
                style={{ color: 'rgba(241,240,235,0.65)' }}
              >
                {ui.pmDuration}
              </div>
            </div>
            <div className="relative z-10 w-full">
              <ProgressBar done={pmProg.done} total={pmProg.total} light />
            </div>
          </button>

        </div>

        {/* Gadgets carousel */}
        <div>
          <div
            className="font-montserrat text-[10px] tracking-widest uppercase mb-3"
            style={{ color: 'var(--muted)' }}
          >
            {ui.gadgetsLabel}
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
                    className="font-montserrat text-[9px] tracking-wide uppercase leading-tight"
                    style={{ color: 'var(--black)', fontWeight: 400 }}
                  >
                    {g.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CTA Complementos */}
        <div
          className="flex items-center justify-between p-4"
          style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
        >
          <p className="font-montserrat text-sm leading-snug" style={{ color: 'var(--black)', maxWidth: '62%' }}>
            <span style={{ fontWeight: 600 }}>{ui.ctaTitle}</span> {ui.ctaText}
          </p>
          <button
            onClick={() => navigate('/complementos')}
            className="font-mono-dm text-[10px] tracking-widest uppercase px-4 py-2 transition-all active:scale-95 shrink-0"
            style={{ background: 'var(--green)', color: '#F1F0EB' }}
          >
            {ui.ctaBtn}
          </button>
        </div>

        {/* Total progress */}
        <div className="pt-1 pb-1">
          <div
            className="font-montserrat text-[10px] tracking-widest uppercase mb-3"
            style={{ color: '#000' }}
          >
            {ui.progressLabel}
          </div>
          <ProgressBar
            done={amProg.done + pmProg.done}
            total={amProg.total + pmProg.total}
          />
        </div>

        {/* Links: help + language */}
        <div className="flex items-center justify-between" style={{ borderTop: '1px solid var(--border)' }}>
          <button
            onClick={() => navigate('/ayuda')}
            className="py-3 font-mono-dm text-[10px] tracking-widest uppercase transition-all duration-200 active:scale-[0.98]"
            style={{ color: 'var(--muted)' }}
          >
            {ui.helpLink}
          </button>
          <button
            onClick={() => navigate('/idioma')}
            className="py-3 font-mono-dm text-[10px] tracking-widest uppercase transition-all duration-200 active:scale-[0.98]"
            style={{ color: 'var(--muted)' }}
          >
            {ui.languageLink}
          </button>
        </div>
      </div>

      <BottomNav active="home" onNav={navGo} />
    </div>
  )
}
