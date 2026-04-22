import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { content } from '../data/content'

export default function Splash() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const c = content.es.splash

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
    const t = setTimeout(() => navigate('/home'), 3200)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden"
      style={{ background: 'var(--black)' }}
    >
      {/* Subtle red glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(114,47,21,0.2) 0%, transparent 70%)',
        }}
      />

      <div
        className="text-center relative transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
      >
        {/* Logo */}
        <div className="mb-12">
          <div className="font-lora text-5xl font-bold" style={{ color: '#F1F0EB' }}>
            Wake
            <span className="font-sans text-sm font-light ml-1 tracking-widest" style={{ color: 'var(--green)' }}>
              BioHotel
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div
          className="font-mono-dm text-[10px] tracking-widest uppercase mb-6 flex items-center justify-center gap-3"
          style={{ color: '#722F15' }}
        >
          <div className="w-8 h-px bg-current" />
          BioRoom Experience
          <div className="w-8 h-px bg-current" />
        </div>

        <h1 className="font-lora text-3xl font-bold leading-tight mb-4" style={{ color: '#F1F0EB' }}>
          {c.title}
        </h1>
        <p className="font-sans text-sm font-light leading-relaxed max-w-xs mx-auto" style={{ color: '#8C8980' }}>
          {c.subtitle}
        </p>

        {/* Loading dots */}
        <div className="flex justify-center gap-2 mt-12">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: 'var(--green)',
                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
