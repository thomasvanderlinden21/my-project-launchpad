import Button from '../components/Button'
import './SettingsDetailPage.css'

interface SettingsSection {
  title: string
  description?: string
  content: React.ReactNode
}

interface SettingsDetailPageProps {
  sections: SettingsSection[]
  onCancel?: () => void
  onSave?: () => void
}

export default function SettingsDetailPage({ sections, onCancel, onSave }: SettingsDetailPageProps) {
  return (
    <div className="settings-detail">
      <div className="settings-detail__container">
        {sections.map((section, index) => (
          <div key={index}>
            {index > 0 && <div className="settings-detail__divider" />}
            <div className="settings-detail__section">
              <div className="settings-detail__section-header">
                <h2 className="settings-detail__section-title">{section.title}</h2>
                {section.description && (
                  <p className="settings-detail__section-description">{section.description}</p>
                )}
              </div>
              <div className="settings-detail__section-content">
                {section.content}
              </div>
            </div>
          </div>
        ))}

        <div className="settings-detail__actions">
          <Button hierarchy="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button hierarchy="primary" onClick={onSave}>
            Save changes
          </Button>
        </div>
      </div>
    </div>
  )
}
