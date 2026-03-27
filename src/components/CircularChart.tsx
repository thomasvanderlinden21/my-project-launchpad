interface CircularChartProps {
  percentage: number
  label: string
  color?: string
  backgroundColor?: string
}

export default function CircularChart({
  percentage,
  label,
  color = '#12d1bb',
  backgroundColor = 'rgba(44, 157, 150, 0.1)'
}: CircularChartProps) {
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <svg className="portal__circular-chart" viewBox="0 0 200 200">
      {/* Background circle */}
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        stroke={backgroundColor}
        strokeWidth="20"
      />
      {/* Progress circle */}
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="20"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 100 100)"
        style={{
          transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      {/* Percentage text */}
      <text
        x="100"
        y="95"
        textAnchor="middle"
        className="portal__chart-percentage"
      >
        {percentage}%
      </text>
      {/* Label text */}
      <text
        x="100"
        y="115"
        textAnchor="middle"
        className="portal__chart-label"
      >
        {label}
      </text>
    </svg>
  )
}
