import { useNavigate } from 'react-router-dom'
import { content } from '../data/content'
import { SectionLabel, Tag, BottomNav } from '../components/UI'

export default function Gadgets() {
  const navigate = useNavigate()
  const c = content.es.gadgets

  const navGo = (id) => {
    const map = { home: '/home', am: '/am', pm: '/pm', gadgets: '/gadgets', help: '/ayuda' }
    navigate(map[id] || '/home')
  }

  return (
    <div className="min-h-screen pb-28" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="px-6 pt-12 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="font-mono-dm text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--red)' }}>
          Módulo C
        </div>
        <h1 className="font-lora text-3xl font-bold leading-tight mb-1" style={{ color: 'var(--black)' }}>
          {c.gallery.title}
        </h1>
        <p className="font-sans text-sm" style={{ color: 'var(--muted)' }}>{c.gallery.subtitle}</p>
      </div>

      {/* Gadget cards */}
      <div className="px-6 pt-6 space-y-3">
        <SectionLabel>Tecnologías disponibles</SectionLabel>
        {c.items.map(gadget => (
          <button
            key={gadget.id}
            onClick={() => navigate(`/gadgets/${gadget.id}`)}
            className="w-full text-left p-4 flex items-start gap-4 transition-all duration-200 active:scale-[0.98]"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <span className="text-3xl flex-shrink-0">{gadget.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="font-lora text-base font-semibold mb-0.5" style={{ color: 'var(--black)' }}>
                {gadget.name}
              </div>
              <div className="font-sans text-xs mb-2" style={{ color: 'var(--muted)' }}>
                {gadget.tagline}
              </div>
              <div className="flex gap-1 flex-wrap">
                {gadget.tags.map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
            <span className="flex-shrink-0" style={{ color: 'var(--border)' }}>→</span>
          </button>
        ))}
      </div>

      <BottomNav active="gadgets" onNav={navGo} />
    </div>
  )
}
