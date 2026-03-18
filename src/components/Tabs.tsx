import React, { useState, useId, useRef } from 'react'
import './Tabs.css'

export interface TabItem {
  /** Unique identifier — used as the selection key */
  id: string
  /** Label shown in the tab strip */
  label: string
  /** Optional leading icon */
  icon?: React.ReactNode
  /** Panel content rendered when this tab is active */
  children: React.ReactNode
  /** Prevents selection when true */
  disabled?: boolean
}

export interface TabsProps {
  /** Tab definitions */
  items: TabItem[]
  /**
   * Initially active tab id (uncontrolled).
   * Defaults to the first item if omitted.
   */
  defaultActiveId?: string
  /** Controlled active tab id — pair with `onChange` */
  activeId?: string
  /** Called with the new tab id when the user changes tabs */
  onChange?: (id: string) => void
  className?: string
}

export default function Tabs({
  items,
  defaultActiveId,
  activeId: controlledId,
  onChange,
  className = '',
}: TabsProps) {
  const uid = useId()
  const isControlled = controlledId !== undefined
  const [internalId, setInternalId] = useState(
    defaultActiveId ?? items.find((i) => !i.disabled)?.id ?? ''
  )

  const activeId = isControlled ? controlledId : internalId

  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])

  const activate = (id: string) => {
    if (!isControlled) setInternalId(id)
    onChange?.(id)
  }

  // Roving tabindex + arrow-key navigation (ARIA Tabs pattern)
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const enabled = items
      .map((item, i) => ({ item, i }))
      .filter(({ item }) => !item.disabled)
      .map(({ i }) => i)

    const pos = enabled.indexOf(index)
    let next: number | undefined

    switch (e.key) {
      case 'ArrowRight': next = enabled[(pos + 1) % enabled.length]; break
      case 'ArrowLeft':  next = enabled[(pos - 1 + enabled.length) % enabled.length]; break
      case 'Home':       next = enabled[0]; break
      case 'End':        next = enabled[enabled.length - 1]; break
    }

    if (next !== undefined) {
      e.preventDefault()
      triggerRefs.current[next]?.focus()
      activate(items[next].id)
    }
  }

  return (
    <div className={`tabs ${className}`.trim()}>
      {/* Tab strip */}
      <div role="tablist" className="tabs-list">
        {items.map((item, index) => {
          const isActive   = item.id === activeId
          const triggerId  = `${uid}-tab-${item.id}`
          const panelId    = `${uid}-panel-${item.id}`

          return (
            <button
              key={item.id}
              ref={(el) => { triggerRefs.current[index] = el }}
              id={triggerId}
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              className={[
                'tab-trigger',
                isActive        ? 'tab-trigger--active'   : '',
                item.disabled   ? 'tab-trigger--disabled' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => !item.disabled && activate(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {item.icon && <span className="tab-icon">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>

      {/* Panels — all rendered, hidden via HTML `hidden` attribute */}
      {items.map((item) => (
        <div
          key={item.id}
          id={`${uid}-panel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${item.id}`}
          hidden={item.id !== activeId}
          tabIndex={0}
          className="tab-panel"
        >
          {item.children}
        </div>
      ))}
    </div>
  )
}
