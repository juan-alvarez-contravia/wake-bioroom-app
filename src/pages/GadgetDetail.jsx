import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { content } from '../data/content'
import { useApp } from '../context/AppContext'
import {
  BackBtn, SectionLabel, BenefitItem, CheckItem,
  WarningBox, TipBox, BtnAppLink, Tag, BottomNav,
} from '../components/UI'
import imgMat from '../assets/WB-mat.webp'
import imgLuzBlanca from '../assets/WB-luz-blanca.webp'
import imgAroma from '../assets/WB-aroma.webp'
import imgGafas from '../assets/WB-gafas.webp'
import imgLuzRoja from '../assets/WB-luz-roja.webp'
import imgColchon from '../assets/WB-Colchon.webp'
import imgHatch from '../assets/WB-hatch.webp'

const GADGET_IMAGES = {
  'grounding-mat':   imgMat,
  'circadian-light': imgLuzBlanca,
  'diffuser':        imgAroma,
  'smartgoggles':    imgGafas,
  'red-light':       imgLuzRoja,
  'dockpro':         imgColchon,
  'hatch':           imgHatch,
}

const GADGET_STEPS = {
  'grounding-mat':   { am: 6,  pm: 4  },
  'circadian-light': { am: 4          },
  'diffuser':        { am: 5,  pm: 3  },
  'smartgoggles':    { am: 7,  pm: 8  },
  'red-light':       { am: 6,  pm: 4  },
  'dockpro':         {         pm: 9  },
  'hatch':           {         pm: 10 },
}

export default function GadgetDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { lang } = useApp()
  const ui = content[lang].ui
  const gadget = content[lang].gadgets.items.find(g => g.id === id)
  const [checked, setChecked] = useState({})
  const toggleChecked = (i) => setChecked(prev => ({ ...prev, [i]: !prev[i] }))

  const navGo = (navId) => {
    const map = { home: '/home', am: '/am', pm: '/pm', gadgets: '/gadgets', help: '/ayuda' }
    navigate(map[navId] || '/home')
  }

  if (!gadget) {
    navigate('/gadgets')
    return null
  }

  const routineBtnLabel = (r) => r === 'am' ? ui.routineBtnAM : ui.routineBtnPM

  return (
    <div className="min-h-screen pb-28" style={{ background: 'var(--bg)' }}>

      {/* ── BACK ── */}
      <div style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '48px', paddingBottom: '16px' }}>
        <BackBtn onClick={() => navigate('/gadgets')} />
      </div>

      {/* ── TOP: imagen izquierda · info derecha ── */}
      <div
        className="flex items-start"
        style={{ paddingLeft: '40px', paddingRight: '40px', gap: '40px', paddingBottom: '40px', borderBottom: '1px solid var(--border)' }}
      >
        {/* Imagen del gadget */}
        <div style={{ width: '260px', flexShrink: 0 }}>
          <img
            src={GADGET_IMAGES[gadget.id]}
            alt={gadget.name}
            style={{ width: '100%', display: 'block', objectFit: 'contain' }}
          />
        </div>

        {/* Info: título · tagline · botones · ¿qué es? */}
        <div className="flex-1" style={{ minWidth: 0 }}>
          <h1 className="font-lora text-2xl leading-tight mb-1" style={{ color: 'var(--black)', fontWeight: 400 }}>
            {gadget.name}
          </h1>
          <p className="font-montserrat text-sm mb-5" style={{ color: 'var(--muted)' }}>{gadget.tagline}</p>

          {/* Botones de rutina */}
          <div className="flex gap-3 flex-wrap mb-6">
            {gadget.routines.map(r => (
              <button
                key={r}
                onClick={() => {
                  const step = GADGET_STEPS[gadget.id]?.[r]
                  navigate(step ? `/${r}/paso/${step}` : `/${r}`)
                }}
                className={`routine-btn routine-btn-${r} inline-block px-4 py-2 font-mono-dm text-[10px] tracking-wider uppercase transition-all active:scale-95`}
                style={{ position: 'relative', overflow: 'hidden', border: '1px solid var(--green)', color: '#111', background: '#D0CEC6' }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>{routineBtnLabel(r)}</span>
                <span className={`shimmer-${r}`} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
              </button>
            ))}
          </div>

          <style>{`
            @keyframes shimmerAM {
              0%   { transform: translateX(-100%) skewX(-15deg); }
              100% { transform: translateX(250%) skewX(-15deg); }
            }
            @keyframes shimmerPM {
              0%   { transform: translateX(-100%) skewX(-15deg); }
              100% { transform: translateX(250%) skewX(-15deg); }
            }
            .shimmer-am {
              background: linear-gradient(90deg, transparent 0%, rgba(255,160,60,0.55) 50%, transparent 100%);
              width: 60%;
              animation: shimmerAM 2.4s ease-in-out infinite;
            }
            .shimmer-pm {
              background: linear-gradient(90deg, transparent 0%, rgba(80,140,255,0.5) 50%, transparent 100%);
              width: 60%;
              animation: shimmerPM 2.8s ease-in-out infinite;
            }
          `}</style>

          {/* ¿Qué es? */}
          <SectionLabel>{ui.whatIs}</SectionLabel>
          <p className="font-montserrat text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            {gadget.whatIs}
          </p>
        </div>
      </div>

      {/* ── BOTTOM: beneficios izquierda · cómo usarlo derecha ── */}
      <div
        className="flex items-start"
        style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '32px', paddingBottom: '32px', gap: '0' }}
      >
        {/* Beneficios */}
        <div style={{ flex: 1, paddingRight: '28px' }}>
          {gadget.benefits && gadget.benefits.length > 0 && (
            <>
              <SectionLabel>{ui.benefits}</SectionLabel>
              {gadget.benefits.map((b, i) => <BenefitItem key={i} text={b} />)}
            </>
          )}
        </div>

        {/* Divisor rojo */}
        <div style={{ width: '1px', background: 'var(--red)', alignSelf: 'stretch', flexShrink: 0 }} />

        {/* Cómo usarlo */}
        <div style={{ flex: 1, paddingLeft: '28px' }}>
          {gadget.steps && gadget.steps.length > 0 && (
            <>
              <SectionLabel>{ui.howToUse}</SectionLabel>
              {gadget.steps.map((s, i) => (
                <CheckItem key={i} text={s} checked={!!checked[i]} onToggle={() => toggleChecked(i)} />
              ))}
            </>
          )}
        </div>
      </div>

      {/* ── EXTRAS: modos · temperaturas · fases · tip · warning · app ── */}
      <div
        className="space-y-6"
        style={{ paddingLeft: '40px', paddingRight: '40px', borderTop: '1px solid var(--border)', paddingTop: '32px', paddingBottom: '16px' }}
      >
        {/* Modos */}
        {gadget.modes && (
          <div>
            <SectionLabel>{ui.modes}</SectionLabel>
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
                    <span className="font-montserrat text-sm font-semibold" style={{ color: 'var(--black)' }}>{m.name}</span>
                    {m.recommended && <Tag color="green">{ui.recommended}</Tag>}
                  </div>
                  <p className="font-montserrat text-xs" style={{ color: 'var(--muted)' }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Temperaturas */}
        {gadget.temperatures && (
          <div>
            <SectionLabel>{ui.tempLabel}</SectionLabel>
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
                  <div className="font-mono-dm text-lg" style={{ color: t.recommended ? 'var(--green)' : 'var(--muted)' }}>
                    {t.range}
                  </div>
                  <div>
                    <div className="font-montserrat text-sm font-medium" style={{ color: 'var(--black)' }}>{t.label}</div>
                    {t.recommended && <div className="mt-1"><Tag color="green">{ui.recommended}</Tag></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fases */}
        {gadget.phases && (
          <div>
            <SectionLabel>{ui.phasesLabel}</SectionLabel>
            <div className="space-y-2">
              {gadget.phases.map(ph => (
                <div
                  key={ph.name}
                  className="p-3"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <div className="font-montserrat text-sm font-semibold mb-0.5" style={{ color: 'var(--black)' }}>{ph.name}</div>
                  <p className="font-montserrat text-xs" style={{ color: 'var(--muted)' }}>{ph.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recomendación */}
        {gadget.recommendation && <TipBox>{gadget.recommendation}</TipBox>}

        {/* Advertencia */}
        {gadget.warning && <WarningBox>{gadget.warning}</WarningBox>}

        {/* App deep link */}
        {gadget.appLink && (
          <BtnAppLink label={gadget.appLink.label} scheme={gadget.appLink.scheme} />
        )}
      </div>

      <BottomNav active="gadgets" onNav={navGo} />
    </div>
  )
}
