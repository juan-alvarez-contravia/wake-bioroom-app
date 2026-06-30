import { useNavigate } from 'react-router-dom'
import { content } from '../data/content'
import { useApp } from '../context/AppContext'
import { SectionLabel, Tag, BottomNav } from '../components/UI'
import imgMat from '../assets/WB-mat.webp'
import imgLuzBlanca from '../assets/WB-luz-blanca.webp'
import imgAroma from '../assets/WB-aroma.webp'
import imgGafas from '../assets/WB-gafas.webp'
import imgLuzRoja from '../assets/WB-luz-roja.webp'
import imgColchon from '../assets/WB-Colchon.webp'
import imgHatch from '../assets/WB-hatch.webp'

const GADGET_IMAGES = {
  'grounding-mat':    imgMat,
  'circadian-light':  imgLuzBlanca,
  'diffuser':         imgAroma,
  'smartgoggles':     imgGafas,
  'red-light':        imgLuzRoja,
  'dockpro':          imgColchon,
  'hatch':            imgHatch,
}

export default function Gadgets() {
  const navigate = useNavigate()
  const { lang } = useApp()
  const ui = content[lang].ui
  const c = content[lang].gadgets

  const navGo = (id) => {
    const map = { home: '/home', am: '/am', pm: '/pm', gadgets: '/gadgets', help: '/ayuda' }
    navigate(map[id] || '/home')
  }

  return (
    <div className="min-h-screen pb-28" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="px-6 pt-12 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="font-mono-dm text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--red)' }}>
          {ui.gadgetsModule}
        </div>
        <h1 className="font-lora text-3xl font-light leading-tight mb-1" style={{ color: 'var(--black)' }}>
          {c.gallery.title}
        </h1>
        <p className="font-montserrat text-sm" style={{ color: 'var(--muted)' }}>{c.gallery.subtitle}</p>
      </div>

      {/* Gadget cards */}
      <div className="px-6 pt-6 space-y-3">
        <SectionLabel>{ui.gadgetsSection}</SectionLabel>
        {c.items.map(gadget => (
          <button
            key={gadget.id}
            onClick={() => navigate(`/gadgets/${gadget.id}`)}
            className="w-full text-left p-4 flex items-start gap-4 transition-all duration-200 active:scale-[0.98]"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div style={{ width: '56px', height: '56px', flexShrink: 0, overflow: 'hidden', background: '#E8E7E1' }}>
              <img
                src={GADGET_IMAGES[gadget.id]}
                alt={gadget.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-lora text-base font-light mb-0.5" style={{ color: 'var(--black)' }}>
                {gadget.name}
              </div>
              <div className="font-montserrat text-xs mb-2" style={{ color: 'var(--muted)' }}>
                {gadget.tagline}
              </div>
              <div className="flex gap-1 flex-wrap">
                {gadget.tags.map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
            <span className="shrink-0" style={{ color: 'var(--border)' }}>→</span>
          </button>
        ))}
      </div>

      <BottomNav active="gadgets" onNav={navGo} />
    </div>
  )
}
