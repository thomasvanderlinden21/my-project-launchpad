import { useState } from 'react'
import Tabs from '../components/Tabs'
import type { TabItem } from '../components/Tabs'
import TerminalCard from '../components/TerminalCard'
import TableCell from '../components/TableCell'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { mockTerminals, type Terminal } from '../data/mockData'
import './TerminalsPage.css'

const terminals = mockTerminals

const statusToChipVariant: Record<Terminal['status'], 'success' | 'info' | 'error' | 'warning'> = {
  'active': 'success',
  'new-update': 'warning',
  'shipped': 'info',
  'inactive': 'error',
}

const statusToLabel: Record<Terminal['status'], string> = {
  'active': 'Active',
  'new-update': 'New update',
  'shipped': 'Shipped',
  'inactive': 'Inactive',
}

export interface TerminalsPageProps {
  onTerminalClick?: (id: string) => void
}

export default function TerminalsPage({ onTerminalClick }: TerminalsPageProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState('terminals')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filter terminals based on active tab and search
  const filteredTerminals = terminals.filter(terminal => {
    // Tab filter
    if (activeTab === 'terminals' && terminal.category !== 'terminals') return false
    if (activeTab === 'accessories' && terminal.category !== 'accessories') return false

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const searchableText = `${terminal.name} ${terminal.serialNumber} ${terminal.locationValue}`.toLowerCase()
      if (!searchableText.includes(query)) return false
    }

    return true
  })

  const allSelected = filteredTerminals.length > 0 &&
    filteredTerminals.every(t => selectedItems.has(t.id))

  const someSelected = filteredTerminals.some(t => selectedItems.has(t.id)) && !allSelected

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(filteredTerminals.map(t => t.id)))
    }
  }

  const handleSelectItem = (id: string, selected: boolean) => {
    const newSelected = new Set(selectedItems)
    if (selected) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedItems(newSelected)
  }

  const handleRowClick = (id: string) => {
    onTerminalClick?.(id)
  }

  const handleOpenFilters = () => {
    console.log('Open filters')
  }

  const handleOpenSettings = () => {
    console.log('Open settings')
  }

  const handleOrderTerminal = () => {
    console.log('Order terminal')
  }

  const tabItems: TabItem[] = [
    {
      id: 'terminals',
      label: 'Terminals',
      children: null,
    },
    {
      id: 'accessories',
      label: 'Accessoires',
      children: null,
    },
  ]

  return (
    <div className="terminals-page">
      <Tabs
        items={tabItems}
        activeId={activeTab}
        onChange={setActiveTab}
        className="terminals-page__tabs"
      />

      <div className="terminals-page__toolbar">
        <div className="terminals-page__search-group">
          <div className="terminals-page__search">
            <Icon name="search" size={20} />
            <input
              type="text"
              className="terminals-page__search-input"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search terminals"
            />
          </div>
          <button
            className="terminals-page__filter-btn"
            onClick={handleOpenFilters}
            aria-label="Open filters"
          >
            Filters
            <Icon name="filter" size={20} />
          </button>
        </div>

        <div className="terminals-page__actions">
          <div className="terminals-page__view-toggle">
            <button
              className={`terminals-page__view-btn ${viewMode === 'list' ? 'terminals-page__view-btn--active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <Icon name="view-list" size={20} />
            </button>
            <button
              className={`terminals-page__view-btn ${viewMode === 'grid' ? 'terminals-page__view-btn--active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <Icon name="view-grid" size={20} />
            </button>
          </div>

          <Button
            hierarchy="secondary"
            size="sm"
            onClick={handleOpenSettings}
          >
            Settings
          </Button>

          <Button
            hierarchy="primary"
            size="sm"
            onClick={handleOrderTerminal}
          >
            Order terminal
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="terminals-page__grid">
          {filteredTerminals.map(terminal => (
            <TerminalCard
              key={terminal.id}
              name={terminal.name}
              serialNumber={terminal.serialNumber}
              imageSrc={terminal.imageSrc}
              locationLabel={terminal.locationLabel}
              locationValue={terminal.locationValue}
              status={terminal.status}
              isSelected={selectedItems.has(terminal.id)}
              onSelect={(selected) => handleSelectItem(terminal.id, selected)}
              onClick={() => onTerminalClick?.(terminal.id)}
            />
          ))}
        </div>
      ) : (
        <div className="terminals-page__table-wrapper">
          <table className="terminals-page__table">
            <thead>
              <tr>
                <th className="terminals-page__th terminals-page__th--checkbox">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={input => {
                      if (input) {
                        input.indeterminate = someSelected
                      }
                    }}
                    onChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </th>
                <th className="terminals-page__th">Name</th>
                <th className="terminals-page__th">Serial number</th>
                <th className="terminals-page__th">Location</th>
                <th className="terminals-page__th">Status</th>
                <th className="terminals-page__th terminals-page__th--actions" />
              </tr>
            </thead>
            <tbody>
              {filteredTerminals.map(terminal => {
                const isSelected = selectedItems.has(terminal.id)

                return (
                  <tr
                    key={terminal.id}
                    className={`terminals-page__row${isSelected ? ' terminals-page__row--selected' : ''}`}
                  >
                    <TableCell checkbox>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectItem(terminal.id, !isSelected)}
                        aria-label={`Select ${terminal.name}`}
                      />
                    </TableCell>

                    <TableCell
                      className="terminals-page__td--name"
                      onClick={() => handleRowClick(terminal.id)}
                    >
                      <div className="terminals-page__name-cell">
                        <Icon name="battery-full" className="terminals-page__battery-icon" />
                        <span>{terminal.name}</span>
                      </div>
                    </TableCell>

                    <TableCell onClick={() => handleRowClick(terminal.id)}>
                      {terminal.serialNumber}
                    </TableCell>

                    <TableCell onClick={() => handleRowClick(terminal.id)}>
                      {terminal.locationValue}
                    </TableCell>

                    <TableCell
                      chip={{
                        label: statusToLabel[terminal.status],
                        variant: statusToChipVariant[terminal.status],
                      }}
                      onClick={() => handleRowClick(terminal.id)}
                    />

                    <TableCell
                      actions
                      onActionClick={(e) => {
                        e.stopPropagation()
                        console.log('Actions for', terminal.id)
                      }}
                    />
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
