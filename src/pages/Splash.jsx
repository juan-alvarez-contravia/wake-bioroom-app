import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { content } from '../data/content'
import logoBio from '../assets/Logo-bio-blanco-full.webp'
import manchaImg from '../assets/mancha.webp'

export default function Splash() {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [bouncing, setBouncing] = useState(false)
  const navigate = useNavigate()
  const c = content.es.splash

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120)
    return () => clearTimeout(t)
  }, [])

  function handleStart() {
    if (bouncing) return
    setBouncing(true)
    setTimeout(() => {
      setExiting(true)
      setTimeout(() => navigate('/home'), 480)
    }, 380)
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center px-8 relative overflow-hidden"
      style={{
        background: '#616652',
        minHeight: '100dvh',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingTop: 'env(safe-area-inset-top)',
      }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.48, ease: 'easeInOut' }}
    >
      {/* ── Mancha decorativa — centrada, pantalla completa ── */}
      <img
        src={manchaImg}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          width: '200%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          opacity: 0.3,
          animation: 'manchaPulse 5s ease-in-out infinite',
        }}
      />

      {/* ── Content ── */}
      <div
        className="text-center relative z-10 flex flex-col items-center transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
        }}
      >
        {/* Logo */}
        <div className="mb-10">
          <img
            src={logoBio}
            alt="Wake BioHotel"
            style={{ height: '64px', width: 'auto', objectFit: 'contain' }}
          />
        </div>

        {/* Divider tagline */}
        <div
          className="font-mono-dm text-[10px] tracking-widest uppercase mb-10 flex items-center justify-center gap-3"
          style={{ color: 'rgba(241,240,235,0.6)' }}
        >
          <div className="w-8 h-px bg-current" />
          BioRoom Experience
          <div className="w-8 h-px bg-current" />
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Lora', serif",
            fontWeight: 400,
            fontSize: '1.875rem',
            lineHeight: 1.25,
            color: '#F1F0EB',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
            marginBottom: '1rem',
            maxWidth: '18rem',
          }}
        >
          {c.title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: '0.875rem',
            lineHeight: 1.7,
            color: '#F1F0EB',
            opacity: 0.75,
            maxWidth: '17rem',
            marginBottom: '3rem',
          }}
        >
          {c.subtitle}
        </p>

        {/* CTA Button */}
        <motion.button
          onClick={handleStart}
          animate={
            bouncing
              ? { scale: [1, 1.14, 0.88, 1.07, 0.97, 1] }
              : { scale: 1 }
          }
          transition={{ duration: 0.38, ease: 'easeInOut' }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: '#E4E2DB',
            color: '#616652',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: '0.8125rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '1rem 2.5rem',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-block',
          }}
        >
          {c.cta}
        </motion.button>
      </div>

      {/* ── Keyframe animations ── */}
      <style>{`
        @keyframes manchaPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 0.30;
          }
          40% {
            transform: translate(-50%, -50%) scale(1.12) rotate(3deg);
            opacity: 0.42;
          }
          70% {
            transform: translate(-50%, -50%) scale(0.94) rotate(-2deg);
            opacity: 0.24;
          }
        }
      `}</style>
    </motion.div>
  )
}
