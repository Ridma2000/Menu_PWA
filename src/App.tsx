import { useEffect, useMemo, useState } from 'react'
import { CartPanel } from './components/CartPanel'
import { ContactSection } from './components/ContactSection'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ItemDetailsModal } from './components/ItemDetailsModal'
import { MenuCard } from './components/MenuCard'
import { OwnerMenuManager } from './components/OwnerMenuManager'
import { PWAInstallPrompt } from './components/PWAInstallPrompt'
import { SearchFilter } from './components/SearchFilter'
import { restaurantDetails } from './data/restaurant'
import type { CartItem, CategoryFilter, MenuData, MenuItem } from './types/menu'
import {
  createDefaultMenuData,
  loadMenuData,
  saveMenuData,
} from './utils/menuStorage'
import { createWhatsAppOrderUrl } from './utils/order'

function App() {
  const [menuData, setMenuData] = useState<MenuData>(() => loadMenuData())
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>('All')
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const { categories, items } = menuData

  useEffect(() => {
    saveMenuData(menuData)
  }, [menuData])

  useEffect(() => {
    setSelectedCategory((currentCategory) =>
      currentCategory !== 'All' && !categories.includes(currentCategory)
        ? 'All'
        : currentCategory,
    )
  }, [categories])

  useEffect(() => {
    setCart((currentCart) =>
      currentCart.flatMap((cartItem) => {
        const updatedItem = items.find((item) => item.id === cartItem.item.id)

        if (!updatedItem || !updatedItem.available) {
          return []
        }

        return [{ ...cartItem, item: updatedItem }]
      }),
    )

    setSelectedItem((currentItem) => {
      if (!currentItem) {
        return null
      }

      return items.find((item) => item.id === currentItem.id) ?? null
    })
  }, [items])

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()

    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory
      const matchesSearch = item.name.toLowerCase().includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [items, searchQuery, selectedCategory])

  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
        0,
      ),
    [cart],
  )

  const cartCount = useMemo(
    () => cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0),
    [cart],
  )

  const addToCart = (item: MenuItem) => {
    if (!item.available) {
      return
    }

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) => cartItem.item.id === item.id,
      )

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        )
      }

      return [...currentCart, { item, quantity: 1 }]
    })
  }

  const updateQuantity = (itemId: string, nextQuantity: number) => {
    setCart((currentCart) => {
      if (nextQuantity <= 0) {
        return currentCart.filter((cartItem) => cartItem.item.id !== itemId)
      }

      return currentCart.map((cartItem) =>
        cartItem.item.id === itemId
          ? { ...cartItem, quantity: nextQuantity }
          : cartItem,
      )
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((currentCart) =>
      currentCart.filter((cartItem) => cartItem.item.id !== itemId),
    )
  }

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) {
      return
    }

    window.open(
      createWhatsAppOrderUrl(cart, restaurantDetails, cartTotal),
      '_blank',
      'noopener,noreferrer',
    )
  }

  const addCategory = (category: string) => {
    setMenuData((currentData) => ({
      ...currentData,
      categories: [...currentData.categories, category],
    }))
  }

  const renameCategory = (currentCategory: string, nextCategory: string) => {
    setMenuData((currentData) => ({
      categories: currentData.categories.map((category) =>
        category === currentCategory ? nextCategory : category,
      ),
      items: currentData.items.map((item) =>
        item.category === currentCategory
          ? { ...item, category: nextCategory }
          : item,
      ),
    }))
  }

  const deleteCategory = (categoryToDelete: string) => {
    setMenuData((currentData) => ({
      ...currentData,
      categories: currentData.categories.filter(
        (category) => category !== categoryToDelete,
      ),
    }))
  }

  const saveMenuItem = (item: MenuItem) => {
    setMenuData((currentData) => {
      const itemExists = currentData.items.some(
        (currentItem) => currentItem.id === item.id,
      )
      const categories = currentData.categories.includes(item.category)
        ? currentData.categories
        : [...currentData.categories, item.category]

      return {
        categories,
        items: itemExists
          ? currentData.items.map((currentItem) =>
              currentItem.id === item.id ? item : currentItem,
            )
          : [...currentData.items, item],
      }
    })
  }

  const deleteMenuItem = (itemId: string) => {
    setMenuData((currentData) => ({
      ...currentData,
      items: currentData.items.filter((item) => item.id !== itemId),
    }))
  }

  return (
    <>
      <Header cartCount={cartCount} />
      <PWAInstallPrompt />

      <main>
        <Hero />

        <section
          id="menu"
          className="w-full max-w-full bg-[#fffaf3] px-4 py-10 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl min-w-0">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-bold tracking-[0.18em] text-red-700 uppercase sm:text-sm sm:tracking-[0.2em]">
                  Our menu
                </p>
                <h2 className="mt-2 text-2xl font-black text-stone-950 sm:text-4xl">
                  Choose your favorites
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-stone-600 sm:text-right">
                Filter by category, search dishes, and add selected items to
                your cart.
              </p>
            </div>

            <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
              <div className="min-w-0 space-y-5">
                <SearchFilter
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                  categories={categories}
                  resultCount={filteredItems.length}
                  onSearchChange={setSearchQuery}
                  onCategoryChange={setSelectedCategory}
                />

                {filteredItems.length > 0 ? (
                  <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredItems.map((item) => (
                      <MenuCard
                        key={item.id}
                        item={item}
                        onAddToCart={addToCart}
                        onViewDetails={setSelectedItem}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-stone-300 bg-white p-8 text-center">
                    <h3 className="text-lg font-black text-stone-950">
                      No dishes found
                    </h3>
                    <p className="mt-2 text-sm text-stone-500">
                      Try another search term or category.
                    </p>
                  </div>
                )}
              </div>

              <aside className="min-w-0 lg:sticky lg:top-24">
                <CartPanel
                  cart={cart}
                  total={cartTotal}
                  onIncrease={(itemId) => {
                    const cartItem = cart.find(
                      (currentItem) => currentItem.item.id === itemId,
                    )
                    updateQuantity(itemId, (cartItem?.quantity ?? 0) + 1)
                  }}
                  onDecrease={(itemId) => {
                    const cartItem = cart.find(
                      (currentItem) => currentItem.item.id === itemId,
                    )
                    updateQuantity(itemId, (cartItem?.quantity ?? 0) - 1)
                  }}
                  onRemove={removeFromCart}
                  onWhatsAppOrder={handleWhatsAppOrder}
                />
              </aside>
            </div>
          </div>
        </section>

        <OwnerMenuManager
          categories={categories}
          items={items}
          onAddCategory={addCategory}
          onRenameCategory={renameCategory}
          onDeleteCategory={deleteCategory}
          onSaveItem={saveMenuItem}
          onDeleteItem={deleteMenuItem}
          onResetMenu={() => setMenuData(createDefaultMenuData())}
        />

        <ContactSection />
      </main>

      {selectedItem && (
        <ItemDetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={addToCart}
        />
      )}
    </>
  )
}

export default App
