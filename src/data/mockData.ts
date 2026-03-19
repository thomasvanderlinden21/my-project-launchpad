// Centralized mock data for the portal and AI assistant

export interface Transaction {
  id: string
  card: string
  status: 'Paid' | 'Pending' | 'Completed' | 'Failed' | 'Refunded'
  merchantId: string
  orderId: string
  amount: string
  date: string
  transactionType: 'Online' | 'Instore' | 'Acquiring'
}

export interface Terminal {
  id: string
  name: string
  serialNumber: string
  imageSrc?: string
  locationLabel: 'Location' | 'Tracking number'
  locationValue: string
  status: 'active' | 'new-update' | 'shipped' | 'inactive'
  category: 'terminals' | 'accessories'
  batteryLevel?: number
}

export interface MerchantInfo {
  name: string
  id: string
}

export interface UserInfo {
  name: string
  firstName: string
  role: string
  initials: string
}

export const mockMerchant: MerchantInfo = {
  name: 'Cycle Shop',
  id: 'MCH-2456',
}

export const mockUser: UserInfo = {
  name: 'Olivia Martinez',
  firstName: 'Olivia',
  role: 'Admin',
  initials: 'OM',
}

export const mockTransactions: Transaction[] = [
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

export const mockTerminals: Terminal[] = [
  { id: '1', name: 'Main Counter', serialNumber: '#TRM-8742-2195', imageSrc: '/assets/terminal image.png', locationLabel: 'Location', locationValue: 'Cycle shop 2', status: 'active', category: 'terminals', batteryLevel: 95 },
  { id: '2', name: 'Workshop Desk', serialNumber: '#TRM-5631-8904', imageSrc: '/assets/terminal image.png', locationLabel: 'Location', locationValue: 'Repair area', status: 'new-update', category: 'terminals', batteryLevel: 78 },
  { id: '3', name: 'Mobile Sales Unit', serialNumber: '#TRM-3298-4567', imageSrc: '/assets/terminal image.png', locationLabel: 'Location', locationValue: 'Delivery van', status: 'active', category: 'terminals', batteryLevel: 62 },
  { id: '4', name: 'Express Checkout', serialNumber: '#TRM-9124-7483', imageSrc: '/assets/terminal image.png', locationLabel: 'Tracking number', locationValue: 'TRK123456789', status: 'shipped', category: 'terminals', batteryLevel: 100 },
  { id: '5', name: 'Back Office', serialNumber: '#TRM-6745-1029', imageSrc: '/assets/terminal image.png', locationLabel: 'Location', locationValue: 'Storage', status: 'inactive', category: 'terminals', batteryLevel: 23 },
  { id: '6', name: 'Card Reader', serialNumber: '#ACC-4812-3376', imageSrc: '/assets/terminal-placeholder.svg', locationLabel: 'Location', locationValue: 'Cycle shop 2', status: 'active', category: 'accessories' },
  { id: '7', name: 'Receipt Printer', serialNumber: '#ACC-7293-5648', imageSrc: '/assets/terminal-placeholder.svg', locationLabel: 'Location', locationValue: 'Main counter', status: 'active', category: 'accessories' },
]

// Computed statistics
export const getTransactionStats = () => {
  const today = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-')

  const todayTransactions = mockTransactions.filter(tx => {
    const txDate = tx.date.split(',')[0].split('/').reverse().join('-')
    return txDate === today
  })

  const processed = mockTransactions.filter(tx => tx.status === 'Paid' || tx.status === 'Completed').length
  const failed = mockTransactions.filter(tx => tx.status === 'Failed').length
  const refunded = mockTransactions.filter(tx => tx.status === 'Refunded').length
  const pending = mockTransactions.filter(tx => tx.status === 'Pending').length

  const totalVolume = mockTransactions.reduce((sum, tx) => {
    const amount = parseFloat(tx.amount.replace('€ ', '').replace(',', ''))
    return sum + amount
  }, 0)

  return {
    total: mockTransactions.length,
    processed,
    failed,
    refunded,
    pending,
    todayCount: todayTransactions.length,
    totalVolume: `€ ${totalVolume.toFixed(2).replace('.', ',')}`,
  }
}

export const getTerminalStats = () => {
  const active = mockTerminals.filter(t => t.status === 'active').length
  const offline = mockTerminals.filter(t => t.status === 'inactive').length
  const shipped = mockTerminals.filter(t => t.status === 'shipped').length
  const needsUpdate = mockTerminals.filter(t => t.status === 'new-update').length

  return {
    total: mockTerminals.length,
    active,
    offline,
    shipped,
    needsUpdate,
  }
}

export const getSalesStats = () => {
  // Mock sales data
  const today = 4280.50
  const yesterday = 3820.30
  const thisWeek = 28450.00
  const lastWeek = 25200.00
  const thisMonth = 112300.00
  const lastMonth = 98500.00

  return {
    today: `€ ${today.toFixed(2).replace('.', ',')}`,
    yesterday: `€ ${yesterday.toFixed(2).replace('.', ',')}`,
    thisWeek: `€ ${thisWeek.toFixed(2).replace('.', ',')}`,
    lastWeek: `€ ${lastWeek.toFixed(2).replace('.', ',')}`,
    thisMonth: `€ ${thisMonth.toFixed(2).replace('.', ',')}`,
    lastMonth: `€ ${lastMonth.toFixed(2).replace('.', ',')}`,
    vsYesterday: ((today - yesterday) / yesterday * 100).toFixed(1),
    vsLastWeek: ((thisWeek - lastWeek) / lastWeek * 100).toFixed(1),
    vsLastMonth: ((thisMonth - lastMonth) / lastMonth * 100).toFixed(1),
  }
}

export const getDisputeStats = () => {
  return {
    open: 3,
    requiresAction: 1,
    disputeRate: '0.8%',
    list: [
      { id: 'DSP-001', amount: '€ 259,00', reason: 'Product not received', status: 'open' },
      { id: 'DSP-002', amount: '€ 450,00', reason: 'Duplicate charge', status: 'requires-action' },
      { id: 'DSP-003', amount: '€ 120,00', reason: 'Item not as described', status: 'open' },
    ],
  }
}

export const getInvoiceStats = () => {
  return {
    total: 24,
    unpaid: 3,
    nextDue: 'March 25, 2026',
    nextAmount: '€ 1,250.00',
    list: [
      { id: 'INV-2026-003', amount: '€ 1,250.00', dueDate: '25/03/26', status: 'unpaid' },
      { id: 'INV-2026-002', amount: '€ 980.00', dueDate: '12/03/26', status: 'unpaid' },
      { id: 'INV-2026-001', amount: '€ 1,150.00', dueDate: '28/02/26', status: 'paid' },
    ],
  }
}

export const getOrderStats = () => {
  return {
    recent: 42,
    pendingFulfillment: 8,
    volumeThisWeek: 156,
    list: [
      { id: 'ORD-8821', items: 3, amount: '€ 320,00', status: 'pending' },
      { id: 'ORD-8822', items: 1, amount: '€ 150,00', status: 'shipped' },
      { id: 'ORD-8823', items: 5, amount: '€ 580,00', status: 'delivered' },
    ],
  }
}
