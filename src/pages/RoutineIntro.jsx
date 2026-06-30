import { useNavigate } from 'react-router-dom'
import { content } from '../data/content'
import { useApp } from '../context/AppContext'
import { BtnPrimary, BtnSecondary, ProgressBar, BackBtn, SectionLabel, BottomNav } from '../components/UI'
import domSvg from '../assets/dom.svg'
import lunaSvg from '../assets/luna.svg'

export default function RoutineIntro({ routine }) {
  const navigate = useNavigate()
  const { lang, getProgress, isCompleted } = useApp()
  const ui = content[lang].ui
  const routineData = routine === 'am' ? content[lang].routineAM : content[lang].routinePM
  const { intro, steps } = routineData
  const prog = getProgress(steps)

  const navGo = (id) => {
    const map = { home: '/home', am: '/am', pm: '/pm', gadgets: '/gadgets', help: '/ayuda' }
    navigate(map[id] || '/home')
  }

  return (
    <div className="min-h-screen pb-28" style={{ background: 'var(--bg)' }}>

      {/* Header */}
      <div
        className="pt-12 pb-6"
        style={{ paddingLeft: '40px', paddingRight: '40px', borderBottom: '1px solid var(--border)' }}
      >
        <BackBtn onClick={() => navigate('/home')} />
        <div className="mt-6">
          <img
            src={routine === 'am' ? domSvg : lunaSvg}
            alt={routine}
            style={{ width: '30px', height: '30px', opacity: 0.55, marginBottom: '14px' }}
          />
          <h1
            className="font-lora text-3xl font-light leading-tight mb-2"
            style={{ color: 'var(--black)' }}
          >
            {intro.title}
          </h1>
          <p
            className="text-xs tracking-wide mb-4"
            style={{ color: 'var(--muted)', fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
          >
            {intro.subtitle}
          </p>
          <p className="font-montserrat text-sm leading-relaxed mb-5" style={{ color: 'var(--muted)' }}>
            {intro.description}
          </p>
          <ProgressBar done={prog.done} total={prog.total} />
        </div>
      </div>

      {/* Steps list */}
      <div className="pt-6 space-y-2" style={{ paddingLeft: '40px', paddingRight: '40px' }}>
        <SectionLabel>{ui.startSection}</SectionLabel>
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
                className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0 text-xs"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  background: done ? 'var(--green)' : 'var(--card)',
                  color: done ? '#F1F0EB' : 'var(--muted)',
                }}
              >
                {done ? '✓' : i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="font-lora-subtitulo font-light text-sm leading-snug mb-0.5"
                  style={{ color: 'var(--black)' }}
                >
                  {step.title}
                </div>
                <div
                  className="text-[9px] tracking-wide truncate"
                  style={{ color: 'var(--muted)', fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                >
                  {step.tag}
                </div>
              </div>
              <span style={{ color: 'var(--muted)' }}>→</span>
            </button>
          )
        })}
      </div>

      {/* CTA */}
      <div className="pt-6 space-y-3" style={{ paddingLeft: '40px', paddingRight: '40px' }}>
        <BtnPrimary onClick={() => navigate(`/${routine}/paso/1`)}>
          {prog.done === 0 ? intro.cta : ui.continueRoutine}
        </BtnPrimary>
        {prog.done === prog.total && prog.total > 0 && (
          <BtnSecondary onClick={() => navigate(`/${routine}/completa`)}>
            {ui.viewSummary}
          </BtnSecondary>
        )}
      </div>

      <BottomNav active={routine} onNav={navGo} />
    </div>
  )
}
