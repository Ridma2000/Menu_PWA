import { useEffect } from 'react'
import { CheckCircle2, Plus, X } from 'lucide-react'
import type { MenuItem } from '../types/menu'
import { formatCurrency } from '../utils/currency'
import { TagPill } from './TagPill'

interface ItemDetailsModalProps {
  item: MenuItem
  onClose: () => void
  onAddToCart: (item: MenuItem) => void
}

export function ItemDetailsModal({
  item,
  onClose,
  onAddToCart,
}: ItemDetailsModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-stone-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="item-details-title"
      onMouseDown={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-t-lg bg-white shadow-2xl sm:rounded-lg"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-[16/10] max-h-80 overflow-hidden bg-stone-100">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/95 text-stone-950 shadow-sm transition hover:bg-white"
            aria-label="Close item details"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[calc(92vh-20rem)] overflow-y-auto p-5 sm:p-6">
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <TagPill key={tag} tag={tag} />
            ))}
          </div>

          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-red-700 uppercase">
                {item.category}
              </p>
              <h2
                id="item-details-title"
                className="mt-1 text-2xl font-black text-stone-950 sm:text-3xl"
              >
                {item.name}
              </h2>
            </div>
            <p className="shrink-0 text-xl font-black text-stone-950">
              {formatCurrency(item.price)}
            </p>
          </div>

          <p className="mt-4 text-base leading-7 text-stone-600">
            {item.description}
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm font-bold text-stone-700">
            <CheckCircle2
              className={`h-5 w-5 ${
                item.available ? 'text-emerald-600' : 'text-stone-400'
              }`}
              aria-hidden="true"
            />
            {item.available ? 'Available today' : 'Currently unavailable'}
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(item)}
            disabled={!item.available}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-red-700 px-5 text-base font-bold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500 sm:w-auto"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
