import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { content } from '../data/content'
import { useApp } from '../context/AppContext'
import { ProgressBar, SectionLabel, BottomNav } from '../components/UI'
import domSvg from '../assets/dom.svg'
import lunaSvg from '../assets/luna.svg'

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

  const secondBtn = completed.buttons.pm
    ? { label: completed.buttons.pm, path: '/pm' }
    : completed.buttons.gadgets
    ? { label: completed.buttons.gadgets, path: '/gadgets' }
    : null

  return (
    <div
      className="min-h-screen flex flex-col pt-16 pb-28"
      style={{ background: 'var(--bg)', paddingLeft: '40px', paddingRight: '40px' }}
    >

      {/* Bloque celebración */}
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="flex-1 flex flex-col items-center justify-center text-center"
      >
        <img
          src={routine === 'am' ? domSvg : lunaSvg}
          alt=""
          style={{ width: '52px', height: '52px', opacity: 0.65, marginBottom: '20px' }}
        />

        <div
          className="font-montserrat text-[10px] tracking-widest uppercase mb-3"
          style={{ color: 'var(--green)' }}
        >
          {prog.done} / {prog.total} pasos completados
        </div>

        <h1
          className="font-lora text-3xl font-light leading-tight mb-3"
          style={{ color: 'var(--black)' }}
        >
          {completed.title}
        </h1>

        <p
          className="font-montserrat text-sm mb-2"
          style={{ color: 'var(--muted)', fontWeight: 400 }}
        >
          {completed.subtitle}
        </p>

        <p
          className="font-montserrat text-sm leading-relaxed max-w-xs"
          style={{ color: 'var(--muted)', fontWeight: 300 }}
        >
          {completed.description}
        </p>

        <div className="w-full mt-8">
          <ProgressBar done={prog.done} total={prog.total} />
        </div>
      </motion.div>

      {/* Resumen de actividades */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="mt-8 mb-6"
      >
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
                  className="font-montserrat "
                  style={{ color: done ? 'var(--black)' : 'var(--muted)' }}
                >
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Acciones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.55 }}
        className="space-y-3"
      >
        {/* 50/50: Inicio | Rutina PM o Gadgets */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/home')}
            className="py-4 font-montserrat text-sm font-medium tracking-wider uppercase transition-all duration-200 active:scale-95"
            style={{ flex: 1, background: 'var(--green)', color: '#F1F0EB' }}
          >
            {completed.buttons.home}
          </button>
          {secondBtn && (
            <button
              onClick={() => navigate(secondBtn.path)}
              className="py-4 font-montserrat text-sm font-medium tracking-wider uppercase transition-all duration-200 active:scale-95 border"
              style={{ flex: 1, background: 'transparent', color: 'var(--muted)', borderColor: 'var(--border)' }}
            >
              {secondBtn.label}
            </button>
          )}
        </div>

        {/* Reiniciar */}
        <button
          onClick={handleReset}
          className="w-full py-3 font-montserrat text-[10px] tracking-widest uppercase"
          style={{ color: 'var(--muted)' }}
        >
          Reiniciar rutina
        </button>
      </motion.div>

      <BottomNav active={routine} onNav={navGo} />
    </div>
  )
}
