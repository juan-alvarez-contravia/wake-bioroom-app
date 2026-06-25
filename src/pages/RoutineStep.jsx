import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { content } from '../data/content'
import { useApp } from '../context/AppContext'
import {
  StepHeader, BenefitItem, CheckItem, WarningBox,
  BtnPrimary, BtnAppLink, SectionLabel, Tag, BottomNav,
} from '../components/UI'
import stretchImg from '../assets/Stretch-adn-Tone.webp'
import baneraImg from '../assets/Banera.webp'
import amQrImg from '../assets/AMRoutineMusic.png'
import pmQrImg from '../assets/PMRoutineMusic.png'

const QR_IMAGES = {
  'am-1': amQrImg,
  'pm-1': pmQrImg,
}

const STEP_IMAGES = {
  'am-2': stretchImg,
  'pm-2': stretchImg,
  'pm-7': baneraImg,
}
import coldImg from '../assets/Cold.webp'
import contrasteImg from '../assets/Contraste.webp'
import saunaImg from '../assets/Suauna-Infrarojo.webp'
import piscinaImg from '../assets/Piscina.webp'
import gymImg from '../assets/gym-app.webp'

const VIDEO_DEFAULT = 'https://res.cloudinary.com/dn0t6obmx/video/upload/w_600,q_auto,f_auto/v1779213543/luz-circadiana.mov'

function optimizeVideoUrl(url) {
  if (!url || !url.includes('res.cloudinary.com')) return url
  return url.replace('/upload/q_auto/f_auto/', '/upload/w_600,q_auto,f_auto/')
}

const AMENITY_IMAGES = {
  'Cold Plunge': coldImg,
  'Piscinas de contrastes': contrasteImg,
  'Jacuzzi de contraste': contrasteImg,
  'Sauna infrarrojo': saunaImg,
  'Piscina climatizada': piscinaImg,
  'Piscina de natación con purificación salina': piscinaImg,
  'Gimnasio de alta performance': gymImg,
}

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
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [amenityIdx, setAmenityIdx] = useState(0)

  useEffect(() => {
    if (!step) return
    const saved = sessionStorage.getItem(`wake_checked_${step.id}`)
    setChecked(saved ? JSON.parse(saved) : {})
    setVideoLoaded(false)
    setAmenityIdx(0)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [step?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!step?.amenitiesCarousel) return
    const timer = setInterval(
      () => setAmenityIdx(i => (i + 1) % step.amenities.length),
      5000
    )
    return () => clearInterval(timer)
  }, [step?.id, step?.amenitiesCarousel]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleChecked = (i) => setChecked(prev => {
    const next = { ...prev, [i]: !prev[i] }
    if (step) sessionStorage.setItem(`wake_checked_${step.id}`, JSON.stringify(next))
    return next
  })

  if (!step) {
    navigate(`/${routine}`)
    return null
  }

  const done = isCompleted(step.id)
  const isFirst = stepIndex === 0
  const isLast = stepIndex === steps.length - 1
  const goBack = () => navigate(`/${routine}/paso/${stepIndex}`)
  const goNext = () => isLast ? navigate(`/${routine}/completa`) : navigate(`/${routine}/paso/${stepIndex + 2}`)

  const handleSiguiente = () => {
    if (!done) toggleStep(step.id)
    goNext()
  }

  return (
    <div className="min-h-screen pb-28" style={{ background: 'var(--bg)' }}>

      {/* ── HEADER (full width) ── */}
      <div className="pt-12 pb-6" style={{ paddingLeft: '40px', paddingRight: '40px' }}>
        <div className="flex justify-end">
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

      {/* ── DOS COLUMNAS: video izquierda · contenido derecha ── */}
      <div
        className="flex items-start"
        style={{ paddingLeft: '40px', paddingRight: '40px', gap: '32px', marginBottom: '32px' }}
      >

        {/* COLUMNA IZQUIERDA — video vertical 9:16 o placeholder */}
        <div style={{ width: step.spotifyEmbed ? '60%' : '300px', flexShrink: step.spotifyEmbed ? 1 : 0, overflow: 'hidden', background: step.spotifyEmbed ? 'transparent' : STEP_IMAGES[step.id] ? 'var(--card)' : step.videoPlaceholder ? 'var(--surface)' : 'var(--black)' }}>
          {step.spotifyEmbed ? (
            <iframe
              data-testid="embed-iframe"
              src={step.spotifyEmbed}
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ borderRadius: '12px', display: 'block' }}
            />
          ) : STEP_IMAGES[step.id] ? (
            <div style={{ width: '100%', aspectRatio: '9/16', overflow: 'hidden' }}>
              <img
                src={STEP_IMAGES[step.id]}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ) : step.videoPlaceholder ? (
            <div
              style={{
                width: '100%',
                aspectRatio: '9/16',
                border: '2px dashed var(--border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: 'var(--muted)', fontSize: '18px', marginLeft: '3px' }}>&#9654;</span>
              </div>
              <span className="font-mono-dm text-[10px] tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                Video próximamente
              </span>
            </div>
          ) : (
            <div style={{ position: 'relative', width: '100%', aspectRatio: '9/16' }}>
              <video
                src={optimizeVideoUrl(step.video || VIDEO_DEFAULT)}
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={() => setVideoLoaded(true)}
                style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'var(--black)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: videoLoaded ? 0 : 1,
                  transition: 'opacity 0.4s ease',
                  pointerEvents: videoLoaded ? 'none' : 'auto',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    border: '3px solid rgba(241,240,235,0.2)',
                    borderTopColor: '#F1F0EB',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA — descripción + pasos */}
        <div className="flex-1 space-y-6" style={{ minWidth: 0 }}>

          {/* Descripción — oculta en pasos con carrusel de instalaciones */}
          {!step.amenitiesCarousel && !step.spotifyEmbed && (
            <p className="font-montserrat text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              {step.description}
            </p>
          )}

          {/* QR Playlist */}
          {step.qrImage && QR_IMAGES[step.id] && (
            <div>
              <div className="font-mono-dm text-[10px] tracking-widest uppercase mb-3" style={{ color: 'var(--muted)' }}>
                Escanea para abrir la playlist
              </div>
              <img
                src={QR_IMAGES[step.id]}
                alt="QR Playlist"
                style={{ width: '180px', height: '180px', display: 'block', objectFit: 'contain' }}
              />
            </div>
          )}

          {/* Pending note (SILO pm-5) */}
          {step.pending && (
            <div
              className="px-4 py-3 text-sm leading-relaxed italic"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}
            >
              {step.pending}
            </div>
          )}

          {/* Nota de alerta (Cena PM) */}
          {step.note && <WarningBox>{step.note}</WarningBox>}

          {/* Modos disponibles (SmartGoggles PM) */}
          {step.modes && (
            <div>
              <SectionLabel>Terapias recomendadas</SectionLabel>
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
                      <span className="font-montserrat text-sm font-semibold" style={{ color: 'var(--black)' }}>{m.name}</span>
                      {m.recommended && <Tag color="green">Recomendado</Tag>}
                    </div>
                    <p className="font-montserrat text-xs" style={{ color: 'var(--muted)' }}>{m.desc}</p>
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
                      <div className="font-montserrat text-sm font-medium" style={{ color: 'var(--black)' }}>{t.label}</div>
                      {t.desc && <div className="font-montserrat text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{t.desc}</div>}
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
                    <div>
                      <div className="font-montserrat text-sm font-semibold" style={{ color: 'var(--black)' }}>{ph.name}</div>
                      <p className="font-montserrat text-xs mt-0.5" style={{ color: 'var(--muted)', fontWeight: 300 }}>{ph.desc}</p>
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
                        <span className="font-montserrat text-sm font-semibold" style={{ color: 'var(--black)' }}>{o.name}</span>
                      </div>
                      <p className="font-montserrat text-xs" style={{ color: 'var(--muted)' }}>{o.desc}</p>
                    </div>
                    {o.warning && <WarningBox>{o.warning}</WarningBox>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Macronutrientes (Desayuno en Silo) */}
          {step.macros && (
            <div>
              <SectionLabel>Macronutrientes</SectionLabel>
              <div className="space-y-2">
                {step.macros.map(m => (
                  <div key={m.name} className="p-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div className="font-montserrat text-sm font-semibold mb-1" style={{ color: 'var(--black)' }}>{m.name}</div>
                    <p className="font-montserrat text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{m.examples}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tecnología disponible (Sastra) */}
          {step.features && (
            <div>
              <SectionLabel>Tecnología disponible</SectionLabel>
              <div>
                {step.features.map(f => (
                  <div
                    key={f.name}
                    className="flex items-center gap-3 py-2"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--green)' }} />
                    <span className="font-montserrat text-sm" style={{ color: 'var(--black)' }}>{f.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instalaciones — carrusel (am-8) */}
          {step.amenitiesCarousel && step.amenities && (() => {
            const a = step.amenities[amenityIdx]
            const img = AMENITY_IMAGES[a.name]
            return (
              <div>
                <SectionLabel>Instalaciones</SectionLabel>
                <div key={amenityIdx} style={{ animation: 'fadeIn 0.4s ease' }}>
                  {img ? (
                    <div style={{ width: '100%', height: '250px', overflow: 'hidden', marginBottom: '14px', background: 'var(--card)' }}>
                      <img src={img} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  ) : (
                    <div style={{ width: '100%', height: '250px', background: 'var(--surface)', marginBottom: '14px' }} />
                  )}
                  <div className="font-lora-subtitulo text-base mb-0.5" style={{ color: 'var(--black)' }}>{a.name}</div>
                  <div className="font-mono-dm text-[10px] tracking-widest uppercase mb-3" style={{ color: 'var(--muted)' }}>{a.subtitle}</div>
                  <p className="font-montserrat text-xs leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>{a.phrase}</p>
                  {a.benefits.map((b, i) => <BenefitItem key={i} text={b} />)}
                </div>

                {/* Navegación anterior / siguiente */}
                <div className="flex items-center justify-between mt-5" style={{ paddingTop: '16px' }}>
                  <button
                    onClick={() => setAmenityIdx(i => (i - 1 + step.amenities.length) % step.amenities.length)}
                    className="flex items-center gap-2 font-mono-dm text-[10px] tracking-widest uppercase transition-all active:scale-95"
                    style={{ color: 'var(--muted)' }}
                  >
                    ← Anterior
                  </button>
                  <span className="font-mono-dm text-[10px] tracking-widest" style={{ color: 'var(--muted)' }}>
                    {amenityIdx + 1} / {step.amenities.length}
                  </span>
                  <button
                    onClick={() => setAmenityIdx(i => (i + 1) % step.amenities.length)}
                    className="flex items-center gap-2 font-mono-dm text-[10px] tracking-widest uppercase transition-all active:scale-95"
                    style={{ color: 'var(--green)' }}
                  >
                    Siguiente →
                  </button>
                </div>
              </div>
            )
          })()}

          {/* Instalaciones — tarjetas (otros pasos con amenities) */}
          {step.amenities && !step.amenitiesCarousel && (
            <div>
              <SectionLabel>Instalaciones</SectionLabel>
              <div className="space-y-2">
                {step.amenities.map(a => (
                  <div
                    key={a.name}
                    className="flex items-start"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden' }}
                  >
                    <div style={{ width: '90px', height: '90px', flexShrink: 0, background: 'var(--card)', overflow: 'hidden' }}>
                      <img
                        src={a.image || AMENITY_IMAGES[a.name] || ''}
                        alt={a.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    <div className="flex-1 py-2 px-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-montserrat text-sm font-semibold" style={{ color: 'var(--black)' }}>{a.name}</span>
                        <span className="font-mono-dm text-[10px]" style={{ color: 'var(--muted)' }}>{a.duration}</span>
                      </div>
                      <p className="font-montserrat text-xs" style={{ color: 'var(--muted)' }}>{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tarjetas de temperatura en 3 columnas (DockPro) */}
          {step.temperatureCards && (
            <div>
              <SectionLabel>Temperaturas recomendadas</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                {step.temperatureCards.map(t => (
                  <div
                    key={t.range}
                    className="p-3"
                    style={{
                      background: t.recommended ? 'var(--surface)' : 'transparent',
                      border: `1px solid ${t.recommended ? 'var(--green)' : 'var(--border)'}`,
                      textAlign: 'center',
                    }}
                  >
                    <div className="font-mono-dm text-base mb-2" style={{ color: t.recommended ? 'var(--green)' : 'var(--black)' }}>
                      {t.range}
                    </div>
                    <div className="font-montserrat text-xs leading-snug" style={{ color: 'var(--muted)' }}>
                      {t.label}
                    </div>
                    {t.recommended && <div className="mt-2"><Tag color="green">Recomendado</Tag></div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deep link a app nativa */}
          {step.appLink && (
            <BtnAppLink label={step.appLink.label} scheme={step.appLink.scheme} />
          )}

          {/* Aromaterapia roll-on (Difusor am-5) */}
          {step.aromatherapy && (
            <div>
              <SectionLabel>Aromaterapia</SectionLabel>
              <div className="p-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="font-montserrat text-sm font-semibold mb-2" style={{ color: 'var(--black)' }}>
                  {step.aromatherapy.title}
                </div>
                <p className="font-montserrat text-xs leading-relaxed mb-2" style={{ color: 'var(--muted)' }}>
                  {step.aromatherapy.description}
                </p>
                {step.aromatherapy.tip && (
                  <p className="font-montserrat text-xs italic" style={{ color: 'var(--green)' }}>
                    {step.aromatherapy.tip}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Cómo usarlo — checklist */}
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

          {/* Botones externos del contenido */}
          {step.buttons && step.buttons.some(b => b.type === 'external') && (
            <div className="space-y-2">
              {step.buttons
                .filter(b => b.type === 'external')
                .map(b => (
                  <button
                    key={b.label}
                    onClick={() => b.url && window.open(b.url, '_blank')}
                    className="w-full py-3 font-montserrat text-sm font-medium tracking-wider uppercase transition-all active:scale-95"
                    style={{ background: 'var(--black)', color: '#F1F0EB' }}
                  >
                    {b.label}
                  </button>
                ))}
            </div>
          )}

        </div>
      </div>

      {/* ── PARTE INFERIOR: beneficios · advertencia · navegación ── */}
      <div className="space-y-6" style={{ paddingLeft: '40px', paddingRight: '40px' }}>

        {/* Beneficios — dos columnas si hay benefitGroups (am-6) */}
        {step.benefitGroups ? (
          <div>
            <SectionLabel>Beneficios</SectionLabel>
            <div className="flex items-start" style={{ gap: 0 }}>
              {step.benefitGroups.map((group, gi) => (
                <>
                  {gi > 0 && (
                    <div key={`div-${gi}`} style={{ width: '1px', background: 'var(--red)', alignSelf: 'stretch', flexShrink: 0 }} />
                  )}
                  <div key={group.title} style={{ flex: 1, paddingLeft: gi > 0 ? '20px' : 0, paddingRight: gi === 0 ? '20px' : 0 }}>
                    <div className="font-mono-dm text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--red)' }}>
                      {group.title}
                    </div>
                    {group.benefits.map((b, i) => <BenefitItem key={i} text={b} />)}
                  </div>
                </>
              ))}
            </div>
          </div>
        ) : step.benefits && step.benefits.length > 0 ? (
          <div>
            <SectionLabel>Beneficios</SectionLabel>
            {step.benefits.map((b, i) => <BenefitItem key={i} text={b} />)}
          </div>
        ) : null}

        {/* Protocolo recomendado (Amenities) */}
        {step.protocol && (
          <div
            className="px-4 py-3 font-montserrat text-sm leading-relaxed"
            style={{ borderLeft: '3px solid var(--green)', background: 'var(--surface)', color: 'var(--muted)' }}
          >
            {step.protocol}
          </div>
        )}

        {/* Advertencia */}
        {step.warning && <WarningBox>{step.warning}</WarningBox>}

        {/* Acciones de navegación */}
        <div className="space-y-3 pb-6">

          {done && (
            <div className="flex items-center justify-between py-2 px-1">
              <div className="flex items-center gap-2">
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
              <button
                onClick={() => toggleStep(step.id)}
                className="font-mono-dm text-[10px] tracking-widest uppercase"
                style={{ color: 'var(--muted)' }}
              >
                Desmarcar
              </button>
            </div>
          )}

          {!isFirst ? (
            <div className="flex gap-2">
              <button
                onClick={goBack}
                className="py-4 font-montserrat text-sm font-medium tracking-wider uppercase transition-all duration-200 active:scale-95 border"
                style={{ flex: '0 0 30%', background: 'transparent', color: 'var(--muted)', borderColor: 'var(--border)' }}
              >
                Anterior
              </button>
              <button
                onClick={handleSiguiente}
                className="py-4 font-montserrat text-sm font-semibold tracking-wider uppercase transition-all duration-200 active:scale-95"
                style={{ flex: '1', background: 'var(--green)', color: '#F1F0EB' }}
              >
                {isLast ? 'Completar' : 'Siguiente'}
              </button>
            </div>
          ) : (
            <BtnPrimary onClick={handleSiguiente}>
              {isLast ? 'Completar rutina' : 'Siguiente'}
            </BtnPrimary>
          )}

        </div>
      </div>

      <BottomNav active={routine} onNav={navGo} />
    </div>
  )
}
