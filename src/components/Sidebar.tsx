import { Link } from 'react-router-dom'
import WorldlineLogoSvg from '../assets/worldline-logo.svg?react'
import WorldlineIconSvg from '../assets/worldline-icon.svg?react'
import Icon from './Icon'
import type { IconName } from './Icon'
import Tooltip from './Tooltip'
import './Sidebar.css'

const salesSubItems = [
  { id: 'transactions', label: 'Transactions' },
  { id: 'orders', label: 'Orders' },
  { id: 'invoices', label: 'Invoices' },
  { id: 'reports', label: 'Reports' },
  { id: 'disputes', label: 'Disputes' },
]

const myBusinessSubItems = [
  { id: 'payouts', label: 'Payouts' },
  { id: 'invoices', label: 'Invoices' },
  { id: 'documents', label: 'Documents' },
]

const settingsSubItems = [
  { id: 'overview', label: 'Overview', group: 'main' },
  { id: 'divider1', label: '', group: 'divider' },
  { id: 'users', label: 'Users', group: 'company' },
  { id: 'company-details', label: 'Company details', group: 'company' },
  { id: 'ecommerce', label: 'E-comm', group: 'company' },
  { id: 'fraud', label: 'Fraud', group: 'company' },
  { id: 'branding', label: 'Your branding', group: 'company' },
  { id: 'terminals-settings', label: 'Terminals', group: 'company' },
  { id: 'bank-accounts', label: 'Bank accounts', group: 'company' },
  { id: 'contracts', label: 'Contracts', group: 'company' },
  { id: 'divider2', label: '', group: 'divider' },
  { id: 'personal-details', label: 'Personal details', group: 'personal' },
  { id: 'preferences', label: 'Preferences', group: 'personal' },
]

const navItems: { id: string; label: string; icon: IconName | string }[] = [
  { id: 'home',              label: 'Home',              icon: '/assets/home.svg' },
  { id: 'sales',             label: 'Sales',             icon: '/assets/sales.svg' },
  { id: 'terminals',         label: 'Terminals',         icon: '/assets/terminal.svg' },
  { id: 'create-payment',    label: 'Create payment',    icon: '/assets/create-payment.svg' },
  { id: 'product-catalogue', label: 'Product catalogue', icon: '/assets/product-catalogue.svg' },
  { id: 'my-business',       label: 'My business',       icon: '/assets/my-business.svg' },
  { id: 'card-issuing',      label: 'Card Issuing',      icon: 'card' },
  { id: 'cash-advance',      label: 'Cash advance',      icon: 'cash' },
]

const bottomItems: { id: string; label: string; icon: IconName | string }[] = [
  { id: 'settings',      label: 'Settings',      icon: 'settings' },
  { id: 'notifications', label: 'Notifications', icon: 'bell' },
  // { id: 'help',          label: 'Help',           icon: 'help' }, // Hidden for now, can be re-enabled in the future
  { id: 'ai-assistant',  label: 'AI assistant',  icon: '/assets/ai-assistant.svg' },
]

interface SidebarProps {
  activeItem?: string
  onNavigate?: (id: string) => void
  activeSalesSubItem?: string
  onSalesSubNavigate?: (id: string) => void
  activeSettingsSubItem?: string
  onSettingsSubNavigate?: (id: string) => void
  activeMyBusinessSubItem?: string
  onMyBusinessSubNavigate?: (id: string) => void
  onAIAssistantClick?: () => void
  enableMyBusinessSubmenu?: boolean
}

export default function Sidebar({
  activeItem = 'home',
  onNavigate,
  activeSalesSubItem = 'transactions',
  onSalesSubNavigate,
  activeSettingsSubItem = 'overview',
  onSettingsSubNavigate,
  activeMyBusinessSubItem = 'payouts',
  onMyBusinessSubNavigate,
  onAIAssistantClick,
  enableMyBusinessSubmenu = false
}: SidebarProps) {
  const handleClick = (id: string) => {
    if (id === 'ai-assistant') {
      onAIAssistantClick?.()
    } else {
      onNavigate?.(id)
    }
  }

  const handleSalesSubClick = (id: string) => {
    onSalesSubNavigate?.(id)
  }

  const handleSettingsSubClick = (id: string) => {
    onSettingsSubNavigate?.(id)
  }

  const handleMyBusinessSubClick = (id: string) => {
    onMyBusinessSubNavigate?.(id)
  }

  const renderIcon = (icon: IconName | string, size: number) => {
    if (typeof icon === 'string' && icon.startsWith('/assets/')) {
      return <img src={icon} alt="" width={size} height={size} style={{ display: 'block' }} />
    }
    return <Icon name={icon as IconName} size={size} />
  }

  const isSalesActive = activeItem === 'sales'
  const isSettingsActive = activeItem === 'settings'
  const isMyBusinessActive = activeItem === 'my-business' && enableMyBusinessSubmenu

  const hasSubPanel = isSalesActive || isSettingsActive || isMyBusinessActive

  return (
    <nav className={`sidebar${hasSubPanel ? ' sidebar--sub-active' : ''}`} aria-label="Main navigation">
      {/* Main navigation — always on the left */}
      <div className={`sidebar__main${hasSubPanel ? ' sidebar__main--collapsed' : ''}`}>
        <Link to="/landing" className="sidebar__logo" aria-label="Go to landing">
          {hasSubPanel
            ? <WorldlineIconSvg aria-label="Worldline" className="sidebar__logo-icon" />
            : <WorldlineLogoSvg aria-label="Worldline" className="sidebar__logo-svg" />
          }
        </Link>

        {!hasSubPanel && (
          <div className="sidebar__nav">
            <ul className="sidebar__nav-list" role="list">
              {navItems.map(item => (
                <li key={item.id}>
                  <button
                    className={`sidebar__nav-item${activeItem === item.id ? ' sidebar__nav-item--active' : ''}`}
                    onClick={() => handleClick(item.id)}
                    aria-current={activeItem === item.id ? 'page' : undefined}
                  >
                    {renderIcon(item.icon, 20)}
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasSubPanel && (
          <div className="sidebar__nav-collapsed">
            <ul className="sidebar__nav-collapsed-list" role="list">
              {navItems.map(item => (
                <li key={item.id}>
                  <Tooltip label={item.label} side="right">
                    <button
                      className={`sidebar__nav-item-icon${activeItem === item.id ? ' sidebar__nav-item-icon--active' : ''}`}
                      onClick={() => handleClick(item.id)}
                      aria-label={item.label}
                      aria-current={activeItem === item.id ? 'page' : undefined}
                    >
                      {renderIcon(item.icon, 20)}
                    </button>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={`sidebar__bottom${hasSubPanel ? ' sidebar__bottom--collapsed' : ''}`}>
          {bottomItems.map(item => (
            hasSubPanel ? (
              <Tooltip key={item.id} label={item.label} side="right">
                <button
                  className="sidebar__bottom-item sidebar__bottom-item--icon-only"
                  aria-label={item.label}
                  onClick={() => handleClick(item.id)}
                >
                  {renderIcon(item.icon, 20)}
                </button>
              </Tooltip>
            ) : (
              <button
                key={item.id}
                className="sidebar__bottom-item"
                aria-label={item.label}
                onClick={() => handleClick(item.id)}
              >
                {renderIcon(item.icon, 20)}
                <span>{item.label}</span>
              </button>
            )
          ))}
        </div>
      </div>

      {/* Sub-navigation panel — appears to the right of the icon strip when Sales, Settings, or My Business is active */}
      {hasSubPanel && (
        <div className={`sidebar__sub-panel${isSalesActive ? ' sidebar__sub-panel--visible' : ''}${isSettingsActive ? ' sidebar__sub-panel--visible' : ''}${isMyBusinessActive ? ' sidebar__sub-panel--visible' : ''}`}>
          {isSalesActive && (
            <>
              <div className="sidebar__sub-panel-header">
                <span className="sidebar__sub-panel-title">Sales</span>
              </div>
              <ul className="sidebar__sub-panel-list" role="list">
                {salesSubItems.map(sub => (
                  <li key={sub.id}>
                    <button
                      className={`sidebar__sub-panel-item${activeSalesSubItem === sub.id ? ' sidebar__sub-panel-item--active' : ''}`}
                      onClick={() => handleSalesSubClick(sub.id)}
                    >
                      {sub.label}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
          {isSettingsActive && (
            <>
              <div className="sidebar__sub-panel-header">
                <span className="sidebar__sub-panel-title">Settings</span>
              </div>
              <ul className="sidebar__sub-panel-list" role="list">
                {settingsSubItems.map(sub => {
                  if (sub.group === 'divider') {
                    return <li key={sub.id} className="sidebar__sub-panel-divider" />
                  }
                  return (
                    <li key={sub.id}>
                      <button
                        className={`sidebar__sub-panel-item${activeSettingsSubItem === sub.id ? ' sidebar__sub-panel-item--active' : ''}`}
                        onClick={() => handleSettingsSubClick(sub.id)}
                      >
                        {sub.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </>
          )}
          {isMyBusinessActive && (
            <>
              <div className="sidebar__sub-panel-header">
                <span className="sidebar__sub-panel-title">My business</span>
              </div>
              <ul className="sidebar__sub-panel-list" role="list">
                {myBusinessSubItems.map(sub => (
                  <li key={sub.id}>
                    <button
                      className={`sidebar__sub-panel-item${activeMyBusinessSubItem === sub.id ? ' sidebar__sub-panel-item--active' : ''}`}
                      onClick={() => handleMyBusinessSubClick(sub.id)}
                    >
                      {sub.label}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
