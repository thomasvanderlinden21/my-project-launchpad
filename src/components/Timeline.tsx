import './Timeline.css'

export interface TimelineItem {
  id: string
  title: string
  description?: string
  timestamp: string
  icon?: React.ReactNode
  status?: 'success' | 'pending' | 'failed' | 'neutral'
}

export interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="timeline">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={item.id} className={`timeline-item ${isLast ? 'timeline-item--last' : ''}`}>
            <div className="timeline-item__connector">
              <div className={`timeline-item__dot ${item.status ? `timeline-item__dot--${item.status}` : ''}`}>
                {item.icon && (
                  <div className="timeline-item__icon">
                    {item.icon}
                  </div>
                )}
              </div>
              {!isLast && <div className="timeline-item__line" />}
            </div>

            <div className="timeline-item__content">
              <div className="timeline-item__header">
                <h4 className="timeline-item__title">{item.title}</h4>
                <span className="timeline-item__timestamp">{item.timestamp}</span>
              </div>
              {item.description && (
                <p className="timeline-item__description">{item.description}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
