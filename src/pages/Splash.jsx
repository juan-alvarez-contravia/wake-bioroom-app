import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { content } from '../data/content'
import logoBio from '../assets/Logo-bio-blanco.webp'

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
      className="min-h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden"
      style={{ background: '#0d0d0d' }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.48, ease: 'easeInOut' }}
    >
      {/* ── Animated background blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Green blob — top-left */}
        <div
          className="splash-blob splash-blob-green"
          style={{
            position: 'absolute',
            width: '520px',
            height: '520px',
            top: '5%',
            left: '-8%',
            background: 'radial-gradient(circle at 55% 45%, #616652 0%, #3d4035 45%, transparent 72%)',
            filter: 'blur(90px)',
            opacity: 0.65,
            animation: 'blobGreen 13s ease-in-out infinite',
          }}
        />
        {/* Red blob — bottom-right */}
        <div
          style={{
            position: 'absolute',
            width: '480px',
            height: '480px',
            bottom: '0%',
            right: '-12%',
            background: 'radial-gradient(circle at 45% 55%, #722F15 0%, #4a1d0a 45%, transparent 72%)',
            filter: 'blur(100px)',
            opacity: 0.60,
            animation: 'blobRed 17s ease-in-out infinite',
          }}
        />
        {/* Center warm glow — subtle overlap */}
        <div
          style={{
            position: 'absolute',
            width: '340px',
            height: '340px',
            top: '28%',
            left: '18%',
            background: 'radial-gradient(circle, rgba(140,105,60,0.18) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'blobCenter 10s ease-in-out infinite',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div
        className="text-center relative z-10 flex flex-col items-center transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
        }}
      >
        {/* Logo image */}
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
          style={{ color: 'rgba(114, 47, 21, 0.75)' }}
        >
          <div className="w-8 h-px bg-current" />
          BioRoom Experience
          <div className="w-8 h-px bg-current" />
        </div>

        {/* Title — uppercase, Lora 400 */}
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

        {/* Subtitle — white, Montserrat */}
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: '0.875rem',
            lineHeight: 1.7,
            color: '#ffffff',
            opacity: 0.75,
            maxWidth: '17rem',
            marginBottom: '3rem',
          }}
        >
          {c.subtitle}
        </p>

        {/* CTA Button with bounce on click */}
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
            background: 'var(--green)',
            color: '#F1F0EB',
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
        @keyframes blobGreen {
          0%, 100% {
            border-radius: 62% 38% 34% 66% / 58% 32% 68% 42%;
            transform: translate(0, 0) scale(1);
          }
          30% {
            border-radius: 42% 58% 62% 38% / 44% 66% 34% 56%;
            transform: translate(6%, 8%) scale(1.06);
          }
          65% {
            border-radius: 55% 45% 38% 62% / 62% 38% 58% 42%;
            transform: translate(-4%, 12%) scale(0.94);
          }
        }
        @keyframes blobRed {
          0%, 100% {
            border-radius: 48% 52% 44% 56% / 42% 62% 38% 58%;
            transform: translate(0, 0) scale(1);
          }
          35% {
            border-radius: 66% 34% 56% 44% / 58% 42% 62% 38%;
            transform: translate(-7%, -8%) scale(1.08);
          }
          70% {
            border-radius: 34% 66% 48% 52% / 66% 34% 54% 46%;
            transform: translate(5%, -12%) scale(0.92);
          }
        }
        @keyframes blobCenter {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10%, 6%) scale(1.1); }
        }
      `}</style>
    </motion.div>
  )
}
