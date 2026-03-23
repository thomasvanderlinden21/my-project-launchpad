import { useState, useEffect } from 'react'
import Tabs from '../components/Tabs'
import type { TabItem } from '../components/Tabs'
import TableCell from '../components/TableCell'
import SideModal from '../components/SideModal'
import FiltersPanel from '../components/FiltersPanel'
import type { FiltersState } from '../components/FiltersPanel'
import TransactionDetailsModal from '../components/TransactionDetailsModal'
import type { Transaction as TransactionDetails } from '../components/TransactionDetailsModal'
import ColumnManagementModal from '../components/ColumnManagementModal'
import type { ColumnConfig } from '../components/ColumnManagementModal'
import Button from '../components/Button'
import Icon from '../components/Icon'
import Snackbar from '../components/Snackbar'
import './SalesPage.css'

type Status = 'Paid' | 'Pending' | 'Completed' | 'Failed' | 'Refunded'
type TransactionType = 'Online' | 'Instore' | 'Acquiring'

interface Transaction {
  id: string
  card: string
  status: Status
  subStatus: string
  merchantId: string
  locationName: string
  terminalId: string
  orderId: string
  amount: string
  currency: string
  date: string
  transactionType: TransactionType
  paymentMethod: string
  type: string
  channel: string
  acquiringReference: string
  fraudFlagged: boolean
}

const initialTransactions: Transaction[] = [
  {
    id: '#2456221',
    card: '****9382',
    status: 'Paid',
    subStatus: 'Ecom',
    merchantId: '113239382',
    locationName: 'Downtown Store',
    terminalId: 'T001',
    orderId: '#113239382',
    amount: '259.00',
    currency: 'EUR',
    date: '24/02/25, 21:05',
    transactionType: 'Online',
    paymentMethod: 'Visa',
    type: 'Payment',
    channel: 'Ecomm',
    acquiringReference: 'ACQ-2456221',
    fraudFlagged: false
  },
  {
    id: '#2456222',
    card: '****9382',
    status: 'Pending',
    subStatus: 'MOTO',
    merchantId: '113239383',
    locationName: 'Uptown Branch',
    terminalId: 'T002',
    orderId: '#113239382',
    amount: '150.00',
    currency: 'EUR',
    date: '25/02/25, 14:30',
    transactionType: 'Instore',
    paymentMethod: 'Mastercard',
    type: 'Payment',
    channel: 'Instore',
    acquiringReference: 'ACQ-2456222',
    fraudFlagged: false
  },
  {
    id: '#2456223',
    card: '****9382',
    status: 'Completed',
    subStatus: 'Ecom',
    merchantId: '113239384',
    locationName: 'City Center',
    terminalId: 'T003',
    orderId: '#113239382',
    amount: '320.00',
    currency: 'EUR',
    date: '26/02/25, 09:15',
    transactionType: 'Online',
    paymentMethod: 'Visa',
    type: 'Payment',
    channel: 'Ecomm',
    acquiringReference: 'ACQ-2456223',
    fraudFlagged: true
  },
  {
    id: '#2456224',
    card: '****9382',
    status: 'Failed',
    subStatus: 'Recurring',
    merchantId: '113239385',
    locationName: 'West Side Mall',
    terminalId: 'T004',
    orderId: '#113239382',
    amount: '89.00',
    currency: 'USD',
    date: '27/02/25, 11:45',
    transactionType: 'Acquiring',
    paymentMethod: 'PayPal',
    type: 'Payment',
    channel: 'Mobile',
    acquiringReference: 'ACQ-2456224',
    fraudFlagged: false
  },
  {
    id: '#2456225',
    card: '****9382',
    status: 'Refunded',
    subStatus: 'Ecom',
    merchantId: '113239386',
    locationName: 'East Plaza',
    terminalId: 'T005',
    orderId: '#113239382',
    amount: '120.00',
    currency: 'EUR',
    date: '28/02/25, 16:00',
    transactionType: 'Online',
    paymentMethod: 'Visa',
    type: 'Refund',
    channel: 'Ecomm',
    acquiringReference: 'ACQ-2456225',
    fraudFlagged: false
  },
  {
    id: '#2456226',
    card: '****9382',
    status: 'Paid',
    subStatus: 'MOTO',
    merchantId: '113239387',
    locationName: 'North Station',
    terminalId: 'T006',
    orderId: '#113239382',
    amount: '450.00',
    currency: 'GBP',
    date: '01/03/25, 18:20',
    transactionType: 'Instore',
    paymentMethod: 'Mastercard',
    type: 'Payment',
    channel: 'Instore',
    acquiringReference: 'ACQ-2456226',
    fraudFlagged: false
  },
  {
    id: '#2456227',
    card: '****9382',
    status: 'Pending',
    subStatus: 'Installment',
    merchantId: '113239388',
    locationName: 'South Park',
    terminalId: 'T007',
    orderId: '#113239382',
    amount: '75.00',
    currency: 'EUR',
    date: '02/03/25, 10:10',
    transactionType: 'Acquiring',
    paymentMethod: 'Apple pay',
    type: 'Payment',
    channel: 'MOTO',
    acquiringReference: 'ACQ-2456227',
    fraudFlagged: false
  },
  {
    id: '#2456228',
    card: '****9382',
    status: 'Completed',
    subStatus: 'Ecom',
    merchantId: '113239389',
    locationName: 'Harbor View',
    terminalId: 'T008',
    orderId: '#113239382',
    amount: '200.00',
    currency: 'EUR',
    date: '03/03/25, 12:00',
    transactionType: 'Online',
    paymentMethod: 'Google Pay',
    type: 'Payment',
    channel: 'Ecomm',
    acquiringReference: 'ACQ-2456228',
    fraudFlagged: true
  },
  {
    id: '#2456229',
    card: '****9382',
    status: 'Failed',
    subStatus: 'MOTO',
    merchantId: '113239390',
    locationName: 'Airport Terminal',
    terminalId: 'T009',
    orderId: '#113239382',
    amount: '300.00',
    currency: 'CHF',
    date: '04/03/25, 14:15',
    transactionType: 'Instore',
    paymentMethod: 'Visa',
    type: 'Payment',
    channel: 'Instore',
    acquiringReference: 'ACQ-2456229',
    fraudFlagged: false
  },
  {
    id: '#2456230',
    card: '****9382',
    status: 'Refunded',
    subStatus: 'Ecom',
    merchantId: '113239391',
    locationName: 'Main Street',
    terminalId: 'T010',
    orderId: '#113239382',
    amount: '180.00',
    currency: 'EUR',
    date: '05/03/25, 09:45',
    transactionType: 'Acquiring',
    paymentMethod: 'Mastercard',
    type: 'Refund',
    channel: 'Mobile',
    acquiringReference: 'ACQ-2456230',
    fraudFlagged: false
  },
]

const statusToChipVariant: Record<Status, 'success' | 'info' | 'neutral' | 'warning' | 'error'> = {
  Paid:      'success',
  Pending:   'neutral',
  Completed: 'success', // Display as Paid
  Failed:    'error',
  Refunded:  'neutral',
}

export default function SalesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [showRefundSnackbar, setShowRefundSnackbar] = useState(false)
  const [refundedTransactionId, setRefundedTransactionId] = useState<string | null>(null)
  const [previousTransactionState, setPreviousTransactionState] = useState<Transaction | null>(null)
  const [showLastMonth, setShowLastMonth] = useState(false)
  const [filters, setFilters] = useState<FiltersState>({
    startDate: '',
    endDate: '',
    currency: new Set(),
    minAmount: '',
    maxAmount: '',
    cardNumber: '',
    status: new Set(),
    subStatus: new Set(),
    paymentMethods: new Set(),
    transactionType: new Set(),
    transactionId: '',
    channel: new Set(),
    merchantId: '',
    locationName: '',
    terminalId: '',
    acquiringReference: '',
    fraudOnly: false,
  })
  const [appliedFilters, setAppliedFilters] = useState<FiltersState>({
    startDate: '',
    endDate: '',
    currency: new Set(),
    minAmount: '',
    maxAmount: '',
    cardNumber: '',
    status: new Set(),
    subStatus: new Set(),
    paymentMethods: new Set(),
    transactionType: new Set(),
    transactionId: '',
    channel: new Set(),
    merchantId: '',
    locationName: '',
    terminalId: '',
    acquiringReference: '',
    fraudOnly: false,
  })
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetails | null>(null)
  const [isColumnManagementOpen, setIsColumnManagementOpen] = useState(false)
  const [dateSortOrder, setDateSortOrder] = useState<'asc' | 'desc' | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { id: 'id', label: 'Transaction ID', visible: true, locked: true, order: 0 },
    { id: 'card', label: 'Card number', visible: true, order: 1 },
    { id: 'status', label: 'Status', visible: true, order: 2 },
    { id: 'type', label: 'Type', visible: true, order: 3 },
    { id: 'orderId', label: 'Location', visible: true, order: 4 },
    { id: 'amount', label: 'Amount', visible: true, order: 5 },
    { id: 'date', label: 'Date', visible: true, order: 6 },
  ])
  const [appliedColumns, setAppliedColumns] = useState<ColumnConfig[]>(columns)

  // Reset to first page when filters or search change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, appliedFilters, activeTab, showLastMonth])

  // Get visible columns in order
  const visibleColumns = appliedColumns.filter(c => c.visible).sort((a, b) => (a.order || 0) - (b.order || 0))

  // Filter, sort, and paginate transactions
  const allFilteredTransactions = transactions
    .filter(tx => {
      // Tab filter
      if (activeTab !== 'all') {
        if (activeTab === 'online' && tx.transactionType !== 'Online') return false
        if (activeTab === 'instore' && tx.transactionType !== 'Instore') return false
        if (activeTab === 'acquiring' && tx.transactionType !== 'Acquiring') return false
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const searchableText = `${tx.id} ${tx.card} ${tx.status} ${tx.type} ${tx.orderId} ${tx.amount} ${tx.date}`.toLowerCase()
        if (!searchableText.includes(query)) return false
      }

      // Last month filter
      if (showLastMonth) {
        const txDate = new Date(tx.date.split(',')[0].split('/').reverse().join('-'))
        const now = new Date()
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        if (txDate < lastMonth || txDate >= currentMonth) return false
      }

      // Currency filter
      if (appliedFilters.currency.size > 0 && !appliedFilters.currency.has(tx.currency)) {
        return false
      }

      // Card number filter (last 4 digits)
      if (appliedFilters.cardNumber) {
        const last4 = tx.card.slice(-4)
        if (!last4.includes(appliedFilters.cardNumber)) return false
      }

      // Status filter
      if (appliedFilters.status.size > 0 && !appliedFilters.status.has(tx.status)) {
        return false
      }

      // Sub-status filter
      if (appliedFilters.subStatus.size > 0 && !appliedFilters.subStatus.has(tx.subStatus)) {
        return false
      }

      // Payment method filter
      if (appliedFilters.paymentMethods.size > 0 && !appliedFilters.paymentMethods.has(tx.paymentMethod)) {
        return false
      }

      // Transaction type filter
      if (appliedFilters.transactionType.size > 0 && !appliedFilters.transactionType.has(tx.type)) {
        return false
      }

      // Transaction ID filter
      if (appliedFilters.transactionId) {
        if (!tx.id.toLowerCase().includes(appliedFilters.transactionId.toLowerCase())) return false
      }

      // Channel filter
      if (appliedFilters.channel.size > 0 && !appliedFilters.channel.has(tx.channel)) {
        return false
      }

      // Merchant ID filter
      if (appliedFilters.merchantId) {
        if (!tx.merchantId.toLowerCase().includes(appliedFilters.merchantId.toLowerCase())) return false
      }

      // Location name filter
      if (appliedFilters.locationName) {
        if (!tx.locationName.toLowerCase().includes(appliedFilters.locationName.toLowerCase())) return false
      }

      // Terminal ID filter
      if (appliedFilters.terminalId) {
        if (!tx.terminalId.toLowerCase().includes(appliedFilters.terminalId.toLowerCase())) return false
      }

      // Acquiring reference filter
      if (appliedFilters.acquiringReference) {
        if (!tx.acquiringReference.toLowerCase().includes(appliedFilters.acquiringReference.toLowerCase())) return false
      }

      // Fraud filter
      if (appliedFilters.fraudOnly && !tx.fraudFlagged) {
        return false
      }

      // Amount filter
      if (appliedFilters.minAmount) {
        const amount = parseFloat(tx.amount)
        const min = parseFloat(appliedFilters.minAmount)
        if (amount < min) return false
      }
      if (appliedFilters.maxAmount) {
        const amount = parseFloat(tx.amount)
        const max = parseFloat(appliedFilters.maxAmount)
        if (amount > max) return false
      }

      return true
    })
    .sort((a, b) => {
      // Apply date sorting if active
      if (dateSortOrder) {
        const dateA = new Date(a.date.split(',')[0].split('/').reverse().join('-'))
        const dateB = new Date(b.date.split(',')[0].split('/').reverse().join('-'))
        return dateSortOrder === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime()
      }
      return 0
    })

  // Pagination
  const totalPages = Math.ceil(allFilteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const filteredTransactions = allFilteredTransactions.slice(startIndex, endIndex)

  const allSelected = filteredTransactions.length > 0 &&
    filteredTransactions.every(tx => selectedRows.has(tx.id))

  const someSelected = filteredTransactions.some(tx => selectedRows.has(tx.id)) && !allSelected

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(filteredTransactions.map(tx => tx.id)))
    }
  }

  const handleSelectRow = (id: string) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedRows(newSelected)
  }

  const handleRowClick = (id: string) => {
    console.log('Row clicked:', id)
    const transaction = transactions.find(tx => tx.id === id)
    if (!transaction) {
      console.log('Transaction not found')
      return
    }

    console.log('Found transaction:', transaction)

    const currencySymbol = transaction.currency === 'EUR' ? '€' : transaction.currency === 'USD' ? '$' : transaction.currency === 'GBP' ? '£' : transaction.currency

    // Map the transaction data to the modal format with comprehensive details
    const transactionDetails: TransactionDetails = {
      // Basic details
      id: transaction.id,
      date: transaction.date,
      reference: transaction.orderId,
      status: transaction.status === 'Completed' ? 'Paid' : transaction.status as 'Paid' | 'Pending' | 'Failed' | 'Refunded',
      type: transaction.type,
      grossAmount: `${currencySymbol} ${transaction.amount}`,
      feesAmount: `${currencySymbol} 2.50`,
      dccPayback: `${currencySymbol} 0.00`,
      netAmount: `${currencySymbol} ${(parseFloat(transaction.amount) - 2.50).toFixed(2)}`,

      // Card details
      cardType: transaction.paymentMethod,
      cardNumber: transaction.card,

      // Company Location Details
      acqPartnerMerchantId: transaction.merchantId,
      instoreOnlineMerchantId: `${transaction.channel === 'Ecomm' ? 'ONL' : 'INS'}-${transaction.merchantId}`,
      companyName: transaction.locationName,
      location: transaction.locationName,
      terminalId: transaction.terminalId,

      // References
      merchantReference: transaction.merchantId,
      acquirerReferenceNumber: transaction.acquiringReference,
      paymentAccountReference: `PAR-${transaction.id.replace('#', '')}`,
      creditingReference: `CR-${transaction.id.replace('#', '')}`,
      settlementPayoutDate: '07/03/25',

      // Channel
      channel: transaction.channel,

      // History
      history: {
        authorized: {
          date: transaction.date,
          status: 'Declined or Approved'
        },
        captured: {
          date: transaction.date,
          status: 'Cancel (full Amount)'
        },
        processedRejected: {
          date: transaction.date,
          status: 'Different statuses depending on'
        },
        settled: {
          date: transaction.date.split(',')[0],
          status: '(Money sent to bank)'
        }
      },

      // Online Details - Cardholder (for online/mobile transactions)
      ...((transaction.channel === 'Ecomm' || transaction.channel === 'Mobile') && {
        issuingCountry: 'Netherlands',
        cardholderName: 'John Doe',
        cardholderEmail: 'john.doe@example.com',
        cardholderPhone: '+31 6 12345678',
        billingAddress: '123 Main Street, Amsterdam, 1012AB, NL',

        // 3D Secure
        authenticationStatus: 'Authenticated',
        liability: 'Issuer',
        version: '2.1.0',
        flow: 'Frictionless',
        warranty: 'Y',
        eciScheme: '05',

        // Card On File
        schemeReferenceData: 'SRD-' + transaction.id.replace('#', ''),
        processedWithSchemeToken: 'Yes',

        // Technical Logs
        accessControlServerId: 'ACS-' + transaction.merchantId,
        directoryServerId: 'DS-' + transaction.merchantId,
      }),

      // Instore Details (for instore transactions)
      ...(transaction.channel === 'Instore' && {
        // POS Details
        posTerminalId: transaction.terminalId,
        posSerialNumber: 'SN-' + transaction.terminalId,
        posModel: 'Verifone VX520',

        // Physical Location Details
        physicalAddress: transaction.locationName + ' Store, Main Street 123',
        physicalCity: 'Amsterdam',
        physicalCountry: 'Netherlands',
        physicalPostalCode: '1012AB',

        // Terminal Details
        terminalSerialNumber: 'TSN-' + transaction.terminalId,
        terminalModel: 'Verifone VX520',
        terminalManufacturer: 'Verifone',
      }),

      // Acquiring Details (for MOTO transactions)
      ...(transaction.channel === 'MOTO' && {
        acquirerName: 'Worldpay',
        acquirerCountry: 'United Kingdom',
        batchNumber: 'BATCH-' + transaction.id.replace('#', ''),
        batchDate: transaction.date.split(',')[0],
      }),

      // Fraud Detection (add fraud data for flagged transactions)
      ...(transaction.fraudFlagged && {
        fraudStatus: 'Under Investigation',
        fraudScore: 75,
        fraudReason: 'Unusual transaction pattern detected',
        fraudNotes: 'Need to be investigated still!\n\nMultiple high-value transactions from different locations within short time period. Customer verification recommended.',
      }),
    }

    console.log('Setting transaction details:', transactionDetails)
    setSelectedTransaction(transactionDetails)
    setIsDetailsModalOpen(true)
    console.log('Modal should be open now')
  }

  const handleOpenFilters = () => {
    setFilters(appliedFilters)
    setIsFiltersOpen(true)
  }

  const handleCloseFilters = () => {
    setIsFiltersOpen(false)
  }

  const handleCancelFilters = () => {
    setIsFiltersOpen(false)
  }

  const handleApplyFilters = () => {
    setAppliedFilters(filters)
    setIsFiltersOpen(false)
  }

  const handleDateSort = () => {
    if (!dateSortOrder) {
      setDateSortOrder('asc')
    } else if (dateSortOrder === 'asc') {
      setDateSortOrder('desc')
    } else {
      setDateSortOrder(null)
    }
  }

  const handleOpenColumnManagement = () => {
    setColumns(appliedColumns)
    setIsColumnManagementOpen(true)
  }

  const handleApplyColumns = () => {
    setAppliedColumns(columns)
    setIsColumnManagementOpen(false)
  }

  const handleExport = () => {
    // Create CSV content
    const headers = ['Transaction ID', 'Card number', 'Status', 'Type', 'Location', 'Amount', 'Date']
    const rows = allFilteredTransactions.map(tx => [
      tx.id,
      tx.card,
      tx.status === 'Completed' ? 'Paid' : tx.status,
      tx.type === 'Payment' ? '-' : tx.type,
      tx.orderId,
      `${tx.amount.replace('.', ',')} ${tx.currency}`,
      tx.date,
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n')

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleUndoRefund = () => {
    if (previousTransactionState && refundedTransactionId) {
      // Restore the previous transaction state
      setTransactions(prev =>
        prev.map(tx =>
          tx.id === refundedTransactionId ? previousTransactionState : tx
        )
      )

      // Update the selected transaction if it's the one being undone
      if (selectedTransaction && selectedTransaction.id === refundedTransactionId) {
        setSelectedTransaction({
          ...selectedTransaction,
          status: previousTransactionState.status === 'Completed' ? 'Paid' : previousTransactionState.status === 'Failed' ? 'Failed' : previousTransactionState.status === 'Pending' ? 'Pending' : 'Paid',
        })
      }

      // Reset state
      setPreviousTransactionState(null)
      setRefundedTransactionId(null)
    }
  }

  const tabItems: TabItem[] = [
    {
      id: 'all',
      label: 'All transactions',
      children: null,
    },
    {
      id: 'online',
      label: 'Online',
      children: null,
    },
    {
      id: 'instore',
      label: 'Instore',
      children: null,
    },
    {
      id: 'acquiring',
      label: 'Acquiring',
      children: null,
    },
  ]

  return (
    <div className="sales-page">
      <Tabs
        items={tabItems}
        activeId={activeTab}
        onChange={setActiveTab}
        className="sales-page__tabs"
      />

      <>
        <div className="sales-page__toolbar">
          <div className="sales-page__search-group">
            <div className="sales-page__search">
              <Icon name="search" size={20} />
              <input
                type="text"
                className="sales-page__search-input"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search transactions"
              />
            </div>
            <button
              className="sales-page__filter-btn"
              onClick={handleOpenFilters}
              aria-label="Open filters"
            >
              Filters
              <Icon name="filter" size={20} />
            </button>
            <button
              className={`sales-page__filter-btn ${showLastMonth ? 'sales-page__filter-btn--active' : ''}`}
              onClick={() => setShowLastMonth(!showLastMonth)}
              aria-label="Show last month"
            >
              Last month
              <Icon name="calendar" size={20} />
            </button>
          </div>
          <button
            className="sales-page__export-btn"
            onClick={handleExport}
          >
            Export
            <Icon name="arrow-up" size={24} />
          </button>
        </div>

        <div className="sales-page__table-wrapper">
          <table className="sales-page__table">
            <thead>
              <tr>
                <th className="sales-page__th sales-page__th--checkbox">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={input => {
                      if (input) {
                        input.indeterminate = someSelected
                      }
                    }}
                    onChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </th>
                {visibleColumns.map(col => (
                  <th key={col.id} className="sales-page__th sales-page__th--sortable">
                    <button
                      className="sales-page__th-sort-btn"
                      onClick={col.id === 'date' ? handleDateSort : undefined}
                      aria-label={`Sort by ${col.label}`}
                    >
                      <span>{col.label}</span>
                      <Icon name="chevron-up-down-small" size={12} />
                    </button>
                  </th>
                ))}
                <th className="sales-page__th sales-page__th--actions">
                  <button
                    className="sales-page__column-btn"
                    onClick={handleOpenColumnManagement}
                    aria-label="Manage columns"
                  >
                    <Icon name="columns" size={24} />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(tx => {
                const isSelected = selectedRows.has(tx.id)

                return (
                  <tr
                    key={tx.id}
                    className={`sales-page__row${isSelected ? ' sales-page__row--selected' : ''}`}
                  >
                    <TableCell checkbox>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(tx.id)}
                        aria-label={`Select ${tx.id}`}
                      />
                    </TableCell>

                    {visibleColumns.map(col => {
                      switch (col.id) {
                        case 'id':
                          return (
                            <TableCell
                              key={col.id}
                              className="sales-page__td--id"
                              onClick={() => handleRowClick(tx.id)}
                            >
                              {tx.id}
                            </TableCell>
                          )
                        case 'card':
                          return (
                            <TableCell
                              key={col.id}
                              paymentMethod={{
                                cardNumber: tx.card,
                                type: 'visa',
                              }}
                              onClick={() => handleRowClick(tx.id)}
                            />
                          )
                        case 'status':
                          return (
                            <TableCell
                              key={col.id}
                              chip={{
                                label: tx.status === 'Completed' ? 'Paid' : tx.status,
                                variant: statusToChipVariant[tx.status],
                              }}
                              onClick={() => handleRowClick(tx.id)}
                            />
                          )
                        case 'orderId':
                          return (
                            <TableCell key={col.id} onClick={() => handleRowClick(tx.id)}>
                              {tx.orderId}
                            </TableCell>
                          )
                        case 'type':
                          return (
                            <TableCell key={col.id} onClick={() => handleRowClick(tx.id)}>
                              {tx.type === 'Payment' ? '-' : tx.type}
                            </TableCell>
                          )
                        case 'amount':
                          return (
                            <TableCell key={col.id} onClick={() => handleRowClick(tx.id)}>
                              {tx.amount.replace('.', ',')} {tx.currency}
                            </TableCell>
                          )
                        case 'date':
                          return (
                            <TableCell key={col.id} onClick={() => handleRowClick(tx.id)}>
                              {tx.date}
                            </TableCell>
                          )
                        default:
                          return null
                      }
                    })}

                    <TableCell
                      actions
                      onActionClick={(e) => {
                        e.stopPropagation()
                        console.log('Actions for', tx.id)
                      }}
                    />
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Enhanced Pagination */}
        <div className="sales-page__pagination">
          <div className="sales-page__pagination-info">
            Page {currentPage} of {totalPages || 1}
          </div>
          <div className="sales-page__pagination-controls">
            <div className="sales-page__pagination-nav">
              <button
                className="sales-page__pagination-btn"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                aria-label="First page"
              >
                <Icon name="chevron-left" size={16} />
                <Icon name="chevron-left" size={16} />
              </button>
              <button
                className="sales-page__pagination-btn"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <Icon name="chevron-left" size={16} />
              </button>

              {/* Page numbers */}
              {Array.from({ length: Math.min(9, totalPages) }, (_, i) => {
                let pageNum: number
                if (totalPages <= 9) {
                  pageNum = i + 1
                } else if (currentPage <= 4) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 3) {
                  pageNum = totalPages - 8 + i
                } else {
                  pageNum = currentPage - 4 + i
                }

                // Show ellipsis for gaps
                if (totalPages > 9 && ((i === 3 && currentPage > 4) || (i === 5 && currentPage < totalPages - 3))) {
                  return <span key={`ellipsis-${i}`} className="sales-page__pagination-ellipsis">...</span>
                }

                // Skip middle pages if showing ellipsis
                if (totalPages > 9 && i >= 3 && i <= 5 && (currentPage <= 4 || currentPage >= totalPages - 3)) {
                  return null
                }

                return (
                  <button
                    key={pageNum}
                    className={`sales-page__pagination-num${currentPage === pageNum ? ' sales-page__pagination-num--active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              }).filter(Boolean)}

              <button
                className="sales-page__pagination-btn"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <Icon name="chevron-right" size={16} />
              </button>
              <button
                className="sales-page__pagination-btn"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                aria-label="Last page"
              >
                <Icon name="chevron-right" size={16} />
                <Icon name="chevron-right" size={16} />
              </button>
            </div>
            <div className="sales-page__pagination-view">
              <span>View:</span>
              <select
                className="sales-page__pagination-select"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>
      </>

      <SideModal
        isOpen={isFiltersOpen}
        onClose={handleCloseFilters}
        title="Filters"
        width="md"
        footer={
          <>
            <Button hierarchy="secondary" size="sm" onClick={handleCancelFilters}>
              Cancel
            </Button>
            <Button hierarchy="primary" size="sm" onClick={handleApplyFilters}>
              Apply filters
            </Button>
          </>
        }
      >
        <FiltersPanel
          filters={filters}
          onFiltersChange={setFilters}
          onApply={handleApplyFilters}
          onCancel={handleCancelFilters}
        />
      </SideModal>

      <TransactionDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        transaction={selectedTransaction}
        onRefund={(transactionId) => {
          // Save the previous state for undo
          const transactionToRefund = transactions.find(tx => tx.id === transactionId)
          if (transactionToRefund) {
            setPreviousTransactionState({ ...transactionToRefund })
            setRefundedTransactionId(transactionId)
          }

          // Update transaction status to Refunded
          setTransactions(prev =>
            prev.map(tx =>
              tx.id === transactionId ? { ...tx, status: 'Refunded' as Status } : tx
            )
          )

          // Update the selected transaction to reflect the new status
          if (selectedTransaction) {
            setSelectedTransaction({
              ...selectedTransaction,
              status: 'Refunded'
            })
          }

          // Show snackbar
          setShowRefundSnackbar(true)
        }}
      />

      <ColumnManagementModal
        isOpen={isColumnManagementOpen}
        onClose={() => setIsColumnManagementOpen(false)}
        columns={columns}
        onColumnsChange={setColumns}
        onApply={handleApplyColumns}
      />

      <Snackbar
        isOpen={showRefundSnackbar}
        title="Transaction refunded successfully"
        onClose={() => setShowRefundSnackbar(false)}
        action={{
          label: 'Undo',
          onClick: handleUndoRefund
        }}
        variant="success"
        duration={5000}
      />
    </div>
  )
}
