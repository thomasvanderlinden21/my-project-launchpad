import EmptyState from '../components/EmptyState'
import './OrdersPage.css'

export interface OrdersPageProps {
  onNavigateHome?: () => void
}

export default function OrdersPage({ onNavigateHome }: OrdersPageProps) {
  return (
    <div className="orders-page">
      <EmptyState
        icon="shopping-basket"
        title="Orders coming soon"
        description="Track and manage customer orders, view order history, update fulfillment status, and process returns. This feature will be available in an upcoming release."
        action={onNavigateHome ? {
          label: 'Go to Home',
          onClick: onNavigateHome
        } : undefined}
      />
    </div>
  )
}
