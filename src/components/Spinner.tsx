import React from 'react'
import './Spinner.css'

export interface SpinnerProps {
  size?: number
  className?: string
}

export default function Spinner({ size = 20, className = '' }: SpinnerProps) {
  return (
    <svg
      className={`spinner ${className}`}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="40"
        strokeDashoffset="10"
        opacity="0.3"
      />
      <circle
        className="spinner__circle"
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="40"
        strokeDashoffset="30"
      />
    </svg>
  )
}
