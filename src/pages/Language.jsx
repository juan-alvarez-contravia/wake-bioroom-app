import { useNavigate } from 'react-router-dom'
import { content } from '../data/content'
import { useApp } from '../context/AppContext'
import { BackBtn, BtnPrimary, BottomNav } from '../components/UI'

const LANGUAGES = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
]

export default function Language() {
  const navigate = useNavigate()
  const { lang, setLang } = useApp()
  const c = content[lang].language
  const ui = content[lang].ui

  const navGo = (id) => {
    const map = { home: '/home', am: '/am', pm: '/pm', gadgets: '/gadgets', help: '/ayuda' }
    navigate(map[id] || '/home')
  }

  return (
    <div className="min-h-screen px-6 pt-12 pb-28" style={{ background: 'var(--bg)' }}>
      <BackBtn onClick={() => navigate('/home')} />

      <div className="mt-6 mb-8">
        <h1 className="font-lora text-3xl font-bold leading-tight mb-1" style={{ color: 'var(--black)' }}>
          {c.title}
        </h1>
        <p className="font-montserrat text-sm" style={{ color: 'var(--muted)' }}>{c.subtitle}</p>
      </div>

      <div className="space-y-3 mb-8">
        {LANGUAGES.map(l => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className="w-full flex items-center gap-4 p-4 text-left transition-all duration-200 active:scale-[0.98]"
            style={{
              background: lang === l.code ? 'var(--surface)' : 'transparent',
              border: `1px solid ${lang === l.code ? 'var(--green)' : 'var(--border)'}`,
            }}
          >
            <span className="font-montserrat text-base font-medium flex-1" style={{ color: 'var(--black)' }}>
              {l.label}
            </span>
            {lang === l.code && (
              <div
                className="w-5 h-5 rounded-sm flex items-center justify-center"
                style={{ background: 'var(--green)' }}
              >
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>

      <p className="font-montserrat text-xs mb-6" style={{ color: 'var(--muted)' }}>{c.tip}</p>

      <BtnPrimary onClick={() => navigate('/home')}>{ui.confirmLang}</BtnPrimary>

      <BottomNav active="home" onNav={navGo} />
    </div>
  )
}
