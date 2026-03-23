import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AIAssistantProvider } from './context/AIAssistantContext'
import LandingPage from './pages/LandingPage'
import ComponentOverview from './pages/ComponentOverview'
import ComponentDetail from './pages/ComponentDetail'
import Portal from './pages/Portal'

// Wrapper component that forces re-render on location change
function RouteWrapper() {
  const location = useLocation()

  // This component will re-render whenever location changes
  // and pass that to the Outlet which contains our actual routes
  return <Outlet key={location.pathname} />
}

export default function App() {
  return (
    <ThemeProvider>
      <AIAssistantProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<RouteWrapper />}>
              <Route path="/"                  element={<Portal />} />
              <Route path="/portal-v2"         element={<Portal variant="v2" />} />
              <Route path="/landing"           element={<LandingPage />} />
              <Route path="/components"        element={<ComponentOverview />} />
              <Route path="/components/button" element={<ComponentDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AIAssistantProvider>
    </ThemeProvider>
  )
}
