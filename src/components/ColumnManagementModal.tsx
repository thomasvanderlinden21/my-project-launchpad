import { useState } from 'react'
import SideModal from './SideModal'
import Button from './Button'
import Icon from './Icon'
import './ColumnManagementModal.css'

export interface ColumnConfig {
  id: string
  label: string
  visible: boolean
  locked?: boolean
  order?: number
}

export interface ColumnManagementModalProps {
  isOpen: boolean
  onClose: () => void
  columns: ColumnConfig[]
  onColumnsChange: (columns: ColumnConfig[]) => void
  onApply: () => void
}

export default function ColumnManagementModal({
  isOpen,
  onClose,
  columns,
  onColumnsChange,
  onApply,
}: ColumnManagementModalProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dropPosition, setDropPosition] = useState<{ index: number; position: 'before' | 'after' } | null>(null)

  // Get selected and available columns
  const selectedColumns = columns.filter(col => col.visible).sort((a, b) => (a.order || 0) - (b.order || 0))
  const availableColumns = columns.filter(col => !col.visible)

  const handleToggleColumn = (columnId: string) => {
    const column = columns.find(col => col.id === columnId)
    if (!column || column.locked) return

    const updatedColumns = columns.map(col => {
      if (col.id === columnId) {
        const newVisible = !col.visible
        // If making visible, assign order at the end
        if (newVisible && col.order === undefined) {
          const maxOrder = Math.max(...columns.filter(c => c.visible).map(c => c.order || 0), -1)
          return { ...col, visible: newVisible, order: maxOrder + 1 }
        }
        return { ...col, visible: newVisible }
      }
      return col
    })

    onColumnsChange(updatedColumns)
  }

  const handleRemoveColumn = (columnId: string) => {
    const column = columns.find(col => col.id === columnId)
    if (!column || column.locked) return

    handleToggleColumn(columnId)
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.currentTarget.innerHTML)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'

    if (draggedIndex === null) return

    // Calculate position based on mouse Y position relative to the element
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseY = e.clientY
    const elementMiddle = rect.top + rect.height / 2
    const position = mouseY < elementMiddle ? 'before' : 'after'

    // Don't show indicator if dropping in the same position
    if (
      (draggedIndex === index && position === 'before') ||
      (draggedIndex === index - 1 && position === 'after')
    ) {
      setDropPosition(null)
      return
    }

    setDropPosition({ index, position })
  }

  const handleDragLeave = () => {
    setDropPosition(null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()

    if (draggedIndex === null || !dropPosition) {
      setDraggedIndex(null)
      setDropPosition(null)
      return
    }

    const newSelectedColumns = [...selectedColumns]
    const [draggedItem] = newSelectedColumns.splice(draggedIndex, 1)

    // Calculate the new insert position
    let insertIndex = dropPosition.index

    // Adjust insert index if the dragged item was before the drop target
    if (draggedIndex < dropPosition.index) {
      insertIndex -= 1
    }

    // Insert after means we add 1 to the index
    if (dropPosition.position === 'after') {
      insertIndex += 1
    }

    newSelectedColumns.splice(insertIndex, 0, draggedItem)

    // Update order for all columns
    const updatedColumns = columns.map(col => {
      const newIndex = newSelectedColumns.findIndex(sc => sc.id === col.id)
      if (newIndex >= 0) {
        return { ...col, order: newIndex }
      }
      return col
    })

    onColumnsChange(updatedColumns)
    setDraggedIndex(null)
    setDropPosition(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDropPosition(null)
  }

  return (
    <SideModal
      isOpen={isOpen}
      onClose={onClose}
      title="Manage columns"
      width="md"
      footer={
        <>
          <Button hierarchy="secondary" size="sm" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button hierarchy="primary" size="sm" onClick={onApply} fullWidth>
            Apply changes
          </Button>
        </>
      }
    >
      <div className="column-management-v2">
        {/* Header description */}
        <p className="column-management-v2__description">
          Choose the table columns you need and arrange them by priority
        </p>

        {/* Selected columns section */}
        <div className="column-management-v2__section">
          <h3 className="column-management-v2__section-title">Selected columns</h3>
          <div className="column-management-v2__selected-list">
            {selectedColumns.map((column, index) => (
              <div key={column.id} className="column-management-v2__selected-item-wrapper">
                {/* Drop indicator before */}
                {dropPosition?.index === index && dropPosition.position === 'before' && (
                  <div className="column-management-v2__drop-indicator" />
                )}

                <div
                  className={`column-management-v2__selected-item ${
                    draggedIndex === index ? 'column-management-v2__selected-item--dragging' : ''
                  }`}
                  draggable={!column.locked}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onDragEnd={handleDragEnd}
                >
                  <div className="column-management-v2__drag-handle">
                    <Icon name="drag-handle" size={20} />
                  </div>
                  <span className="column-management-v2__item-label">{column.label}</span>
                  {column.locked ? (
                    <div className="column-management-v2__lock-icon">
                      <Icon name="lock" size={16} />
                    </div>
                  ) : (
                    <button
                      className="column-management-v2__remove-btn"
                      onClick={() => handleRemoveColumn(column.id)}
                      aria-label={`Remove ${column.label}`}
                    >
                      <Icon name="close" size={16} />
                    </button>
                  )}
                </div>

                {/* Drop indicator after */}
                {dropPosition?.index === index && dropPosition.position === 'after' && (
                  <div className="column-management-v2__drop-indicator" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="column-management-v2__divider" />

        {/* Column options section */}
        <div className="column-management-v2__section">
          <h3 className="column-management-v2__section-title">Column options</h3>
          <div className="column-management-v2__options-list">
            {columns.map(column => (
              <label
                key={column.id}
                className={`column-management-v2__option-item ${
                  column.locked ? 'column-management-v2__option-item--disabled' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={column.visible}
                  onChange={() => handleToggleColumn(column.id)}
                  disabled={column.locked}
                />
                <span className="column-management-v2__option-label">{column.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </SideModal>
  )
}
