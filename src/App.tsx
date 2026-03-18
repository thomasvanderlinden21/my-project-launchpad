import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import LandingPage from './pages/LandingPage'
import ComponentOverview from './pages/ComponentOverview'
import ComponentDetail from './pages/ComponentDetail'
import Portal from './pages/Portal'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"                  element={<LandingPage />} />
          <Route path="/components"        element={<ComponentOverview />} />
          <Route path="/components/button" element={<ComponentDetail />} />
          <Route path="/portal"            element={<Portal />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
