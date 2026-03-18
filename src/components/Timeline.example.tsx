import Timeline from './Timeline'
import Icon from './Icon'

/**
 * Example: Payment History Timeline
 *
 * This example shows how to use the Timeline component to display
 * the history of a payment transaction.
 */
export default function PaymentHistoryExample() {
  const paymentHistory = [
    {
      id: '1',
      title: 'Payment completed',
      description: 'Customer successfully paid €259.00',
      timestamp: '24/02/25, 21:05',
      status: 'success' as const,
      icon: <Icon name="check" size={14} />
    },
    {
      id: '2',
      title: 'Payment authorized',
      description: 'Payment method authorized by bank',
      timestamp: '24/02/25, 21:04',
      status: 'success' as const,
      icon: <Icon name="check" size={14} />
    },
    {
      id: '3',
      title: 'Card validated',
      description: 'Card details verified successfully',
      timestamp: '24/02/25, 21:03',
      status: 'success' as const,
      icon: <Icon name="check" size={14} />
    },
    {
      id: '4',
      title: 'Payment initiated',
      description: 'Customer started checkout process',
      timestamp: '24/02/25, 21:02',
      status: 'neutral' as const,
    }
  ]

  return (
    <div style={{ padding: '24px', maxWidth: '600px' }}>
      <h2 style={{ marginBottom: '16px' }}>Payment History</h2>
      <Timeline items={paymentHistory} />
    </div>
  )
}

/**
 * Example: Failed Payment Timeline
 */
export function FailedPaymentExample() {
  const failedPaymentHistory = [
    {
      id: '1',
      title: 'Payment failed',
      description: 'Insufficient funds in account',
      timestamp: '24/02/25, 15:30',
      status: 'failed' as const,
      icon: <Icon name="close" size={14} />
    },
    {
      id: '2',
      title: 'Payment attempted',
      description: 'Authorization declined by bank',
      timestamp: '24/02/25, 15:29',
      status: 'failed' as const,
      icon: <Icon name="close" size={14} />
    },
    {
      id: '3',
      title: 'Payment initiated',
      description: 'Customer started checkout process',
      timestamp: '24/02/25, 15:28',
      status: 'neutral' as const,
    }
  ]

  return (
    <div style={{ padding: '24px', maxWidth: '600px' }}>
      <h2 style={{ marginBottom: '16px' }}>Failed Payment History</h2>
      <Timeline items={failedPaymentHistory} />
    </div>
  )
}

/**
 * Example: Pending Payment Timeline
 */
export function PendingPaymentExample() {
  const pendingPaymentHistory = [
    {
      id: '1',
      title: 'Payment processing',
      description: 'Waiting for bank confirmation',
      timestamp: '24/02/25, 16:10',
      status: 'pending' as const,
    },
    {
      id: '2',
      title: 'Payment authorized',
      description: 'Authorization hold placed on card',
      timestamp: '24/02/25, 16:09',
      status: 'success' as const,
      icon: <Icon name="check" size={14} />
    },
    {
      id: '3',
      title: 'Payment initiated',
      description: 'Customer started checkout process',
      timestamp: '24/02/25, 16:08',
      status: 'neutral' as const,
    }
  ]

  return (
    <div style={{ padding: '24px', maxWidth: '600px' }}>
      <h2 style={{ marginBottom: '16px' }}>Pending Payment History</h2>
      <Timeline items={pendingPaymentHistory} />
    </div>
  )
}
