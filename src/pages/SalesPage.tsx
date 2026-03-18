import { useState } from 'react'
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
import './SalesPage.css'

type Status = 'Paid' | 'Pending' | 'Completed' | 'Failed' | 'Refunded'
type TransactionType = 'Online' | 'Instore' | 'Acquiring'

interface Transaction {
  id: string
  card: string
  status: Status
  merchantId: string
  orderId: string
  amount: string
  date: string
  transactionType: TransactionType
}

const transactions: Transaction[] = [
  { id: '#2456221', card: '****9382', status: 'Paid',      merchantId: '113239382', orderId: '#113239382', amount: '€ 259,00', date: '24/02/25, 21:05', transactionType: 'Online' },
  { id: '#2456222', card: '****9382', status: 'Pending',   merchantId: '113239383', orderId: '#113239382', amount: '€ 150,00', date: '25/02/25, 14:30', transactionType: 'Instore' },
  { id: '#2456223', card: '****9382', status: 'Completed', merchantId: '113239384', orderId: '#113239382', amount: '€ 320,00', date: '26/02/25, 09:15', transactionType: 'Online' },
  { id: '#2456224', card: '****9382', status: 'Failed',    merchantId: '113239385', orderId: '#113239382', amount: '€ 89,00',  date: '27/02/25, 11:45', transactionType: 'Acquiring' },
  { id: '#2456225', card: '****9382', status: 'Refunded',  merchantId: '113239386', orderId: '#113239382', amount: '€ 120,00', date: '28/02/25, 16:00', transactionType: 'Online' },
  { id: '#2456226', card: '****9382', status: 'Paid',      merchantId: '113239387', orderId: '#113239382', amount: '€ 450,00', date: '01/03/25, 18:20', transactionType: 'Instore' },
  { id: '#2456227', card: '****9382', status: 'Pending',   merchantId: '113239388', orderId: '#113239382', amount: '€ 75,00',  date: '02/03/25, 10:10', transactionType: 'Acquiring' },
  { id: '#2456228', card: '****9382', status: 'Completed', merchantId: '113239389', orderId: '#113239382', amount: '€ 200,00', date: '03/03/25, 12:00', transactionType: 'Online' },
  { id: '#2456229', card: '****9382', status: 'Failed',    merchantId: '113239390', orderId: '#113239382', amount: '€ 300,00', date: '04/03/25, 14:15', transactionType: 'Instore' },
  { id: '#2456230', card: '****9382', status: 'Refunded',  merchantId: '113239391', orderId: '#113239382', amount: '€ 180,00', date: '05/03/25, 09:45', transactionType: 'Acquiring' },
]

const statusToChipVariant: Record<Status, 'success' | 'info' | 'neutral' | 'warning'> = {
  Paid:      'success',
  Pending:   'neutral',
  Completed: 'info',
  Failed:    'warning',
  Refunded:  'neutral',
}

export default function SalesPage() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<FiltersState>({
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: '',
    status: new Set(),
    paymentMethods: new Set(),
  })
  const [appliedFilters, setAppliedFilters] = useState<FiltersState>({
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: '',
    status: new Set(),
    paymentMethods: new Set(),
  })
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetails | null>(null)
  const [isColumnManagementOpen, setIsColumnManagementOpen] = useState(false)
  const [dateSortOrder, setDateSortOrder] = useState<'asc' | 'desc' | null>(null)
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { id: 'id', label: 'Transaction ID', visible: true, locked: true, order: 0 },
    { id: 'card', label: 'Payment method', visible: true, order: 1 },
    { id: 'status', label: 'Status', visible: true, order: 2 },
    { id: 'merchantId', label: 'Merchant ID', visible: true, order: 3 },
    { id: 'orderId', label: 'Order ID', visible: true, order: 4 },
    { id: 'amount', label: 'Amount', visible: true, order: 5 },
    { id: 'date', label: 'Date / Time', visible: true, order: 6 },
  ])
  const [appliedColumns, setAppliedColumns] = useState<ColumnConfig[]>(columns)

  // Get visible columns in order
  const visibleColumns = appliedColumns.filter(c => c.visible).sort((a, b) => (a.order || 0) - (b.order || 0))

  // Filter and sort transactions
  const filteredTransactions = transactions
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
        const searchableText = `${tx.id} ${tx.card} ${tx.status} ${tx.merchantId} ${tx.orderId} ${tx.amount} ${tx.date}`.toLowerCase()
        if (!searchableText.includes(query)) return false
      }

      // Status filter
      if (appliedFilters.status.size > 0 && !appliedFilters.status.has(tx.status)) {
        return false
      }

      // Amount filter
      if (appliedFilters.minAmount) {
        const amount = parseFloat(tx.amount.replace('€ ', '').replace(',', '.'))
        const min = parseFloat(appliedFilters.minAmount)
        if (amount < min) return false
      }
      if (appliedFilters.maxAmount) {
        const amount = parseFloat(tx.amount.replace('€ ', '').replace(',', '.'))
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

    // Map the transaction data to the modal format
    const transactionDetails: TransactionDetails = {
      id: transaction.id,
      date: transaction.date,
      amount: transaction.amount,
      fee: '€0.01', // Default fee - replace with actual data if available
      status: transaction.status === 'Completed' ? 'Paid' : transaction.status === 'Failed' ? 'Failed' : transaction.status === 'Refunded' ? 'Refunded' : transaction.status === 'Pending' ? 'Pending' : 'Paid',
      cardType: 'Mastercard', // Replace with actual card type detection
      cardNumber: transaction.card,
      companyName: 'Hotel Breakfast', // Replace with actual merchant name
      merchantReference: transaction.merchantId,
      paymentId: transaction.orderId,
      authorizationDate: transaction.date,
      acquirer: 'Credit Agricole', // Replace with actual acquirer data
      channel: transaction.transactionType === 'Online' ? 'WEB' : transaction.transactionType === 'Instore' ? 'POS' : 'DIR',
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
    const headers = ['Transaction ID', 'Payment method', 'Status', 'Merchant ID', 'Order ID', 'Amount', 'Date / Time']
    const rows = filteredTransactions.map(tx => [
      tx.id,
      tx.card,
      tx.status,
      tx.merchantId,
      tx.orderId,
      tx.amount,
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
        </div>
        <button
          className="sales-page__export-btn"
          onClick={handleExport}
        >
          Export
          <Icon name="download" size={24} />
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
              {visibleColumns.map(col => {
                if (col.id === 'date') {
                  return (
                    <th key={col.id} className="sales-page__th sales-page__th--sortable">
                      <button
                        className="sales-page__th-sort-btn"
                        onClick={handleDateSort}
                        aria-label="Sort by date"
                      >
                        <span>{col.label}</span>
                        <Icon name="chevron-up-down-small" size={12} />
                      </button>
                    </th>
                  )
                }
                return (
                  <th key={col.id} className="sales-page__th">
                    {col.label}
                  </th>
                )
              })}
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
                              label: tx.status,
                              variant: statusToChipVariant[tx.status],
                            }}
                            onClick={() => handleRowClick(tx.id)}
                          />
                        )
                      case 'merchantId':
                        return (
                          <TableCell key={col.id} onClick={() => handleRowClick(tx.id)}>
                            {tx.merchantId}
                          </TableCell>
                        )
                      case 'orderId':
                        return (
                          <TableCell key={col.id} onClick={() => handleRowClick(tx.id)}>
                            {tx.orderId}
                          </TableCell>
                        )
                      case 'amount':
                        return (
                          <TableCell key={col.id} onClick={() => handleRowClick(tx.id)}>
                            {tx.amount}
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
          console.log('Refund requested for:', transactionId)
          // Implement refund logic here
          setIsDetailsModalOpen(false)
        }}
      />

      <ColumnManagementModal
        isOpen={isColumnManagementOpen}
        onClose={() => setIsColumnManagementOpen(false)}
        columns={columns}
        onColumnsChange={setColumns}
        onApply={handleApplyColumns}
      />
    </div>
  )
}
