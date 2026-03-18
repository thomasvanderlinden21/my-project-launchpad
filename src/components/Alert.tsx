import React, { useState } from 'react'
import Icon from './Icon'
import type { IconName } from './Icon'
import './Alert.css'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

export interface AlertProps {
  /** Colour and semantic meaning of the alert */
  variant?: AlertVariant
  /** Bold heading line */
  title?: string
  /** Supporting body text (can be used alone or beneath a title) */
  message?: string
  /** Custom icon — overrides the default variant icon */
  icon?: React.ReactNode
  /** Set to false to suppress the icon entirely */
  showIcon?: boolean
  /** Renders an × button; the alert hides itself and calls this when clicked */
  onDismiss?: () => void
  className?: string
}

const VARIANT_ICONS: Record<AlertVariant, IconName> = {
  info:    'info',
  success: 'check-circle',
  warning: 'warning',
  error:   'x-circle',
}

export default function Alert({
  variant = 'info',
  title,
  message,
  icon,
  showIcon = true,
  onDismiss,
  className = '',
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  const resolvedIcon = icon ?? (
    showIcon ? <Icon name={VARIANT_ICONS[variant]} size={18} /> : null
  )

  return (
    <div
      className={['alert', `alert--${variant}`, className].filter(Boolean).join(' ')}
      role="alert"
    >
      <div className="alert-content">
        {resolvedIcon && (
          <span className="alert-icon" aria-hidden="true">{resolvedIcon}</span>
        )}
        <div className="alert-body">
          {title   && <p className="alert-title">{title}</p>}
          {message && <p className="alert-message">{message}</p>}
        </div>
      </div>

      {onDismiss && (
        <button
          className="alert-dismiss"
          onClick={handleDismiss}
          aria-label="Dismiss"
        >
          <Icon name="close" size={16} />
        </button>
      )}
    </div>
  )
}
