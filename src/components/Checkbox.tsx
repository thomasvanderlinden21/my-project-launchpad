import './Checkbox.css'

export interface CheckboxProps {
  id?: string
  label?: string
  description?: string
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

export default function Checkbox({
  id,
  label,
  description,
  checked,
  defaultChecked,
  disabled,
  onChange,
  className = '',
}: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked)
  }

  if (label || description) {
    return (
      <label className={`checkbox-wrapper ${className}`}>
        <input
          type="checkbox"
          id={id}
          className="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleChange}
        />
        {(label || description) && (
          <div className="checkbox-content">
            {label && <span className="checkbox-label">{label}</span>}
            {description && <span className="checkbox-description">{description}</span>}
          </div>
        )}
      </label>
    )
  }

  return (
    <input
      type="checkbox"
      id={id}
      className={`checkbox ${className}`}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onChange={handleChange}
    />
  )
}
