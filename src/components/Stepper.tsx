import React from 'react'
import type { StepProps } from './Step'
import './Stepper.css'

export interface StepperProps {
  /**
   * Zero-indexed position of the currently active step.
   * Steps before it are 'completed', steps after are 'upcoming'.
   */
  activeStep: number
  /** Layout direction */
  orientation?: 'horizontal' | 'vertical'
  /** <Step> elements */
  children: React.ReactElement<StepProps> | React.ReactElement<StepProps>[]
  className?: string
}

export default function Stepper({
  activeStep,
  orientation = 'horizontal',
  children,
  className = '',
}: StepperProps) {
  const steps = React.Children.toArray(children) as React.ReactElement<StepProps>[]
  const total = steps.length

  return (
    <div
      className={[
        'stepper',
        `stepper--${orientation}`,
        className,
      ].filter(Boolean).join(' ')}
      aria-label="Progress"
    >
      {steps.map((step, index) => {
        const state =
          index < activeStep  ? 'completed' :
          index === activeStep ? 'active'    :
                                 'upcoming'

        return React.cloneElement(step, {
          state,
          stepNumber:  index + 1,
          isFirst:     index === 0,
          isLast:      index === total - 1,
          orientation,
        })
      })}
    </div>
  )
}
