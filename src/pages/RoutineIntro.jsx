import { useNavigate } from 'react-router-dom'
import { content } from '../data/content'
import { useApp } from '../context/AppContext'
import { BtnPrimary, BtnSecondary, ProgressBar, BackBtn, SectionLabel, BottomNav } from '../components/UI'

export default function RoutineIntro({ routine }) {
  const navigate = useNavigate()
  const { getProgress, isCompleted } = useApp()
  const routineData = routine === 'am' ? content.es.routineAM : content.es.routinePM
  const { intro, steps } = routineData
  const prog = getProgress(steps)

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
            {routine === 'am' ? 'Módulo A · Mañana' : 'Módulo B · Noche'}
          </div>
          <h1 className="font-lora text-3xl font-bold leading-tight mb-2" style={{ color: 'var(--black)' }}>
            {intro.title}
          </h1>
          <p className="font-mono-dm text-[11px] tracking-wide mb-4" style={{ color: 'var(--muted)' }}>
            {intro.subtitle}
          </p>
          <p className="font-sans text-sm leading-relaxed mb-5" style={{ color: 'var(--muted)' }}>
            {intro.description}
          </p>
          <ProgressBar done={prog.done} total={prog.total} />
        </div>
      </div>

      {/* Steps list */}
      <div className="px-6 pt-6 space-y-2">
        <SectionLabel>Pasos de la rutina</SectionLabel>
        {steps.map((step, i) => {
          const done = isCompleted(step.id)
          return (
            <button
              key={step.id}
              onClick={() => navigate(`/${routine}/paso/${i + 1}`)}
              className="w-full flex items-center gap-4 p-4 text-left transition-all duration-200 active:scale-[0.98]"
              style={{
                background: 'var(--surface)',
                border: `1px solid ${done ? 'var(--green)' : 'var(--border)'}`,
              }}
            >
              <div
                className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 font-mono-dm text-[11px]"
                style={{
                  background: done ? 'var(--green)' : 'var(--card)',
                  color: done ? '#F1F0EB' : 'var(--muted)',
                }}
              >
                {done ? '✓' : i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span>{step.icon}</span>
                  <span className="font-sans text-sm font-medium" style={{ color: 'var(--black)' }}>
                    {step.title}
                  </span>
                </div>
                <div className="font-mono-dm text-[9px] tracking-wide mt-0.5 truncate" style={{ color: 'var(--muted)' }}>
                  {step.tag}
                </div>
              </div>
              <span style={{ color: 'var(--border)' }}>→</span>
            </button>
          )
        })}
      </div>

      {/* CTA */}
      <div className="px-6 pt-6 space-y-3">
        <BtnPrimary onClick={() => navigate(`/${routine}/paso/1`)}>
          {prog.done === 0 ? intro.cta : 'Continuar Rutina'}
        </BtnPrimary>
        {prog.done === prog.total && prog.total > 0 && (
          <BtnSecondary onClick={() => navigate(`/${routine}/completa`)}>
            Ver resumen completo
          </BtnSecondary>
        )}
      </div>

      <BottomNav active={routine} onNav={navGo} />
    </div>
  )
}
