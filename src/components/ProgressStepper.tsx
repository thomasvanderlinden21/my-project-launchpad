import Icon from './Icon'
import './ProgressStepper.css'

export type ProgressStep = {
  id: string
  title: string
  description: string
  date: string
  status: 'complete' | 'in-progress' | 'to-do'
}

type ProgressStepperProps = {
  steps: ProgressStep[]
}

export default function ProgressStepper({ steps }: ProgressStepperProps) {
  return (
    <div className="progress-stepper">
      {steps.map((step, index) => (
        <div key={step.id} className="progress-stepper__step-wrapper">
          <div className="progress-stepper__step">
            <div className={`progress-stepper__icon progress-stepper__icon--${step.status}`}>
              {step.status === 'complete' ? (
                <Icon name="check" size={16} />
              ) : (
                <span className="progress-stepper__number">{index + 1}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`progress-stepper__line progress-stepper__line--${step.status === 'complete' ? 'complete' : 'inactive'}`} />
            )}
          </div>

          <div className="progress-stepper__content">
            <div className="progress-stepper__text">
              <div className="progress-stepper__title">{step.title}</div>
              <div className="progress-stepper__description">{step.description}</div>
              <div className="progress-stepper__date">{step.date}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
