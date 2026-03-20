import { useState } from 'react'
import Icon from './Icon'
import './FiltersPanel.css'

export interface FiltersState {
  startDate: string
  endDate: string
  currency: Set<string>
  minAmount: string
  maxAmount: string
  cardNumber: string
  status: Set<string>
  subStatus: Set<string>
  paymentMethods: Set<string>
  transactionType: Set<string>
  transactionId: string
  channel: Set<string>
  merchantId: string
  locationName: string
  terminalId: string
  acquiringReference: string
  fraudOnly: boolean
}

interface FiltersPanelProps {
  filters: FiltersState
  onFiltersChange: (filters: FiltersState) => void
  onApply: () => void
  onCancel: () => void
}

const statusOptions = ['Paid', 'Pending', 'Failed', 'Refunded', 'Error']
const subStatusOptions = ['Ecom', 'MOTO', 'Recurring', 'Installment']
const paymentMethodOptions = [
  'Mastercard',
  'Apple pay',
  'Visa',
  'PayPal',
  'Google Pay',
  'Venmo',
]
const currencyOptions = ['EUR', 'USD', 'GBP', 'CHF']
const transactionTypeOptions = ['Payment', 'Refund', 'Chargeback', 'Reversal']
const channelOptions = ['Instore', 'Ecomm', 'MOTO', 'Mobile']

export default function FiltersPanel({
  filters,
  onFiltersChange,
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

  const handleCurrencyChange = (currency: string, checked: boolean) => {
    const newCurrencies = new Set(filters.currency)
    if (checked) {
      newCurrencies.add(currency)
    } else {
      newCurrencies.delete(currency)
    }
    onFiltersChange({ ...filters, currency: newCurrencies })
  }

  const handleSubStatusChange = (subStatus: string, checked: boolean) => {
    const newSubStatus = new Set(filters.subStatus)
    if (checked) {
      newSubStatus.add(subStatus)
    } else {
      newSubStatus.delete(subStatus)
    }
    onFiltersChange({ ...filters, subStatus: newSubStatus })
  }

  const handleTransactionTypeChange = (type: string, checked: boolean) => {
    const newTypes = new Set(filters.transactionType)
    if (checked) {
      newTypes.add(type)
    } else {
      newTypes.delete(type)
    }
    onFiltersChange({ ...filters, transactionType: newTypes })
  }

  const handleChannelChange = (channel: string, checked: boolean) => {
    const newChannels = new Set(filters.channel)
    if (checked) {
      newChannels.add(channel)
    } else {
      newChannels.delete(channel)
    }
    onFiltersChange({ ...filters, channel: newChannels })
  }

  return (
    <div className="filters-panel">
      {/* Date range */}
      <div className="filters-panel__section">
        <h3 className="filters-panel__section-title">Date & Time Range</h3>
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

      {/* Currency */}
      <div className="filters-panel__section">
        <h3 className="filters-panel__section-title">Currency</h3>
        <div className="filters-panel__checkbox-group">
          {currencyOptions.map((currency) => (
            <label key={currency} className="filters-panel__checkbox-label">
              <input
                type="checkbox"
                checked={filters.currency.has(currency)}
                onChange={(e) => handleCurrencyChange(currency, e.target.checked)}
              />
              <span>{currency}</span>
            </label>
          ))}
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

      {/* Card Number */}
      <div className="filters-panel__section">
        <h3 className="filters-panel__section-title">Card Number (Last 4 digits)</h3>
        <div className="filters-panel__input-with-icon">
          <input
            type="text"
            id="card-number"
            className="filters-panel__input"
            placeholder="Enter last 4 digits"
            value={filters.cardNumber}
            maxLength={4}
            onChange={(e) =>
              onFiltersChange({ ...filters, cardNumber: e.target.value.replace(/\D/g, '') })
            }
          />
          <Icon name="credit-card" size={24} />
        </div>
      </div>

      <div className="filters-panel__divider" />

      {/* Status */}
      <div className="filters-panel__section">
        <h3 className="filters-panel__section-title">Status</h3>
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

      {/* Sub-status */}
      <div className="filters-panel__section">
        <h3 className="filters-panel__section-title">Sub-status</h3>
        <div className="filters-panel__checkbox-group">
          {subStatusOptions.map((subStatus) => (
            <label key={subStatus} className="filters-panel__checkbox-label">
              <input
                type="checkbox"
                checked={filters.subStatus.has(subStatus)}
                onChange={(e) => handleSubStatusChange(subStatus, e.target.checked)}
              />
              <span>{subStatus}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filters-panel__divider" />

      {/* Payment method */}
      <div className="filters-panel__section">
        <h3 className="filters-panel__section-title">Payment Method</h3>
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

      <div className="filters-panel__divider" />

      {/* Transaction Type */}
      <div className="filters-panel__section">
        <h3 className="filters-panel__section-title">Type</h3>
        <div className="filters-panel__checkbox-group">
          {transactionTypeOptions.map((type) => (
            <label key={type} className="filters-panel__checkbox-label">
              <input
                type="checkbox"
                checked={filters.transactionType.has(type)}
                onChange={(e) => handleTransactionTypeChange(type, e.target.checked)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filters-panel__divider" />

      {/* Transaction ID */}
      <div className="filters-panel__section">
        <h3 className="filters-panel__section-title">Transaction ID</h3>
        <div className="filters-panel__input-with-icon">
          <input
            type="text"
            id="transaction-id"
            className="filters-panel__input"
            placeholder="Enter transaction ID"
            value={filters.transactionId}
            onChange={(e) =>
              onFiltersChange({ ...filters, transactionId: e.target.value })
            }
          />
          <Icon name="search" size={24} />
        </div>
      </div>

      <div className="filters-panel__divider" />

      {/* Channel */}
      <div className="filters-panel__section">
        <h3 className="filters-panel__section-title">Channel</h3>
        <div className="filters-panel__checkbox-group">
          {channelOptions.map((channel) => (
            <label key={channel} className="filters-panel__checkbox-label">
              <input
                type="checkbox"
                checked={filters.channel.has(channel)}
                onChange={(e) => handleChannelChange(channel, e.target.checked)}
              />
              <span>{channel}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filters-panel__divider" />

      {/* Location */}
      <div className="filters-panel__section">
        <h3 className="filters-panel__section-title">Location</h3>
        <div className="filters-panel__location-inputs">
          <input
            type="text"
            id="merchant-id"
            className="filters-panel__input"
            placeholder="Merchant ID"
            value={filters.merchantId}
            onChange={(e) =>
              onFiltersChange({ ...filters, merchantId: e.target.value })
            }
          />
          <input
            type="text"
            id="location-name"
            className="filters-panel__input"
            placeholder="Location name"
            value={filters.locationName}
            onChange={(e) =>
              onFiltersChange({ ...filters, locationName: e.target.value })
            }
          />
          <input
            type="text"
            id="terminal-id"
            className="filters-panel__input"
            placeholder="Terminal ID"
            value={filters.terminalId}
            onChange={(e) =>
              onFiltersChange({ ...filters, terminalId: e.target.value })
            }
          />
        </div>
      </div>

      <div className="filters-panel__divider" />

      {/* Acquiring Reference Number */}
      <div className="filters-panel__section">
        <h3 className="filters-panel__section-title">Acquiring Reference Number</h3>
        <div className="filters-panel__input-with-icon">
          <input
            type="text"
            id="acquiring-reference"
            className="filters-panel__input"
            placeholder="Enter acquiring reference"
            value={filters.acquiringReference}
            onChange={(e) =>
              onFiltersChange({ ...filters, acquiringReference: e.target.value })
            }
          />
          <Icon name="document" size={24} />
        </div>
      </div>

      <div className="filters-panel__divider" />

      {/* Fraud */}
      <div className="filters-panel__section">
        <h3 className="filters-panel__section-title">Fraud</h3>
        <label className="filters-panel__checkbox-label">
          <input
            type="checkbox"
            checked={filters.fraudOnly}
            onChange={(e) =>
              onFiltersChange({ ...filters, fraudOnly: e.target.checked })
            }
          />
          <span>Show only flagged transactions</span>
        </label>
      </div>
    </div>
  )
}
