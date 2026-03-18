import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { SunIcon, MoonIcon, ArrowRightIcon } from '../components/icons'
import './LandingPage.css'

const navCards = [
  {
    title: 'Component Overview',
    desc: 'Browse and test all Aurora Design System components and variants',
    to: '/components',
  },
  {
    title: 'Merchant Portal',
    desc: 'Preview the Worldline merchant onboarding experience',
    to: '/portal',
  },
]

export default function LandingPage() {
  const { isDark, toggle } = useTheme()

  return (
    <div className="landing-page">
      <header className="landing-header">
        <Link to="/" className="landing-logo">WORLDLINE</Link>
        <button
          className="landing-theme-btn"
          onClick={toggle}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>

      <main className="landing-main">
        <div className="landing-hero">
          <h1 className="landing-hero-title">Aurora Design System</h1>
          <p className="landing-hero-subtitle">Component library and design previews</p>
        </div>

        <nav className="landing-cards" aria-label="Site sections">
          {navCards.map(card => (
            <Link key={card.to} to={card.to} className="landing-card">
              <div className="landing-card-content">
                <span className="landing-card-title">{card.title}</span>
                <span className="landing-card-desc">{card.desc}</span>
              </div>
              <span className="landing-card-arrow">
                <ArrowRightIcon />
              </span>
            </Link>
          ))}
        </nav>
      </main>
    </div>
  )
}
