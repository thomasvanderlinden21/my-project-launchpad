import { useState } from 'react'
import Icon from './Icon'
import './ExpansionPanel.css'

export interface ExpansionPanelProps {
  title: string
  description?: string
  children: React.ReactNode
  defaultExpanded?: boolean
}

export default function ExpansionPanel({
  title,
  description,
  children,
  defaultExpanded = false,
}: ExpansionPanelProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="expansion-panel">
      <button
        className="expansion-panel__header"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className="expansion-panel__header-content">
          <h3 className="expansion-panel__title">{title}</h3>
          {description && <p className="expansion-panel__description">{description}</p>}
        </div>
        <Icon
          name="chevron-down"
          size={20}
          className={`expansion-panel__icon${isExpanded ? ' expansion-panel__icon--expanded' : ''}`}
        />
      </button>
      {isExpanded && (
        <div className="expansion-panel__content">
          {children}
        </div>
      )}
    </div>
  )
}
