import { useEffect } from 'react'
import Icon from './Icon'
import './Snackbar.css'

export interface SnackbarProps {
  /** Whether the snackbar is visible */
  isOpen: boolean
  /** Title text */
  title: string
  /** Supporting message to display */
  message?: string
  /** Called when snackbar should close */
  onClose: () => void
  /** Optional action button */
  action?: {
    label: string
    onClick: () => void
  }
  /** Auto-hide duration in milliseconds (default: 5000) */
  duration?: number
  /** Variant type */
  variant?: 'default' | 'success' | 'error' | 'warning'
}

export default function Snackbar({
  isOpen,
  title,
  message,
  onClose,
  action,
  duration = 5000,
  variant = 'success',
}: SnackbarProps) {
  useEffect(() => {
    if (!isOpen) return

    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [isOpen, duration])

  if (!isOpen) return null

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return 'check-circle'
      case 'error':
        return 'alert-circle'
      case 'warning':
        return 'alert-triangle'
      default:
        return 'info-circle'
    }
  }

  return (
    <div className={`snackbar snackbar--${variant}`}>
      <div className="snackbar__content">
        <div className="snackbar__icon">
          <Icon name={getIcon()} size={24} />
        </div>
        <div className="snackbar__text">
          <p className="snackbar__title">{title}</p>
          {message && <p className="snackbar__message">{message}</p>}
          {action && (
            <button
              className="snackbar__action-link"
              onClick={() => {
                action.onClick()
                onClose()
              }}
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
      <button
        className="snackbar__close-btn"
        onClick={onClose}
        aria-label="Close"
      >
        <Icon name="close" size={24} />
      </button>
    </div>
  )
}
