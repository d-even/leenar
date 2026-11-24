import { useContext } from 'react'
import { ToastContext } from '../context/contexts'

/** Access showToast() from any component inside <ToastProvider>. */
export default function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside <ToastProvider>')
  return context
}
