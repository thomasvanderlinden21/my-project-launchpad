import EmptyState from '../components/EmptyState'
import './InvoicesPage.css'

export interface InvoicesPageProps {
  onNavigateHome?: () => void
}

export default function InvoicesPage({ onNavigateHome }: InvoicesPageProps) {
  return (
    <div className="invoices-page">
      <EmptyState
        icon="document"
        title="Invoices coming soon"
        description="View and manage your payment invoices, download statements, track payment status, and configure billing preferences. This feature will be available in an upcoming release."
        action={onNavigateHome ? {
          label: 'Go to Home',
          onClick: onNavigateHome
        } : undefined}
      />
    </div>
  )
}
