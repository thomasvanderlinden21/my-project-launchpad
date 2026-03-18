import { useState, useEffect, useRef } from 'react'
import Icon from './Icon'
import Tabs from './Tabs'
import './SpotlightSearch.css'

export interface SpotlightSearchProps {
  isOpen: boolean
  onClose: () => void
}

type SearchCategory = 'all' | 'transactions' | 'terminals' | 'settings' | 'help'

interface SearchResult {
  id: string
  title: string
  description: string
  category: SearchCategory
  icon?: string
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'Transaction #2456221',
    description: '€ 259,00 - 24/02/25, 21:05',
    category: 'transactions',
    icon: 'receipt'
  },
  {
    id: '2',
    title: 'Outside main terminal #1',
    description: 'AXIUM RX 7000 - Online',
    category: 'terminals',
    icon: 'terminal'
  },
  {
    id: '3',
    title: 'Company details',
    description: 'Update your company information',
    category: 'settings',
    icon: 'settings'
  },
  {
    id: '4',
    title: 'Personal details',
    description: 'Update your contact information',
    category: 'settings',
    icon: 'settings'
  },
  {
    id: '5',
    title: 'How to refund a transaction',
    description: 'Learn how to process refunds',
    category: 'help',
    icon: 'help'
  }
]

const categoryItems = [
  { id: 'all', label: 'All', children: <></> },
  { id: 'transactions', label: 'Transactions', children: <></> },
  { id: 'terminals', label: 'Terminals', children: <></> },
  { id: 'settings', label: 'Settings', children: <></> },
  { id: 'help', label: 'Help', children: <></> }
]

export default function SpotlightSearch({ isOpen, onClose }: SpotlightSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Filter results based on search query and category
  const filteredResults = mockResults.filter(result => {
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
    console.log('Selected:', result)
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
            placeholder="Search transactions, terminals, settings..."
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
        {searchQuery && (
          <div className="spotlight-search__results">
            {filteredResults.length > 0 ? (
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
                  Try searching for transactions, terminals, or settings
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
