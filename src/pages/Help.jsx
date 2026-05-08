import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { content } from '../data/content'
import { BackBtn, SectionLabel, BottomNav } from '../components/UI'

export default function Help() {
  const navigate = useNavigate()
  const c = content.es.support
  const [open, setOpen] = useState(null)

  const navGo = (id) => {
    const map = { home: '/home', am: '/am', pm: '/pm', gadgets: '/gadgets', help: '/ayuda' }
    navigate(map[id] || '/home')
  }

  return (
    <div className="min-h-screen pb-28" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="px-6 pt-12 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <BackBtn onClick={() => navigate('/home')} />
        <div className="mt-4">
          <div className="font-mono-dm text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--red)' }}>
            Módulo D
          </div>
          <h1 className="font-lora text-3xl font-bold leading-tight mb-1" style={{ color: 'var(--black)' }}>
            {c.title}
          </h1>
          <p className="font-sans text-sm" style={{ color: 'var(--muted)' }}>{c.subtitle}</p>
        </div>
      </div>

      <div className="px-6 pt-6">
        <SectionLabel>Preguntas frecuentes</SectionLabel>
        <div>
          {c.faq.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left py-4 flex items-start justify-between gap-3"
              >
                <span className="font-sans text-sm font-medium" style={{ color: 'var(--black)' }}>
                  {item.q}
                </span>
                <span
                  className="font-mono-dm text-base flex-shrink-0 mt-0.5 transition-transform duration-200"
                  style={{ color: 'var(--muted)', transform: open === i ? 'rotate(45deg)' : 'none' }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="pb-4">
                  <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact reception */}
        <div className="mt-8 space-y-3">
          <button
            className="w-full py-4 font-sans text-sm font-semibold tracking-wider uppercase transition-all duration-200 active:scale-95"
            style={{ background: 'var(--black)', color: '#F1F0EB' }}
            onClick={() => window.location.href = 'tel:+57000000000'}
          >
            📞 {c.contactLabel}
          </button>
          <button
            onClick={() => navigate('/home')}
            className="w-full py-4 font-sans text-sm font-medium tracking-wider uppercase border transition-all duration-200 active:scale-95"
            style={{ background: 'transparent', color: 'var(--muted)', borderColor: 'var(--border)' }}
          >
            {c.backLabel}
          </button>
        </div>

        {/* Reiniciar app — para nuevo huésped */}
        <button
          onClick={() => {
            localStorage.removeItem('wake_completed_steps')
            Object.keys(sessionStorage)
              .filter(k => k.startsWith('wake_checked_'))
              .forEach(k => sessionStorage.removeItem(k))
            window.location.href = '/'
          }}
          className="w-full py-3 font-mono-dm text-[10px] tracking-widest uppercase mt-6"
          style={{ color: 'var(--muted)', borderTop: '1px solid var(--border)' }}
        >
          Reiniciar app
        </button>
      </div>

      <BottomNav active="help" onNav={navGo} />
    </div>
  )
}
