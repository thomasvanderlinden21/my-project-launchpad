import React from 'react'
import './Button.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual hierarchy */
  hierarchy?: 'primary' | 'secondary' | 'tertiary'
  /** Size variant */
  size?: 'sm' | 'md'
  /** Icon before the label */
  leadingIcon?: React.ReactNode
  /** Icon after the label */
  trailingIcon?: React.ReactNode
  /** Renders as a square icon-only button. Pass the icon as `leadingIcon`. */
  iconOnly?: boolean
  /** Stretches button to full container width */
  fullWidth?: boolean
}

export default function Button({
  hierarchy = 'primary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  iconOnly = false,
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const classes = [
    'btn',
    `btn--${hierarchy}`,
    `btn--${size}`,
    iconOnly   ? 'btn--icon-only' : '',
    fullWidth  ? 'btn--full'      : '',
    className,
  ].filter(Boolean).join(' ')

  if (iconOnly) {
    return (
      <button className={classes} {...props}>
        <span className="btn-icon" aria-hidden="true">{leadingIcon}</span>
      </button>
    )
  }

  return (
    <button className={classes} {...props}>
      {leadingIcon  && <span className="btn-icon" aria-hidden="true">{leadingIcon}</span>}
      {children}
      {trailingIcon && <span className="btn-icon" aria-hidden="true">{trailingIcon}</span>}
    </button>
  )
}
