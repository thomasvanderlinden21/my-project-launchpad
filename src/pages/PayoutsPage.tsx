import { useState } from 'react'
import TableCell from '../components/TableCell'
import Button from '../components/Button'
import Icon from '../components/Icon'
import Chip from '../components/Chip'
import './PayoutsPage.css'

type PayoutStatus = 'Paid' | 'Pending' | 'Processing' | 'Failed'

interface Payout {
  id: string
  payoutDate: string
  amount: string
  currency: string
  status: PayoutStatus
  reference: string
  bankAccount: string
  periodStart: string
  periodEnd: string
  transactionCount: number
}

const dummyPayouts: Payout[] = [
  {
    id: '#PO-2024-001',
    payoutDate: '15/03/25, 09:00',
    amount: '12,450.00',
    currency: 'EUR',
    status: 'Paid',
    reference: 'REF-001-2024',
    bankAccount: 'NL89 BANK 0417 1643 00',
    periodStart: '01/03/25',
    periodEnd: '14/03/25',
    transactionCount: 245
  },
  {
    id: '#PO-2024-002',
    payoutDate: '08/03/25, 09:00',
    amount: '8,320.50',
    currency: 'EUR',
    status: 'Paid',
    reference: 'REF-002-2024',
    bankAccount: 'NL89 BANK 0417 1643 00',
    periodStart: '22/02/25',
    periodEnd: '07/03/25',
    transactionCount: 189
  },
  {
    id: '#PO-2024-003',
    payoutDate: '22/03/25, 09:00',
    amount: '15,678.90',
    currency: 'EUR',
    status: 'Pending',
    reference: 'REF-003-2024',
    bankAccount: 'NL89 BANK 0417 1643 00',
    periodStart: '15/03/25',
    periodEnd: '21/03/25',
    transactionCount: 312
  },
  {
    id: '#PO-2024-004',
    payoutDate: '01/03/25, 09:00',
    amount: '9,540.25',
    currency: 'EUR',
    status: 'Paid',
    reference: 'REF-004-2024',
    bankAccount: 'NL89 BANK 0417 1643 00',
    periodStart: '15/02/25',
    periodEnd: '28/02/25',
    transactionCount: 201
  },
  {
    id: '#PO-2024-005',
    payoutDate: '25/03/25, 09:00',
    amount: '11,234.75',
    currency: 'EUR',
    status: 'Processing',
    reference: 'REF-005-2024',
    bankAccount: 'NL89 BANK 0417 1643 00',
    periodStart: '22/03/25',
    periodEnd: '24/03/25',
    transactionCount: 267
  },
  {
    id: '#PO-2024-006',
    payoutDate: '22/02/25, 09:00',
    amount: '7,890.00',
    currency: 'EUR',
    status: 'Paid',
    reference: 'REF-006-2024',
    bankAccount: 'NL89 BANK 0417 1643 00',
    periodStart: '08/02/25',
    periodEnd: '21/02/25',
    transactionCount: 176
  },
  {
    id: '#PO-2024-007',
    payoutDate: '15/02/25, 09:00',
    amount: '13,567.40',
    currency: 'EUR',
    status: 'Paid',
    reference: 'REF-007-2024',
    bankAccount: 'NL89 BANK 0417 1643 00',
    periodStart: '01/02/25',
    periodEnd: '14/02/25',
    transactionCount: 298
  },
  {
    id: '#PO-2024-008',
    payoutDate: '08/02/25, 09:00',
    amount: '10,123.60',
    currency: 'EUR',
    status: 'Paid',
    reference: 'REF-008-2024',
    bankAccount: 'NL89 BANK 0417 1643 00',
    periodStart: '25/01/25',
    periodEnd: '07/02/25',
    transactionCount: 223
  },
  {
    id: '#PO-2024-009',
    payoutDate: '01/02/25, 09:00',
    amount: '14,890.30',
    currency: 'EUR',
    status: 'Paid',
    reference: 'REF-009-2024',
    bankAccount: 'NL89 BANK 0417 1643 00',
    periodStart: '18/01/25',
    periodEnd: '31/01/25',
    transactionCount: 334
  },
  {
    id: '#PO-2024-010',
    payoutDate: '25/01/25, 09:00',
    amount: '8,765.50',
    currency: 'EUR',
    status: 'Paid',
    reference: 'REF-010-2024',
    bankAccount: 'NL89 BANK 0417 1643 00',
    periodStart: '11/01/25',
    periodEnd: '24/01/25',
    transactionCount: 198
  },
  {
    id: '#PO-2024-011',
    payoutDate: '18/01/25, 09:00',
    amount: '16,234.80',
    currency: 'EUR',
    status: 'Paid',
    reference: 'REF-011-2024',
    bankAccount: 'NL89 BANK 0417 1643 00',
    periodStart: '04/01/25',
    periodEnd: '17/01/25',
    transactionCount: 356
  },
  {
    id: '#PO-2024-012',
    payoutDate: '10/01/25, 09:00',
    amount: '6,543.20',
    currency: 'EUR',
    status: 'Failed',
    reference: 'REF-012-2024',
    bankAccount: 'NL89 BANK 0417 1643 00',
    periodStart: '28/12/24',
    periodEnd: '09/01/25',
    transactionCount: 145
  }
]

export default function PayoutsPage() {
  const [payouts] = useState<Payout[]>(dummyPayouts)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  const getStatusVariant = (status: PayoutStatus): 'success' | 'warning' | 'neutral' | 'error' => {
    switch (status) {
      case 'Paid':
        return 'success'
      case 'Processing':
        return 'warning'
      case 'Pending':
        return 'neutral'
      case 'Failed':
        return 'error'
      default:
        return 'neutral'
    }
  }

  return (
    <div className="payouts-page">
      <div className="payouts-page__header">
        <div className="payouts-page__header-left">
          <h2 className="payouts-page__title">Payouts</h2>
          <p className="payouts-page__subtitle">View and manage your payout history</p>
        </div>
        <div className="payouts-page__header-actions">
          <div className="payouts-page__view-toggle">
            <button
              className={`payouts-page__view-btn ${viewMode === 'list' ? 'payouts-page__view-btn--active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <Icon name="view-list" size={17} />
            </button>
            <button
              className={`payouts-page__view-btn ${viewMode === 'grid' ? 'payouts-page__view-btn--active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <Icon name="view-grid" size={17} />
            </button>
          </div>
          <Button hierarchy="secondary" size="md" leadingIcon={<Icon name="download" size={20} />}>
            Export
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="payouts-page__grid">
          {payouts.map((payout) => (
            <div key={payout.id} className="payout-card">
              <div className="payout-card__header">
                <span className="payout-card__id">{payout.id}</span>
                <Chip label={payout.status} variant={getStatusVariant(payout.status)} size="sm" />
              </div>
              <div className="payout-card__amount">
                <span className="payout-card__currency">{payout.currency}</span>
                <span className="payout-card__value">{payout.amount}</span>
              </div>
              <div className="payout-card__details">
                <div className="payout-card__detail">
                  <span className="payout-card__label">Payout Date</span>
                  <span className="payout-card__info">{payout.payoutDate}</span>
                </div>
                <div className="payout-card__detail">
                  <span className="payout-card__label">Reference</span>
                  <span className="payout-card__info">{payout.reference}</span>
                </div>
                <div className="payout-card__detail">
                  <span className="payout-card__label">Period</span>
                  <span className="payout-card__info">{payout.periodStart} - {payout.periodEnd}</span>
                </div>
                <div className="payout-card__detail">
                  <span className="payout-card__label">Transactions</span>
                  <span className="payout-card__info">{payout.transactionCount}</span>
                </div>
                <div className="payout-card__detail">
                  <span className="payout-card__label">Bank Account</span>
                  <span className="payout-card__info">{payout.bankAccount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="payouts-page__table-container">
          <table className="payouts-page__table">
            <thead>
              <tr>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--content-secondary)',
                  borderBottom: '1px solid var(--border-neutral-low)',
                  background: 'var(--surface-neutral-low)',
                  fontFamily: 'var(--font-family-secondary)'
                }}>Payout ID</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--content-secondary)',
                  borderBottom: '1px solid var(--border-neutral-low)',
                  background: 'var(--surface-neutral-low)',
                  fontFamily: 'var(--font-family-secondary)'
                }}>Payout Date</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--content-secondary)',
                  borderBottom: '1px solid var(--border-neutral-low)',
                  background: 'var(--surface-neutral-low)',
                  fontFamily: 'var(--font-family-secondary)'
                }}>Amount</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--content-secondary)',
                  borderBottom: '1px solid var(--border-neutral-low)',
                  background: 'var(--surface-neutral-low)',
                  fontFamily: 'var(--font-family-secondary)'
                }}>Status</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--content-secondary)',
                  borderBottom: '1px solid var(--border-neutral-low)',
                  background: 'var(--surface-neutral-low)',
                  fontFamily: 'var(--font-family-secondary)'
                }}>Reference</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--content-secondary)',
                  borderBottom: '1px solid var(--border-neutral-low)',
                  background: 'var(--surface-neutral-low)',
                  fontFamily: 'var(--font-family-secondary)'
                }}>Bank Account</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--content-secondary)',
                  borderBottom: '1px solid var(--border-neutral-low)',
                  background: 'var(--surface-neutral-low)',
                  fontFamily: 'var(--font-family-secondary)'
                }}>Period</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--content-secondary)',
                  borderBottom: '1px solid var(--border-neutral-low)',
                  background: 'var(--surface-neutral-low)',
                  fontFamily: 'var(--font-family-secondary)'
                }}>Transactions</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((payout) => (
                <tr key={payout.id} style={{
                  cursor: 'pointer',
                  transition: 'background-color 0.15s',
                  borderBottom: '1px solid var(--border-neutral-low)'
                }}>
                  <TableCell>{payout.id}</TableCell>
                  <TableCell>{payout.payoutDate}</TableCell>
                  <TableCell>{payout.currency} {payout.amount}</TableCell>
                  <TableCell chip={{ label: payout.status, variant: getStatusVariant(payout.status) }} />
                  <TableCell>{payout.reference}</TableCell>
                  <TableCell>{payout.bankAccount}</TableCell>
                  <TableCell>{payout.periodStart} - {payout.periodEnd}</TableCell>
                  <TableCell>{payout.transactionCount}</TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
