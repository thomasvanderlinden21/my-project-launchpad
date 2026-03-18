import React from 'react'
import './Card.css'

export interface CardProps {
  /** Card body content */
  children?: React.ReactNode
  /** Pre-styled header section with title + optional subtitle */
  header?: { title: string; subtitle?: string }
  /** Slot rendered below the body, separated visually */
  footer?: React.ReactNode
  /** Controls box-shadow */
  elevation?: 'elevated' | 'flat'
  /** Inner padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Renders as <a> and adds hover state */
  href?: string
  className?: string
  style?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLElement>
}

export default function Card({
  children,
  header,
  footer,
  elevation = 'elevated',
  padding = 'md',
  href,
  className = '',
  style,
  onClick,
}: CardProps) {
  const classes = [
    'card',
    `card--${elevation}`,
    `card--pad-${padding}`,
    href || onClick ? 'card--interactive' : '',
    className,
  ].filter(Boolean).join(' ')

  const content = (
    <>
      {header && (
        <div className="card-header">
          <h2 className="card-title">{header.title}</h2>
          {header.subtitle && <p className="card-subtitle">{header.subtitle}</p>}
        </div>
      )}
      {children && <div className="card-body">{children}</div>}
      {footer && <div className="card-footer">{footer}</div>}
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes} style={style}>
        {content}
      </a>
    )
  }

  return (
    <div className={classes} style={style} onClick={onClick} role={onClick ? 'button' : undefined}>
      {content}
    </div>
  )
}
