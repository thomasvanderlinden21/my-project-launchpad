import { useState } from 'react'
import Button from '../components/Button'
import Icon from '../components/Icon'
import Chip from '../components/Chip'
import FraudRuleCreationModal from '../components/FraudRuleCreationModal'
import SettingsDetailPage from './SettingsDetailPage'
import { useFraudManagement } from '../context/FraudManagementContext'
import type { FraudRule, FraudRuleType } from '../context/FraudManagementContext'
import './FraudPage.css'

const RULE_TYPE_CONFIG = {
  ip: { label: 'IP Address', icon: 'terminal' as const },
  email: { label: 'Email Address', icon: 'mail' as const },
  iban: { label: 'IBAN', icon: 'bank' as const },
  card_country: { label: 'Card Country', icon: 'card' as const },
  pan: { label: 'Card Number', icon: 'credit-card' as const },
  shipping: { label: 'Shipping Address', icon: 'storefront' as const },
  amount: { label: 'Amount', icon: 'cash' as const },
  currency: { label: 'Currency', icon: 'cash' as const },
}

function EmptyState({ onCreateRule }: { onCreateRule: () => void }) {
  return (
    <div className="fraud-page__empty">
      <div className="fraud-page__empty-icon">
        <Icon name="shield-question" size={48} />
      </div>
      <p className="fraud-page__empty-description">
        You have no rules set up yet. Get started by creating your first fraud rule.
      </p>
      <button className="fraud-page__empty-action" onClick={onCreateRule}>
        Create your first rule
      </button>
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
            <Icon name="tune" size={16} />
          </button>
          <button
            onClick={onDelete}
            className="fraud-rule-card__action-btn fraud-rule-card__action-btn--delete"
            aria-label="Delete rule"
          >
            <Icon name="close" size={16} />
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
      <div className="fraud-rule-card__shops">
        <span className="fraud-rule-card__shops-label">Applies to:</span>
        <div className="fraud-rule-card__shops-list">
          {rule.shops.includes('All shops') ? (
            <span className="fraud-rule-card__shop">All shops</span>
          ) : (
            rule.shops.map((shop) => (
              <span key={shop} className="fraud-rule-card__shop">
                {shop}
              </span>
            ))
          )}
        </div>
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
        <span className="fraud-rules-list__count">{rules.length} {rules.length === 1 ? 'rule' : 'rules'} active</span>
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
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button hierarchy="primary" size="sm" onClick={onCreateRule}>
          <Icon name="add" size={16} />
          Create new rule
        </Button>
      </div>
    </div>
  )
}

function PremiumCard() {
  return (
    <div className="fraud-premium-card">
      <Chip
        label="Premium"
        icon={<Icon name="sparkle" size={12} />}
        className="fraud-premium-card__badge"
      />
      <div className="fraud-premium-card__icon">
        <Icon name="shield-question" size={40} />
      </div>
      <h3 className="fraud-premium-card__title">Fraud Sentinel</h3>
      <p className="fraud-premium-card__description">
        Advanced AI-powered fraud detection with real-time transaction scoring and adaptive machine learning to protect your business.
        <br />
        <strong>€0,02 per screened transaction</strong>
      </p>
      <div className="fraud-premium-card__features">
        <div className="fraud-premium-card__feature">
          <Icon name="bolt" size={16} />
          <span>Real-time scoring</span>
        </div>
        <div className="fraud-premium-card__feature">
          <Icon name="check-circle" size={16} />
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
      <button className="fraud-premium-card__action">
        Learn more
        <Icon name="chevron-right" size={16} />
      </button>
      <p className="fraud-premium-card__trial">
        <Icon name="check-circle" size={14} />
        Includes a <strong>30-day free trial</strong> — cancel at any moment
      </p>
    </div>
  )
}

export default function FraudPage() {
  const { rules, addRule } = useFraudManagement()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<FraudRule | null>(null)

  function handleCreateRule() {
    setEditingRule(null)
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setEditingRule(null)
  }

  function handlePublishRule(data: { type: FraudRuleType; entries: string[]; shops: string[] }) {
    if (editingRule) {
      // Update existing rule - for now just log
      console.log('Update rule:', editingRule.id, data)
      // TODO: Add update functionality to context
    } else {
      // Create new rule
      addRule(data.type, data.entries, data.shops)
    }
    setEditingRule(null)
  }

  function handleEditRule(rule: FraudRule) {
    setEditingRule(rule)
    setIsModalOpen(true)
  }

  function handleDeleteRule(id: string) {
    // TODO: Add delete functionality to context
    console.log('Delete rule:', id)
  }

  return (
    <>
      <SettingsDetailPage
        sections={[
          {
            title: 'Manual rules',
            description: 'Create custom fraud rules to automatically block suspicious transactions based on your own conditions.',
            content: (
              <>
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
              </>
            )
          },
          {
            title: 'Advanced fraud protection',
            description: 'Unlock AI-powered fraud detection and advanced security features to protect your business.',
            content: <PremiumCard />
          }
        ]}
      />

      <FraudRuleCreationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPublish={handlePublishRule}
        editingRule={editingRule}
      />
    </>
  )
}
