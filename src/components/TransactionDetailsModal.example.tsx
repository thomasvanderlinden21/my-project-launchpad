import { useState } from 'react'
import TransactionDetailsModal from './TransactionDetailsModal'
import type { Transaction } from './TransactionDetailsModal'
import Button from './Button'

/**
 * Example usage of TransactionDetailsModal component
 */
export default function TransactionDetailsModalExample() {
  const [isOpen, setIsOpen] = useState(false)

  // Sample transaction data
  const sampleTransaction: Transaction = {
    id: 'RQS12341331',
    date: '24 Feb, 2025, 11:28 AM',
    amount: '€259,00',
    fee: '€0.01',
    status: 'Paid',
    cardType: 'Mastercard',
    cardNumber: '***** 5492 5492',
    // cardLogo: 'https://example.com/mastercard-logo.png', // Optional
    companyName: 'Hotel Breakfast',
    merchantReference: '12903194201',
    paymentId: '12903194201',
    authorizationDate: '24 Feb, 2025, 11:28 AM',
    acquirer: 'Credit Agricole',
    channel: 'DIR',
  }

  const handleRefund = (transactionId: string) => {
    console.log('Refund requested for transaction:', transactionId)
    // Implement refund logic here
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Transaction Details Modal Example</h1>

      <Button onClick={() => setIsOpen(true)}>
        View Transaction Details
      </Button>

      <TransactionDetailsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        transaction={sampleTransaction}
        onRefund={handleRefund}
      />
    </div>
  )
}
