import { useState } from 'react'
import Icon from './Icon'
import './TodoList.css'

export type TodoItem = {
  id: string
  label: string
  completed: boolean
  link?: {
    text: string
    onClick: () => void
  }
}

export interface TodoListProps {
  title: string
  items: TodoItem[]
  onToggleItem?: (id: string) => void
}

export default function TodoList({ title, items, onToggleItem }: TodoListProps) {
  const completedCount = items.filter(item => item.completed).length
  const totalCount = items.length
  const progress = (completedCount / totalCount) * 100

  return (
    <div className="todo-list">
      <div className="todo-list__header">
        <h3 className="todo-list__title">{title}</h3>
        <span className="todo-list__progress-text">
          {completedCount} of {totalCount} completed
        </span>
      </div>

      <div className="todo-list__progress-bar">
        <div
          className="todo-list__progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="todo-list__items">
        {items.map((item) => (
          <div key={item.id} className="todo-list__item">
            <label className="todo-list__item-label">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => onToggleItem?.(item.id)}
                className="todo-list__checkbox"
              />
              <span className={`todo-list__item-text ${item.completed ? 'todo-list__item-text--completed' : ''}`}>
                {item.label}
              </span>
            </label>
            {item.link && !item.completed && (
              <button
                className="todo-list__link"
                onClick={item.link.onClick}
              >
                {item.link.text}
                <Icon name="arrow-right" size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
