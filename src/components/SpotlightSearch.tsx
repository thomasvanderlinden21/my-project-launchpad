import { useState, useEffect, useRef } from 'react'
import Icon from './Icon'
import Tabs from './Tabs'
import { mockTerminals } from '../data/mockData'
import './SpotlightSearch.css'

export interface SpotlightSearchProps {
  isOpen: boolean
  onClose: () => void
  onNavigate?: (page: string, subPage?: string) => void
  onTerminalNavigate?: (terminalId: string) => void
}

type SearchCategory = 'all' | 'pages' | 'sales' | 'settings' | 'actions' | 'terminals'

interface SearchResult {
  id: string
  title: string
  description: string
  category: SearchCategory
  icon?: string
  page?: string
  subPage?: string
  terminalId?: string
}

const searchablePages: SearchResult[] = [
  // Main pages
  { id: 'home', title: 'Home', description: 'Dashboard overview with metrics and charts', category: 'pages', icon: 'home', page: 'home' },
  { id: 'terminals', title: 'Terminals', description: 'Manage your payment terminals', category: 'pages', icon: 'terminal', page: 'terminals' },
  { id: 'fraud-page', title: 'Fraud Settings', description: 'Manage fraud rules and prevention', category: 'pages', icon: 'shield-question', page: 'settings', subPage: 'fraud' },
  { id: 'product-catalogue', title: 'Product Catalogue', description: 'Manage products', category: 'pages', icon: 'shopping-basket', page: 'product-catalogue' },
  { id: 'my-business', title: 'My Business', description: 'View business insights', category: 'pages', icon: 'apartment', page: 'my-business' },

  // Sales pages
  { id: 'transactions', title: 'Transactions', description: 'View all transactions', category: 'sales', icon: 'receipt', page: 'sales', subPage: 'transactions' },
  { id: 'orders', title: 'Orders', description: 'View all orders', category: 'sales', icon: 'shopping-basket', page: 'sales', subPage: 'orders' },
  { id: 'invoices', title: 'Invoices', description: 'View all invoices', category: 'sales', icon: 'document', page: 'sales', subPage: 'invoices' },
  { id: 'reports', title: 'Reports', description: 'View sales reports', category: 'sales', icon: 'document', page: 'sales', subPage: 'reports' },
  { id: 'disputes', title: 'Disputes', description: 'Manage disputes and chargebacks', category: 'sales', icon: 'alert-circle', page: 'sales', subPage: 'disputes' },

  // Action pages
  { id: 'create-payment', title: 'Create Payment', description: 'Generate payment links', category: 'actions', icon: 'credit-card', page: 'create-payment' },

  // Settings pages
  { id: 'settings', title: 'Settings', description: 'App settings overview', category: 'settings', icon: 'settings', page: 'settings', subPage: 'overview' },
  { id: 'settings-users', title: 'Users', description: 'Manage user accounts', category: 'settings', icon: 'users', page: 'settings', subPage: 'users' },
  { id: 'settings-company', title: 'Company Details', description: 'Update company information', category: 'settings', icon: 'apartment', page: 'settings', subPage: 'company-details' },
  { id: 'settings-ecommerce', title: 'E-commerce', description: 'Configure e-commerce settings', category: 'settings', icon: 'shopping-basket', page: 'settings', subPage: 'ecommerce' },
  { id: 'settings-fraud', title: 'Fraud Settings', description: 'Manage fraud rules and prevention', category: 'settings', icon: 'shield-question', page: 'settings', subPage: 'fraud' },
  { id: 'settings-branding', title: 'Your Branding', description: 'Customize branding', category: 'settings', icon: 'palette', page: 'settings', subPage: 'branding' },
  { id: 'settings-terminals', title: 'Terminal Settings', description: 'Configure terminals', category: 'settings', icon: 'terminal', page: 'settings', subPage: 'terminals-settings' },
  { id: 'settings-bank', title: 'Bank Accounts', description: 'Manage bank accounts', category: 'settings', icon: 'bank', page: 'settings', subPage: 'bank-accounts' },
  { id: 'settings-contracts', title: 'Contracts', description: 'View contracts', category: 'settings', icon: 'document', page: 'settings', subPage: 'contracts' },
  { id: 'settings-personal', title: 'Personal Details', description: 'Update your contact information', category: 'settings', icon: 'user', page: 'settings', subPage: 'personal-details' },
  { id: 'settings-preferences', title: 'Preferences', description: 'App preferences', category: 'settings', icon: 'tune', page: 'settings', subPage: 'preferences' },
]

// Generate terminal search results
const terminalSearchResults: SearchResult[] = mockTerminals.map(terminal => ({
  id: `terminal-${terminal.id}`,
  title: terminal.name,
  description: `${terminal.model} | ${terminal.serialNumber} | ${terminal.locationValue}`,
  category: 'terminals' as SearchCategory,
  icon: 'terminal',
  terminalId: terminal.id,
}))

const categoryItems = [
  { id: 'all', label: 'All', children: <></> },
  { id: 'pages', label: 'Pages', children: <></> },
  { id: 'sales', label: 'Sales', children: <></> },
  { id: 'terminals', label: 'Terminals', children: <></> },
  { id: 'settings', label: 'Settings', children: <></> },
  { id: 'actions', label: 'Actions', children: <></> },
]

export default function SpotlightSearch({ isOpen, onClose, onNavigate, onTerminalNavigate }: SpotlightSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Combine all searchable items
  const allSearchableItems = [...searchablePages, ...terminalSearchResults]

  // Filter results based on search query and category
  const filteredResults = allSearchableItems.filter(result => {
    const matchesQuery = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        result.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || result.category === activeCategory
    return matchesQuery && matchesCategory
  })

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      searchInputRef.current?.focus()
      setSearchQuery('')
      setActiveCategory('all')
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Reset selected index when search query or category changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [searchQuery, activeCategory])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, filteredResults.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && filteredResults.length > 0) {
        e.preventDefault()
        handleResultClick(filteredResults[selectedIndex])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredResults, onClose])

  const handleResultClick = (result: SearchResult) => {
    if (result.terminalId && onTerminalNavigate) {
      onTerminalNavigate(result.terminalId)
    } else if (result.page && onNavigate) {
      onNavigate(result.page, result.subPage)
    }
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="spotlight-search-overlay" onClick={handleOverlayClick}>
      <div className="spotlight-search">
        {/* Search Input */}
        <div className="spotlight-search__input-wrapper">
          <Icon name="search" size={20} className="spotlight-search__search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            className="spotlight-search__input"
            placeholder="Search pages, terminals, sales, settings, and actions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="spotlight-search__close-btn"
            onClick={onClose}
            aria-label="Close search"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Category Filters */}
        <div className="spotlight-search__tabs">
          <Tabs
            items={categoryItems}
            activeId={activeCategory}
            onChange={(id) => {
              setActiveCategory(id as SearchCategory)
              setSelectedIndex(0)
            }}
          />
        </div>

        {/* Results */}
        <div className="spotlight-search__results">
          {searchQuery ? (
            filteredResults.length > 0 ? (
              filteredResults.map((result, index) => (
                <button
                  key={result.id}
                  className={`spotlight-search__result ${
                    index === selectedIndex ? 'spotlight-search__result--selected' : ''
                  }`}
                  onClick={() => handleResultClick(result)}
                >
                  {result.icon && (
                    <div className="spotlight-search__result-icon">
                      <Icon name={result.icon as any} size={20} />
                    </div>
                  )}
                  <div className="spotlight-search__result-content">
                    <div className="spotlight-search__result-title">{result.title}</div>
                    <div className="spotlight-search__result-description">{result.description}</div>
                  </div>
                </button>
              ))
            ) : (
              <div className="spotlight-search__empty">
                <p>No results found</p>
                <p className="spotlight-search__empty-hint">
                  Try searching for pages, terminals, sales, settings, or actions
                </p>
              </div>
            )
          ) : (
            <div className="spotlight-search__empty">
              <p className="spotlight-search__empty-hint">
                Start typing to search for pages, terminals, sales, settings, and actions
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
