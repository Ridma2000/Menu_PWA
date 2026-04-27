import type { MenuCategory, MenuItem } from '../types/menu'

export const defaultMenuCategories: MenuCategory[] = [
  'Starters',
  'Soups & Salads',
  'Mains',
  'Pizza',
  'Pasta',
  'Desserts',
  'Drinks',
]

export const defaultMenuItems: MenuItem[] = [
  {
    id: 'garlic-herb-bruschetta',
    name: 'Garlic Herb Bruschetta',
    category: 'Starters',
    description:
      'Toasted sourdough topped with marinated tomatoes, basil, roasted garlic, and extra virgin olive oil.',
    price: 6.5,
    image:
      'https://images.unsplash.com/photo-1572441713132-51c75654db73?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['vegetarian', 'popular'],
  },
  {
    id: 'crispy-calamari',
    name: 'Crispy Calamari',
    category: 'Starters',
    description:
      'Lightly fried calamari with lemon aioli, fresh herbs, and pickled chili.',
    price: 9.75,
    image:
      'https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['popular'],
  },
  {
    id: 'loaded-truffle-fries',
    name: 'Loaded Truffle Fries',
    category: 'Starters',
    description:
      'Golden fries tossed with parmesan, parsley, truffle oil, and a side of house sauce.',
    price: 7.25,
    image:
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['vegetarian'],
  },
  {
    id: 'tomato-basil-soup',
    name: 'Tomato Basil Soup',
    category: 'Soups & Salads',
    description:
      'Slow-simmered tomatoes blended with basil, cream, and cracked black pepper.',
    price: 5.9,
    image:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['vegetarian'],
  },
  {
    id: 'garden-harvest-salad',
    name: 'Garden Harvest Salad',
    category: 'Soups & Salads',
    description:
      'Mixed greens, cherry tomatoes, cucumber, avocado, seeds, and citrus vinaigrette.',
    price: 8.4,
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['vegetarian'],
  },
  {
    id: 'grilled-chicken-caesar',
    name: 'Grilled Chicken Caesar',
    category: 'Soups & Salads',
    description:
      'Romaine lettuce, grilled chicken, parmesan, garlic croutons, and Caesar dressing.',
    price: 10.8,
    image:
      'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['popular'],
  },
  {
    id: 'charcoal-grilled-steak',
    name: 'Charcoal Grilled Steak',
    category: 'Mains',
    description:
      'Tender ribeye with roasted potatoes, seasonal vegetables, and peppercorn jus.',
    price: 24.5,
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['popular'],
  },
  {
    id: 'lemon-butter-salmon',
    name: 'Lemon Butter Salmon',
    category: 'Mains',
    description:
      'Pan-seared salmon with lemon butter, herbed rice, and crisp asparagus.',
    price: 19.9,
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['popular'],
  },
  {
    id: 'spicy-chicken-bowl',
    name: 'Spicy Chicken Bowl',
    category: 'Mains',
    description:
      'Grilled chili chicken, steamed rice, slaw, avocado, and sesame lime dressing.',
    price: 13.5,
    image:
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['spicy', 'popular'],
  },
  {
    id: 'vegetable-green-curry',
    name: 'Vegetable Green Curry',
    category: 'Mains',
    description:
      'Aromatic coconut curry with seasonal vegetables, jasmine rice, and fresh basil.',
    price: 12.9,
    image:
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['spicy', 'vegetarian'],
  },
  {
    id: 'classic-margherita',
    name: 'Classic Margherita',
    category: 'Pizza',
    description:
      'San Marzano tomato, mozzarella, basil, olive oil, and hand-stretched dough.',
    price: 11.75,
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['vegetarian', 'popular'],
  },
  {
    id: 'pepperoni-heatwave',
    name: 'Pepperoni Heatwave',
    category: 'Pizza',
    description:
      'Pepperoni, mozzarella, chili honey, tomato sauce, and oregano on a crisp base.',
    price: 13.4,
    image:
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['spicy', 'popular'],
  },
  {
    id: 'wild-mushroom-pizza',
    name: 'Wild Mushroom Pizza',
    category: 'Pizza',
    description:
      'Roasted mushrooms, garlic cream, mozzarella, thyme, and shaved parmesan.',
    price: 12.8,
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['vegetarian'],
  },
  {
    id: 'creamy-alfredo',
    name: 'Creamy Alfredo',
    category: 'Pasta',
    description:
      'Fettuccine in a parmesan cream sauce with garlic, parsley, and cracked pepper.',
    price: 12.2,
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['vegetarian'],
  },
  {
    id: 'spaghetti-arrabbiata',
    name: 'Spaghetti Arrabbiata',
    category: 'Pasta',
    description:
      'Spaghetti tossed in spicy tomato sauce with garlic, chili flakes, and basil.',
    price: 10.9,
    image:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['spicy', 'vegetarian'],
  },
  {
    id: 'seafood-linguine',
    name: 'Seafood Linguine',
    category: 'Pasta',
    description:
      'Linguine with prawns, calamari, tomato, white wine, garlic, and parsley.',
    price: 16.6,
    image:
      'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=900&q=80',
    available: false,
    tags: ['popular'],
  },
  {
    id: 'chocolate-lava-cake',
    name: 'Chocolate Lava Cake',
    category: 'Desserts',
    description:
      'Warm chocolate cake with a molten center, vanilla cream, and cocoa crumble.',
    price: 7.5,
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['vegetarian', 'popular'],
  },
  {
    id: 'berry-cheesecake',
    name: 'Berry Cheesecake',
    category: 'Desserts',
    description:
      'Creamy baked cheesecake with berry compote, biscuit crust, and mint.',
    price: 6.95,
    image:
      'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['vegetarian'],
  },
  {
    id: 'tiramisu-cup',
    name: 'Tiramisu Cup',
    category: 'Desserts',
    description:
      'Espresso-soaked sponge, mascarpone cream, cocoa, and dark chocolate curls.',
    price: 6.75,
    image:
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['vegetarian'],
  },
  {
    id: 'iced-citrus-tea',
    name: 'Iced Citrus Tea',
    category: 'Drinks',
    description:
      'Fresh brewed black tea with orange, lemon, mint, and a light honey finish.',
    price: 4.25,
    image:
      'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['vegetarian'],
  },
  {
    id: 'mango-lassi',
    name: 'Mango Lassi',
    category: 'Drinks',
    description:
      'Blended mango, yogurt, cardamom, and a chilled creamy finish.',
    price: 4.8,
    image:
      'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['vegetarian', 'popular'],
  },
  {
    id: 'sparkling-lime-soda',
    name: 'Sparkling Lime Soda',
    category: 'Drinks',
    description:
      'House lime cordial, soda, mint, crushed ice, and a salted rim.',
    price: 3.95,
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
    available: true,
    tags: ['vegetarian'],
  },
]
