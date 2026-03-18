import Icon from './Icon'
import './AIAssistantPanel.css'

export interface AIAssistantPanelProps {
  /** Controls whether the panel is visible */
  isOpen: boolean
  /** Callback when the panel should close */
  onClose: () => void
}

export default function AIAssistantPanel({
  isOpen,
  onClose,
}: AIAssistantPanelProps) {
  if (!isOpen) return null

  return (
    <div className="ai-assistant-panel">
      {/* Header */}
      <div className="ai-assistant-panel__header">
        <h2 className="ai-assistant-panel__title">
          AI Assistant
        </h2>
        <button
          className="ai-assistant-panel__close-btn"
          onClick={onClose}
          aria-label="Close AI Assistant"
        >
          <Icon name="close" size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="ai-assistant-panel__content">
        {/* Content will be added later */}
        <p>AI Assistant content will go here</p>
      </div>
    </div>
  )
}
