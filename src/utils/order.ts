import type { CartItem, RestaurantDetails } from '../types/menu'
import { formatCurrency } from './currency'

export const formatOrderMessage = (
  cart: CartItem[],
  details: RestaurantDetails,
  total: number,
) => {
  const lines = cart.map(
    ({ item, quantity }, index) =>
      `${index + 1}. ${item.name} x ${quantity} - ${formatCurrency(
        item.price * quantity,
      )}`,
  )

  return [
    `Hello ${details.name},`,
    'I would like to place an order:',
    '',
    ...lines,
    '',
    `Total: ${formatCurrency(total)}`,
    '',
    'Customer name:',
    'Pickup or delivery:',
    'Notes:',
  ].join('\n')
}

export const createWhatsAppOrderUrl = (
  cart: CartItem[],
  details: RestaurantDetails,
  total: number,
) => {
  const phoneNumber = details.whatsapp.replace(/\D/g, '')
  const message = encodeURIComponent(formatOrderMessage(cart, details, total))

  return phoneNumber
    ? `https://wa.me/${phoneNumber}?text=${message}`
    : `https://wa.me/?text=${message}`
}
