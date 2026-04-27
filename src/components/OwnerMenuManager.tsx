import { type FormEvent, useMemo, useState } from 'react'
import {
  Check,
  Edit3,
  Plus,
  RefreshCcw,
  Save,
  Trash2,
  X,
} from 'lucide-react'
import type { MenuItem, MenuTag } from '../types/menu'
import { formatCurrency } from '../utils/currency'

const expectedOwnerEmail = 'ridma@gmail.com'
const expectedOwnerContact = '0713464048'

const tagOptions: { value: MenuTag; label: string }[] = [
  { value: 'popular', label: 'Popular' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'spicy', label: 'Spicy' },
]

const fallbackImage =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80'

interface ItemDraft {
  id: string
  name: string
  category: string
  description: string
  price: string
  image: string
  available: boolean
  tags: MenuTag[]
}

interface OwnerMenuManagerProps {
  categories: string[]
  items: MenuItem[]
  onAddCategory: (category: string) => void
  onRenameCategory: (currentCategory: string, nextCategory: string) => void
  onDeleteCategory: (category: string) => void
  onSaveItem: (item: MenuItem) => void
  onDeleteItem: (itemId: string) => void
  onResetMenu: () => void
}

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

const normalizePhone = (value: string) => value.replace(/\D/g, '')

const createDraft = (category: string): ItemDraft => ({
  id: '',
  name: '',
  category,
  description: '',
  price: '',
  image: '',
  available: true,
  tags: [],
})

const draftFromItem = (item: MenuItem): ItemDraft => ({
  ...item,
  price: String(item.price),
  tags: [...item.tags],
})

export function OwnerMenuManager({
  categories,
  items,
  onAddCategory,
  onRenameCategory,
  onDeleteCategory,
  onSaveItem,
  onDeleteItem,
  onResetMenu,
}: OwnerMenuManagerProps) {
  const [accessEmail, setAccessEmail] = useState('')
  const [accessContact, setAccessContact] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [categoryDraft, setCategoryDraft] = useState('')
  const [itemDraft, setItemDraft] = useState<ItemDraft>(() =>
    createDraft(categories[0] ?? 'Mains'),
  )
  const [statusMessage, setStatusMessage] = useState('')

  const isOwnerVerified =
    accessEmail.trim().toLowerCase() === expectedOwnerEmail &&
    normalizePhone(accessContact) === expectedOwnerContact

  const itemsByCategory = useMemo(
    () =>
      categories.reduce<Record<string, number>>((counts, category) => {
        counts[category] = items.filter((item) => item.category === category).length
        return counts
      }, {}),
    [categories, items],
  )

  const resetItemDraft = () => {
    setItemDraft(createDraft(categories[0] ?? 'Mains'))
  }

  const showStatus = (message: string) => {
    setStatusMessage(message)
    window.setTimeout(() => setStatusMessage(''), 2400)
  }

  const ensureOwnerVerified = () => {
    if (isOwnerVerified) {
      return true
    }

    showStatus('Enter the correct owner email and contact number first.')
    return false
  }

  const handleAddCategory = () => {
    if (!ensureOwnerVerified()) {
      return
    }

    const category = newCategory.trim()

    if (!category) {
      showStatus('Enter a category name.')
      return
    }

    if (categories.includes(category)) {
      showStatus('That category already exists.')
      return
    }

    onAddCategory(category)
    setNewCategory('')
    setItemDraft((currentDraft) => ({ ...currentDraft, category }))
    showStatus('Category added.')
  }

  const handleRenameCategory = () => {
    if (!ensureOwnerVerified() || !editingCategory) {
      return
    }

    const nextCategory = categoryDraft.trim()

    if (!nextCategory) {
      showStatus('Enter a category name.')
      return
    }

    if (nextCategory !== editingCategory && categories.includes(nextCategory)) {
      showStatus('That category already exists.')
      return
    }

    onRenameCategory(editingCategory, nextCategory)
    setEditingCategory(null)
    setCategoryDraft('')
    setItemDraft((currentDraft) =>
      currentDraft.category === editingCategory
        ? { ...currentDraft, category: nextCategory }
        : currentDraft,
    )
    showStatus('Category updated.')
  }

  const handleSubmitItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!ensureOwnerVerified()) {
      return
    }

    const name = itemDraft.name.trim()
    const category = itemDraft.category.trim()
    const description = itemDraft.description.trim()
    const price = Number(itemDraft.price)

    if (!name || !category || !Number.isFinite(price) || price <= 0) {
      showStatus('Name, category, and valid price are required.')
      return
    }

    const item: MenuItem = {
      id: itemDraft.id || `${createSlug(name)}-${Date.now().toString(36)}`,
      name,
      category,
      description,
      price,
      image: itemDraft.image.trim() || fallbackImage,
      available: itemDraft.available,
      tags: itemDraft.tags,
    }

    onSaveItem(item)
    resetItemDraft()
    showStatus(itemDraft.id ? 'Menu item updated.' : 'Menu item added.')
  }

  const toggleTag = (tag: MenuTag) => {
    setItemDraft((currentDraft) => ({
      ...currentDraft,
      tags: currentDraft.tags.includes(tag)
        ? currentDraft.tags.filter((currentTag) => currentTag !== tag)
        : [...currentDraft.tags, tag],
    }))
  }

  return (
    <section
      id="owner"
      className="w-full max-w-full bg-white px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl min-w-0">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-[0.18em] text-red-700 uppercase sm:text-sm sm:tracking-[0.2em]">
              Owner tools
            </p>
            <h2 className="mt-2 text-2xl font-black text-stone-950 sm:text-4xl">
              Manage menu
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              if (!ensureOwnerVerified()) {
                return
              }

              if (window.confirm('Reset the menu to the original sample data?')) {
                onResetMenu()
                resetItemDraft()
                showStatus('Menu reset.')
              }
            }}
            disabled={!isOwnerVerified}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-stone-200 bg-white px-4 text-sm font-bold text-stone-800 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400 sm:w-auto"
          >
            <RefreshCcw className="h-4 w-4" aria-hidden="true" />
            Reset samples
          </button>
        </div>

        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-medium leading-6 text-amber-900">
          Frontend edits are saved in this browser only. For staff on multiple
          devices or public menu updates, connect this screen to a backend,
          spreadsheet, or CMS later.
        </div>

        <div className="mb-6 min-w-0 rounded-lg border border-stone-200 bg-stone-50 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-black text-stone-950">
                Owner verification
              </h3>
              <p className="mt-1 text-sm text-stone-600">
                Enter the owner email and contact number to enable menu saving.
              </p>
            </div>
            <span
              className={`inline-flex h-9 items-center rounded-lg px-3 text-sm font-black ${
                isOwnerVerified
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-stone-200 text-stone-700'
              }`}
            >
              {isOwnerVerified ? 'Verified' : 'Locked'}
            </span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-stone-700">
                Owner email
              </span>
              <input
                type="email"
                value={accessEmail}
                onChange={(event) => setAccessEmail(event.target.value)}
                placeholder="owner@example.com"
                className="mt-1 h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-950 outline-none focus:border-red-600 focus:ring-4 focus:ring-red-100"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-stone-700">
                Contact number
              </span>
              <input
                type="tel"
                value={accessContact}
                onChange={(event) => setAccessContact(event.target.value)}
                placeholder="0713464048"
                className="mt-1 h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-950 outline-none focus:border-red-600 focus:ring-4 focus:ring-red-100"
              />
            </label>
          </div>
        </div>

        {statusMessage && (
          <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
            {statusMessage}
          </div>
        )}

        <div className="grid min-w-0 gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="min-w-0 space-y-6">
            <div className="min-w-0 rounded-lg border border-stone-200 bg-stone-50 p-4">
              <h3 className="text-lg font-black text-stone-950">Categories</h3>
              <div className="mt-4 flex gap-2">
                <label className="min-w-0 flex-1">
                  <span className="sr-only">New category name</span>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(event) => setNewCategory(event.target.value)}
                    placeholder="New category"
                    disabled={!isOwnerVerified}
                    className="h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-950 outline-none focus:border-red-600 focus:ring-4 focus:ring-red-100 disabled:bg-stone-100 disabled:text-stone-400"
                  />
                </label>
                <button
                  type="button"
                  onClick={handleAddCategory}
                  disabled={!isOwnerVerified}
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-stone-950 px-3 text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"
                  aria-label="Add category"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {categories.map((category) => {
                  const itemCount = itemsByCategory[category] ?? 0
                  const isEditing = editingCategory === category

                  return (
                    <div
                      key={category}
                      className="min-w-0 rounded-lg border border-stone-200 bg-white p-3"
                    >
                      {isEditing ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={categoryDraft}
                            onChange={(event) =>
                              setCategoryDraft(event.target.value)
                            }
                            disabled={!isOwnerVerified}
                            className="h-10 min-w-0 flex-1 rounded-lg border border-stone-200 px-3 text-sm outline-none focus:border-red-600 focus:ring-4 focus:ring-red-100 disabled:bg-stone-100 disabled:text-stone-400"
                          />
                          <button
                            type="button"
                            onClick={handleRenameCategory}
                            disabled={!isOwnerVerified}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"
                            aria-label={`Save ${category}`}
                          >
                            <Check className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingCategory(null)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 text-stone-700 transition hover:bg-stone-200"
                            aria-label="Cancel category edit"
                          >
                            <X className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-black text-stone-950">
                              {category}
                            </p>
                            <p className="text-xs font-medium text-stone-500">
                              {itemCount} {itemCount === 1 ? 'item' : 'items'}
                            </p>
                          </div>
                          <div className="flex shrink-0 gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                if (!ensureOwnerVerified()) {
                                  return
                                }

                                setEditingCategory(category)
                                setCategoryDraft(category)
                              }}
                              disabled={!isOwnerVerified}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:text-stone-300"
                              aria-label={`Edit ${category}`}
                            >
                              <Edit3 className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (!ensureOwnerVerified()) {
                                  return
                                }

                                onDeleteCategory(category)
                                showStatus('Category deleted.')
                              }}
                              disabled={
                                !isOwnerVerified ||
                                itemCount > 0 ||
                                categories.length <= 1
                              }
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-stone-600 transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:text-stone-300"
                              aria-label={`Delete ${category}`}
                              title={
                                itemCount > 0
                                  ? 'Remove items from this category first'
                                  : 'Delete category'
                              }
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
            <form
              onSubmit={handleSubmitItem}
              className="min-w-0 rounded-lg border border-stone-200 bg-stone-50 p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-black text-stone-950">
                  {itemDraft.id ? 'Edit item' : 'Add item'}
                </h3>
                {itemDraft.id && (
                  <button
                    type="button"
                    onClick={resetItemDraft}
                    disabled={!isOwnerVerified}
                    className="rounded-lg px-3 py-2 text-sm font-bold text-stone-600 transition hover:bg-stone-200 disabled:cursor-not-allowed disabled:text-stone-300"
                  >
                    Cancel edit
                  </button>
                )}
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-bold text-stone-700">Name</span>
                  <input
                    type="text"
                    value={itemDraft.name}
                    onChange={(event) =>
                      setItemDraft((currentDraft) => ({
                        ...currentDraft,
                        name: event.target.value,
                      }))
                    }
                    disabled={!isOwnerVerified}
                    className="mt-1 h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none focus:border-red-600 focus:ring-4 focus:ring-red-100 disabled:bg-stone-100 disabled:text-stone-400"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-stone-700">
                    Category
                  </span>
                  <select
                    value={itemDraft.category}
                    onChange={(event) =>
                      setItemDraft((currentDraft) => ({
                        ...currentDraft,
                        category: event.target.value,
                      }))
                    }
                    disabled={!isOwnerVerified}
                    className="mt-1 h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none focus:border-red-600 focus:ring-4 focus:ring-red-100 disabled:bg-stone-100 disabled:text-stone-400"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-stone-700">Price</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={itemDraft.price}
                    onChange={(event) =>
                      setItemDraft((currentDraft) => ({
                        ...currentDraft,
                        price: event.target.value,
                      }))
                    }
                    disabled={!isOwnerVerified}
                    className="mt-1 h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none focus:border-red-600 focus:ring-4 focus:ring-red-100 disabled:bg-stone-100 disabled:text-stone-400"
                  />
                </label>

                <label className="flex items-end gap-3 rounded-lg border border-stone-200 bg-white p-3">
                  <input
                    type="checkbox"
                    checked={itemDraft.available}
                    onChange={(event) =>
                      setItemDraft((currentDraft) => ({
                        ...currentDraft,
                        available: event.target.checked,
                      }))
                    }
                    disabled={!isOwnerVerified}
                    className="h-5 w-5 accent-red-700"
                  />
                  <span className="text-sm font-bold text-stone-700">
                    Available today
                  </span>
                </label>
              </div>

              <label className="mt-4 block">
                <span className="text-sm font-bold text-stone-700">
                  Description
                </span>
                <textarea
                  value={itemDraft.description}
                  onChange={(event) =>
                    setItemDraft((currentDraft) => ({
                      ...currentDraft,
                      description: event.target.value,
                    }))
                  }
                  disabled={!isOwnerVerified}
                  rows={4}
                  className="mt-1 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-red-600 focus:ring-4 focus:ring-red-100 disabled:bg-stone-100 disabled:text-stone-400"
                />
              </label>

              <label className="mt-4 block">
                <span className="text-sm font-bold text-stone-700">
                  Image URL
                </span>
                <input
                  type="url"
                  value={itemDraft.image}
                  onChange={(event) =>
                    setItemDraft((currentDraft) => ({
                      ...currentDraft,
                      image: event.target.value,
                    }))
                  }
                  placeholder="https://example.com/food.jpg"
                  disabled={!isOwnerVerified}
                  className="mt-1 h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none focus:border-red-600 focus:ring-4 focus:ring-red-100 disabled:bg-stone-100 disabled:text-stone-400"
                />
              </label>

              <fieldset className="mt-4">
                <legend className="text-sm font-bold text-stone-700">Tags</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tagOptions.map((tag) => {
                    const checked = itemDraft.tags.includes(tag.value)

                    return (
                      <label
                        key={tag.value}
                        className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-bold transition ${
                          checked
                            ? 'border-red-700 bg-red-50 text-red-800'
                            : 'border-stone-200 bg-white text-stone-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleTag(tag.value)}
                          disabled={!isOwnerVerified}
                          className="h-4 w-4 accent-red-700"
                        />
                        {tag.label}
                      </label>
                    )
                  })}
                </div>
              </fieldset>

              <button
                type="submit"
                disabled={!isOwnerVerified}
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-red-700 px-4 text-base font-black text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500 sm:w-auto"
              >
                <Save className="h-5 w-5" aria-hidden="true" />
                Save item
              </button>
            </form>

            <div className="min-w-0 rounded-lg border border-stone-200 bg-white p-4">
              <h3 className="text-lg font-black text-stone-950">
                Current items
              </h3>
              <div className="mt-4 max-h-[680px] space-y-3 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="min-w-0 rounded-lg border border-stone-200 bg-stone-50 p-3"
                  >
                    <div className="flex min-w-0 gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 shrink-0 rounded-lg object-cover"
                        loading="lazy"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-black text-stone-950">
                          {item.name}
                        </p>
                        <p className="text-xs font-bold text-red-700">
                          {item.category}
                        </p>
                        <p className="text-sm font-bold text-stone-700">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (!ensureOwnerVerified()) {
                            return
                          }

                          setItemDraft(draftFromItem(item))
                          document
                            .getElementById('owner')
                            ?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        disabled={!isOwnerVerified}
                        className="inline-flex h-9 items-center gap-2 rounded-lg bg-stone-950 px-3 text-sm font-bold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"
                      >
                        <Edit3 className="h-4 w-4" aria-hidden="true" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!ensureOwnerVerified()) {
                            return
                          }

                          onSaveItem({ ...item, available: !item.available })
                          showStatus('Availability updated.')
                        }}
                        disabled={!isOwnerVerified}
                        className={`inline-flex h-9 items-center rounded-lg px-3 text-sm font-bold transition ${
                          !isOwnerVerified
                            ? 'cursor-not-allowed bg-stone-300 text-stone-500'
                            : item.available
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                        }`}
                      >
                        {item.available ? 'Available' : 'Unavailable'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!ensureOwnerVerified()) {
                            return
                          }

                          if (window.confirm(`Delete ${item.name}?`)) {
                            onDeleteItem(item.id)
                            if (itemDraft.id === item.id) {
                              resetItemDraft()
                            }
                            showStatus('Menu item deleted.')
                          }
                        }}
                        disabled={!isOwnerVerified}
                        className="inline-flex h-9 items-center gap-2 rounded-lg bg-red-50 px-3 text-sm font-bold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
