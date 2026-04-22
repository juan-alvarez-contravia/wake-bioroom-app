import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { content } from '../data/content'
import {
  BackBtn, SectionLabel, Tag, BenefitItem, CheckItem,
  WarningBox, TipBox, BtnAppLink,
} from '../components/UI'

export default function GadgetDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const gadget = content.es.gadgets.items.find(g => g.id === id)
  const [checked, setChecked] = useState({})
  const toggleChecked = (i) => setChecked(prev => ({ ...prev, [i]: !prev[i] }))

  if (!gadget) {
    navigate('/gadgets')
    return null
  }

  return (
    <div className="min-h-screen pb-12" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="px-6 pt-12 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <BackBtn onClick={() => navigate('/gadgets')} />
        <div className="mt-4 flex items-center gap-3 mb-3">
          <span className="text-4xl">{gadget.icon}</span>
          <div>
            <h1 className="font-lora text-2xl font-bold leading-tight" style={{ color: 'var(--black)' }}>
              {gadget.name}
            </h1>
            <p className="font-sans text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{gadget.tagline}</p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          {gadget.tags.map(t => <Tag key={t}>{t}</Tag>)}
          {gadget.routines.map(r => (
            <button
              key={r}
              onClick={() => navigate(`/${r}`)}
              className="inline-block px-3 py-1 font-mono-dm text-[10px] tracking-wider uppercase rounded-sm border transition-all active:scale-95"
              style={{ borderColor: 'var(--green)', color: 'var(--green)', background: 'transparent' }}
            >
              Rutina {r.toUpperCase()} →
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pt-6 space-y-6 pb-12">
        {/* What is it */}
        <div>
          <SectionLabel>¿Qué es?</SectionLabel>
          <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            {gadget.whatIs}
          </p>
        </div>

        {/* Benefits */}
        {gadget.benefits && gadget.benefits.length > 0 && (
          <div>
            <SectionLabel>Beneficios</SectionLabel>
            {gadget.benefits.map((b, i) => <BenefitItem key={i} text={b} />)}
          </div>
        )}

        {/* Modes */}
        {gadget.modes && (
          <div>
            <SectionLabel>Modos</SectionLabel>
            <div className="space-y-2">
              {gadget.modes.map(m => (
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

        {/* Temperature options */}
        {gadget.temperatures && (
          <div>
            <SectionLabel>Temperaturas</SectionLabel>
            <div className="space-y-2">
              {gadget.temperatures.map(t => (
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
                  <div>
                    <div className="font-sans text-sm font-medium" style={{ color: 'var(--black)' }}>{t.label}</div>
                    {t.recommended && <div className="mt-1"><Tag color="green">Recomendado</Tag></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Phases */}
        {gadget.phases && (
          <div>
            <SectionLabel>Fases</SectionLabel>
            <div className="space-y-2">
              {gadget.phases.map(ph => (
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

        {/* Steps checklist */}
        {gadget.steps && gadget.steps.length > 0 && (
          <div>
            <SectionLabel>Cómo usarlo</SectionLabel>
            {gadget.steps.map((s, i) => (
              <CheckItem key={i} text={s} checked={!!checked[i]} onToggle={() => toggleChecked(i)} />
            ))}
          </div>
        )}

        {/* Recommendation */}
        {gadget.recommendation && <TipBox>{gadget.recommendation}</TipBox>}

        {/* Warning */}
        {gadget.warning && <WarningBox>{gadget.warning}</WarningBox>}

        {/* App deep link */}
        {gadget.appLink && (
          <BtnAppLink label={gadget.appLink.label} scheme={gadget.appLink.scheme} />
        )}
      </div>
    </div>
  )
}
