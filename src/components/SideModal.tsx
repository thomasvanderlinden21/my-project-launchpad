import { useEffect, useState } from 'react'
import Icon from './Icon'
import './SideModal.css'

export interface SideModalProps {
  /** Controls whether the modal is visible */
  isOpen: boolean
  /** Callback when the modal should close (backdrop click or close button) */
  onClose: () => void
  /** Title displayed in the header */
  title: string
  /** Main content of the modal */
  children: React.ReactNode
  /** Optional footer content (typically action buttons) */
  footer?: React.ReactNode
  /** Width variant */
  width?: 'sm' | 'md' | 'lg'
}

export default function SideModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = 'md',
}: SideModalProps) {
  const [isClosing, setIsClosing] = useState(false)
  const [shouldRender, setShouldRender] = useState(isOpen)

  // Handle opening and closing animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setIsClosing(false)
    } else if (shouldRender) {
      setIsClosing(true)
      const timer = setTimeout(() => {
        setShouldRender(false)
        setIsClosing(false)
      }, 300) // Match animation duration
      return () => clearTimeout(timer)
    }
  }, [isOpen, shouldRender])

  // Handle ESC key to close modal
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!shouldRender) return null

  return (
    <div
      className={`side-modal-overlay ${isClosing ? 'side-modal-overlay--closing' : ''}`}
      onClick={onClose}
    >
      <div
        className={`side-modal side-modal--${width} ${isClosing ? 'side-modal--closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="side-modal-title"
      >
        {/* Header */}
        <div className="side-modal__header">
          <h2 id="side-modal-title" className="side-modal__title">
            {title}
          </h2>
          <button
            className="side-modal__close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <Icon name="close" size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="side-modal__content">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="side-modal__footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
