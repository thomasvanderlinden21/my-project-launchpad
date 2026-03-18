import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Tooltip.css'

interface TooltipProps {
  label: string
  children: React.ReactElement
  side?: 'right' | 'top' | 'bottom' | 'left'
  disabled?: boolean
}

export default function Tooltip({ label, children, side = 'right', disabled = false }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLElement>(null)
  const GAP = 8

  const show = () => {
    if (disabled || !triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()

    let top = 0
    let left = 0

    if (side === 'right') {
      top = rect.top + rect.height / 2
      left = rect.right + GAP
    } else if (side === 'left') {
      top = rect.top + rect.height / 2
      left = rect.left - GAP
    } else if (side === 'top') {
      top = rect.top - GAP
      left = rect.left + rect.width / 2
    } else {
      top = rect.bottom + GAP
      left = rect.left + rect.width / 2
    }

    setCoords({ top, left })
    setVisible(true)
  }

  const hide = () => setVisible(false)

  // Close on scroll / resize to avoid stale positions
  useEffect(() => {
    if (!visible) return
    const close = () => setVisible(false)
    window.addEventListener('scroll', close, true)
    window.addEventListener('resize', close)
    return () => {
      window.removeEventListener('scroll', close, true)
      window.removeEventListener('resize', close)
    }
  }, [visible])

  const child = children as React.ReactElement & { ref?: React.Ref<HTMLElement> }

  const cloned = {
    ...child,
    props: {
      ...child.props,
      ref: triggerRef,
      onMouseEnter: (e: React.MouseEvent) => {
        show()
        child.props.onMouseEnter?.(e)
      },
      onMouseLeave: (e: React.MouseEvent) => {
        hide()
        child.props.onMouseLeave?.(e)
      },
      onFocus: (e: React.FocusEvent) => {
        show()
        child.props.onFocus?.(e)
      },
      onBlur: (e: React.FocusEvent) => {
        hide()
        child.props.onBlur?.(e)
      },
    },
  }

  const tooltip = visible ? (
    <div
      className={`tooltip tooltip--${side}`}
      role="tooltip"
      style={{ top: coords.top, left: coords.left }}
    >
      {label}
    </div>
  ) : null

  return (
    <>
      {cloned}
      {typeof document !== 'undefined' && createPortal(tooltip, document.body)}
    </>
  )
}
