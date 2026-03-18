import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import Sidebar from '../components/Sidebar'
import TopToolbar from '../components/TopToolbar'
import type { Breadcrumb } from '../components/TopToolbar'
import SpotlightSearch from '../components/SpotlightSearch'
import AIAssistantPanel from '../components/AIAssistantPanel'
import StatusTracker from '../components/StatusTracker'
import type { StatusStep } from '../components/StatusTracker'
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
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false)
  const [selectedShopIds, setSelectedShopIds] = useState(['2'])
  const [currentAccountId, setCurrentAccountId] = useState('1')
  const { toggle } = useTheme()

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
    setIsAIAssistantOpen(prev => !prev)
  }

  const currentPage = getCurrentPage()

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
            <OrdersPage />
          ) : activeNav === 'sales' && activeSalesSubItem === 'invoices' ? (
            <InvoicesPage />
          ) : activeNav === 'sales' && activeSalesSubItem === 'reports' ? (
            <ReportsPage />
          ) : activeNav === 'sales' && activeSalesSubItem === 'disputes' ? (
            <DisputesPage />
          ) : activeNav === 'settings' ? (
            <SettingsPage activeSection={activeSettingsSubItem} onNavigate={setActiveSettingsSubItem} />
          ) : activeNav === 'terminals' && selectedTerminalId ? (
            <TerminalDetailPage
              terminalId={selectedTerminalId}
              onBack={() => setSelectedTerminalId(null)}
            />
          ) : activeNav === 'terminals' ? (
            <TerminalsPage onTerminalClick={(id) => setSelectedTerminalId(id)} />
          ) : (
            <div className="portal__welcome">
              <div className="portal__welcome-header">
                <h1 className="portal__welcome-title">
                  {currentPage === 'home'
                    ? 'Welcome back, Olivia'
                    : navLabels[currentPage] || currentPage
                  }
                </h1>
                <p className="portal__welcome-subtitle">
                  {currentPage === 'home'
                    ? 'Track, manage and forecast your customers and orders.'
                    : `View and manage your ${navLabels[currentPage]?.toLowerCase() || currentPage}.`
                  }
                </p>
              </div>
              {currentPage === 'home' && (
                <div className="portal__status-section">
                  <StatusTracker
                    title="Terminal delivery status"
                    steps={terminalStatusSteps}
                  />
                </div>
              )}
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
        onClose={() => setIsAIAssistantOpen(false)}
      />
    </div>
  )
}
