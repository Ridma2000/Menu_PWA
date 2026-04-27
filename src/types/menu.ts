export type MenuCategory = string

export type CategoryFilter = MenuCategory | 'All'

export type MenuTag = 'spicy' | 'vegetarian' | 'popular'

export interface MenuItem {
  id: string
  name: string
  category: MenuCategory
  description: string
  price: number
  image: string
  available: boolean
  tags: MenuTag[]
}

export interface CartItem {
  item: MenuItem
  quantity: number
}

export interface MenuData {
  categories: MenuCategory[]
  items: MenuItem[]
}

export interface RestaurantDetails {
  name: string
  phone: string
  whatsapp: string
  address: string
  openingHours: string
}
