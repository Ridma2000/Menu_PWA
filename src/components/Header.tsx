import { Settings, ShoppingBag } from 'lucide-react'
import { restaurantDetails } from '../data/restaurant'

interface HeaderProps {
  cartCount: number
}

export function Header({ cartCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 items-center justify-between gap-2 px-4 py-3 sm:gap-3 sm:px-6 lg:px-8">
        <a href="#home" className="min-w-0 flex-1 overflow-hidden">
          <span className="block truncate text-sm font-bold tracking-[0.04em] text-stone-950 uppercase sm:text-base sm:tracking-[0.08em]">
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

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href="#owner"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-700 shadow-sm transition hover:bg-stone-100 sm:h-10 sm:w-10"
            aria-label="Open owner menu editor"
          >
            <Settings className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="#order"
            className="inline-flex h-9 shrink-0 items-center gap-1 rounded-lg bg-stone-950 px-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800 sm:h-10 sm:gap-2 sm:px-3"
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
