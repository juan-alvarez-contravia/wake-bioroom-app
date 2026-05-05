import { useNavigate } from 'react-router-dom'
import { content } from '../data/content'
import { useApp } from '../context/AppContext'
import { BtnPrimary, BtnSecondary, ProgressBar, SectionLabel, BottomNav } from '../components/UI'

export default function RoutineComplete({ routine }) {
  const navigate = useNavigate()
  const { getProgress, resetRoutine, isCompleted } = useApp()

  const navGo = (id) => {
    const map = { home: '/home', am: '/am', pm: '/pm', gadgets: '/gadgets', help: '/ayuda' }
    navigate(map[id] || '/home')
  }
  const routineData = routine === 'am' ? content.es.routineAM : content.es.routinePM
  const { completed, steps } = routineData
  const prog = getProgress(steps)

  const handleReset = () => {
    resetRoutine(routine)
    navigate(`/${routine}`)
  }

  return (
    <div className="min-h-screen flex flex-col px-6 pt-16 pb-28" style={{ background: 'var(--bg)' }}>
      {/* Celebration block */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-5xl mb-6">{routine === 'am' ? '☀️' : '🌙'}</div>
        <div className="font-mono-dm text-[10px] tracking-widest uppercase mb-3" style={{ color: 'var(--green)' }}>
          {prog.done} / {prog.total} pasos completados
        </div>
        <h1 className="font-lora text-3xl font-bold leading-tight mb-3" style={{ color: 'var(--black)' }}>
          {completed.title}
        </h1>
        <p className="font-sans text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>
          {completed.subtitle}
        </p>
        <p className="font-sans text-sm leading-relaxed max-w-xs" style={{ color: 'var(--muted)' }}>
          {completed.description}
        </p>

        <div className="w-full mt-8">
          <ProgressBar done={prog.done} total={prog.total} />
        </div>

        {completed.tip && (
          <div
            className="w-full mt-6 px-4 py-3 text-sm leading-relaxed text-left"
            style={{ borderLeft: '3px solid var(--green)', background: 'var(--surface)', color: 'var(--muted)' }}
          >
            💡 {completed.tip}
          </div>
        )}
      </div>

      {/* Step summary */}
      <div className="mt-8 mb-6">
        <SectionLabel>Resumen</SectionLabel>
        <div>
          {steps.map(step => {
            const done = isCompleted(step.id)
            return (
              <div
                key={step.id}
                className="flex items-center gap-3 py-2"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <div
                  className="w-5 h-5 rounded-sm flex items-center justify-center flex-shrink-0"
                  style={{ background: done ? 'var(--green)' : 'var(--border)' }}
                >
                  {done && <span className="text-white text-xs">✓</span>}
                </div>
                <span
                  className="text-sm font-sans"
                  style={{ color: done ? 'var(--black)' : 'var(--muted)' }}
                >
                  {step.icon} {step.title}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <BtnPrimary onClick={() => navigate('/home')}>
          {completed.buttons.home}
        </BtnPrimary>
        {completed.buttons.pm && (
          <BtnSecondary onClick={() => navigate('/pm')}>
            {completed.buttons.pm}
          </BtnSecondary>
        )}
        {completed.buttons.gadgets && (
          <BtnSecondary onClick={() => navigate('/gadgets')}>
            {completed.buttons.gadgets}
          </BtnSecondary>
        )}
        <button
          onClick={handleReset}
          className="w-full py-3 font-mono-dm text-[10px] tracking-widest uppercase"
          style={{ color: 'var(--muted)' }}
        >
          Reiniciar rutina
        </button>
      </div>

      <BottomNav active={routine} onNav={navGo} />
    </div>
  )
}
