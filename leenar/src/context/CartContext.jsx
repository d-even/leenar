import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { CartContext } from './contexts'

/**
 * CartContext: the shopping bag.
 *
 * Each line in the cart is one product in one colour and size, identified by
 * `key` ("id|colour|size"), so the same bag in two colours is two lines.
 *
 * Line shape:
 *   { key, id, name, image, colour, size, price, quantity }
 *
 * The cart is saved to localStorage, so it survives a page refresh.
 * The drawer's open/closed state lives here too, so any component
 * (navbar, product card, product page) can open it.
 */

const STORAGE_KEY = 'leenar-cart'
const MAX_QTY = 10

/** Builds the unique key for a product + colour + size combination. */
const lineKey = ({ id, colour = '', size = '' }) => `${id}|${colour}|${size}`

const clampQty = (qty) => Math.max(1, Math.min(MAX_QTY, Math.round(qty) || 1))

function cartReducer(items, action) {
  switch (action.type) {
    case 'add': {
      const key = lineKey(action.item)
      const existing = items.find((line) => line.key === key)
      if (existing) {
        return items.map((line) =>
          line.key === key ? { ...line, quantity: clampQty(line.quantity + action.quantity) } : line,
        )
      }
      return [...items, { ...action.item, key, quantity: clampQty(action.quantity) }]
    }
    case 'remove':
      return items.filter((line) => line.key !== action.key)
    case 'update':
      return items.map((line) => (line.key === action.key ? { ...line, quantity: clampQty(action.quantity) } : line))
    case 'clear':
      return []
    default:
      return items
  }
}

/** Reads the saved cart, ignoring anything missing or malformed. */
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved.filter((line) => line && line.key && line.price >= 0) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart)
  const [isOpen, setIsOpen] = useState(false)

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage full or blocked: the cart still works for this visit */
    }
  }, [items])

  /** Add a product. `item` needs id, name, image, price, and optionally colour + size. */
  const addItem = useCallback((item, quantity = 1) => dispatch({ type: 'add', item, quantity }), [])
  const removeItem = useCallback((key) => dispatch({ type: 'remove', key }), [])
  const updateQuantity = useCallback((key, quantity) => dispatch({ type: 'update', key, quantity }), [])
  const clearCart = useCallback(() => dispatch({ type: 'clear' }), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, line) => sum + line.quantity, 0)
    const subtotal = items.reduce((sum, line) => sum + line.price * line.quantity, 0)
    return {
      items,
      itemCount,
      subtotal,
      maxQuantity: MAX_QTY,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      openCart,
      closeCart,
    }
  }, [items, isOpen, addItem, removeItem, updateQuantity, clearCart, openCart, closeCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

