import { content } from '../data/content'
import { useApp } from '../context/AppContext'
import { ProgressBar } from '../components/UI'

export default function Home({ onNav }) {
  const c = content.es.home
  const { getProgress } = useApp()
  const amSteps = content.es.routineAM.steps
  const pmSteps = content.es.routinePM.steps
  const amProg = getProgress(amSteps)
  const pmProg = getProgress(pmSteps)

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="px-6 pt-14 pb-8" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="font-mono-dm text-[10px] tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>
          Wake BioHotel · BioRoom
        </div>
        <h1 className="font-lora text-3xl font-bold leading-tight mb-2" style={{ color: 'var(--black)' }}>
          {c.title}
        </h1>
        <p className="font-sans text-sm" style={{ color: 'var(--muted)' }}>{c.subtitle}</p>
      </div>

      <div className="px-6 pt-6 space-y-3">
        {/* AM Card */}
        <button
          onClick={() => onNav('am')}
          className="w-full text-left p-5 transition-all duration-200 active:scale-[0.98]"
          style={{ background: 'var(--green)', color: '#F1F0EB' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="font-mono-dm text-[9px] tracking-widest uppercase mb-2 opacity-70">
                Módulo A
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">☀️</span>
                <h2 className="font-lora text-xl font-bold">Rutina de Mañana</h2>
              </div>
              <p className="font-sans text-xs opacity-70 mt-1">⏱ 45–60 min · 6am–9am</p>
            </div>
            <span className="text-2xl opacity-50">→</span>
          </div>
          <ProgressBar done={amProg.done} total={amProg.total} />
        </button>

        {/* PM Card */}
        <button
          onClick={() => onNav('pm')}
          className="w-full text-left p-5 transition-all duration-200 active:scale-[0.98]"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="font-mono-dm text-[9px] tracking-widest uppercase mb-2" style={{ color: 'var(--muted)' }}>
                Módulo B
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🌙</span>
                <h2 className="font-lora text-xl font-bold" style={{ color: 'var(--black)' }}>Rutina de Noche</h2>
              </div>
              <p className="font-sans text-xs mt-1" style={{ color: 'var(--muted)' }}>⏱ 60–90 min · 5pm–9pm</p>
            </div>
            <span className="text-2xl" style={{ color: 'var(--border)' }}>→</span>
          </div>
          <ProgressBar done={pmProg.done} total={pmProg.total} />
        </button>

        {/* Gadgets + Help row */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNav('gadgets')}
            className="p-4 text-left transition-all duration-200 active:scale-[0.98]"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="text-xl mb-2">🔬</div>
            <div className="font-lora text-sm font-semibold mb-1" style={{ color: 'var(--black)' }}>Mis Gadgets</div>
            <div className="font-mono-dm text-[9px] tracking-wider uppercase" style={{ color: 'var(--muted)' }}>7 tecnologías</div>
          </button>
          <button
            onClick={() => onNav('help')}
            className="p-4 text-left transition-all duration-200 active:scale-[0.98]"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="text-xl mb-2">❓</div>
            <div className="font-lora text-sm font-semibold mb-1" style={{ color: 'var(--black)' }}>Ayuda</div>
            <div className="font-mono-dm text-[9px] tracking-wider uppercase" style={{ color: 'var(--muted)' }}>Soporte 24/7</div>
          </button>
        </div>

        {/* Today's total progress */}
        <div className="pt-2 pb-2">
          <div className="font-mono-dm text-[10px] tracking-widest uppercase mb-3" style={{ color: 'var(--muted)' }}>
            Progreso total del día
          </div>
          <ProgressBar
            done={amProg.done + pmProg.done}
            total={amProg.total + pmProg.total}
          />
        </div>
      </div>
    </div>
  )
}
