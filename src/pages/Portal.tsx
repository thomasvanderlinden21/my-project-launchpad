import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useAIAssistant } from '../context/AIAssistantContext'
import Sidebar from '../components/Sidebar'
import TopToolbar from '../components/TopToolbar'
import type { Breadcrumb } from '../components/TopToolbar'
import SpotlightSearch from '../components/SpotlightSearch'
import AIAssistantPanel from '../components/AIAssistantPanel'
import StatusTracker from '../components/StatusTracker'
import type { StatusStep } from '../components/StatusTracker'
import EmptyState from '../components/EmptyState'
import Icon from '../components/Icon'
import Chip from '../components/Chip'
import SalesPage from './SalesPage'
import OrdersPage from './OrdersPage'
import InvoicesPage from './InvoicesPage'
import ReportsPage from './ReportsPage'
import DisputesPage from './DisputesPage'
import TerminalsPage from './TerminalsPage'
import TerminalDetailPage from './TerminalDetailPage'
import SettingsPage from './SettingsPage'
import './Portal.css'

// Navigation item to label mapping
const navLabels: Record<string, string> = {
  home: 'Home',
  // Sales sub-items
  transactions: 'Transactions',
  orders: 'Orders',
  invoices: 'Invoices',
  reports: 'Reports',
  disputes: 'Disputes',
  // Settings sub-items
  overview: 'Settings overview',
  users: 'Users',
  'company-details': 'Company details',
  'ecommerce': 'E-commerce',
  fraud: 'Fraud',
  'branding': 'Your branding',
  'terminals-settings': 'Terminals',
  'bank-accounts': 'Bank accounts',
  contracts: 'Contracts',
  'personal-details': 'Personal details',
  preferences: 'Preferences',
  // Other pages
  terminals: 'Terminals',
  'create-payment': 'Create Payment',
  'product-catalogue': 'Product Catalogue',
  'my-business': 'My Business',
  'card-issuing': 'Card Issuing',
  'cash-advance': 'Cash Advance',
  settings: 'Settings',
  notifications: 'Notifications',
  help: 'Help',
  'ai-assistant': 'AI Assistant',
}

export default function Portal() {
  const [activeNav, setActiveNav] = useState('home')
  const [activeSalesSubItem, setActiveSalesSubItem] = useState('transactions')
  const [activeSettingsSubItem, setActiveSettingsSubItem] = useState('overview')
  const [selectedTerminalId, setSelectedTerminalId] = useState<string | null>(null)
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false)
  const [selectedShopIds, setSelectedShopIds] = useState(['2'])
  const [currentAccountId, setCurrentAccountId] = useState('1')
  const [chartTooltip, setChartTooltip] = useState<{ x: number; y: number; month: string; success: number; volume: number } | null>(null)
  const { toggle } = useTheme()
  const { isOpen: isAIAssistantOpen, togglePanel, updateContext } = useAIAssistant()

  const shops = [
    { id: '1', name: 'Cycle shop #1' },
    { id: '2', name: 'Cycle shop #2' },
    { id: '3', name: 'Cycle shop #3' }
  ]

  const accounts = [
    { id: '1', name: 'Olivia Martinez', email: 'olivia@cycleshop.com' },
    { id: '2', name: 'Olivia Martinez', email: 'olivia@urbanbakery.com' }
  ]

  const currentAccount = accounts.find(acc => acc.id === currentAccountId) || accounts[0]

  // Determine which page we're actually on
  const getCurrentPage = () => {
    if (activeNav === 'sales') {
      return activeSalesSubItem
    }
    if (activeNav === 'settings') {
      return activeSettingsSubItem
    }
    return activeNav
  }

  // Generate breadcrumbs based on active navigation
  const getBreadcrumbs = (): Breadcrumb[] => {
    const currentPage = getCurrentPage()

    // Home doesn't show a second level
    if (currentPage === 'home') {
      return [{ label: 'Home' }]
    }

    // Settings overview should show "Home / Settings"
    if (currentPage === 'overview') {
      return [
        {
          label: 'Home',
          onClick: () => setActiveNav('home')
        },
        {
          label: 'Settings'
        }
      ]
    }

    // Settings sub-pages should show "Home / Settings / Page Name"
    if (activeNav === 'settings' && currentPage !== 'overview') {
      return [
        {
          label: 'Home',
          onClick: () => setActiveNav('home')
        },
        {
          label: 'Settings',
          onClick: () => setActiveSettingsSubItem('overview')
        },
        {
          label: navLabels[currentPage] || currentPage
        }
      ]
    }

    // Terminal detail page shows: Home > Terminals > Terminal Name
    if (currentPage === 'terminals' && selectedTerminalId) {
      // Map terminal IDs to names for breadcrumb
      const terminalNames: Record<string, string> = {
        '1': 'Outside #1',
        '2': 'Inside #1',
        '3': 'Mobile #1',
        '4': 'Terminal #4',
        '5': 'Terminal #5',
        '6': 'Card Reader #1',
        '7': 'Receipt Printer #1'
      }

      return [
        {
          label: 'Home',
          onClick: () => setActiveNav('home')
        },
        {
          label: 'Terminals',
          onClick: () => setSelectedTerminalId(null)
        },
        {
          label: terminalNames[selectedTerminalId] || 'Terminal Detail'
        }
      ]
    }

    // All other pages show: Home > Page Name
    return [
      {
        label: 'Home',
        onClick: () => setActiveNav('home')
      },
      {
        label: navLabels[currentPage] || currentPage
      }
    ]
  }

  const handleNavigate = (navItem: string) => {
    setActiveNav(navItem)

    // If navigating to sales, show transactions by default
    if (navItem === 'sales') {
      setActiveSalesSubItem('transactions')
    }
    // If navigating to settings, show overview by default
    if (navItem === 'settings') {
      setActiveSettingsSubItem('overview')
    }
    // If navigating to terminals, clear selected terminal to show overview
    if (navItem === 'terminals') {
      setSelectedTerminalId(null)
    }
  }

  const handlePersonalDetails = () => {
    setActiveNav('settings')
    setActiveSettingsSubItem('personal-details')
  }

  const handlePreferences = () => {
    setActiveNav('settings')
    setActiveSettingsSubItem('preferences')
  }

  const handleSignOut = () => {
    console.log('Sign out clicked')
    // Handle sign out logic
  }

  const handleAddAccount = () => {
    console.log('Add account clicked')
  }

  const handleAIAssistantToggle = () => {
    togglePanel()
  }

  // Update AI context when page changes
  useEffect(() => {
    const currentPage = getCurrentPage()
    const pageTitle = navLabels[currentPage] || 'Home'

    updateContext({
      page: currentPage,
      pageTitle,
      pageData: {},
      availableActions: [],
    })
  }, [activeNav, activeSalesSubItem, activeSettingsSubItem, updateContext])

  const currentPage = getCurrentPage()

  // Chart data for performance overview
  const chartData = [
    { month: 'Jan', success: 72, volume: 85 },
    { month: 'Feb', success: 74, volume: 83 },
    { month: 'Mar', success: 76, volume: 82 },
    { month: 'Apr', success: 78, volume: 80 },
    { month: 'May', success: 82, volume: 78 },
    { month: 'Jun', success: 84, volume: 75 },
    { month: 'Jul', success: 85, volume: 74 },
    { month: 'Aug', success: 87, volume: 72 },
    { month: 'Sep', success: 86, volume: 68 },
    { month: 'Oct', success: 88, volume: 65 },
    { month: 'Nov', success: 90, volume: 60 },
    { month: 'Dec', success: 92, volume: 55 },
  ]

  // Terminal delivery status steps
  const terminalStatusSteps: StatusStep[] = [
    {
      id: 'ordered',
      label: 'Terminal ordered',
      sublabel: 'March 10, 2026',
      status: 'completed'
    },
    {
      id: 'processing',
      label: 'Order processing',
      sublabel: 'March 11, 2026',
      status: 'completed'
    },
    {
      id: 'shipped',
      label: 'Shipped',
      sublabel: 'March 13, 2026',
      status: 'completed'
    },
    {
      id: 'delivered',
      label: 'Delivered',
      sublabel: 'Expected March 18, 2026',
      status: 'current'
    }
  ]

  return (
    <div className="portal">
      <Sidebar
        activeItem={activeNav}
        onNavigate={handleNavigate}
        activeSalesSubItem={activeSalesSubItem}
        onSalesSubNavigate={setActiveSalesSubItem}
        activeSettingsSubItem={activeSettingsSubItem}
        onSettingsSubNavigate={setActiveSettingsSubItem}
        onAIAssistantClick={handleAIAssistantToggle}
      />
      <div className={`portal__page${isAIAssistantOpen ? ' portal__page--ai-open' : ''}`}>
        <TopToolbar
          breadcrumbs={getBreadcrumbs()}
          shops={shops}
          selectedShopIds={selectedShopIds}
          onSelectShops={setSelectedShopIds}
          currentAccount={currentAccount}
          accounts={accounts}
          onSelectAccount={setCurrentAccountId}
          onAddAccount={handleAddAccount}
          onPersonalDetails={handlePersonalDetails}
          onPreferences={handlePreferences}
          onSignOut={handleSignOut}
          userInitials="OM"
          onSearch={() => setIsSpotlightOpen(true)}
        />
        <main className="portal__main">
          {activeNav === 'sales' && activeSalesSubItem === 'transactions' ? (
            <SalesPage />
          ) : activeNav === 'sales' && activeSalesSubItem === 'orders' ? (
            <OrdersPage onNavigateHome={() => setActiveNav('home')} />
          ) : activeNav === 'sales' && activeSalesSubItem === 'invoices' ? (
            <InvoicesPage onNavigateHome={() => setActiveNav('home')} />
          ) : activeNav === 'sales' && activeSalesSubItem === 'reports' ? (
            <ReportsPage onNavigateHome={() => setActiveNav('home')} />
          ) : activeNav === 'sales' && activeSalesSubItem === 'disputes' ? (
            <DisputesPage onNavigateHome={() => setActiveNav('home')} />
          ) : activeNav === 'settings' ? (
            <SettingsPage activeSection={activeSettingsSubItem} onNavigate={setActiveSettingsSubItem} />
          ) : activeNav === 'terminals' && selectedTerminalId ? (
            <TerminalDetailPage
              terminalId={selectedTerminalId}
              onBack={() => setSelectedTerminalId(null)}
            />
          ) : activeNav === 'terminals' ? (
            <TerminalsPage
              onTerminalClick={(id) => setSelectedTerminalId(id)}
              onOpenSettings={() => {
                setActiveNav('settings')
                setActiveSettingsSubItem('terminals-settings')
              }}
            />
          ) : activeNav === 'create-payment' ? (
            <div className="portal__empty-page">
              <EmptyState
                icon="credit-card"
                title="Create payment coming soon"
                description="Generate payment links, create invoices, and send payment requests to customers. This feature will be available in an upcoming release."
                variant="left-aligned"
                action={{
                  label: 'Go to Home',
                  onClick: () => setActiveNav('home')
                }}
              />
            </div>
          ) : activeNav === 'product-catalogue' ? (
            <div className="portal__empty-page">
              <EmptyState
                icon="shopping-basket"
                title="Product catalogue coming soon"
                description="Manage your product inventory, set pricing, add product descriptions and images, and organize items into categories. This feature will be available in an upcoming release."
                variant="left-aligned"
                action={{
                  label: 'Go to Home',
                  onClick: () => setActiveNav('home')
                }}
              />
            </div>
          ) : activeNav === 'my-business' ? (
            <div className="portal__empty-page">
              <EmptyState
                icon="apartment"
                title="My business coming soon"
                description="View business insights, track performance metrics, manage locations, and access key business analytics. This feature will be available in an upcoming release."
                variant="left-aligned"
                action={{
                  label: 'Go to Home',
                  onClick: () => setActiveNav('home')
                }}
              />
            </div>
          ) : activeNav === 'card-issuing' ? (
            <div className="portal__empty-page">
              <EmptyState
                icon="card"
                title="Card issuing coming soon"
                description="Issue virtual and physical cards, manage card spending limits, track card transactions, and configure card controls. This feature will be available in an upcoming release."
                variant="left-aligned"
                action={{
                  label: 'Go to Home',
                  onClick: () => setActiveNav('home')
                }}
              />
            </div>
          ) : activeNav === 'cash-advance' ? (
            <div className="portal__empty-page">
              <EmptyState
                icon="cash"
                title="Cash advance coming soon"
                description="Access flexible funding options, view advance offers, manage repayment schedules, and track outstanding balances. This feature will be available in an upcoming release."
                variant="left-aligned"
                action={{
                  label: 'Go to Home',
                  onClick: () => setActiveNav('home')
                }}
              />
            </div>
          ) : (
            <div className="portal__home">
              <div className="portal__home-header">
                <div className="portal__home-header-text">
                  <h1 className="portal__home-title">
                    Welcome back, Olivia
                  </h1>
                  <p className="portal__home-subtitle">
                    Track, manage and forecast your customers and orders.
                  </p>
                </div>
                <div className="portal__home-actions">
                  <button className="portal__home-btn portal__home-btn--secondary">
                    <Icon name="import" size={20} />
                    Import
                  </button>
                  <button className="portal__home-btn portal__home-btn--primary">
                    Add account
                  </button>
                </div>
              </div>

              <div className="portal__metrics">
                <div className="portal__metric-card">
                  <div className="portal__metric-row">
                    <span className="portal__metric-label">Conversion rate</span>
                    <button className="portal__metric-menu" aria-label="More options">
                      <Icon name="dots-vertical" size={20} />
                    </button>
                  </div>
                  <div className="portal__metric-row">
                    <div className="portal__metric-value">71.85%</div>
                    <Chip
                      label="8.0%"
                      variant="success"
                      icon={<Icon name="arrow-up" size={16} />}
                    />
                  </div>
                </div>

                <div className="portal__metric-card">
                  <div className="portal__metric-row">
                    <span className="portal__metric-label">Paid transactions</span>
                    <button className="portal__metric-menu" aria-label="More options">
                      <Icon name="dots-vertical" size={20} />
                    </button>
                  </div>
                  <div className="portal__metric-row">
                    <div className="portal__metric-value">3,399</div>
                    <Chip
                      label="3.2%"
                      variant="warning"
                      icon={<Icon name="arrow-down" size={16} />}
                    />
                  </div>
                </div>

                <div className="portal__metric-card">
                  <div className="portal__metric-row">
                    <span className="portal__metric-label">Paid amount</span>
                    <button className="portal__metric-menu" aria-label="More options">
                      <Icon name="dots-vertical" size={20} />
                    </button>
                  </div>
                  <div className="portal__metric-row">
                    <div className="portal__metric-value">925.133</div>
                    <Chip
                      label="8.0%"
                      variant="success"
                      icon={<Icon name="arrow-up" size={16} />}
                    />
                  </div>
                </div>

                <div className="portal__metric-card">
                  <div className="portal__metric-row">
                    <span className="portal__metric-label">Paid ATV</span>
                    <button className="portal__metric-menu" aria-label="More options">
                      <Icon name="dots-vertical" size={20} />
                    </button>
                  </div>
                  <div className="portal__metric-row">
                    <div className="portal__metric-value">71.272</div>
                    <Chip
                      label="8.0%"
                      variant="success"
                      icon={<Icon name="arrow-up" size={16} />}
                    />
                  </div>
                </div>
              </div>

              <div className="portal__charts">
                <div className="portal__chart-card portal__chart-card--large">
                  <div className="portal__chart-header">
                    <h3 className="portal__chart-title">Performance overview</h3>
                    <select className="portal__chart-dropdown">
                      <option>Year</option>
                    </select>
                  </div>
                  <div className="portal__chart-content" style={{ position: 'relative' }}>
                    <svg viewBox="0 0 600 220" className="portal__line-chart">
                      <defs>
                        <filter id="teal-glow">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                          <feComponentTransfer>
                            <feFuncA type="linear" slope="0.5" />
                          </feComponentTransfer>
                        </filter>
                        <filter id="orange-glow">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                          <feComponentTransfer>
                            <feFuncA type="linear" slope="0.5" />
                          </feComponentTransfer>
                        </filter>
                      </defs>

                      {/* Background grid lines */}
                      <line x1="0" y1="40" x2="600" y2="40" stroke="#d5d7da" strokeWidth="1" opacity="0.5" />
                      <line x1="0" y1="80" x2="600" y2="80" stroke="#d5d7da" strokeWidth="1" opacity="0.5" />
                      <line x1="0" y1="120" x2="600" y2="120" stroke="#d5d7da" strokeWidth="1" opacity="0.5" />
                      <line x1="0" y1="160" x2="600" y2="160" stroke="#d5d7da" strokeWidth="1" opacity="0.5" />
                      <line x1="0" y1="200" x2="600" y2="200" stroke="#d5d7da" strokeWidth="1" opacity="0.5" />

                      {/* Glow effect for teal line */}
                      <path d="M 0 155 C 50 150, 100 145, 150 130 S 250 105, 300 100 S 450 85, 500 65 S 550 45, 600 35"
                        stroke="#2c9d96" strokeWidth="2" fill="none" filter="url(#teal-glow)" opacity="0.6" />

                      {/* Glow effect for orange line */}
                      <path d="M 0 175 C 50 170, 100 168, 150 160 S 250 150, 300 145 S 450 125, 500 110 S 550 90, 600 80"
                        stroke="#d89d3f" strokeWidth="2" fill="none" filter="url(#orange-glow)" opacity="0.6" />

                      {/* Main teal line */}
                      <path d="M 0 155 C 50 150, 100 145, 150 130 S 250 105, 300 100 S 450 85, 500 65 S 550 45, 600 35"
                        stroke="#2c9d96" strokeWidth="2" fill="none" />

                      {/* Main orange line */}
                      <path d="M 0 175 C 50 170, 100 168, 150 160 S 250 150, 300 145 S 450 125, 500 110 S 550 90, 600 80"
                        stroke="#d89d3f" strokeWidth="2" fill="none" />

                      {/* Hover zones */}
                      {chartData.map((data, i) => {
                        const x = (i / 11) * 600
                        const successY = 200 - (data.success * 2)
                        const volumeY = 200 - (data.volume * 2)
                        return (
                          <g key={data.month}>
                            <rect
                              x={i === 0 ? 0 : x - 25}
                              y={0}
                              width={i === 0 || i === 11 ? 25 : 50}
                              height={220}
                              fill="transparent"
                              style={{ cursor: 'pointer' }}
                              onMouseEnter={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect()
                                setChartTooltip({
                                  x: rect.left + rect.width / 2,
                                  y: rect.top,
                                  month: data.month,
                                  success: data.success,
                                  volume: data.volume
                                })
                              }}
                              onMouseLeave={() => setChartTooltip(null)}
                            />
                          </g>
                        )
                      })}
                    </svg>
                    <div className="portal__chart-months">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                        <span key={month} className="portal__chart-month">{month}</span>
                      ))}
                    </div>
                    {chartTooltip && (
                      <div
                        className="portal__chart-tooltip"
                        style={{
                          position: 'fixed',
                          left: chartTooltip.x,
                          top: chartTooltip.y - 10,
                          transform: 'translate(-50%, -100%)',
                        }}
                      >
                        <div className="portal__chart-tooltip-month">{chartTooltip.month}</div>
                        <div className="portal__chart-tooltip-row">
                          <span className="portal__chart-tooltip-dot portal__chart-tooltip-dot--teal"></span>
                          <span className="portal__chart-tooltip-label">Success rate:</span>
                          <span className="portal__chart-tooltip-value">{chartTooltip.success}%</span>
                        </div>
                        <div className="portal__chart-tooltip-row">
                          <span className="portal__chart-tooltip-dot portal__chart-tooltip-dot--orange"></span>
                          <span className="portal__chart-tooltip-label">Transaction volume:</span>
                          <span className="portal__chart-tooltip-value">{chartTooltip.volume}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="portal__chart-legend">
                    <div className="portal__legend-item">
                      <span className="portal__legend-dot portal__legend-dot--teal"></span>
                      <span className="portal__legend-label">Success rate</span>
                    </div>
                    <div className="portal__legend-item">
                      <span className="portal__legend-dot portal__legend-dot--orange"></span>
                      <span className="portal__legend-label">Daily transaction volume (EUR)</span>
                    </div>
                  </div>
                </div>

                <div className="portal__chart-card">
                  <div className="portal__chart-header">
                    <button className="portal__chart-nav" aria-label="Previous">
                      <Icon name="chevron-left" size={20} />
                    </button>
                    <h3 className="portal__chart-title">Transactions by type</h3>
                    <button className="portal__chart-nav" aria-label="Next">
                      <Icon name="chevron-right" size={20} />
                    </button>
                  </div>
                  <div className="portal__chart-content portal__chart-content--center">
                    <svg viewBox="0 0 380 200" className="portal__semicircular-chart">
                      <g>
                        {/* Generate radial dash segments */}
                        {Array.from({ length: 72 }).map((_, i) => {
                          const percentage = 0.85
                          const angle = (i / 72) * 180 + 180 // Top half circle (180 to 360 degrees)
                          const angleRad = (angle * Math.PI) / 180
                          const cx = 190
                          const cy = 185
                          const r1 = 130
                          const r2 = 155
                          const x1 = cx + r1 * Math.cos(angleRad)
                          const y1 = cy + r1 * Math.sin(angleRad)
                          const x2 = cx + r2 * Math.cos(angleRad)
                          const y2 = cy + r2 * Math.sin(angleRad)
                          const isFilled = i < percentage * 72
                          const color = isFilled ? '#2c9d96' : '#e6ebeb'

                          return (
                            <line
                              key={i}
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke={color}
                              strokeWidth="2"
                              strokeLinecap="butt"
                            />
                          )
                        })}
                        {/* Additional line on the right side */}
                        <line
                          x1={190 + 130}
                          y1={185}
                          x2={190 + 155}
                          y2={185}
                          stroke="#e6ebeb"
                          strokeWidth="2"
                          strokeLinecap="butt"
                        />
                      </g>
                      <text x="190" y="145" textAnchor="middle" className="portal__chart-percentage">85%</text>
                      <text x="190" y="170" textAnchor="middle" className="portal__chart-label">Paid transaction</text>
                    </svg>
                  </div>
                  <div className="portal__chart-legend portal__chart-legend--centered">
                    <div className="portal__legend-item">
                      <span className="portal__legend-dot portal__legend-dot--teal"></span>
                      <span className="portal__legend-label">Sales</span>
                    </div>
                    <div className="portal__legend-item">
                      <span className="portal__legend-dot portal__legend-dot--gray"></span>
                      <span className="portal__legend-label">Chargebacks</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="portal__notifications">
                <h3 className="portal__notifications-title">Notifications</h3>
                <div className="portal__notifications-grid">
                  <div className="portal__notification-card">
                    <div className="portal__notification-icon portal__notification-icon--success">
                      <Icon name="check-circle" size={20} />
                    </div>
                    <div className="portal__notification-content">
                      <h4 className="portal__notification-title">Weekly goal achieved</h4>
                      <p className="portal__notification-text">Transaction volume exceeded target by 12%</p>
                    </div>
                  </div>

                  <div className="portal__notification-card portal__notification-card--highlight">
                    <div className="portal__notification-icon portal__notification-icon--info">
                      <Icon name="bell" size={20} />
                    </div>
                    <div className="portal__notification-content">
                      <h4 className="portal__notification-title">New market opportunity</h4>
                      <p className="portal__notification-text">Strong growth detected in European markets</p>
                    </div>
                  </div>

                  <div className="portal__notification-card">
                    <div className="portal__notification-icon portal__notification-icon--warning">
                      <Icon name="alert-circle" size={20} />
                    </div>
                    <div className="portal__notification-content">
                      <h4 className="portal__notification-title">System maintenance</h4>
                      <p className="portal__notification-text">Scheduled maintenance tonight at 2 AM UTC.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <SpotlightSearch
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
      />
      <AIAssistantPanel
        isOpen={isAIAssistantOpen}
        onClose={togglePanel}
      />
    </div>
  )
}
