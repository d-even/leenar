import { useContext } from 'react'
import { CartContext } from '../context/contexts'

/** Access the cart from any component inside <CartProvider>. */
export default function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside <CartProvider>')
  return context
}
