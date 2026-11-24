import { createContext } from 'react'

/**
 * The raw context objects. Providers live in CartContext.jsx / ToastContext.jsx,
 * and components read them through the useCart() / useToast() hooks.
 */
export const CartContext = createContext(null)
export const ToastContext = createContext(null)
