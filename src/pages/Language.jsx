import { useNavigate } from 'react-router-dom'
import { content } from '../data/content'
import { useApp } from '../context/AppContext'
import { BackBtn, BtnPrimary } from '../components/UI'

const LANGUAGES = [
  { code: 'es', label: 'Español', flag: '🇨🇴' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
]

export default function Language() {
  const navigate = useNavigate()
  const { lang, setLang } = useApp()
  const c = content.es.language

  return (
    <div className="min-h-screen px-6 pt-12 pb-12" style={{ background: 'var(--bg)' }}>
      <BackBtn onClick={() => navigate('/home')} />

      <div className="mt-6 mb-8">
        <h1 className="font-lora text-3xl font-bold leading-tight mb-1" style={{ color: 'var(--black)' }}>
          {c.title}
        </h1>
        <p className="font-sans text-sm" style={{ color: 'var(--muted)' }}>{c.subtitle}</p>
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
            <span className="text-2xl">{l.flag}</span>
            <span className="font-sans text-base font-medium flex-1" style={{ color: 'var(--black)' }}>
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

      <p className="font-sans text-xs mb-6" style={{ color: 'var(--muted)' }}>{c.tip}</p>

      <BtnPrimary onClick={() => navigate('/home')}>Confirmar</BtnPrimary>
    </div>
  )
}
