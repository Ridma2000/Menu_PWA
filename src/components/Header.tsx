import { ShoppingBag } from 'lucide-react'
import { restaurantDetails } from '../data/restaurant'

interface HeaderProps {
  cartCount: number
}

export function Header({ cartCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto grid w-full max-w-7xl min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-8">
        <a href="#home" className="min-w-0 overflow-hidden">
          <span className="block truncate text-sm font-bold tracking-[0.04em] text-stone-950 uppercase sm:text-base sm:tracking-[0.08em]">
            {restaurantDetails.name}
          </span>
          <span className="block text-xs font-medium text-stone-500">
            Digital Menu
          </span>
        </a>

        <nav className="hidden items-center justify-self-center gap-8 text-sm font-semibold text-stone-600 lg:flex">
          <a className="transition hover:text-red-700" href="#menu">
            Menu
          </a>
          <a className="transition hover:text-red-700" href="#order">
            Cart
          </a>
          <a className="transition hover:text-red-700" href="#contact">
            Contact
          </a>
        </nav>

        <div className="col-start-2 hidden shrink-0 items-center justify-self-end gap-1.5 sm:gap-2 md:col-start-3 lg:flex">
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
