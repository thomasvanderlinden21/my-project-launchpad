import Icon from './Icon'
import type { IconName } from './Icon'
import './EmptyState.css'

export interface EmptyStateProps {
  icon?: IconName
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      {icon && (
        <div className="empty-state__icon">
          <Icon name={icon} size={48} />
        </div>
      )}
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__description">{description}</p>
      {action && (
        <button className="empty-state__action" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  )
}
