import { useEffect, useState } from 'react'
import { ShoppingBag, X } from 'lucide-react'
import type { CartItem } from '../types/menu'
import { CartPanel } from './CartPanel'

interface MobileCartPopupProps {
  cart: CartItem[]
  cartCount: number
  total: number
  onIncrease: (itemId: string) => void
  onDecrease: (itemId: string) => void
  onRemove: (itemId: string) => void
  onWhatsAppOrder: () => void
}

export function MobileCartPopup({
  cart,
  cartCount,
  total,
  onIncrease,
  onDecrease,
  onRemove,
  onWhatsAppOrder,
}: MobileCartPopupProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-stone-950 text-white shadow-2xl transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 lg:hidden"
        aria-label={`Open cart with ${cartCount} selected items`}
      >
        <ShoppingBag className="h-6 w-6" aria-hidden="true" />
        {cartCount > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-red-700 px-1.5 text-xs font-black text-white ring-2 ring-white">
            {cartCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-stone-950/70 backdrop-blur-sm lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-cart-title"
          onMouseDown={() => setIsOpen(false)}
        >
          <div
            className="max-h-[88vh] w-full overflow-hidden rounded-t-lg bg-white shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-stone-200 px-4 py-3">
              <h2
                id="mobile-cart-title"
                className="text-lg font-black text-stone-950"
              >
                Cart
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-stone-700 transition hover:bg-stone-100"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-[calc(88vh-4rem)] overflow-y-auto p-4">
              <CartPanel
                id="mobile-order"
                headingId="mobile-cart-heading"
                className="border-0 shadow-none"
                cart={cart}
                total={total}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
                onWhatsAppOrder={onWhatsAppOrder}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
