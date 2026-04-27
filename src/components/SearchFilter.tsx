import { Search } from 'lucide-react'
import type { CategoryFilter, MenuCategory } from '../types/menu'

interface SearchFilterProps {
  searchQuery: string
  selectedCategory: CategoryFilter
  categories: MenuCategory[]
  resultCount: number
  onSearchChange: (value: string) => void
  onCategoryChange: (value: CategoryFilter) => void
}

export function SearchFilter({
  searchQuery,
  selectedCategory,
  categories,
  resultCount,
  onSearchChange,
  onCategoryChange,
}: SearchFilterProps) {
  const filters: CategoryFilter[] = ['All', ...categories]

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
      <label className="relative block">
        <span className="sr-only">Search food by name</span>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search food by name"
          className="h-12 w-full rounded-lg border border-stone-200 bg-stone-50 pl-10 pr-4 text-base text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-100"
        />
      </label>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {filters.map((category) => {
          const isActive = selectedCategory === category

          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-bold transition ${
                isActive
                  ? 'bg-stone-950 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>

      <p className="mt-3 text-sm font-medium text-stone-500">
        {resultCount} {resultCount === 1 ? 'item' : 'items'} found
      </p>
    </div>
  )
}
