import React from 'react'
import Icon from './Icon'
import './Stepper.css'

export type StepState = 'completed' | 'active' | 'upcoming'

export interface StepProps {
  /** Step title */
  label: string
  /** Optional supporting text beneath the label */
  description?: string
  // ── Injected by <Stepper> — do not set manually ──────────
  /** @internal */ state?: StepState
  /** @internal */ stepNumber?: number
  /** @internal */ isFirst?: boolean
  /** @internal */ isLast?: boolean
  /** @internal */ orientation?: 'horizontal' | 'vertical'
}

export default function Step({
  label,
  description,
  state = 'upcoming',
  stepNumber = 1,
  isFirst = false,
  isLast = false,
  orientation = 'horizontal',
}: StepProps) {
  const indicatorContent =
    state === 'completed'
      ? <Icon name="check" size={14} />
      : <span className="step-number">{stepNumber}</span>

  if (orientation === 'vertical') {
    return (
      <div className={`step step--vertical step--${state}`}>
        <div className="step-v-track">
          <div className="step-indicator">{indicatorContent}</div>
          {!isLast && (
            <div className={`step-v-connector ${state === 'completed' ? 'step-connector--brand' : 'step-connector--neutral'}`} />
          )}
        </div>
        <div className="step-v-body">
          <span className="step-label">{label}</span>
          {description && <span className="step-desc">{description}</span>}
        </div>
      </div>
    )
  }

  // Horizontal ───────────────────────────────────────────────
  // Left line: brand when this step is active or completed (and not the first)
  const leftBrand = !isFirst && (state === 'active' || state === 'completed')
  // Right line: brand when this step is completed
  const rightBrand = state === 'completed'

  return (
    <div className={`step step--horizontal step--${state}`}>
      <div className="step-h-track">
        <div className={[
          'step-h-line',
          isFirst            ? 'step-h-line--hidden'   :
          leftBrand          ? 'step-connector--brand'  :
                               'step-connector--neutral',
        ].join(' ')} />

        <div className="step-indicator">{indicatorContent}</div>

        <div className={[
          'step-h-line',
          isLast             ? 'step-h-line--hidden'   :
          rightBrand         ? 'step-connector--brand'  :
                               'step-connector--neutral',
        ].join(' ')} />
      </div>

      <div className="step-h-body">
        <span className="step-label">{label}</span>
        {description && <span className="step-desc">{description}</span>}
      </div>
    </div>
  )
}
