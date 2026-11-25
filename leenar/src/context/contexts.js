import { createContext } from 'react'

/**
 * The raw context objects. Providers live in CartContext.jsx / ToastContext.jsx / WishlistContext.jsx / ProfileContext.jsx,
 * and components read them through the useCart() / useToast() / useWishlist() / useProfile() hooks.
 */
export const CartContext = createContext(null)
export const ToastContext = createContext(null)
export const WishlistContext = createContext(null)
export const ProfileContext = createContext(null)
