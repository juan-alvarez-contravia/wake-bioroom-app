// ─── SHARED UI COMPONENTS ────────────────────────────────────────────────────

// Progress Bar
export function ProgressBar({ done, total, className = '' }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-1">
        <span className="font-mono-dm text-[10px] tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
          {done} / {total} pasos
        </span>
        <span className="font-mono-dm text-[10px]" style={{ color: 'var(--green)' }}>{pct}%</span>
      </div>
      <div className="w-full h-[3px] rounded-full" style={{ background: 'var(--border)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: 'var(--green)' }}
        />
      </div>
    </div>
  )
}

// Section Label (red small caps)
export function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-5 h-px" style={{ background: 'var(--red)' }} />
      <span className="font-mono-dm text-[10px] tracking-widest uppercase" style={{ color: 'var(--red)' }}>
        {children}
      </span>
    </div>
  )
}

// Tag pill
export function Tag({ children, color = 'muted' }) {
  const colors = {
    muted: { bg: 'var(--surface)', color: 'var(--muted)' },
    green: { bg: 'var(--green)', color: '#F1F0EB' },
    red: { bg: 'transparent', color: 'var(--red)', border: '1px solid var(--red)' },
  }
  const s = colors[color] || colors.muted
  return (
    <span
      className="inline-block px-3 py-1 font-mono-dm text-[10px] tracking-wider uppercase rounded-sm"
      style={{ background: s.bg, color: s.color, border: s.border }}
    >
      {children}
    </span>
  )
}

// Primary Button
export function BtnPrimary({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-4 font-sans text-sm font-semibold tracking-wider uppercase transition-all duration-200 active:scale-95 ${className}`}
      style={{ background: 'var(--green)', color: '#F1F0EB' }}
    >
      {children}
    </button>
  )
}

// Secondary Button
export function BtnSecondary({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-4 font-sans text-sm font-medium tracking-wider uppercase transition-all duration-200 active:scale-95 border ${className}`}
      style={{ background: 'transparent', color: 'var(--muted)', borderColor: 'var(--border)' }}
    >
      {children}
    </button>
  )
}

// App Link Button (deep link to native app)
export function BtnAppLink({ label, scheme }) {
  const handleOpen = () => {
    window.location.href = scheme
  }
  return (
    <button
      onClick={handleOpen}
      className="w-full py-4 flex items-center justify-center gap-2 font-sans text-sm font-semibold tracking-wider uppercase transition-all duration-200 active:scale-95 border"
      style={{ background: 'var(--black)', color: '#F1F0EB', borderColor: 'var(--black)' }}
    >
      <span>📲</span>
      {label}
    </button>
  )
}

// Warning Box
export function WarningBox({ children }) {
  return (
    <div
      className="px-4 py-3 text-sm leading-relaxed"
      style={{ borderLeft: '3px solid var(--red)', background: 'var(--surface)', color: 'var(--black)' }}
    >
      {children}
    </div>
  )
}

// Tip Box
export function TipBox({ children }) {
  return (
    <div
      className="px-4 py-3 text-sm leading-relaxed"
      style={{ borderLeft: '3px solid var(--green)', background: 'var(--surface)', color: 'var(--muted)' }}
    >
      💡 {children}
    </div>
  )
}

// Checklist Item
export function CheckItem({ text, checked, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-start gap-3 py-3 text-left transition-opacity duration-200"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div
        className="w-5 h-5 rounded-sm border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
        style={{
          background: checked ? 'var(--green)' : 'transparent',
          borderColor: checked ? 'var(--green)' : 'var(--border)',
        }}
      >
        {checked && <span className="text-white text-xs">✓</span>}
      </div>
      <span
        className="text-sm font-sans leading-relaxed"
        style={{ color: checked ? 'var(--muted)' : 'var(--black)', textDecoration: checked ? 'line-through' : 'none' }}
      >
        {text}
      </span>
    </button>
  )
}

// Benefit Item
export function BenefitItem({ text }) {
  return (
    <div className="flex items-start gap-3 py-2" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--green)' }} />
      <span className="text-sm font-sans" style={{ color: 'var(--black)' }}>{text}</span>
    </div>
  )
}

// Back Button
export function BackBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 font-mono-dm text-[11px] tracking-widest uppercase py-2"
      style={{ color: 'var(--muted)' }}
    >
      ← Volver
    </button>
  )
}

// Step Header (for routine steps)
export function StepHeader({ step, total, title, tag, icon }) {
  return (
    <div className="mb-6">
      <div className="font-mono-dm text-[10px] tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>
        Paso {step} de {total}
      </div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <h1 className="font-lora text-2xl font-bold leading-tight" style={{ color: 'var(--black)' }}>{title}</h1>
      </div>
      {tag && <Tag>{tag}</Tag>}
    </div>
  )
}

// Nav Bar Bottom
export function BottomNav({ active, onNav }) {
  const items = [
    { id: 'home', icon: '⌂', label: 'Inicio' },
    { id: 'am', icon: '☀️', label: 'AM' },
    { id: 'pm', icon: '🌙', label: 'PM' },
    { id: 'gadgets', icon: '🔬', label: 'Gadgets' },
    { id: 'help', icon: '❓', label: 'Ayuda' },
  ]
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex items-center z-50"
      style={{ background: '#F1F0EB', borderTop: '1px solid var(--border)' }}
    >
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => onNav(item.id)}
          className="flex-1 flex flex-col items-center py-3 gap-0.5 transition-all duration-200"
          style={{ color: active === item.id ? 'var(--green)' : 'var(--muted)' }}
        >
          <span className="text-lg leading-none">{item.icon}</span>
          <span className="font-mono-dm text-[9px] tracking-wider uppercase">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
