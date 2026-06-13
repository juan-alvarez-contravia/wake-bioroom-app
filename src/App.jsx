import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Splash from './pages/Splash'
import Home from './pages/Home'
import RoutineIntro from './pages/RoutineIntro'
import RoutineStep from './pages/RoutineStep'
import RoutineComplete from './pages/RoutineComplete'
import Gadgets from './pages/Gadgets'
import GadgetDetail from './pages/GadgetDetail'
import Complementos from './pages/Complementos'
import Help from './pages/Help'
import Language from './pages/Language'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Home />} />
          <Route path="/am" element={<RoutineIntro routine="am" />} />
          <Route path="/pm" element={<RoutineIntro routine="pm" />} />
          <Route path="/am/paso/:step" element={<RoutineStep routine="am" />} />
          <Route path="/pm/paso/:step" element={<RoutineStep routine="pm" />} />
          <Route path="/am/completa" element={<RoutineComplete routine="am" />} />
          <Route path="/pm/completa" element={<RoutineComplete routine="pm" />} />
          <Route path="/gadgets" element={<Gadgets />} />
          <Route path="/gadgets/:id" element={<GadgetDetail />} />
          <Route path="/complementos" element={<Complementos />} />
          <Route path="/ayuda" element={<Help />} />
          <Route path="/idioma" element={<Language />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
