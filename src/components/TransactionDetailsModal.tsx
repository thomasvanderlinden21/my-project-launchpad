import { useState } from 'react'
import SideModal from './SideModal'
import Tabs from './Tabs'
import type { TabItem } from './Tabs'
import Button from './Button'
import Chip from './Chip'
import Stepper from './Stepper'
import Step from './Step'
import Icon from './Icon'
import './TransactionDetailsModal.css'

export interface Transaction {
  // Basic details
  id: string
  date: string
  reference: string
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded'
  type: string
  grossAmount: string
  feesAmount: string
  dccPayback: string
  netAmount: string

  // Card details
  cardType: string
  cardNumber: string
  cardLogo?: string

  // Company Location Details
  acqPartnerMerchantId: string
  instoreOnlineMerchantId: string
  companyName: string
  location: string
  terminalId: string

  // References
  merchantReference: string
  acquirerReferenceNumber: string
  paymentAccountReference: string
  creditingReference: string
  settlementPayoutDate: string

  // Channel
  channel: string

  // History
  history?: {
    authorized?: { date: string; status: string }
    captured?: { date: string; status?: string }
    processedRejected?: { date: string; status: string }
    settled?: { date: string; status: string }
  }

  // Online Details - Cardholder
  issuingCountry?: string
  cardholderName?: string
  cardholderEmail?: string
  cardholderPhone?: string
  billingAddress?: string

  // 3D Secure
  authenticationStatus?: string
  liability?: string
  version?: string
  flow?: string
  warranty?: string
  eciScheme?: string

  // Card On File
  schemeReferenceData?: string
  processedWithSchemeToken?: string

  // Technical Logs
  accessControlServerId?: string
  directoryServerId?: string

  // Instore Details - POS
  posTerminalId?: string
  posSerialNumber?: string
  posModel?: string

  // Physical Location
  physicalAddress?: string
  physicalCity?: string
  physicalCountry?: string
  physicalPostalCode?: string

  // Terminal Details
  terminalSerialNumber?: string
  terminalModel?: string
  terminalManufacturer?: string

  // Acquiring Details
  batchNumber?: string
  batchDate?: string
  acquirerName?: string
  acquirerCountry?: string

  // Fraud Detection
  fraudStatus?: string
  fraudScore?: number
  fraudReason?: string
  fraudNotes?: string
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
  const [showRefundConfirmation, setShowRefundConfirmation] = useState(false)

  if (!transaction) return null

  const statusVariant = transaction.status === 'Paid' ? 'success' : transaction.status === 'Refunded' ? 'neutral' : 'neutral'

  const handleRefundClick = () => {
    setShowRefundConfirmation(true)
  }

  const handleRefundConfirm = () => {
    if (onRefund) {
      onRefund(transaction.id)
    }
    setShowRefundConfirmation(false)
    onClose()
  }

  const handleRefundCancel = () => {
    setShowRefundConfirmation(false)
  }

  const isOnline = transaction.channel === 'Ecomm' || transaction.channel === 'Mobile'
  const isInstore = transaction.channel === 'Instore'
  const isAcquiring = transaction.channel === 'MOTO'

  const tabs: TabItem[] = [
    {
      id: 'details',
      label: 'My details',
      children: (
        <div className="transaction-details-content">
          {/* Basic details */}
          <div className="transaction-section">
            <h3 className="transaction-section-title">Basic details</h3>
            <div className="transaction-fields">
              <div className="transaction-field">
                <span className="transaction-field-label">Transaction Date</span>
                <span className="transaction-field-value">{transaction.date}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Reference</span>
                <span className="transaction-field-value">{transaction.reference}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Status</span>
                <span className="transaction-field-value">
                  <Chip label={transaction.status} variant={statusVariant} />
                </span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Type</span>
                <span className="transaction-field-value">{transaction.type}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Gross Amount</span>
                <span className="transaction-field-value">{transaction.grossAmount}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Fees Amount</span>
                <span className="transaction-field-value">{transaction.feesAmount}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">DCC Payback</span>
                <span className="transaction-field-value">{transaction.dccPayback}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Net Amount</span>
                <span className="transaction-field-value">{transaction.netAmount}</span>
              </div>
            </div>
          </div>

          <div className="transaction-divider" />

          {/* Company Location Details */}
          <div className="transaction-section">
            <h3 className="transaction-section-title">Company Location Details</h3>
            <div className="transaction-fields">
              <div className="transaction-field">
                <span className="transaction-field-label">ACQ Partner/Merchant ID</span>
                <span className="transaction-field-value">{transaction.acqPartnerMerchantId}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Instore / Online Merchant ID</span>
                <span className="transaction-field-value">{transaction.instoreOnlineMerchantId}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Company Name</span>
                <span className="transaction-field-value">{transaction.companyName}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Location</span>
                <span className="transaction-field-value">{transaction.location}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Terminal ID</span>
                <span className="transaction-field-value">{transaction.terminalId}</span>
              </div>
            </div>
          </div>

          <div className="transaction-divider" />

          {/* References */}
          <div className="transaction-section">
            <h3 className="transaction-section-title">References</h3>
            <div className="transaction-fields">
              <div className="transaction-field">
                <span className="transaction-field-label">Merchant Reference</span>
                <span className="transaction-field-value">{transaction.merchantReference}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Acquirer Reference Number</span>
                <span className="transaction-field-value">{transaction.acquirerReferenceNumber}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Payment Account Reference</span>
                <span className="transaction-field-value">{transaction.paymentAccountReference}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Crediting Reference</span>
                <span className="transaction-field-value">{transaction.creditingReference}</span>
              </div>
              <div className="transaction-field">
                <span className="transaction-field-label">Settlement/Payout date/Expected</span>
                <span className="transaction-field-value">{transaction.settlementPayoutDate}</span>
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
          {transaction.history ? (
            <div className="transaction-timeline">
              {transaction.history.settled && (
                <div className="transaction-timeline-item">
                  <div className="transaction-timeline-marker">
                    <div className="transaction-timeline-dot transaction-timeline-dot--completed"></div>
                    <div className="transaction-timeline-line"></div>
                  </div>
                  <div className="transaction-timeline-content">
                    <div className="transaction-timeline-header">
                      <h4 className="transaction-timeline-title">Settled</h4>
                      <span className="transaction-timeline-date">{transaction.history.settled.date}</span>
                    </div>
                    <p className="transaction-timeline-description">{transaction.history.settled.status}</p>
                  </div>
                </div>
              )}
              {transaction.history.processedRejected && (
                <div className="transaction-timeline-item">
                  <div className="transaction-timeline-marker">
                    <div className="transaction-timeline-dot transaction-timeline-dot--completed"></div>
                    <div className="transaction-timeline-line"></div>
                  </div>
                  <div className="transaction-timeline-content">
                    <div className="transaction-timeline-header">
                      <h4 className="transaction-timeline-title">Processed or Rejected</h4>
                      <span className="transaction-timeline-date">{transaction.history.processedRejected.date}</span>
                    </div>
                    <p className="transaction-timeline-description">{transaction.history.processedRejected.status}</p>
                  </div>
                </div>
              )}
              {transaction.history.captured && (
                <div className="transaction-timeline-item">
                  <div className="transaction-timeline-marker">
                    <div className="transaction-timeline-dot transaction-timeline-dot--completed"></div>
                    <div className="transaction-timeline-line"></div>
                  </div>
                  <div className="transaction-timeline-content">
                    <div className="transaction-timeline-header">
                      <h4 className="transaction-timeline-title">Captured</h4>
                      <span className="transaction-timeline-date">{transaction.history.captured.date}</span>
                    </div>
                    {transaction.history.captured.status && (
                      <p className="transaction-timeline-description">{transaction.history.captured.status}</p>
                    )}
                  </div>
                </div>
              )}
              {transaction.history.authorized && (
                <div className="transaction-timeline-item transaction-timeline-item--last">
                  <div className="transaction-timeline-marker">
                    <div className="transaction-timeline-dot transaction-timeline-dot--completed"></div>
                  </div>
                  <div className="transaction-timeline-content">
                    <div className="transaction-timeline-header">
                      <h4 className="transaction-timeline-title">Authorized</h4>
                      <span className="transaction-timeline-date">{transaction.history.authorized.date}</span>
                    </div>
                    <p className="transaction-timeline-description">{transaction.history.authorized.status}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Stepper activeStep={transaction.status === 'Paid' ? 4 : 2} orientation="vertical">
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
                description={`Customer successfully paid ${transaction.grossAmount}`}
              />
            </Stepper>
          )}
        </div>
      ),
    },
  ]

  // Add Online Details tab for online transactions
  if (isOnline) {
    tabs.push({
      id: 'online',
      label: 'Online Details',
      children: (
        <div className="transaction-details-content">
          {/* Cardholder Details */}
          <div className="transaction-section">
            <h3 className="transaction-section-title">Cardholder Details</h3>
            <div className="transaction-fields">
              {transaction.issuingCountry && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Issuing Country</span>
                  <span className="transaction-field-value">{transaction.issuingCountry}</span>
                </div>
              )}
              {transaction.cardholderName && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Name</span>
                  <span className="transaction-field-value">{transaction.cardholderName}</span>
                </div>
              )}
              {transaction.cardholderEmail && (
                <div className="transaction-field">
                  <span className="transaction-field-label">e-mail</span>
                  <span className="transaction-field-value">{transaction.cardholderEmail}</span>
                </div>
              )}
              {transaction.cardholderPhone && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Telephone Number</span>
                  <span className="transaction-field-value">{transaction.cardholderPhone}</span>
                </div>
              )}
              {transaction.billingAddress && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Billing Address</span>
                  <span className="transaction-field-value">{transaction.billingAddress}</span>
                </div>
              )}
            </div>
          </div>

          <div className="transaction-divider" />

          {/* 3D Secure */}
          <div className="transaction-section">
            <h3 className="transaction-section-title">3D Secure</h3>
            <div className="transaction-fields">
              {transaction.authenticationStatus && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Authentication Status</span>
                  <span className="transaction-field-value">{transaction.authenticationStatus}</span>
                </div>
              )}
              {transaction.liability && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Liability</span>
                  <span className="transaction-field-value">{transaction.liability}</span>
                </div>
              )}
              {transaction.version && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Version</span>
                  <span className="transaction-field-value">{transaction.version}</span>
                </div>
              )}
              {transaction.flow && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Flow</span>
                  <span className="transaction-field-value">{transaction.flow}</span>
                </div>
              )}
              {transaction.warranty && (
                <div className="transaction-field">
                  <span className="transaction-field-label">warranty</span>
                  <span className="transaction-field-value">{transaction.warranty}</span>
                </div>
              )}
              {transaction.eciScheme && (
                <div className="transaction-field">
                  <span className="transaction-field-label">ECI Scheme</span>
                  <span className="transaction-field-value">{transaction.eciScheme}</span>
                </div>
              )}
            </div>
          </div>

          <div className="transaction-divider" />

          {/* Card On File */}
          <div className="transaction-section">
            <h3 className="transaction-section-title">Card On File</h3>
            <div className="transaction-fields">
              {transaction.schemeReferenceData && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Scheme Reference Data</span>
                  <span className="transaction-field-value">{transaction.schemeReferenceData}</span>
                </div>
              )}
              {transaction.processedWithSchemeToken && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Processed with Scheme Token</span>
                  <span className="transaction-field-value">{transaction.processedWithSchemeToken}</span>
                </div>
              )}
            </div>
          </div>

          <div className="transaction-divider" />

          {/* Technical Logs */}
          <div className="transaction-section">
            <h3 className="transaction-section-title">Technical Logs</h3>
            <div className="transaction-fields">
              {transaction.accessControlServerId && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Access Control Server ID</span>
                  <span className="transaction-field-value">{transaction.accessControlServerId}</span>
                </div>
              )}
              {transaction.directoryServerId && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Directory Server ID</span>
                  <span className="transaction-field-value">{transaction.directoryServerId}</span>
                </div>
              )}
            </div>
          </div>

          <div className="transaction-divider" />

          {/* GDPR / PCI Compliance */}
          <div className="transaction-compliance-notice">
            <Icon name="info" size={16} />
            <span>GDPR / PCI Compliance?</span>
          </div>
        </div>
      ),
    })
  }

  // Add Instore Details tab for instore transactions
  if (isInstore) {
    tabs.push({
      id: 'instore',
      label: 'Instore Details',
      children: (
        <div className="transaction-details-content">
          {/* POS Details */}
          <div className="transaction-section">
            <h3 className="transaction-section-title">POS Details</h3>
            <div className="transaction-fields">
              {transaction.posTerminalId && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Terminal ID</span>
                  <span className="transaction-field-value">{transaction.posTerminalId}</span>
                </div>
              )}
              {transaction.posSerialNumber && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Serial Number</span>
                  <span className="transaction-field-value">{transaction.posSerialNumber}</span>
                </div>
              )}
              {transaction.posModel && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Model</span>
                  <span className="transaction-field-value">{transaction.posModel}</span>
                </div>
              )}
            </div>
          </div>

          <div className="transaction-divider" />

          {/* Physical Location Details */}
          <div className="transaction-section">
            <h3 className="transaction-section-title">Physical Location Details</h3>
            <div className="transaction-fields">
              {transaction.physicalAddress && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Address</span>
                  <span className="transaction-field-value">{transaction.physicalAddress}</span>
                </div>
              )}
              {transaction.physicalCity && (
                <div className="transaction-field">
                  <span className="transaction-field-label">City</span>
                  <span className="transaction-field-value">{transaction.physicalCity}</span>
                </div>
              )}
              {transaction.physicalCountry && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Country</span>
                  <span className="transaction-field-value">{transaction.physicalCountry}</span>
                </div>
              )}
              {transaction.physicalPostalCode && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Postal Code</span>
                  <span className="transaction-field-value">{transaction.physicalPostalCode}</span>
                </div>
              )}
            </div>
          </div>

          <div className="transaction-divider" />

          {/* Terminal Details */}
          <div className="transaction-section">
            <h3 className="transaction-section-title">Terminal Details</h3>
            <div className="transaction-fields">
              {transaction.terminalSerialNumber && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Serial Number</span>
                  <span className="transaction-field-value">{transaction.terminalSerialNumber}</span>
                </div>
              )}
              {transaction.terminalModel && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Model</span>
                  <span className="transaction-field-value">{transaction.terminalModel}</span>
                </div>
              )}
              {transaction.terminalManufacturer && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Manufacturer</span>
                  <span className="transaction-field-value">{transaction.terminalManufacturer}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    })
  }

  // Add Acquiring Details tab for acquiring transactions
  if (isAcquiring) {
    tabs.push({
      id: 'acquiring',
      label: 'Acquiring Details',
      children: (
        <div className="transaction-details-content">
          {/* ACQ Details */}
          <div className="transaction-section">
            <h3 className="transaction-section-title">ACQ Details</h3>
            <div className="transaction-fields">
              {transaction.acquirerName && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Acquirer Name</span>
                  <span className="transaction-field-value">{transaction.acquirerName}</span>
                </div>
              )}
              {transaction.acquirerCountry && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Acquirer Country</span>
                  <span className="transaction-field-value">{transaction.acquirerCountry}</span>
                </div>
              )}
              {transaction.acquirerReferenceNumber && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Acquirer Reference</span>
                  <span className="transaction-field-value">{transaction.acquirerReferenceNumber}</span>
                </div>
              )}
            </div>
          </div>

          <div className="transaction-divider" />

          {/* Batch Details */}
          <div className="transaction-section">
            <h3 className="transaction-section-title">Batch Details</h3>
            <div className="transaction-fields">
              {transaction.batchNumber && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Batch Number</span>
                  <span className="transaction-field-value">{transaction.batchNumber}</span>
                </div>
              )}
              {transaction.batchDate && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Batch Date</span>
                  <span className="transaction-field-value">{transaction.batchDate}</span>
                </div>
              )}
            </div>
          </div>

          <div className="transaction-divider" />

          {/* Crediting Reference */}
          <div className="transaction-section">
            <h3 className="transaction-section-title">Crediting Reference</h3>
            <div className="transaction-fields">
              {transaction.creditingReference && (
                <div className="transaction-field">
                  <span className="transaction-field-label">Reference</span>
                  <span className="transaction-field-value">{transaction.creditingReference}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    })
  }

  // Add Fraud tab (always visible)
  tabs.push({
    id: 'fraud',
    label: 'Fraud',
    children: (
      <div className="transaction-details-content">
        {transaction.fraudStatus ? (
          <>
            {/* Fraud Status */}
            <div className="transaction-section">
              <h3 className="transaction-section-title">Fraud Detection</h3>
              <div className="transaction-fields">
                <div className="transaction-field">
                  <span className="transaction-field-label">Status</span>
                  <span className="transaction-field-value">{transaction.fraudStatus}</span>
                </div>
                {transaction.fraudScore !== undefined && (
                  <div className="transaction-field">
                    <span className="transaction-field-label">Risk Score</span>
                    <span className="transaction-field-value">{transaction.fraudScore}/100</span>
                  </div>
                )}
                {transaction.fraudReason && (
                  <div className="transaction-field">
                    <span className="transaction-field-label">Reason</span>
                    <span className="transaction-field-value">{transaction.fraudReason}</span>
                  </div>
                )}
              </div>
            </div>

            {transaction.fraudNotes && (
              <>
                <div className="transaction-divider" />
                <div className="transaction-section">
                  <h3 className="transaction-section-title">Investigation Notes</h3>
                  <div className="transaction-fraud-notes">
                    <p>{transaction.fraudNotes}</p>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="transaction-fraud-placeholder">
            <Icon name="shield-question" size={48} />
            <h3>Need to be investigated still!</h3>
            <p>No fraud analysis available for this transaction yet.</p>
          </div>
        )}
      </div>
    ),
  })

  return (
    <>
      <SideModal
        isOpen={isOpen}
        onClose={onClose}
        title="Transaction details"
        width="md"
      >
        <div className="transaction-modal-wrapper">
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
            <p className="transaction-card-amount">{transaction.grossAmount}</p>
          </div>

          {onRefund && transaction.status === 'Paid' && (
            <Button
              hierarchy="secondary"
              size="sm"
              fullWidth
              onClick={handleRefundClick}
            >
              Refund transaction
            </Button>
          )}

          {/* Tabs */}
          <Tabs items={tabs} activeId={activeTab} onChange={setActiveTab} />
        </div>
      </SideModal>

      {/* Refund Confirmation Modal */}
      {showRefundConfirmation && (
        <div className="refund-confirmation-overlay">
          <div className="refund-confirmation-dialog">
            <div className="refund-confirmation-icon">
              <Icon name="alert-circle" size={48} />
            </div>
            <h3 className="refund-confirmation-title">Confirm refund</h3>
            <p className="refund-confirmation-description">
              Are you sure you want to refund this transaction of {transaction.grossAmount}? This action cannot be undone.
            </p>
            <div className="refund-confirmation-actions">
              <Button
                hierarchy="secondary"
                size="md"
                onClick={handleRefundCancel}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                hierarchy="primary"
                size="md"
                onClick={handleRefundConfirm}
                fullWidth
              >
                Confirm refund
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
