import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import ShopSelector from './ShopSelector'
import ProfileMenu from './ProfileMenu'
import type { Shop } from './ShopSelector'
import type { Account } from './ProfileMenu'
import './TopToolbar.css'

export interface Breadcrumb {
  label: string
  href?: string
  onClick?: () => void
}

interface TopToolbarProps {
  breadcrumbs?: Breadcrumb[]
  shops?: Shop[]
  selectedShopIds?: string[]
  onSelectShops?: (shopIds: string[]) => void
  currentAccount?: Account
  accounts?: Account[]
  onSelectAccount?: (accountId: string) => void
  onAddAccount?: () => void
  onPersonalDetails?: () => void
  onPreferences?: () => void
  onSignOut?: () => void
  userInitials?: string
  onSearch?: () => void
}

export default function TopToolbar({
  breadcrumbs = [],
  shops = [],
  selectedShopIds = [],
  onSelectShops,
  currentAccount,
  accounts = [],
  onSelectAccount,
  onAddAccount,
  onPersonalDetails,
  onPreferences,
  onSignOut,
  userInitials = 'AU',
  onSearch,
}: TopToolbarProps) {
  const [isShopSelectorOpen, setIsShopSelectorOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const shopButtonRef = useRef<HTMLButtonElement>(null)
  const profileButtonRef = useRef<HTMLButtonElement>(null)

  // Don't render toolbar if no breadcrumbs
  if (breadcrumbs.length === 0) {
    return null
  }

  // Display logic for selected shops
  let storeName = 'Select shops'
  if (selectedShopIds.length === 1) {
    const selectedShop = shops.find(shop => shop.id === selectedShopIds[0])
    storeName = selectedShop?.name || 'Select shops'
  } else if (selectedShopIds.length > 1) {
    storeName = `${selectedShopIds.length} shops selected`
  }

  return (
    <div className="top-toolbar">
      {/* Breadcrumbs on the left */}
      <nav className="top-toolbar__breadcrumbs" aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1

          return (
            <div key={index} className="top-toolbar__breadcrumb-item">
              {crumb.onClick && !isLast ? (
                <button
                  onClick={crumb.onClick}
                  className="top-toolbar__breadcrumb-button"
                >
                  {crumb.label}
                </button>
              ) : crumb.href && !isLast ? (
                <Link
                  to={crumb.href}
                  className="top-toolbar__breadcrumb-link"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className={`top-toolbar__breadcrumb-text ${
                    isLast ? 'top-toolbar__breadcrumb-text--disabled' : ''
                  }`}
                >
                  {crumb.label}
                </span>
              )}

              {!isLast && (
                <span className="top-toolbar__breadcrumb-separator">/</span>
              )}
            </div>
          )
        })}
      </nav>

      {/* Actions on the right */}
      <div className="top-toolbar__right">
        <button
          className="top-toolbar__search-btn"
          onClick={onSearch}
          aria-label="Search"
        >
          <Icon name="search" size={24} />
          <span>Search</span>
        </button>

        <div className="top-toolbar__store-wrapper">
          <button
            ref={shopButtonRef}
            className="top-toolbar__store-btn"
            onClick={() => setIsShopSelectorOpen(!isShopSelectorOpen)}
            aria-label="Select store"
          >
            <span>{storeName}</span>
            <Icon name="chevron-up-down" size={24} />
          </button>
          {shops.length > 0 && onSelectShops && (
            <ShopSelector
              shops={shops}
              selectedShopIds={selectedShopIds}
              onSelectShops={onSelectShops}
              isOpen={isShopSelectorOpen}
              onClose={() => setIsShopSelectorOpen(false)}
              triggerRef={shopButtonRef}
            />
          )}
        </div>

        <div className="top-toolbar__profile-wrapper">
          <button
            ref={profileButtonRef}
            className="top-toolbar__avatar"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            aria-label="User profile"
          >
            <div className="top-toolbar__avatar-inner">
              {userInitials}
            </div>
          </button>
          {currentAccount && (
            <ProfileMenu
              currentAccount={currentAccount}
              accounts={accounts}
              onSelectAccount={onSelectAccount || (() => {})}
              onAddAccount={onAddAccount || (() => {})}
              onPersonalDetails={onPersonalDetails || (() => {})}
              onPreferences={onPreferences || (() => {})}
              onSignOut={onSignOut || (() => {})}
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
              triggerRef={profileButtonRef}
            />
          )}
        </div>
      </div>
    </div>
  )
}
