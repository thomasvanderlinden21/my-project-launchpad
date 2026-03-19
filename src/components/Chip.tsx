import React from 'react'
import './Chip.css'

export type ChipVariant = 'success' | 'info' | 'neutral' | 'warning' | 'error'

export interface ChipProps {
  /** Visible label text */
  label: string
  /** Colour variant */
  variant?: ChipVariant
  /** Optional leading icon (16×16 recommended) */
  icon?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function Chip({ label, variant = 'neutral', icon, className = '', style }: ChipProps) {
  return (
    <span className={`chip chip--${variant}${className ? ` ${className}` : ''}`} style={style}>
      {icon && <span className="chip-icon" aria-hidden="true">{icon}</span>}
      {label}
    </span>
  )
}
