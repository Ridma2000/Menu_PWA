import { Minus, Plus, Send, Trash2 } from 'lucide-react'
import type { CartItem } from '../types/menu'
import { formatCurrency } from '../utils/currency'

interface CartPanelProps {
  cart: CartItem[]
  total: number
  onIncrease: (itemId: string) => void
  onDecrease: (itemId: string) => void
  onRemove: (itemId: string) => void
  onWhatsAppOrder: () => void
}

export function CartPanel({
  cart,
  total,
  onIncrease,
  onDecrease,
  onRemove,
  onWhatsAppOrder,
}: CartPanelProps) {
  const itemCount = cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0)

  return (
    <section
      id="order"
      className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm"
      aria-labelledby="cart-heading"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-red-700 uppercase">
            Selected items
          </p>
          <h2 id="cart-heading" className="text-xl font-black text-stone-950">
            Your Cart
          </h2>
        </div>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-bold text-stone-700">
          {itemCount}
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-stone-300 bg-stone-50 p-5 text-center">
          <p className="text-sm font-semibold text-stone-700">
            Your cart is empty.
          </p>
          <p className="mt-1 text-sm text-stone-500">
            Add dishes from the menu to start an order.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {cart.map(({ item, quantity }) => (
            <div
              key={item.id}
              className="grid grid-cols-[4rem_minmax(0,1fr)] gap-3 rounded-lg border border-stone-100 bg-stone-50 p-2"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded-lg object-cover"
                loading="lazy"
              />
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-black text-stone-950">
                      {item.name}
                    </h3>
                    <p className="text-sm font-semibold text-stone-600">
                      {formatCurrency(item.price * quantity)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-stone-500 transition hover:bg-white hover:text-red-700"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-3 inline-flex items-center rounded-lg border border-stone-200 bg-white">
                  <button
                    type="button"
                    onClick={() => onDecrease(item.id)}
                    className="inline-flex h-8 w-8 items-center justify-center text-stone-700 transition hover:bg-stone-100"
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="w-9 text-center text-sm font-black text-stone-950">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onIncrease(item.id)}
                    className="inline-flex h-8 w-8 items-center justify-center text-stone-700 transition hover:bg-stone-100"
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 border-t border-stone-200 pt-4">
        <div className="flex items-center justify-between text-base font-black text-stone-950">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <button
          type="button"
          onClick={onWhatsAppOrder}
          disabled={cart.length === 0}
          className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-base font-black text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"
        >
          <Send className="h-5 w-5" aria-hidden="true" />
          Order on WhatsApp
        </button>
      </div>
    </section>
  )
}
