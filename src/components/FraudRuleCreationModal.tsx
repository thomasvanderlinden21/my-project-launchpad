import { useState, useEffect } from 'react'
import SideModal from './SideModal'
import Button from './Button'
import Icon from './Icon'
import type { IconName } from './Icon'
import './FraudRuleCreationModal.css'

export type FraudRuleType =
  | 'ip' | 'email' | 'iban' | 'card_country'
  | 'pan' | 'shipping' | 'amount' | 'currency'

export interface FraudRule {
  id: string
  type: FraudRuleType
  entries: string[]
  shops: string[]
  createdAt: Date
}

export interface FraudRuleCreationModalProps {
  isOpen: boolean
  onClose: () => void
  onPublish?: (data: { type: FraudRuleType; entries: string[]; shops: string[] }) => void
  editingRule?: FraudRule | null
}

interface RuleTypeOption {
  id: FraudRuleType
  label: string
  description: string
  icon: IconName
}

const RULE_TYPES: RuleTypeOption[] = [
  { id: 'ip', label: 'IP Address', description: 'Block specific IP addresses', icon: 'wifi' },
  { id: 'email', label: 'Email Address', description: 'Block by email address', icon: 'mail' },
  { id: 'iban', label: 'IBAN', description: 'Block bank account numbers', icon: 'bank' },
  { id: 'card_country', label: 'Card Issuing Country', description: 'Block cards from countries', icon: 'location' },
  { id: 'pan', label: 'Card Number (PAN)', description: 'Block specific card numbers', icon: 'credit-card' },
  { id: 'shipping', label: 'Shipping Address', description: 'Block shipping destinations', icon: 'location' },
  { id: 'amount', label: 'Transaction Amount', description: 'Block by transaction value', icon: 'currency-dollar' },
  { id: 'currency', label: 'Currency', description: 'Block specific currencies', icon: 'currency-dollar' },
]

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
  'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
  'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia',
  'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
  'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
  'Fiji', 'Finland', 'France',
  'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
  'Haiti', 'Honduras', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Jamaica', 'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
  'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
  'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius',
  'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
  'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea',
  'North Macedonia', 'Norway',
  'Oman',
  'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar',
  'Romania', 'Russia', 'Rwanda',
  'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
  'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
  'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain',
  'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago',
  'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
  'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
  'Yemen',
  'Zambia', 'Zimbabwe'
]
const CURRENCIES = [
  'AED', 'AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR',
  'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR',
  'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SAR', 'SEK', 'SGD', 'THB',
  'TRY', 'TWD', 'UAH', 'USD', 'VND', 'ZAR'
]
const SHOPS = ['All shops', 'European Store', 'US Online Store', 'B2B Portal']

export default function FraudRuleCreationModal({
  isOpen,
  onClose,
  onPublish,
  editingRule,
}: FraudRuleCreationModalProps) {
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<FraudRuleType | null>(null)
  const [entries, setEntries] = useState<string[]>([])
  const [shops, setShops] = useState<string[]>(['All shops'])
  const [currentInput, setCurrentInput] = useState('')

  useEffect(() => {
    if (isOpen) {
      if (editingRule) {
        // When editing, start at step 2 with pre-filled data
        setStep(2)
        setSelectedType(editingRule.type)
        setEntries([...editingRule.entries])
        setShops([...editingRule.shops])
      } else {
        // When creating, start at step 1 with empty data
        setStep(1)
        setSelectedType(null)
        setEntries([])
        setShops(['All shops'])
      }
      setCurrentInput('')
    }
  }, [isOpen, editingRule])

  const selectedRuleType = RULE_TYPES.find(t => t.id === selectedType)
  const canContinue = step === 1 ? selectedType !== null : entries.length > 0

  function handleNext() {
    if (step < 3) setStep(step + 1)
  }

  function handleBack() {
    if (step > 1) setStep(step - 1)
  }

  function handleAddEntry() {
    if (currentInput.trim() && !entries.includes(currentInput.trim())) {
      setEntries([...entries, currentInput.trim()])
      setCurrentInput('')
    }
  }

  function handleRemoveEntry(entry: string) {
    setEntries(entries.filter(e => e !== entry))
  }

  function handlePublish() {
    if (selectedType && onPublish) {
      onPublish({ type: selectedType, entries, shops })
    }
    onClose()
  }

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Choose rule type'
      case 2: return 'Add entries'
      case 3: return 'Review & publish'
      default: return 'Create fraud rule'
    }
  }

  return (
    <SideModal
      isOpen={isOpen}
      onClose={onClose}
      title={getStepTitle()}
      width="md"
      footer={
        <>
          {step > 1 ? (
            <Button hierarchy="secondary" size="md" onClick={handleBack} fullWidth>
              <Icon name="chevron-left" size={16} />
              Back
            </Button>
          ) : (
            <div style={{ flex: 1 }} />
          )}
          {step < 3 ? (
            <Button hierarchy="primary" size="md" onClick={handleNext} disabled={!canContinue} fullWidth>
              Continue
              <Icon name="chevron-right" size={16} />
            </Button>
          ) : (
            <Button hierarchy="primary" size="md" onClick={handlePublish} fullWidth>
              <Icon name="check" size={16} />
              Publish rule
            </Button>
          )}
        </>
      }
    >
      <div className="fraud-rule-step">
        {/* Step 1: Select Rule Type */}
        {step === 1 && (
          <div className="fraud-rule-step-content">
            <p className="fraud-rule-description">
              Select the attribute you want to use to identify and block fraudulent transactions.
            </p>
            <div className="fraud-rule-types-grid">
              {RULE_TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`fraud-rule-type-card ${selectedType === type.id ? 'fraud-rule-type-card--selected' : ''}`}
                >
                  <div className="fraud-rule-type-icon">
                    <Icon name={type.icon} size={18} />
                  </div>
                  <div className="fraud-rule-type-content">
                    <p className="fraud-rule-type-label">{type.label}</p>
                    <p className="fraud-rule-type-description">{type.description}</p>
                  </div>
                  {selectedType === type.id && (
                    <div className="fraud-rule-type-check">
                      <Icon name="check" size={12} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Add Entries */}
        {step === 2 && selectedRuleType && (
          <div className="fraud-rule-step-content">
            <p className="fraud-rule-description">
              {selectedType === 'card_country'
                ? 'Any card issued in the selected countries will be blocked at checkout.'
                : selectedType === 'currency'
                ? 'Transactions attempted in these currencies will be declined.'
                : `All transactions matching these ${selectedRuleType.label.toLowerCase()} values will be blocked.`}
            </p>

            {selectedType === 'card_country' ? (
              <div className="fraud-rule-input-group">
                <select
                  value=""
                  onChange={(e) => {
                    const country = e.target.value
                    if (country && !entries.includes(country)) {
                      setEntries([...entries, country])
                    }
                  }}
                  className="fraud-rule-select"
                >
                  <option value="">Select a country...</option>
                  {COUNTRIES.filter(c => !entries.includes(c)).map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            ) : selectedType === 'currency' ? (
              <div className="fraud-rule-input-group">
                <select
                  value=""
                  onChange={(e) => {
                    const currency = e.target.value
                    if (currency && !entries.includes(currency)) {
                      setEntries([...entries, currency])
                    }
                  }}
                  className="fraud-rule-select"
                >
                  <option value="">Select a currency...</option>
                  {CURRENCIES.filter(c => !entries.includes(c)).map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="fraud-rule-input-group">
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddEntry()}
                  placeholder={`Enter ${selectedRuleType.label.toLowerCase()}...`}
                  className="fraud-rule-input"
                />
                <Button hierarchy="primary" size="sm" onClick={handleAddEntry} disabled={!currentInput.trim()}>
                  <Icon name="add" size={16} />
                  Add
                </Button>
              </div>
            )}

            {entries.length > 0 && (
              <div className="fraud-rule-entries">
                <p className="fraud-rule-entries-label">Blocked entries ({entries.length})</p>
                <div className="fraud-rule-entries-list">
                  {entries.map(entry => (
                    <div key={entry} className="fraud-rule-entry-tag">
                      <span>{entry}</span>
                      <button onClick={() => handleRemoveEntry(entry)} className="fraud-rule-entry-remove">
                        <Icon name="close" size={12} />
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
          <div className="fraud-rule-step-content">
            <p className="fraud-rule-description">
              Review your rule before publishing. Once active, it will immediately start blocking matching transactions.
            </p>
            <div className="fraud-rule-review-card">
              <div className="fraud-rule-review-header">
                <div className="fraud-rule-review-icon">
                  <Icon name={selectedRuleType.icon} size={20} />
                </div>
                <div>
                  <p className="fraud-rule-review-title">{selectedRuleType.label}</p>
                  <p className="fraud-rule-review-subtitle">
                    {entries.length} {entries.length === 1 ? 'entry' : 'entries'} will be blocked
                  </p>
                </div>
              </div>
              <div className="fraud-rule-review-divider" />
              <div>
                <p className="fraud-rule-review-label">Blocked entries</p>
                <div className="fraud-rule-review-entries">
                  {entries.slice(0, 8).map(entry => (
                    <span key={entry} className="fraud-rule-review-entry">{entry}</span>
                  ))}
                  {entries.length > 8 && (
                    <span className="fraud-rule-review-entry">+{entries.length - 8} more</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SideModal>
  )
}
