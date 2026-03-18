import { useState } from 'react'
import SideModal from './SideModal'
import Tabs from './Tabs'
import type { TabItem } from './Tabs'
import Button from './Button'
import Chip from './Chip'
import Stepper from './Stepper'
import Step from './Step'
import './TransactionDetailsModal.css'

export interface Transaction {
  id: string
  date: string
  amount: string
  fee: string
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded'
  cardType: string
  cardNumber: string
  cardLogo?: string
  companyName: string
  merchantReference: string
  paymentId: string
  authorizationDate: string
  acquirer: string
  channel: string
}

export interface TransactionDetailsModalProps {
  /** Controls visibility */
  isOpen: boolean
  /** Called when the modal should close */
  onClose: () => void
  /** Transaction data to display */
  transaction: Transaction | null
  /** Called when refund is requested */
  onRefund?: (transactionId: string) => void
}

export default function TransactionDetailsModal({
  isOpen,
  onClose,
  transaction,
  onRefund,
}: TransactionDetailsModalProps) {
  const [activeTab, setActiveTab] = useState('details')

  if (!transaction) return null

  const statusVariant = transaction.status === 'Paid' ? 'success' : 'neutral'

  // For paid transactions, show all steps as completed
  const historyActiveStep = transaction.status === 'Paid' ? 4 : 2

  const tabs: TabItem[] = [
    {
      id: 'details',
      label: 'My details',
      children: (
        <div className="transaction-details-content">
          {/* Card summary */}
          <div className="transaction-card-summary">
            <div className="transaction-card-info">
              {transaction.cardLogo && (
                <div className="transaction-card-logo">
                  <img src={transaction.cardLogo} alt={transaction.cardType} />
                </div>
              )}
              {!transaction.cardLogo && (
                <div className="transaction-card-logo transaction-card-logo--placeholder">
                  {transaction.cardType.charAt(0)}
                </div>
              )}
              <div className="transaction-card-details">
                <p className="transaction-card-type">{transaction.cardType}</p>
                <p className="transaction-card-number">{transaction.cardNumber}</p>
              </div>
            </div>
            <p className="transaction-card-amount">{transaction.amount}</p>
          </div>

          {onRefund && (
            <Button
              hierarchy="secondary"
              size="sm"
              fullWidth
              onClick={() => onRefund(transaction.id)}
            >
              Refund transaction
            </Button>
          )}

          {/* Details section */}
          <div className="transaction-section">
            <h3 className="transaction-section-title">Details</h3>
            <div className="transaction-fields">
              <div className="transaction-field">
                <span className="transaction-field-label">Transaction ID</span>
                <span className="transaction-field-value">{transaction.id}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Transaction Date</span>
                <span className="transaction-field-value">{transaction.date}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Status</span>
                <span className="transaction-field-value">
                  <Chip label={transaction.status} variant={statusVariant} />
                </span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Amount</span>
                <span className="transaction-field-value">{transaction.amount}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Fee</span>
                <span className="transaction-field-value">{transaction.fee}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="transaction-divider" />

          {/* Transactions section */}
          <div className="transaction-section">
            <h3 className="transaction-section-title">Transactions</h3>
            <div className="transaction-fields">
              <div className="transaction-field">
                <span className="transaction-field-label">Company name</span>
                <span className="transaction-field-value">{transaction.companyName}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Merchant reference</span>
                <span className="transaction-field-value">{transaction.merchantReference}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Payment ID</span>
                <span className="transaction-field-value">{transaction.paymentId}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Authorization date</span>
                <span className="transaction-field-value">{transaction.authorizationDate}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Acquirer</span>
                <span className="transaction-field-value">{transaction.acquirer}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Channel</span>
                <span className="transaction-field-value">{transaction.channel}</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'history',
      label: 'History',
      children: (
        <div className="transaction-details-content">
          <Stepper activeStep={historyActiveStep} orientation="vertical">
            <Step
              label="Payment initiated"
              description="Customer started checkout process"
            />
            <Step
              label="Card validated"
              description="Card details verified successfully"
            />
            <Step
              label="Payment authorized"
              description="Payment method authorized by bank"
            />
            <Step
              label="Payment completed"
              description={`Customer successfully paid ${transaction.amount}`}
            />
          </Stepper>
        </div>
      ),
    },
    {
      id: 'password',
      label: 'Password',
      children: (
        <div className="transaction-details-content">
          <p className="transaction-placeholder">Password settings will be displayed here.</p>
        </div>
      ),
    },
  ]

  return (
    <SideModal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction details"
      width="md"
      footer={
        <Button hierarchy="secondary" size="sm" onClick={onClose}>
          Close
        </Button>
      }
    >
      <Tabs items={tabs} activeId={activeTab} onChange={setActiveTab} />
    </SideModal>
  )
}
