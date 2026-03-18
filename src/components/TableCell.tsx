import React from 'react'
import Chip from './Chip'
import Icon from './Icon'
import './TableCell.css'

export interface TableCellProps {
  children?: React.ReactNode
  /** Checkbox for row selection */
  checkbox?: boolean
  /** Chip/badge content */
  chip?: {
    label: string
    variant: 'success' | 'info' | 'neutral' | 'warning'
  }
  /** Payment method icon + card number */
  paymentMethod?: {
    cardNumber: string
    type?: 'visa' | 'mastercard'
  }
  /** Actions menu (dots) */
  actions?: boolean
  /** onClick handler for actions button */
  onActionClick?: (e: React.MouseEvent) => void
  /** onClick handler for the cell itself */
  onClick?: () => void
  className?: string
}

export default function TableCell({
  children,
  checkbox,
  chip,
  paymentMethod,
  actions,
  onActionClick,
  onClick,
  className = '',
}: TableCellProps) {
  const isClickable = onClick && !checkbox && !actions

  return (
    <td
      className={`table-cell ${className}`.trim()}
      onClick={isClickable ? onClick : undefined}
      style={isClickable ? { cursor: 'pointer' } : undefined}
    >
      {checkbox && (
        <div className="table-cell__checkbox-wrapper">
          {children}
        </div>
      )}

      {chip && (
        <Chip label={chip.label} variant={chip.variant} />
      )}

      {paymentMethod && (
        <div className="table-cell__payment">
          <div className="table-cell__payment-icon">
            <span className="table-cell__payment-badge">
              {paymentMethod.type === 'visa' ? 'VISA' : 'MC'}
            </span>
          </div>
          <span className="table-cell__payment-number">{paymentMethod.cardNumber}</span>
        </div>
      )}

      {actions && (
        <button
          className="table-cell__actions-btn"
          onClick={onActionClick}
          aria-label="More actions"
        >
          <Icon name="dots-vertical" size={20} />
        </button>
      )}

      {!checkbox && !chip && !paymentMethod && !actions && children}
    </td>
  )
}
