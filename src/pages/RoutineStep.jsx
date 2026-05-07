import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { content } from '../data/content'
import { useApp } from '../context/AppContext'
import {
  StepHeader, BenefitItem, CheckItem, WarningBox,
  BtnPrimary, BtnSecondary, BtnAppLink, SectionLabel, Tag, BottomNav,
} from '../components/UI'

const VIDEO_DEFAULT = 'https://res.cloudinary.com/dn0t6obmx/video/upload/q_auto/f_auto/v1778181612/VideoPanelLuz_iapxga.mov'

export default function RoutineStep({ routine }) {
  const navigate = useNavigate()
  const { step: stepParam } = useParams()
  const { toggleStep, isCompleted } = useApp()

  const steps = routine === 'am' ? content.es.routineAM.steps : content.es.routinePM.steps
  const stepIndex = parseInt(stepParam, 10) - 1
  const step = steps[stepIndex]

  const navGo = (id) => {
    const map = { home: '/home', am: '/am', pm: '/pm', gadgets: '/gadgets', help: '/ayuda' }
    navigate(map[id] || '/home')
  }

  const [checked, setChecked] = useState({})
  const toggleChecked = (i) => setChecked(prev => ({ ...prev, [i]: !prev[i] }))

  if (!step) {
    navigate(`/${routine}`)
    return null
  }

  const done = isCompleted(step.id)
  const isFirst = stepIndex === 0
  const isLast = stepIndex === steps.length - 1
  const goBack = () => navigate(`/${routine}/paso/${stepIndex}`)
  const goNext = () => isLast ? navigate(`/${routine}/completa`) : navigate(`/${routine}/paso/${stepIndex + 2}`)

  return (
    <div className="min-h-screen pb-28" style={{ background: 'var(--bg)' }}>

      {/* Navegación superior */}
      <div className="pt-12 pb-6" style={{ paddingLeft: '40px', paddingRight: '40px' }}>
        <div className="flex items-center justify-between">
          {!isFirst ? (
            <button
              onClick={goBack}
              className="font-mono-dm text-[11px] tracking-widest uppercase py-2"
              style={{ color: 'var(--muted)' }}
            >
              ← Paso anterior
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={() => navigate(`/${routine}`)}
            className="font-mono-dm text-[11px] tracking-widest uppercase py-2"
            style={{ color: 'var(--muted)' }}
          >
            Ver todos los pasos →
          </button>
        </div>
        <div className="mt-4">
          <StepHeader step={stepIndex + 1} total={steps.length} title={step.title} tag={step.tag} />
        </div>
      </div>

      {/* Video */}
      <div style={{ paddingLeft: '40px', paddingRight: '40px', marginBottom: '24px' }}>
        <video
          src={step.video || VIDEO_DEFAULT}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', display: 'block', aspectRatio: '16/9', background: 'var(--black)' }}
        />
      </div>

      {/* Contenido del paso */}
      <div className="space-y-6" style={{ paddingLeft: '40px', paddingRight: '40px' }}>

        {/* Descripción */}
        <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          {step.description}
        </p>

        {/* Pending note (SILO pm-5) */}
        {step.pending && (
          <div
            className="px-4 py-3 text-sm leading-relaxed italic"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}
          >
            {step.pending}
          </div>
        )}

        {/* Modos disponibles (SmartGoggles) */}
        {step.modes && (
          <div>
            <SectionLabel>Modos disponibles</SectionLabel>
            <div className="space-y-2">
              {step.modes.map(m => (
                <div
                  key={m.name}
                  className="p-3"
                  style={{
                    background: m.recommended ? 'var(--surface)' : 'transparent',
                    border: `1px solid ${m.recommended ? 'var(--green)' : 'var(--border)'}`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-sans text-sm font-semibold" style={{ color: 'var(--black)' }}>{m.name}</span>
                    {m.recommended && <Tag color="green">Recomendado</Tag>}
                  </div>
                  <p className="font-sans text-xs" style={{ color: 'var(--muted)' }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Temperaturas (DockPro) */}
        {step.temperatures && (
          <div>
            <SectionLabel>Temperaturas</SectionLabel>
            <div className="space-y-2">
              {step.temperatures.map(t => (
                <div
                  key={t.range}
                  className="p-3 flex items-center gap-4"
                  style={{
                    background: t.recommended ? 'var(--surface)' : 'transparent',
                    border: `1px solid ${t.recommended ? 'var(--green)' : 'var(--border)'}`,
                  }}
                >
                  <div className="font-mono-dm text-lg font-medium" style={{ color: t.recommended ? 'var(--green)' : 'var(--muted)' }}>
                    {t.range}
                  </div>
                  <div className="flex-1">
                    <div className="font-sans text-sm font-medium" style={{ color: 'var(--black)' }}>{t.label}</div>
                    {t.desc && <div className="font-sans text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{t.desc}</div>}
                    {t.recommended && <div className="mt-1"><Tag color="green">Recomendado</Tag></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fases (Hatch) */}
        {step.phases && (
          <div>
            <SectionLabel>Fases de la noche</SectionLabel>
            <div className="space-y-2">
              {step.phases.map(ph => (
                <div
                  key={ph.name}
                  className="p-3 flex items-start gap-3"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <span className="text-xl">{ph.icon}</span>
                  <div>
                    <div className="font-sans text-sm font-semibold" style={{ color: 'var(--black)' }}>{ph.name}</div>
                    <p className="font-sans text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{ph.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Opciones de uso (Grounding + Red Light) */}
        {step.options && (
          <div>
            <SectionLabel>Opciones de uso</SectionLabel>
            <div className="space-y-2">
              {step.options.map(o => (
                <div key={o.name}>
                  <div className="p-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span>{o.icon}</span>
                      <span className="font-sans text-sm font-semibold" style={{ color: 'var(--black)' }}>{o.name}</span>
                    </div>
                    <p className="font-sans text-xs" style={{ color: 'var(--muted)' }}>{o.desc}</p>
                  </div>
                  {o.warning && <WarningBox>{o.warning}</WarningBox>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instalaciones (Amenities) */}
        {step.amenities && (
          <div>
            <SectionLabel>Instalaciones</SectionLabel>
            <div className="space-y-2">
              {step.amenities.map(a => (
                <div
                  key={a.name}
                  className="p-3 flex items-start gap-3"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <span className="text-2xl">{a.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-sm font-semibold" style={{ color: 'var(--black)' }}>{a.name}</span>
                      <span className="font-mono-dm text-[10px]" style={{ color: 'var(--muted)' }}>{a.duration}</span>
                    </div>
                    <p className="font-sans text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cómo usarlo — primero */}
        {step.steps && step.steps.length > 0 && (
          <div>
            <SectionLabel>Cómo usarlo</SectionLabel>
            {step.steps.map((s, i) => (
              <CheckItem
                key={i}
                text={s}
                checked={!!checked[i]}
                onToggle={() => toggleChecked(i)}
              />
            ))}
          </div>
        )}

        {/* Beneficios — después */}
        {step.benefits && step.benefits.length > 0 && (
          <div>
            <SectionLabel>Beneficios</SectionLabel>
            {step.benefits.map((b, i) => <BenefitItem key={i} text={b} />)}
          </div>
        )}

        {/* Advertencia */}
        {step.warning && <WarningBox>{step.warning}</WarningBox>}

        {/* Deep link a app nativa */}
        {step.appLink && (
          <BtnAppLink label={step.appLink.label} scheme={step.appLink.scheme} />
        )}

        {/* Acciones de navegación */}
        <div className="space-y-3 pb-6">
          {!done ? (
            <BtnPrimary onClick={() => { toggleStep(step.id); goNext() }}>
              {isLast ? 'Completar Rutina' : 'Completado · Siguiente →'}
            </BtnPrimary>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2 py-2">
                <div
                  className="w-5 h-5 rounded-sm flex items-center justify-center"
                  style={{ background: 'var(--green)' }}
                >
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="font-mono-dm text-[11px] tracking-wide uppercase" style={{ color: 'var(--green)' }}>
                  Completado
                </span>
              </div>
              <BtnPrimary onClick={goNext}>
                {isLast ? 'Ver resumen →' : 'Siguiente paso →'}
              </BtnPrimary>
              <button
                onClick={() => toggleStep(step.id)}
                className="w-full py-2 font-mono-dm text-[10px] tracking-widest uppercase"
                style={{ color: 'var(--muted)' }}
              >
                Desmarcar
              </button>
            </>
          )}
          {!isFirst && (
            <BtnSecondary onClick={goBack}>← Paso anterior</BtnSecondary>
          )}
        </div>
      </div>

      <BottomNav active={routine} onNav={navGo} />
    </div>
  )
}
