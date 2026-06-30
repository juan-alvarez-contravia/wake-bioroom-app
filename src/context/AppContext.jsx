import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('wake_lang') || 'es')
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('wake_completed_steps')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('wake_lang', lang)
  }, [lang])

  useEffect(() => {
    localStorage.setItem('wake_completed_steps', JSON.stringify(completedSteps))
  }, [completedSteps])

  const toggleStep = (stepId) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId],
    }))
  }

  const isCompleted = (stepId) => !!completedSteps[stepId]

  const getProgress = (steps) => {
    const done = steps.filter(s => completedSteps[s.id]).length
    return { done, total: steps.length, pct: Math.round((done / steps.length) * 100) }
  }

  const resetRoutine = (routineType) => {
    const prefix = routineType === 'am' ? 'am-' : 'pm-'
    setCompletedSteps(prev => {
      const next = { ...prev }
      Object.keys(next).forEach(k => { if (k.startsWith(prefix)) delete next[k] })
      return next
    })
  }

  return (
    <AppContext.Provider value={{ lang, setLang, completedSteps, toggleStep, isCompleted, getProgress, resetRoutine }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
