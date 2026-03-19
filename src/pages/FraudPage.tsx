import { useState } from 'react'
import Button from '../components/Button'
import Icon from '../components/Icon'
import FraudRuleModal from '../components/FraudRuleModal'
import './FraudPage.css'

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

const RULE_TYPE_CONFIG = {
  ip: { label: 'IP Address', icon: 'wifi' as const },
  email: { label: 'Email Address', icon: 'mail' as const },
  iban: { label: 'IBAN', icon: 'bank' as const },
  card_country: { label: 'Card Country', icon: 'location' as const },
  pan: { label: 'Card Number', icon: 'credit-card' as const },
  shipping: { label: 'Shipping Address', icon: 'location' as const },
  amount: { label: 'Amount', icon: 'currency-dollar' as const },
  currency: { label: 'Currency', icon: 'currency-dollar' as const },
}

function EmptyState({ onCreateRule }: { onCreateRule: () => void }) {
  return (
    <div className="fraud-page__empty">
      <div className="fraud-page__empty-icon">
        <Icon name="shield-question" size={32} />
      </div>
      <h3 className="fraud-page__empty-title">Manual rules</h3>
      <p className="fraud-page__empty-description">
        You have no rules set up. Create custom fraud rules to automatically block suspicious
        transactions based on your own conditions.
      </p>
      <Button hierarchy="primary" size="md" onClick={onCreateRule}>
        <Icon name="add" size={20} />
        Set up your first fraud rule
      </Button>
    </div>
  )
}

function RuleCard({
  rule,
  onEdit,
  onDelete,
}: {
  rule: FraudRule
  onEdit: () => void
  onDelete: () => void
}) {
  const config = RULE_TYPE_CONFIG[rule.type]
  const displayEntries = rule.entries.slice(0, 4)
  const extra = rule.entries.length - displayEntries.length

  return (
    <div className="fraud-rule-card">
      <div className="fraud-rule-card__header">
        <div className="fraud-rule-card__info">
          <div className="fraud-rule-card__icon">
            <Icon name={config.icon} size={20} />
          </div>
          <div>
            <div className="fraud-rule-card__title">{config.label}</div>
            <div className="fraud-rule-card__subtitle">
              {rule.entries.length} {rule.entries.length === 1 ? 'entry' : 'entries'} blocked
            </div>
          </div>
        </div>
        <div className="fraud-rule-card__actions">
          <span className="fraud-rule-card__badge">Active</span>
          <button
            onClick={onEdit}
            className="fraud-rule-card__action-btn"
            aria-label="Edit rule"
          >
            <Icon name="edit" size={16} />
          </button>
          <button
            onClick={onDelete}
            className="fraud-rule-card__action-btn fraud-rule-card__action-btn--delete"
            aria-label="Delete rule"
          >
            <Icon name="delete" size={16} />
          </button>
        </div>
      </div>
      <div className="fraud-rule-card__tags">
        {displayEntries.map((entry) => (
          <span key={entry} className="fraud-rule-card__tag">
            {entry}
          </span>
        ))}
        {extra > 0 && (
          <span className="fraud-rule-card__tag fraud-rule-card__tag--extra">
            +{extra} more
          </span>
        )}
      </div>
    </div>
  )
}

function RulesList({
  rules,
  onCreateRule,
  onEditRule,
  onDeleteRule,
}: {
  rules: FraudRule[]
  onCreateRule: () => void
  onEditRule: (rule: FraudRule) => void
  onDeleteRule: (id: string) => void
}) {
  return (
    <div className="fraud-rules-list">
      <div className="fraud-rules-list__header">
        <div className="fraud-rules-list__title-row">
          <h3 className="fraud-rules-list__title">Manual rules</h3>
          <span className="fraud-rules-list__count">{rules.length}</span>
        </div>
        <Button hierarchy="primary" size="sm" onClick={onCreateRule}>
          <Icon name="add" size={16} />
          Create new rule
        </Button>
      </div>
      <div className="fraud-rules-list__items">
        {rules.map((rule) => (
          <RuleCard
            key={rule.id}
            rule={rule}
            onEdit={() => onEditRule(rule)}
            onDelete={() => onDeleteRule(rule.id)}
          />
        ))}
      </div>
    </div>
  )
}

function PremiumCard() {
  return (
    <div className="fraud-premium-card">
      <div className="fraud-premium-card__badge">
        <Icon name="stars" size={14} />
        <span>Premium</span>
      </div>
      <div className="fraud-premium-card__icon">
        <Icon name="shield-check" size={40} />
      </div>
      <h3 className="fraud-premium-card__title">Fraud Sentinel</h3>
      <p className="fraud-premium-card__description">
        Upgrade to unlock advanced rules and AI fraud detection, protecting your business from
        fraudulent activities with real-time transaction scoring and adaptive machine learning.
        <br />
        <strong>for €0,02 per screened transaction</strong>
      </p>
      <div className="fraud-premium-card__features">
        <div className="fraud-premium-card__feature">
          <Icon name="bolt" size={16} />
          <span>Real-time scoring</span>
        </div>
        <div className="fraud-premium-card__feature">
          <Icon name="shield-check" size={16} />
          <span>Adaptive ML model</span>
        </div>
        <div className="fraud-premium-card__feature">
          <Icon name="lock" size={16} />
          <span>3DS2 risk engine</span>
        </div>
        <div className="fraud-premium-card__feature">
          <Icon name="tune" size={16} />
          <span>Custom rule builder</span>
        </div>
      </div>
      <Button hierarchy="secondary" size="md">
        Learn more
        <Icon name="chevron-right" size={16} />
      </Button>
      <p className="fraud-premium-card__trial">
        <Icon name="check-circle" size={14} />
        Includes a <strong>30-day free trial</strong> — cancel at any moment
      </p>
    </div>
  )
}

export default function FraudPage() {
  const [rules, setRules] = useState<FraudRule[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<FraudRule | null>(null)

  function handleCreateRule() {
    setEditingRule(null)
    setIsModalOpen(true)
  }

  function handleEditRule(rule: FraudRule) {
    setEditingRule(rule)
    setIsModalOpen(true)
  }

  function handleDeleteRule(id: string) {
    setRules((prev) => prev.filter((r) => r.id !== id))
  }

  function handleSaveRule(ruleData: Omit<FraudRule, 'id' | 'createdAt'>) {
    if (editingRule) {
      // Update existing rule
      setRules((prev) =>
        prev.map((r) =>
          r.id === editingRule.id
            ? { ...r, ...ruleData }
            : r
        )
      )
    } else {
      // Create new rule
      const newRule: FraudRule = {
        id: Math.random().toString(36).substring(7),
        ...ruleData,
        createdAt: new Date()
      }
      setRules((prev) => [...prev, newRule])
    }
    setIsModalOpen(false)
    setEditingRule(null)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setEditingRule(null)
  }

  return (
    <div className="fraud-page">
      <div className="fraud-page__header">
        <div className="fraud-page__breadcrumb">
          <span className="fraud-page__breadcrumb-item">Settings</span>
          <Icon name="chevron-right" size={12} />
          <span className="fraud-page__breadcrumb-item fraud-page__breadcrumb-item--current">
            Fraud prevention
          </span>
        </div>
        <div className="fraud-page__header-content">
          <div className="fraud-page__header-icon">
            <Icon name="shield-question" size={24} />
          </div>
          <div>
            <h1 className="fraud-page__title">Fraud prevention</h1>
            <p className="fraud-page__subtitle">
              Protect your business from suspicious and fraudulent transactions
            </p>
          </div>
        </div>
      </div>

      <div className="fraud-page__content">
        {rules.length === 0 ? (
          <EmptyState onCreateRule={handleCreateRule} />
        ) : (
          <RulesList
            rules={rules}
            onCreateRule={handleCreateRule}
            onEditRule={handleEditRule}
            onDeleteRule={handleDeleteRule}
          />
        )}
        <PremiumCard />
      </div>

      <FraudRuleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveRule}
        editingRule={editingRule}
      />
    </div>
  )
}
