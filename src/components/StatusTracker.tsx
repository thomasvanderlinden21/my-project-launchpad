import Icon from './Icon'
import './StatusTracker.css'

export type StatusStep = {
  id: string
  label: string
  sublabel?: string
  status: 'completed' | 'current' | 'upcoming'
}

export interface StatusTrackerProps {
  title: string
  steps: StatusStep[]
}

export default function StatusTracker({ title, steps }: StatusTrackerProps) {
  return (
    <div className="status-tracker">
      <h3 className="status-tracker__title">{title}</h3>
      <div className="status-tracker__steps">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1

          return (
            <div key={step.id} className="status-tracker__step-wrapper">
              <div className={`status-tracker__step status-tracker__step--${step.status}`}>
                <div className="status-tracker__icon-wrapper">
                  {step.status === 'completed' ? (
                    <div className="status-tracker__icon status-tracker__icon--completed">
                      <Icon name="check" size={16} />
                    </div>
                  ) : (
                    <div className={`status-tracker__icon status-tracker__icon--${step.status}`}>
                      <div className="status-tracker__dot" />
                    </div>
                  )}
                </div>

                <div className="status-tracker__content">
                  <span className="status-tracker__label">{step.label}</span>
                  {step.sublabel && (
                    <span className="status-tracker__sublabel">{step.sublabel}</span>
                  )}
                </div>
              </div>

              {!isLast && (
                <div className={`status-tracker__line status-tracker__line--${
                  step.status === 'completed' ? 'completed' : 'inactive'
                }`} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
