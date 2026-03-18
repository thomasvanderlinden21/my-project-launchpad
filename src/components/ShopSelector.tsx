import { useRef, useEffect } from 'react'
import Checkbox from './Checkbox'
import './ShopSelector.css'

export interface Shop {
  id: string
  name: string
}

export interface ShopSelectorProps {
  shops: Shop[]
  selectedShopIds: string[]
  onSelectShops: (shopIds: string[]) => void
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

export default function ShopSelector({
  shops,
  selectedShopIds,
  onSelectShops,
  isOpen,
  onClose,
  triggerRef
}: ShopSelectorProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose, triggerRef])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const handleToggleShop = (shopId: string) => {
    if (selectedShopIds.includes(shopId)) {
      onSelectShops(selectedShopIds.filter(id => id !== shopId))
    } else {
      onSelectShops([...selectedShopIds, shopId])
    }
  }

  if (!isOpen) return null

  return (
    <div className="shop-selector" ref={menuRef}>
      <div className="shop-selector__menu">
        {shops.map((shop) => {
          const isSelected = selectedShopIds.includes(shop.id)
          return (
            <div
              key={shop.id}
              className="shop-selector__item"
            >
              <Checkbox
                id={`shop-${shop.id}`}
                label={shop.name}
                checked={isSelected}
                onChange={() => handleToggleShop(shop.id)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
