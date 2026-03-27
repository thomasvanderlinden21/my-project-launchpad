import { useState, useRef, useEffect } from 'react'
import Icon from './Icon'
import './PerformanceChart.css'

interface PerformanceChartProps {
  className?: string
}

type TimePeriod = 'year' | 'month' | 'week'

interface ChartData {
  labels: string[]
  successPath: string
  volumePath: string
}

export default function PerformanceChart({ className = '' }: PerformanceChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('year')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const chartDatasets: Record<TimePeriod, ChartData> = {
    year: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      successPath: 'M 0,175 C 20,173 40,171 67,168 C 90,165 110,160 133,155 C 160,148 185,142 200,135 C 230,122 255,115 267,110 C 290,102 310,95 333,88 C 360,78 385,72 400,68 C 430,60 455,52 467,48 C 490,42 510,40 533,42 C 560,45 585,38 600,32 C 630,22 655,18 667,16 C 690,12 710,10 733,12 C 760,14 780,18 800,22',
      volumePath: 'M 0,195 C 20,194 40,193 67,192 C 90,191 110,190 133,188 C 160,186 185,184 200,182 C 230,179 255,177 267,175 C 290,172 310,170 333,168 C 360,165 385,163 400,162 C 430,160 455,158 467,157 C 490,155 510,154 533,153 C 560,152 585,151 600,150 C 630,149 655,148 667,148 C 690,148 710,148 733,149 C 760,150 780,152 800,154'
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      successPath: 'M 0,140 C 100,135 150,125 200,115 C 300,95 400,88 533,82 C 600,78 667,76 800,85',
      volumePath: 'M 0,180 C 100,175 150,172 200,168 C 300,162 400,155 533,150 C 600,147 667,145 800,148'
    },
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      successPath: 'M 0,160 C 50,155 100,148 133,142 C 200,130 267,125 400,115 C 500,110 600,108 667,105 C 733,102 767,100 800,98',
      volumePath: 'M 0,185 C 50,183 100,180 133,178 C 200,174 267,172 400,168 C 500,165 600,163 667,162 C 733,161 767,160 800,160'
    }
  }

  const currentData = chartDatasets[selectedPeriod]

  const handlePeriodChange = (period: TimePeriod) => {
    setSelectedPeriod(period)
    setIsDropdownOpen(false)
  }

  const periodLabels: Record<TimePeriod, string> = {
    year: 'Year',
    month: 'Month',
    week: 'Week'
  }

  return (
    <div className={`performance-chart ${className}`}>
      <div className="performance-chart__header">
        <h3 className="performance-chart__title">Performance overview</h3>
        <div className="performance-chart__dropdown-container" ref={dropdownRef}>
          <button
            className="performance-chart__dropdown"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{periodLabels[selectedPeriod]}</span>
            <div className={`performance-chart__dropdown-icon ${isDropdownOpen ? 'performance-chart__dropdown-icon--open' : ''}`}>
              <Icon name="chevron-down" size={20} />
            </div>
          </button>
          {isDropdownOpen && (
            <div className="performance-chart__dropdown-menu">
              {(Object.keys(periodLabels) as TimePeriod[]).map((period) => (
                <button
                  key={period}
                  className={`performance-chart__dropdown-item ${selectedPeriod === period ? 'performance-chart__dropdown-item--active' : ''}`}
                  onClick={() => handlePeriodChange(period)}
                >
                  {periodLabels[period]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="performance-chart__content">
        <div className="performance-chart__grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="performance-chart__grid-line" />
          ))}
        </div>

        <div className="performance-chart__chart-area">
          <svg className="performance-chart__svg" viewBox="0 0 800 240" preserveAspectRatio="none">
            {/* Success rate line (teal) - smooth curve */}
            <path
              key={`success-${selectedPeriod}`}
              className="performance-chart__line performance-chart__line--success"
              d={currentData.successPath}
              fill="none"
              stroke="#12d1bb"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Daily transaction volume line (orange) - smooth curve */}
            <path
              key={`volume-${selectedPeriod}`}
              className="performance-chart__line performance-chart__line--volume"
              d={currentData.volumePath}
              fill="none"
              stroke="#ef9438"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="performance-chart__x-axis">
          {currentData.labels.map((label, index) => (
            <span key={`${selectedPeriod}-${label}-${index}`} className="performance-chart__month">{label}</span>
          ))}
        </div>
      </div>

      <div className="performance-chart__legend">
        <div className="performance-chart__legend-item">
          <div className="performance-chart__legend-dot performance-chart__legend-dot--teal" />
          <span className="performance-chart__legend-label">Success rate</span>
        </div>
        <div className="performance-chart__legend-item">
          <div className="performance-chart__legend-dot performance-chart__legend-dot--orange" />
          <span className="performance-chart__legend-label">Daily transaction volume (EUR)</span>
        </div>
      </div>
    </div>
  )
}
