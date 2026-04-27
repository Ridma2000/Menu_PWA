import { defaultMenuCategories, defaultMenuItems } from '../data/menu'
import type { MenuData, MenuItem, MenuTag } from '../types/menu'

const MENU_STORAGE_KEY = 'restaurant-menu-data-v1'
const validTags: MenuTag[] = ['spicy', 'vegetarian', 'popular']

export const createDefaultMenuData = (): MenuData => ({
  categories: [...defaultMenuCategories],
  items: defaultMenuItems.map((item) => ({
    ...item,
    tags: [...item.tags],
  })),
})

const isPlainRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const normalizeMenuItem = (
  value: unknown,
  categories: string[],
): MenuItem | null => {
  if (!isPlainRecord(value)) {
    return null
  }

  const id = typeof value.id === 'string' ? value.id.trim() : ''
  const name = typeof value.name === 'string' ? value.name.trim() : ''
  const category =
    typeof value.category === 'string' ? value.category.trim() : ''
  const description =
    typeof value.description === 'string' ? value.description.trim() : ''
  const image = typeof value.image === 'string' ? value.image.trim() : ''
  const price = typeof value.price === 'number' ? value.price : Number.NaN
  const tags = Array.isArray(value.tags)
    ? value.tags.filter((tag): tag is MenuTag =>
        validTags.includes(tag as MenuTag),
      )
    : []

  if (!id || !name || !category || !Number.isFinite(price)) {
    return null
  }

  return {
    id,
    name,
    category: categories.includes(category) ? category : categories[0],
    description,
    price,
    image,
    available:
      typeof value.available === 'boolean' ? value.available : Boolean(value.available),
    tags,
  }
}

const normalizeMenuData = (value: unknown): MenuData | null => {
  if (!isPlainRecord(value) || !Array.isArray(value.categories)) {
    return null
  }

  const categories = Array.from(
    new Set(
      value.categories
        .filter((category): category is string => typeof category === 'string')
        .map((category) => category.trim())
        .filter(Boolean),
    ),
  )

  if (categories.length === 0 || !Array.isArray(value.items)) {
    return null
  }

  const items = value.items
    .map((item) => normalizeMenuItem(item, categories))
    .filter((item): item is MenuItem => item !== null)

  return { categories, items }
}

export const loadMenuData = (): MenuData => {
  if (typeof window === 'undefined') {
    return createDefaultMenuData()
  }

  try {
    const rawData = window.localStorage.getItem(MENU_STORAGE_KEY)
    const parsedData = rawData ? normalizeMenuData(JSON.parse(rawData)) : null

    return parsedData ?? createDefaultMenuData()
  } catch {
    return createDefaultMenuData()
  }
}

export const saveMenuData = (menuData: MenuData) => {
  window.localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menuData))
}
