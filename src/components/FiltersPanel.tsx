import { useState } from 'react'
import Icon from './Icon'
import './FiltersPanel.css'

export interface FiltersState {
  startDate: string
  endDate: string
  minAmount: string
  maxAmount: string
  status: Set<string>
  paymentMethods: Set<string>
}

interface FiltersPanelProps {
  filters: FiltersState
  onFiltersChange: (filters: FiltersState) => void
  onApply: () => void
  onCancel: () => void
}

const statusOptions = ['Paid', 'Pending', 'Failed', 'Refunded', 'Error']
const paymentMethodOptions = [
  'Mastercard',
  'Apple pay',
  'Visa',
  'PayPal',
  'Google Pay',
  'Venmo',
]

export default function FiltersPanel({
  filters,
  onFiltersChange,
  onApply,
  onCancel,
}: FiltersPanelProps) {
  const [showAllPaymentMethods, setShowAllPaymentMethods] = useState(false)

  const visiblePaymentMethods = showAllPaymentMethods
    ? paymentMethodOptions
    : paymentMethodOptions.slice(0, 4)

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = new Set(filters.status)
    if (checked) {
      newStatus.add(status)
    } else {
      newStatus.delete(status)
    }
    onFiltersChange({ ...filters, status: newStatus })
  }

  const handlePaymentMethodChange = (method: string, checked: boolean) => {
    const newMethods = new Set(filters.paymentMethods)
    if (checked) {
      newMethods.add(method)
    } else {
      newMethods.delete(method)
    }
    onFiltersChange({ ...filters, paymentMethods: newMethods })
  }

  return (
    <div className="filters-panel">
      {/* Date range */}
      <div className="filters-panel__section">
        <h3 className="filters-panel__section-title">Transaction date</h3>
        <div className="filters-panel__date-inputs">
          <div className="filters-panel__input-with-icon">
            <input
              type="text"
              id="start-date"
              className="filters-panel__input"
              placeholder="Start date"
              value={filters.startDate}
              onChange={(e) =>
                onFiltersChange({ ...filters, startDate: e.target.value })
              }
            />
            <Icon name="calendar" size={24} />
          </div>
          <div className="filters-panel__input-with-icon">
            <input
              type="text"
              id="end-date"
              className="filters-panel__input"
              placeholder="End date"
              value={filters.endDate}
              onChange={(e) =>
                onFiltersChange({ ...filters, endDate: e.target.value })
              }
            />
            <Icon name="calendar" size={24} />
          </div>
        </div>
      </div>

      <div className="filters-panel__divider" />

      {/* Amount range */}
      <div className="filters-panel__section">
        <h3 className="filters-panel__section-title">Amount</h3>
        <div className="filters-panel__amount-inputs">
          <div className="filters-panel__input-with-currency">
            <span className="filters-panel__currency">€</span>
            <input
              type="text"
              id="min-amount"
              className="filters-panel__input filters-panel__input--currency"
              placeholder="Min"
              value={filters.minAmount}
              onChange={(e) =>
                onFiltersChange({ ...filters, minAmount: e.target.value })
              }
            />
          </div>
          <div className="filters-panel__input-with-currency">
            <span className="filters-panel__currency">€</span>
            <input
              type="text"
              id="max-amount"
              className="filters-panel__input filters-panel__input--currency"
              placeholder="Max"
              value={filters.maxAmount}
              onChange={(e) =>
                onFiltersChange({ ...filters, maxAmount: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div className="filters-panel__divider" />

      {/* Status */}
      <div className="filters-panel__section">
        <h3 className="filters-panel__section-title">Date</h3>
        <div className="filters-panel__checkbox-group">
          {statusOptions.map((status) => (
            <label key={status} className="filters-panel__checkbox-label">
              <input
                type="checkbox"
                checked={filters.status.has(status)}
                onChange={(e) => handleStatusChange(status, e.target.checked)}
              />
              <span>{status}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filters-panel__divider" />

      {/* Payment method */}
      <div className="filters-panel__section">
        <h3 className="filters-panel__section-title">Method</h3>
        <div className="filters-panel__checkbox-group">
          {visiblePaymentMethods.map((method) => (
            <label key={method} className="filters-panel__checkbox-label">
              <input
                type="checkbox"
                checked={filters.paymentMethods.has(method)}
                onChange={(e) =>
                  handlePaymentMethodChange(method, e.target.checked)
                }
              />
              <span>{method}</span>
            </label>
          ))}
          {!showAllPaymentMethods && paymentMethodOptions.length > 4 && (
            <button
              className="filters-panel__show-all-btn"
              onClick={() => setShowAllPaymentMethods(true)}
            >
              Show all
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
