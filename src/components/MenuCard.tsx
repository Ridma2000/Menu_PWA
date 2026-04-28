import { Eye, Heart, Plus } from 'lucide-react'
import { formatCurrency } from '../utils/currency'
import type { MenuItem } from '../types/menu'
import { TagPill } from './TagPill'

interface MenuCardProps {
  item: MenuItem
  likeCount: number
  onLike: (itemId: string) => void
  onAddToCart: (item: MenuItem) => void
  onViewDetails: (item: MenuItem) => void
}

export function MenuCard({
  item,
  likeCount,
  onLike,
  onAddToCart,
  onViewDetails,
}: MenuCardProps) {
  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-stone-100">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
        {!item.available && (
          <span className="absolute bottom-3 left-3 rounded-full bg-stone-950 px-3 py-1 text-xs font-bold text-white">
            Unavailable
          </span>
        )}
      </div>

      <div className="flex min-h-56 flex-1 flex-col p-4">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-[0.16em] text-red-700 uppercase">
              {item.category}
            </p>
            <h3 className="mt-1 text-lg font-black leading-tight text-stone-950">
              {item.name}
            </h3>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <p className="text-right text-base font-black text-stone-950">
              {formatCurrency(item.price)}
            </p>
            <button
              type="button"
              onClick={() => onLike(item.id)}
              aria-label={`Like ${item.name}`}
              className="inline-flex h-8 min-w-14 items-center justify-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 text-sm font-black text-red-700 transition hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
            >
              <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
              <span>{likeCount}</span>
            </button>
          </div>
        </div>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">
          {item.description}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <button
            type="button"
            onClick={() => onViewDetails(item)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-stone-200 bg-white px-3 text-sm font-bold text-stone-800 transition hover:bg-stone-100"
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            Details
          </button>
          <button
            type="button"
            onClick={() => onAddToCart(item)}
            disabled={!item.available}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-red-700 px-3 text-sm font-bold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add
          </button>
        </div>
      </div>
    </article>
  )
}
