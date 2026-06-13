import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackBtn, SectionLabel, BottomNav } from '../components/UI'

const COMPLEMENTOS = [
  { id: 'funda-seda',     name: 'Funda de seda para almohada', tag: 'Renta', price: '$400.000 COP' },
  { id: 'manta-peso',     name: 'Manta con peso',              tag: 'Renta', price: '$100.000 COP' },
  { id: 'tapa-oidos',     name: 'Tapaoídos',                   tag: null,    price: '$130.000 COP' },
  { id: 'gafas-luz-azul', name: 'Gafas de bloqueo de luz azul', tag: null,   price: '$219.000 COP' },
  { id: 'cinta-boca',     name: 'Cinta para la boca',          tag: null,    price: '$39.000 COP'  },
  { id: 'cinta-nariz',    name: 'Cinta para nariz',            tag: null,    price: '$72.000 COP'  },
  { id: 'antifaz',        name: 'Antifaz para dormir',         tag: null,    price: '$175.000 COP' },
]

export default function Complementos() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  const navGo = (id) => {
    const map = { home: '/home', am: '/am', pm: '/pm', gadgets: '/gadgets', help: '/ayuda' }
    navigate(map[id] || '/home')
  }

  return (
    <div className="min-h-screen pb-28" style={{ background: 'var(--bg)' }}>

      {/* ── HEADER ── */}
      <div style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '48px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
        <BackBtn onClick={() => navigate('/home')} />
        <div className="mt-4">
          <SectionLabel>Complementos</SectionLabel>
          <h1 className="font-lora text-2xl leading-tight mb-2" style={{ color: 'var(--black)', fontWeight: 400 }}>
            Eleva tu experiencia de sueño
          </h1>
          <p className="font-montserrat text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            Tenemos una selección para recargar y elevar tu experiencia en sueño
          </p>
        </div>
      </div>

      {/* ── LISTA ── */}
      <div style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '24px' }}>

        <div className="font-montserrat text-sm mb-4" style={{ color: 'var(--black)' }}>
          Conoce los complementos que puedes comprar:
        </div>

        <div>
          {COMPLEMENTOS.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between py-4"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              {/* Nombre + tag */}
              <div className="flex-1 pr-4">
                <div className="font-montserrat text-sm font-semibold" style={{ color: 'var(--black)' }}>
                  {c.name}
                  {c.tag && (
                    <span
                      className="font-mono-dm text-[9px] tracking-wider uppercase ml-2 px-2 py-0.5"
                      style={{ background: 'var(--surface)', color: 'var(--muted)', border: '1px solid var(--border)' }}
                    >
                      {c.tag}
                    </span>
                  )}
                </div>
                <div className="font-montserrat text-xs mt-1" style={{ color: 'var(--green)', fontWeight: 300 }}>
                  {c.price}
                </div>
              </div>

              {/* Botón adquirir */}
              <button
                onClick={() => setSelected(c)}
                className="font-mono-dm text-[10px] tracking-widest uppercase px-4 py-2 transition-all active:scale-95 shrink-0"
                style={{ background: 'var(--green)', color: '#F1F0EB' }}
              >
                Adquirir
              </button>
            </div>
          ))}
        </div>

        {/* Nota de disponibilidad */}
        <p className="font-montserrat text-xs mt-5 text-center" style={{ color: 'var(--muted)' }}>
          *Sujeto a disponibilidad
        </p>
      </div>

      <BottomNav active="" onNav={navGo} />

      {/* ── MODAL ── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(20,20,20,0.55)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="mx-8 p-8"
            style={{ background: 'var(--bg)', maxWidth: '380px', width: '100%' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Cerrar */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setSelected(null)}
                className="font-mono-dm text-[10px] tracking-widest uppercase"
                style={{ color: 'var(--muted)' }}
              >
                × Cerrar
              </button>
            </div>

            {/* Título */}
            <h2 className="font-lora text-lg leading-snug mb-6 text-center" style={{ color: 'var(--black)', fontWeight: 400 }}>
              {selected.name}
            </h2>

            {/* Instrucción */}
            <p className="font-montserrat text-sm leading-relaxed text-center mb-8" style={{ color: 'var(--muted)' }}>
              Lee el QR con tu teléfono y solicita a nuestro personal tu{' '}
              <span style={{ color: 'var(--black)' }}>{selected.name.toLowerCase()}</span>
            </p>

            {/* QR placeholder */}
            <div
              className="mx-auto flex flex-col items-center justify-center gap-3"
              style={{
                width: '164px',
                height: '164px',
                background: 'var(--surface)',
                border: '2px dashed var(--border)',
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  background: 'var(--border)',
                  borderRadius: '4px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '6px',
                  padding: '10px',
                }}
              >
                {[0, 1, 2, 3].map(i => (
                  <div key={i} style={{ background: 'var(--muted)', borderRadius: '2px' }} />
                ))}
              </div>
              <span className="font-mono-dm text-[9px] tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                QR próximamente
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
