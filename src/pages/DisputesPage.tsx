import EmptyState from '../components/EmptyState'
import './DisputesPage.css'

export interface DisputesPageProps {
  onNavigateHome?: () => void
}

export default function DisputesPage({ onNavigateHome }: DisputesPageProps) {
  return (
    <div className="disputes-page">
      <EmptyState
        icon="shield-question"
        title="Disputes coming soon"
        description="Manage payment disputes and chargebacks, submit evidence, track resolution status, and view dispute history. This feature will be available in an upcoming release."
        variant="left-aligned"
        action={onNavigateHome ? {
          label: 'Go to Home',
          onClick: onNavigateHome
        } : undefined}
      />
    </div>
  )
}
