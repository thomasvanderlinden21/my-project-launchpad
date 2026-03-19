import Chip from './Chip'
import Icon from './Icon'
import './TerminalCard.css'

export interface TerminalCardProps {
  name: string
  serialNumber: string
  imageSrc?: string
  locationLabel: 'Location' | 'Tracking number'
  locationValue: string
  status: 'active' | 'new-update' | 'shipped' | 'inactive'
  isSelected?: boolean
  onSelect?: (selected: boolean) => void
  onClick?: () => void
}

const statusToChipVariant: Record<TerminalCardProps['status'], 'success' | 'info' | 'error' | 'warning'> = {
  'active': 'success',
  'new-update': 'warning',
  'shipped': 'info',
  'inactive': 'error',
}

const statusToLabel: Record<TerminalCardProps['status'], string> = {
  'active': 'Active',
  'new-update': 'New update',
  'shipped': 'Shipped',
  'inactive': 'Inactive',
}

export default function TerminalCard({
  name,
  serialNumber,
  imageSrc,
  locationLabel,
  locationValue,
  status,
  isSelected = false,
  onSelect,
  onClick,
}: TerminalCardProps) {
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect?.(!isSelected)
  }

  const handleCardClick = () => {
    onClick?.()
  }

  return (
    <div
      className={`terminal-card ${isSelected ? 'terminal-card--selected' : ''}`}
      onClick={handleCardClick}
      data-status={status}
    >
      {/* Header */}
      <div className="terminal-card__header">
        <div className="terminal-card__info">
          <div className="terminal-card__name-row">
            <Icon name="battery-full" className="terminal-card__battery-icon" />
            <h3 className="terminal-card__name">{name}</h3>
          </div>
          <p className="terminal-card__serial">{serialNumber}</p>
        </div>
        <div className="terminal-card__checkbox-wrapper">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxClick}
            onClick={handleCheckboxClick}
            aria-label={`Select ${name}`}
          />
        </div>
      </div>

      {/* Image */}
      <div className="terminal-card__image">
        {imageSrc ? (
          <img src={imageSrc} alt={name} />
        ) : (
          <svg width="80" height="90" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="terminal-card__placeholder">
            <rect x="10" y="5" width="60" height="70" rx="4" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
            <rect x="15" y="10" width="50" height="30" rx="2" fill="currentColor" opacity="0.15"/>
            <circle cx="25" cy="52" r="3" fill="currentColor" opacity="0.2"/>
            <circle cx="40" cy="52" r="3" fill="currentColor" opacity="0.2"/>
            <circle cx="55" cy="52" r="3" fill="currentColor" opacity="0.2"/>
            <circle cx="25" cy="62" r="3" fill="currentColor" opacity="0.2"/>
            <circle cx="40" cy="62" r="3" fill="currentColor" opacity="0.2"/>
            <circle cx="55" cy="62" r="3" fill="currentColor" opacity="0.2"/>
          </svg>
        )}
      </div>

      {/* Footer */}
      <div className="terminal-card__footer">
        <div className="terminal-card__location">
          <p className="terminal-card__location-label">{locationLabel}</p>
          <p className="terminal-card__location-value">{locationValue}</p>
        </div>
        <div className="terminal-card__status">
          <Chip
            label={statusToLabel[status]}
            variant={statusToChipVariant[status]}
          />
        </div>
      </div>
    </div>
  )
}
