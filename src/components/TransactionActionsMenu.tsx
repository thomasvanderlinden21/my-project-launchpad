import { useRef, useEffect, useState } from 'react'
import './TransactionActionsMenu.css'

export interface TransactionActionsMenuProps {
  transactionId: string
  onRefund: (transactionId: string) => void
  onShowDetails: (transactionId: string) => void
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

export default function TransactionActionsMenu({
  transactionId,
  onRefund,
  onShowDetails,
  isOpen,
  onClose,
  triggerRef
}: TransactionActionsMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  // Calculate position based on trigger button
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + 4,
        left: rect.right - 200 // 200px is the min-width of the menu
      })
    }
  }, [isOpen, triggerRef])

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
    <div
      className="transaction-actions-menu"
      ref={menuRef}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
    >
      <div className="transaction-actions-menu__container">
        <button
          className="transaction-actions-menu__item"
          onClick={() => handleMenuItemClick(() => onShowDetails(transactionId))}
        >
          <span>Show details</span>
        </button>
        <button
          className="transaction-actions-menu__item"
          onClick={() => handleMenuItemClick(() => onRefund(transactionId))}
        >
          <span>Refund</span>
        </button>
      </div>
    </div>
  )
}
