import { useState } from 'react'
import Icon from './Icon'
import './TransactionTypeChart.css'

interface TransactionType {
  title: string
  percentage: number
  label: string
  salesColor: string
  chargebacksColor: string
}

export default function TransactionTypeChart() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const transactionTypes: TransactionType[] = [
    {
      title: 'Transactions by type',
      percentage: 85,
      label: 'Paid transaction',
      salesColor: '#15b79e',
      chargebacksColor: '#0e9384'
    },
    {
      title: 'Transactions by region',
      percentage: 72,
      label: 'European sales',
      salesColor: '#15b79e',
      chargebacksColor: '#0e9384'
    },
    {
      title: 'Transactions by channel',
      percentage: 91,
      label: 'Online payments',
      salesColor: '#15b79e',
      chargebacksColor: '#0e9384'
    },
    {
      title: 'Transactions by status',
      percentage: 68,
      label: 'Completed',
      salesColor: '#15b79e',
      chargebacksColor: '#0e9384'
    }
  ]

  const currentData = transactionTypes[currentIndex]

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? transactionTypes.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === transactionTypes.length - 1 ? 0 : prev + 1))
  }

  // Generate dashes for the segmented gauge
  const totalDashes = 60
  const activeDashes = Math.round((currentData.percentage / 100) * totalDashes)
  const radius = 90
  const centerX = 100
  const centerY = 100

  // Generate dash positions
  const generateDashes = () => {
    const dashes = []
    const startAngle = 180 // Start from left (180 degrees)
    const endAngle = 360 // End at right (360 degrees)
    const angleRange = endAngle - startAngle

    for (let i = 0; i < totalDashes; i++) {
      const angle = startAngle + (angleRange / totalDashes) * i
      const radian = (angle * Math.PI) / 180

      // Calculate dash position
      const x1 = centerX + (radius - 14) * Math.cos(radian)
      const y1 = centerY + (radius - 14) * Math.sin(radian)
      const x2 = centerX + radius * Math.cos(radian)
      const y2 = centerY + radius * Math.sin(radian)

      const isActive = i < activeDashes

      dashes.push(
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={isActive ? currentData.salesColor : 'rgba(229, 229, 229, 0.3)'}
          strokeWidth="1.5"
        />
      )
    }
    return dashes
  }

  return (
    <div className="transaction-type-chart">
      <div className="transaction-type-chart__header">
        <button
          className="transaction-type-chart__nav-button"
          onClick={handlePrevious}
          aria-label="Previous"
        >
          <Icon name="chevron-left" size={28} />
        </button>

        <div className="transaction-type-chart__title-section">
          <h3 className="transaction-type-chart__title">{currentData.title}</h3>
          <div className="transaction-type-chart__indicators">
            {transactionTypes.map((_, index) => (
              <div
                key={index}
                className={`transaction-type-chart__indicator ${
                  index === currentIndex ? 'transaction-type-chart__indicator--active' : ''
                }`}
              />
            ))}
          </div>
        </div>

        <button
          className="transaction-type-chart__nav-button"
          onClick={handleNext}
          aria-label="Next"
        >
          <Icon name="chevron-right" size={28} />
        </button>
      </div>

      <div className="transaction-type-chart__gauge-container">
        <svg
          className="transaction-type-chart__gauge"
          viewBox="0 0 200 120"
          key={`gauge-${currentIndex}`}
        >
          {/* Segmented dashes */}
          {generateDashes()}

          {/* Percentage text */}
          <text
            x="100"
            y="72"
            textAnchor="middle"
            className="transaction-type-chart__percentage"
          >
            {currentData.percentage}%
          </text>
          {/* Label text */}
          <text
            x="100"
            y="95"
            textAnchor="middle"
            className="transaction-type-chart__label"
          >
            {currentData.label}
          </text>
        </svg>
      </div>

      <div className="transaction-type-chart__legend">
        <div className="transaction-type-chart__legend-item">
          <div
            className="transaction-type-chart__legend-dot"
            style={{ backgroundColor: currentData.salesColor }}
          />
          <span className="transaction-type-chart__legend-label">Sales</span>
        </div>
        <div className="transaction-type-chart__legend-item">
          <div
            className="transaction-type-chart__legend-dot"
            style={{ backgroundColor: currentData.chargebacksColor }}
          />
          <span className="transaction-type-chart__legend-label">Chargebacks</span>
        </div>
      </div>
    </div>
  )
}
