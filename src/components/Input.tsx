import React, { useId, useState } from 'react'
import './Input.css'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label rendered above the field */
  label?: string
  /** Hint text shown below the field */
  helperText?: string
  /** Puts the field into an error state */
  error?: boolean
  /** Replaces helperText when in error state */
  errorMessage?: string
  /** Icon placed inside the left edge of the field */
  leadingIcon?: React.ReactNode
  /** Icon placed inside the right edge of the field */
  trailingIcon?: React.ReactNode
  /** Height variant */
  size?: 'sm' | 'md'
}

export default function Input({
  label,
  helperText,
  error = false,
  errorMessage,
  leadingIcon,
  trailingIcon,
  size = 'md',
  disabled = false,
  id: idProp,
  className = '',
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const autoId = useId()
  const id = idProp ?? autoId
  const helperId = `${id}-helper`

  const [focused, setFocused] = useState(false)

  const wrapperClasses = [
    'input-wrapper',
    `input-wrapper--${size}`,
    focused           ? 'input-wrapper--focused'  : '',
    error             ? 'input-wrapper--error'    : '',
    disabled          ? 'input-wrapper--disabled' : '',
  ].filter(Boolean).join(' ')

  const displayHelper = error ? (errorMessage ?? helperText) : helperText

  return (
    <div className={['input-root', className].filter(Boolean).join(' ')}>
      {label && (
        <label
          htmlFor={id}
          className={['input-label', disabled ? 'input-label--disabled' : ''].filter(Boolean).join(' ')}
        >
          {label}
        </label>
      )}

      <div className={wrapperClasses}>
        {leadingIcon && (
          <span className="input-icon" aria-hidden="true">{leadingIcon}</span>
        )}

        <input
          id={id}
          className="input-field"
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={displayHelper ? helperId : undefined}
          onFocus={(e) => { setFocused(true); onFocus?.(e) }}
          onBlur={(e)  => { setFocused(false); onBlur?.(e) }}
          {...props}
        />

        {trailingIcon && (
          <span className="input-icon" aria-hidden="true">{trailingIcon}</span>
        )}
      </div>

      {displayHelper && (
        <p
          id={helperId}
          className={['input-helper', error ? 'input-helper--error' : ''].filter(Boolean).join(' ')}
        >
          {displayHelper}
        </p>
      )}
    </div>
  )
}
