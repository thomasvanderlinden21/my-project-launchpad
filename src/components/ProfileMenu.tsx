import { useRef, useEffect } from 'react'
import Icon from './Icon'
import './ProfileMenu.css'

export interface Account {
  id: string
  name: string
  email: string
}

export interface ProfileMenuProps {
  currentAccount: Account
  accounts: Account[]
  onSelectAccount: (accountId: string) => void
  onAddAccount: () => void
  onPersonalDetails: () => void
  onPreferences: () => void
  onDocumentation: () => void
  onSignOut: () => void
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

export default function ProfileMenu({
  currentAccount,
  accounts,
  onSelectAccount,
  onAddAccount,
  onPersonalDetails,
  onPreferences,
  onDocumentation,
  onSignOut,
  isOpen,
  onClose,
  triggerRef
}: ProfileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose, triggerRef])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const handleMenuItemClick = (action: () => void) => {
    action()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="profile-menu" ref={menuRef}>
      <div className="profile-menu__container">
        {/* Current account info at top */}
        <div className="profile-menu__account-info-bottom">
          <div className="profile-menu__account-name">{currentAccount.name}</div>
          <div className="profile-menu__account-email">{currentAccount.email}</div>
        </div>

        <div className="profile-menu__divider" />

        {/* Menu items */}
        <div className="profile-menu__items">
          <button
            className="profile-menu__item"
            onClick={() => handleMenuItemClick(onPreferences)}
          >
            <Icon name="adjustments" size={20} />
            <span>Preferences</span>
          </button>
          <button
            className="profile-menu__item"
            onClick={() => handleMenuItemClick(onDocumentation)}
          >
            <Icon name="book" size={20} />
            <span>Documentation</span>
          </button>
          <button
            className="profile-menu__item"
            onClick={() => handleMenuItemClick(onSignOut)}
          >
            <Icon name="logout" size={20} />
            <span>Sign out</span>
          </button>
        </div>

        {/* Account switcher */}
        {accounts.length > 1 && (
          <>
            <div className="profile-menu__divider" />
            <div className="profile-menu__section-label">Switch account</div>
            <div className="profile-menu__accounts">
              {accounts
                .filter(account => account.id !== currentAccount.id)
                .map(account => (
                  <button
                    key={account.id}
                    className="profile-menu__account"
                    onClick={() => handleMenuItemClick(() => onSelectAccount(account.id))}
                  >
                    <div className="profile-menu__account-avatar">
                      {account.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div className="profile-menu__account-details">
                      <div className="profile-menu__account-name">{account.name}</div>
                      <div className="profile-menu__account-email">{account.email}</div>
                    </div>
                  </button>
                ))}
            </div>
          </>
        )}

        <div className="profile-menu__divider" />

        {/* Add account */}
        <button
          className="profile-menu__item"
          onClick={() => handleMenuItemClick(onAddAccount)}
        >
          <Icon name="add" size={20} />
          <span>Add account</span>
        </button>
      </div>
    </div>
  )
}
