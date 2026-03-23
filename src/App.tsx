import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AIAssistantProvider } from './context/AIAssistantContext'
import LandingPage from './pages/LandingPage'
import ComponentOverview from './pages/ComponentOverview'
import ComponentDetail from './pages/ComponentDetail'
import Portal from './pages/Portal'

export default function App() {
  return (
    <ThemeProvider>
      <AIAssistantProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/"                  element={<Portal />} />
            <Route path="/portal-v2"         element={<Portal variant="v2" />} />
            <Route path="/landing"           element={<LandingPage />} />
            <Route path="/components"        element={<ComponentOverview />} />
            <Route path="/components/button" element={<ComponentDetail />} />
          </Routes>
        </BrowserRouter>
      </AIAssistantProvider>
    </ThemeProvider>
  )
}
