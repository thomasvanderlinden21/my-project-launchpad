import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAIAssistant } from '../context/AIAssistantContext'
import Sidebar from '../components/Sidebar'
import TopToolbar from '../components/TopToolbar'
import type { Breadcrumb } from '../components/TopToolbar'
import SpotlightSearch from '../components/SpotlightSearch'
import AIAssistantPanel from '../components/AIAssistantPanel'
import ProgressStepper from '../components/ProgressStepper'
import type { ProgressStep } from '../components/ProgressStepper'
import EmptyState from '../components/EmptyState'
import Icon from '../components/Icon'
import Chip from '../components/Chip'
import PerformanceChart from '../components/PerformanceChart'
import TransactionTypeChart from '../components/TransactionTypeChart'
import SalesPage from './SalesPage'
import OrdersPage from './OrdersPage'
import InvoicesPage from './InvoicesPage'
import ReportsPage from './ReportsPage'
import DisputesPage from './DisputesPage'
import TerminalsPage from './TerminalsPage'
import TerminalDetailPage from './TerminalDetailPage'
import SettingsPage from './SettingsPage'
import PayoutsPage from './PayoutsPage'
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
  // My Business sub-items
  payouts: 'Payouts',
  documents: 'Documents',
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

interface PortalProps {
  variant?: 'v1' | 'v2'
}

export default function Portal({ variant = 'v1' }: PortalProps) {
  console.log('[Portal] Rendering, variant:', variant)

  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('home')

  // Log when Portal unmounts
  useEffect(() => {
    console.log('[Portal] Mounted')
    return () => {
      console.log('[Portal] Unmounting!')
    }
  }, [])
  const [activeSalesSubItem, setActiveSalesSubItem] = useState('transactions')
  const [activeSettingsSubItem, setActiveSettingsSubItem] = useState('overview')
  const [activeMyBusinessSubItem, setActiveMyBusinessSubItem] = useState('payouts')
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
    if (activeNav === 'my-business') {
      return activeMyBusinessSubItem
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

    // My Business sub-pages should show "Home / My Business / Page Name"
    if (activeNav === 'my-business') {
      return [
        {
          label: 'Home',
          onClick: () => setActiveNav('home')
        },
        {
          label: 'My Business',
          onClick: () => setActiveMyBusinessSubItem('payouts')
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
    // If navigating to my-business, show payouts by default
    if (navItem === 'my-business') {
      setActiveMyBusinessSubItem('payouts')
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
    console.log('Navigating to /landing')
    navigate('/landing', { replace: true })
  }

  const handleAddAccount = () => {
    console.log('Add account clicked')
  }

  const handleAIAssistantToggle = () => {
    togglePanel()
  }

  const handleAINavigate = (target: string) => {
    // Handle special navigation from AI assistant
    console.log('handleAINavigate called with:', target)
    if (target.startsWith('terminal:')) {
      const terminalId = target.replace('terminal:', '')
      console.log('Navigating to terminal ID:', terminalId)
      setActiveNav('terminals')
      setSelectedTerminalId(terminalId)
    }
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
  }, [activeNav, activeSalesSubItem, activeSettingsSubItem, activeMyBusinessSubItem, updateContext])

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
  const terminalStatusSteps: ProgressStep[] = [
    {
      id: 'ordered',
      title: 'Terminal ordered',
      description: 'Order confirmed and payment processed',
      date: '10 March 2025',
      status: 'complete'
    },
    {
      id: 'shipped',
      title: 'Shipped',
      description: 'Package is on the way to your location',
      date: '13 March 2025',
      status: 'in-progress'
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Expected arrival at your address',
      date: '18 March 2025',
      status: 'to-do'
    }
  ]

  return (
    <div className={`portal ${variant === 'v2' ? 'portal--v2' : ''}`}>
      {variant === 'v2' && (
        <div className="portal__v2-banner">Portal V2</div>
      )}
      <Sidebar
        activeItem={activeNav}
        onNavigate={handleNavigate}
        activeSalesSubItem={activeSalesSubItem}
        onSalesSubNavigate={setActiveSalesSubItem}
        activeSettingsSubItem={activeSettingsSubItem}
        onSettingsSubNavigate={setActiveSettingsSubItem}
        activeMyBusinessSubItem={activeMyBusinessSubItem}
        onMyBusinessSubNavigate={setActiveMyBusinessSubItem}
        onAIAssistantClick={handleAIAssistantToggle}
        enableMyBusinessSubmenu={variant === 'v2'}
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
          ) : activeNav === 'my-business' && variant === 'v2' && activeMyBusinessSubItem === 'payouts' ? (
            <PayoutsPage />
          ) : activeNav === 'my-business' && variant === 'v2' && activeMyBusinessSubItem === 'invoices' ? (
            <div className="portal__empty-page">
              <EmptyState
                icon="receipt"
                title="Invoices coming soon"
                description="View and manage your business invoices. This feature will be available in an upcoming release."
                variant="left-aligned"
                action={{
                  label: 'Go to Home',
                  onClick: () => setActiveNav('home')
                }}
              />
            </div>
          ) : activeNav === 'my-business' && variant === 'v2' && activeMyBusinessSubItem === 'documents' ? (
            <div className="portal__empty-page">
              <EmptyState
                icon="folder"
                title="Documents coming soon"
                description="Access your business documents and contracts. This feature will be available in an upcoming release."
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
                      variant="error"
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

              <div className="portal__bottom-section">
                <div className="portal__chart-card">
                  <h3 className="portal__chart-title portal__chart-title--stepper">Terminal delivery status</h3>
                  <ProgressStepper
                    steps={terminalStatusSteps}
                  />
                </div>

                <div className="portal__notifications-container">
                  <h3 className="portal__notifications-title">Notifications</h3>
                  <div className="portal__notifications-list">
                    <div className="portal__notification-card">
                      <div className="portal__notification-icon portal__notification-icon--success">
                        <Icon name="check-circle" size={20} />
                      </div>
                      <div className="portal__notification-content">
                        <h4 className="portal__notification-title">Weekly goal achieved</h4>
                        <p className="portal__notification-text">Transaction volume exceeded target by 12%</p>
                      </div>
                    </div>

                    <div className="portal__notification-card">
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

              <div className="portal__charts-grid">
                <PerformanceChart />
                <TransactionTypeChart />
              </div>
            </div>
          )}
        </main>
      </div>
      <SpotlightSearch
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        onNavigate={(page, subPage) => {
          setActiveNav(page)
          if (page === 'sales' && subPage) {
            setActiveSalesSubItem(subPage)
          } else if (page === 'settings' && subPage) {
            setActiveSettingsSubItem(subPage)
          }
        }}
        onTerminalNavigate={(terminalId) => {
          setActiveNav('terminals')
          setSelectedTerminalId(terminalId)
        }}
      />
      <AIAssistantPanel
        isOpen={isAIAssistantOpen}
        onClose={togglePanel}
        onNavigate={handleAINavigate}
        onPageNavigate={(page, subPage) => {
          console.log('AI Page navigate:', page, subPage)
          setActiveNav(page)
          if (page === 'sales' && subPage) {
            setActiveSalesSubItem(subPage)
          } else if (page === 'settings' && subPage) {
            setActiveSettingsSubItem(subPage)
          } else if (page === 'my-business' && subPage) {
            setActiveMyBusinessSubItem(subPage)
          }
        }}
      />
    </div>
  )
}
