import { Flame, Leaf, Star } from 'lucide-react'
import type { MenuTag } from '../types/menu'

const tagCopy: Record<MenuTag, string> = {
  spicy: 'Spicy',
  vegetarian: 'Vegetarian',
  popular: 'Popular',
}

export function TagPill({ tag }: { tag: MenuTag }) {
  const Icon = tag === 'spicy' ? Flame : tag === 'vegetarian' ? Leaf : Star

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-stone-700 shadow-sm ring-1 ring-stone-200">
      <Icon
        className={`h-3.5 w-3.5 ${
          tag === 'spicy'
            ? 'text-red-600'
            : tag === 'vegetarian'
              ? 'text-emerald-600'
              : 'text-amber-500'
        }`}
        aria-hidden="true"
      />
      {tagCopy[tag]}
    </span>
  )
}
