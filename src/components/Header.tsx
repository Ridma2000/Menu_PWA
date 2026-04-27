import { Settings, ShoppingBag } from 'lucide-react'
import { restaurantDetails } from '../data/restaurant'

interface HeaderProps {
  cartCount: number
}

export function Header({ cartCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="min-w-0">
          <span className="block truncate text-base font-bold tracking-[0.08em] text-stone-950 uppercase">
            {restaurantDetails.name}
          </span>
          <span className="block text-xs font-medium text-stone-500">
            Digital Menu
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-stone-600 md:flex">
          <a className="transition hover:text-red-700" href="#menu">
            Menu
          </a>
          <a className="transition hover:text-red-700" href="#order">
            Cart
          </a>
          <a className="transition hover:text-red-700" href="#contact">
            Contact
          </a>
          <a className="transition hover:text-red-700" href="#owner">
            Owner
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#owner"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-700 shadow-sm transition hover:bg-stone-100"
            aria-label="Open owner menu editor"
          >
            <Settings className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="#order"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-stone-950 px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800"
            aria-label={`Open cart with ${cartCount} selected items`}
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span>{cartCount}</span>
          </a>
        </div>
      </div>
    </header>
  )
}
