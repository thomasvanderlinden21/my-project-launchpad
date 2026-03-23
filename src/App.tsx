import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AIAssistantProvider } from './context/AIAssistantContext'
import { UserManagementProvider } from './context/UserManagementContext'
import LandingPage from './pages/LandingPage'
import ComponentOverview from './pages/ComponentOverview'
import ComponentDetail from './pages/ComponentDetail'
import Portal from './pages/Portal'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <UserManagementProvider>
          <AIAssistantProvider>
            <Routes>
              <Route path="/"                  element={<Portal />} />
              <Route path="/portal-v2"         element={<Portal variant="v2" />} />
              <Route path="/landing"           element={<LandingPage />} />
              <Route path="/components"        element={<ComponentOverview />} />
              <Route path="/components/button" element={<ComponentDetail />} />
            </Routes>
          </AIAssistantProvider>
        </UserManagementProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
