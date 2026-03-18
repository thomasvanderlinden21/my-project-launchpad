import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { SunIcon, MoonIcon } from '../components/icons'
import './SubPage.css'

export default function ComponentDetail() {
  const { isDark, toggle } = useTheme()

  return (
    <div className="subpage">
      <header className="subpage-header">
        <Link to="/components" className="subpage-back">← Back</Link>
        <span className="subpage-header-title">Button</span>
        <button
          className="subpage-theme-btn"
          onClick={toggle}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>

      <main className="subpage-main">
        <div className="subpage-content">
          <section className="subpage-section">
            <h2 className="subpage-section-title">Button Component</h2>
            <p style={{
              fontFamily: 'var(--font-family-secondary)',
              fontSize: 'var(--font-size-3xs)',
              lineHeight: 'var(--line-height-3xs)',
              color: 'var(--content-secondary)',
            }}>
              Detailed component documentation coming soon.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
