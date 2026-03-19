import EmptyState from '../components/EmptyState'
import './ReportsPage.css'

export interface ReportsPageProps {
  onNavigateHome?: () => void
}

export default function ReportsPage({ onNavigateHome }: ReportsPageProps) {
  return (
    <div className="reports-page">
      <EmptyState
        icon="chart-line"
        title="Reports coming soon"
        description="Access detailed analytics, generate custom reports, view sales trends, and export data for analysis. This feature will be available in an upcoming release."
        action={onNavigateHome ? {
          label: 'Go to Home',
          onClick: onNavigateHome
        } : undefined}
      />
    </div>
  )
}
