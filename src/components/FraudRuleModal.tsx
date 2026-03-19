import { useState, useEffect } from 'react'
import Button from './Button'
import Icon from './Icon'
import type { IconName } from './Icon'
import type { FraudRuleType, FraudRule } from '../pages/FraudPage'
import './FraudRuleModal.css'

interface FraudRuleModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (rule: Omit<FraudRule, 'id' | 'createdAt'>) => void
  editingRule?: FraudRule | null
}

interface RuleTypeOption {
  type: FraudRuleType
  label: string
  icon: IconName
  color: string
  inputType: 'text' | 'country' | 'currency' | 'amount'
}

const RULE_TYPE_OPTIONS: RuleTypeOption[] = [
  { type: 'ip', label: 'IP Address', icon: 'wifi', color: '#2c6764', inputType: 'text' },
  { type: 'email', label: 'Email Address', icon: 'mail', color: '#2c6764', inputType: 'text' },
  { type: 'iban', label: 'IBAN', icon: 'bank', color: '#2c6764', inputType: 'text' },
  { type: 'card_country', label: 'Card Issuing Country', icon: 'location', color: '#2c6764', inputType: 'country' },
  { type: 'pan', label: 'PAN', icon: 'credit-card', color: '#2c6764', inputType: 'text' },
  { type: 'shipping', label: 'Shipping Address', icon: 'location', color: '#2c6764', inputType: 'text' },
  { type: 'amount', label: 'Transaction Amount', icon: 'currency-dollar', color: '#2c6764', inputType: 'amount' },
  { type: 'currency', label: 'Currency', icon: 'currency-dollar', color: '#2c6764', inputType: 'currency' },
]

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia',
  'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Belarus', 'Belgium', 'Belize',
  'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
  'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Chad', 'Chile', 'China', 'Colombia',
  'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Estonia', 'Ethiopia', 'Finland', 'France', 'Georgia', 'Germany',
  'Ghana', 'Greece', 'Guatemala', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia',
  'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya',
  'Kuwait', 'Latvia', 'Lebanon', 'Libya', 'Lithuania', 'Luxembourg', 'Malaysia', 'Malta', 'Mexico',
  'Morocco', 'Netherlands', 'New Zealand', 'Nigeria', 'North Korea', 'Norway', 'Pakistan', 'Panama',
  'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Saudi Arabia', 'Senegal',
  'Serbia', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka',
  'Sudan', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Thailand', 'Tunisia', 'Turkey', 'Uganda',
  'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Venezuela', 'Vietnam', 'Yemen', 'Zimbabwe'
]

const CURRENCIES = [
  'EUR', 'USD', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD',
  'MXN', 'SGD', 'HKD', 'NOK', 'KRW', 'TRY', 'RUB', 'INR', 'BRL', 'ZAR'
]

const SHOPS = ['All shops', 'Cycle Shop #1', 'Cycle Shop #2', 'Cycle Shop #3']

export default function FraudRuleModal({ isOpen, onClose, onSave, editingRule }: FraudRuleModalProps) {
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<FraudRuleType | null>(null)
  const [entries, setEntries] = useState<string[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedShops, setSelectedShops] = useState<string[]>(['All shops'])
  const [amountOperator, setAmountOperator] = useState<'greater' | 'less' | 'between'>('greater')
  const [amountValue, setAmountValue] = useState('')
  const [amountValueMax, setAmountValueMax] = useState('')

  // Pre-fill when editing
  useEffect(() => {
    if (editingRule && isOpen) {
      setSelectedType(editingRule.type)
      setEntries(editingRule.entries)
      setSelectedShops(editingRule.shops)
      setStep(1)
    } else if (isOpen) {
      // Reset for new rule
      setStep(1)
      setSelectedType(null)
      setEntries([])
      setCurrentInput('')
      setSearchQuery('')
      setSelectedShops(['All shops'])
      setAmountOperator('greater')
      setAmountValue('')
      setAmountValueMax('')
    }
  }, [editingRule, isOpen])

  if (!isOpen) return null

  const selectedRuleType = RULE_TYPE_OPTIONS.find(opt => opt.type === selectedType)

  const handleAddEntry = (entry: string) => {
    if (entry.trim() && !entries.includes(entry.trim())) {
      setEntries([...entries, entry.trim()])
      setCurrentInput('')
      setSearchQuery('')
    }
  }

  const handleRemoveEntry = (entry: string) => {
    setEntries(entries.filter(e => e !== entry))
  }

  const handleShopToggle = (shop: string) => {
    if (shop === 'All shops') {
      setSelectedShops(['All shops'])
    } else {
      const withoutAll = selectedShops.filter(s => s !== 'All shops')
      if (selectedShops.includes(shop)) {
        const updated = withoutAll.filter(s => s !== shop)
        setSelectedShops(updated.length === 0 ? ['All shops'] : updated)
      } else {
        setSelectedShops([...withoutAll, shop])
      }
    }
  }

  const handleContinue = () => {
    if (step === 1 && selectedType) {
      setStep(2)
    } else if (step === 2 && entries.length > 0) {
      setStep(3)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handlePublish = () => {
    if (selectedType && entries.length > 0) {
      onSave({
        type: selectedType,
        entries,
        shops: selectedShops
      })
      onClose()
    }
  }

  const getFilteredOptions = () => {
    if (!selectedRuleType) return []

    if (selectedRuleType.inputType === 'country') {
      return COUNTRIES.filter(country =>
        country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    } else if (selectedRuleType.inputType === 'currency') {
      return CURRENCIES.filter(currency =>
        currency.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return []
  }

  return (
    <>
      <div className="fraud-modal-overlay" onClick={onClose} />
      <div className="fraud-modal">
        <div className="fraud-modal__header">
          <div className="fraud-modal__header-content">
            <h2 className="fraud-modal__title">
              {editingRule ? 'Edit fraud rule' : 'Create fraud rule'}
            </h2>
            <div className="fraud-modal__steps">
              <span className={`fraud-modal__step ${step >= 1 ? 'fraud-modal__step--active' : ''}`}>1</span>
              <div className={`fraud-modal__step-line ${step >= 2 ? 'fraud-modal__step-line--active' : ''}`} />
              <span className={`fraud-modal__step ${step >= 2 ? 'fraud-modal__step--active' : ''}`}>2</span>
              <div className={`fraud-modal__step-line ${step >= 3 ? 'fraud-modal__step-line--active' : ''}`} />
              <span className={`fraud-modal__step ${step >= 3 ? 'fraud-modal__step--active' : ''}`}>3</span>
            </div>
          </div>
          <button className="fraud-modal__close" onClick={onClose} aria-label="Close">
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="fraud-modal__content">
          {/* Step 1: Select Rule Type */}
          {step === 1 && (
            <div className="fraud-modal__step-content">
              <div className="fraud-modal__step-header">
                <h3 className="fraud-modal__step-title">Select rule type</h3>
                <p className="fraud-modal__step-description">
                  Choose the type of fraud rule you want to create
                </p>
              </div>
              <div className="fraud-modal__rule-types">
                {RULE_TYPE_OPTIONS.map(option => (
                  <button
                    key={option.type}
                    className={`fraud-modal__rule-type ${selectedType === option.type ? 'fraud-modal__rule-type--selected' : ''}`}
                    onClick={() => setSelectedType(option.type)}
                  >
                    <div className="fraud-modal__rule-type-icon">
                      <Icon name={option.icon} size={20} />
                    </div>
                    <span className="fraud-modal__rule-type-label">{option.label}</span>
                    {selectedType === option.type && (
                      <div className="fraud-modal__rule-type-check">
                        <Icon name="check" size={16} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Add Entries */}
          {step === 2 && selectedRuleType && (
            <div className="fraud-modal__step-content">
              <div className="fraud-modal__step-header">
                <h3 className="fraud-modal__step-title">Add blocked {selectedRuleType.label.toLowerCase()}s</h3>
                <p className="fraud-modal__step-description">
                  Specify which {selectedRuleType.label.toLowerCase()}s should be blocked
                </p>
              </div>

              {/* Text input (IP, Email, IBAN, PAN, Shipping) */}
              {selectedRuleType.inputType === 'text' && (
                <div className="fraud-modal__input-group">
                  <div className="fraud-modal__input-wrapper">
                    <input
                      type="text"
                      className="fraud-modal__input"
                      placeholder={`Enter ${selectedRuleType.label.toLowerCase()}`}
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddEntry(currentInput)
                        }
                      }}
                    />
                    <Button
                      hierarchy="primary"
                      size="sm"
                      onClick={() => handleAddEntry(currentInput)}
                      disabled={!currentInput.trim()}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              )}

              {/* Searchable dropdown (Countries, Currencies) */}
              {(selectedRuleType.inputType === 'country' || selectedRuleType.inputType === 'currency') && (
                <div className="fraud-modal__input-group">
                  <input
                    type="text"
                    className="fraud-modal__input"
                    placeholder={`Search ${selectedRuleType.inputType === 'country' ? 'countries' : 'currencies'}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <div className="fraud-modal__dropdown">
                      {getFilteredOptions().map(option => (
                        <button
                          key={option}
                          className="fraud-modal__dropdown-item"
                          onClick={() => handleAddEntry(option)}
                        >
                          {option}
                        </button>
                      ))}
                      {getFilteredOptions().length === 0 && (
                        <div className="fraud-modal__dropdown-empty">No results found</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Amount input */}
              {selectedRuleType.inputType === 'amount' && (
                <div className="fraud-modal__input-group">
                  <select
                    className="fraud-modal__select"
                    value={amountOperator}
                    onChange={(e) => setAmountOperator(e.target.value as 'greater' | 'less' | 'between')}
                  >
                    <option value="greater">Greater than</option>
                    <option value="less">Less than</option>
                    <option value="between">Between</option>
                  </select>
                  <div className="fraud-modal__amount-inputs">
                    <div className="fraud-modal__input-wrapper">
                      <span className="fraud-modal__input-prefix">€</span>
                      <input
                        type="number"
                        className="fraud-modal__input fraud-modal__input--amount"
                        placeholder="0.00"
                        value={amountValue}
                        onChange={(e) => setAmountValue(e.target.value)}
                      />
                    </div>
                    {amountOperator === 'between' && (
                      <>
                        <span className="fraud-modal__amount-separator">and</span>
                        <div className="fraud-modal__input-wrapper">
                          <span className="fraud-modal__input-prefix">€</span>
                          <input
                            type="number"
                            className="fraud-modal__input fraud-modal__input--amount"
                            placeholder="0.00"
                            value={amountValueMax}
                            onChange={(e) => setAmountValueMax(e.target.value)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <Button
                    hierarchy="primary"
                    size="sm"
                    onClick={() => {
                      const entry = amountOperator === 'between'
                        ? `€${amountValue} - €${amountValueMax}`
                        : `${amountOperator === 'greater' ? '>' : '<'} €${amountValue}`
                      handleAddEntry(entry)
                      setAmountValue('')
                      setAmountValueMax('')
                    }}
                    disabled={!amountValue || (amountOperator === 'between' && !amountValueMax)}
                  >
                    Add
                  </Button>
                </div>
              )}

              {/* Entry tags */}
              {entries.length > 0 && (
                <div className="fraud-modal__entries">
                  <div className="fraud-modal__entries-label">Blocked entries ({entries.length})</div>
                  <div className="fraud-modal__entries-list">
                    {entries.map(entry => (
                      <div
                        key={entry}
                        className="fraud-modal__entry-tag"
                      >
                        <span>{entry}</span>
                        <button
                          className="fraud-modal__entry-remove"
                          onClick={() => handleRemoveEntry(entry)}
                          aria-label="Remove"
                        >
                          <Icon name="close" size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && selectedRuleType && (
            <div className="fraud-modal__step-content">
              <div className="fraud-modal__step-header">
                <h3 className="fraud-modal__step-title">Review and publish</h3>
                <p className="fraud-modal__step-description">
                  Review your fraud rule configuration before publishing
                </p>
              </div>

              <div className="fraud-modal__review-card">
                <div className="fraud-modal__review-header">
                  <div className="fraud-modal__review-icon">
                    <Icon name={selectedRuleType.icon} size={20} />
                  </div>
                  <div>
                    <div className="fraud-modal__review-title">{selectedRuleType.label}</div>
                    <div className="fraud-modal__review-subtitle">
                      {entries.length} {entries.length === 1 ? 'entry' : 'entries'} blocked
                    </div>
                  </div>
                </div>

                <div className="fraud-modal__review-entries">
                  {entries.map(entry => (
                    <span
                      key={entry}
                      className="fraud-modal__review-entry"
                    >
                      {entry}
                    </span>
                  ))}
                </div>

                <div className="fraud-modal__review-shops">
                  <label className="fraud-modal__label">Protect my shops</label>
                  <div className="fraud-modal__shops-dropdown">
                    <button className="fraud-modal__shops-trigger">
                      <span>
                        {selectedShops.includes('All shops')
                          ? 'All shops'
                          : `${selectedShops.length} shop${selectedShops.length > 1 ? 's' : ''}`}
                      </span>
                      <Icon name="chevron-down" size={16} />
                    </button>
                    <div className="fraud-modal__shops-list">
                      {SHOPS.map(shop => (
                        <label key={shop} className="fraud-modal__shop-checkbox">
                          <input
                            type="checkbox"
                            checked={selectedShops.includes(shop)}
                            onChange={() => handleShopToggle(shop)}
                          />
                          <span>{shop}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="fraud-modal__review-notice">
                  <Icon name="check-circle" size={16} />
                  <span>This rule will be active immediately after publishing</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="fraud-modal__footer">
          {step > 1 && (
            <Button hierarchy="secondary" size="md" onClick={handleBack}>
              Back
            </Button>
          )}
          <div className="fraud-modal__footer-actions">
            <Button hierarchy="tertiary" size="md" onClick={onClose}>
              Cancel
            </Button>
            {step < 3 ? (
              <Button
                hierarchy="primary"
                size="md"
                onClick={handleContinue}
                disabled={step === 1 ? !selectedType : entries.length === 0}
              >
                Continue
              </Button>
            ) : (
              <Button
                hierarchy="primary"
                size="md"
                onClick={handlePublish}
                className="fraud-modal__publish-btn"
              >
                <Icon name="check" size={16} />
                Publish rule
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
