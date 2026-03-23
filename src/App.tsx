import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AIAssistantProvider } from './context/AIAssistantContext'
import LandingPage from './pages/LandingPage'
import ComponentOverview from './pages/ComponentOverview'
import ComponentDetail from './pages/ComponentDetail'
import Portal from './pages/Portal'

function AppRoutes() {
  const location = useLocation()

  return (
    <Routes>
      <Route path="/"                  element={<Portal key={location.pathname} />} />
      <Route path="/portal-v2"         element={<Portal key={location.pathname} variant="v2" />} />
      <Route path="/landing"           element={<LandingPage />} />
      <Route path="/components"        element={<ComponentOverview />} />
      <Route path="/components/button" element={<ComponentDetail />} />
    </Routes>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AIAssistantProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AIAssistantProvider>
    </ThemeProvider>
  )
}
