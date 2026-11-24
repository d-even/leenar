import { useCallback, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CircleCheck, Info, X } from 'lucide-react'
import { ToastContext } from './contexts'

/**
 * ToastContext: small notifications that slide up from the bottom of the screen.
 *
 * Usage:
 *   const { showToast } = useToast()
 *   showToast('Added to your bag')
 *   showToast('Checkout coming soon', { type: 'info' })
 */

const DURATION = 3200

const ICONS = {
  success: CircleCheck,
  info: Info,
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const nextId = useRef(0)

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (message, { type = 'success', duration = DURATION } = {}) => {
      const id = ++nextId.current
      // Keep at most 3 on screen at once
      setToasts((current) => [...current.slice(-2), { id, message, type }])
      window.setTimeout(() => dismissToast(id), duration)
    },
    [dismissToast],
  )

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast])

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Screen readers announce new toasts politely */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex flex-col items-center gap-2 px-4 sm:bottom-6"
      >
        <AnimatePresence initial={false}>
          {toasts.map(({ id, message, type }) => {
            const Icon = ICONS[type] ?? Info
            return (
              <motion.div
                key={id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                role="status"
                className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl border border-gold/30 bg-espresso px-4 py-3 text-sm text-malibu-light shadow-lift"
              >
                <Icon size={18} className="shrink-0 text-gold" aria-hidden="true" />
                <p className="flex-1">{message}</p>
                <button
                  type="button"
                  onClick={() => dismissToast(id)}
                  className="rounded-full p-1 text-malibu/70 transition-colors hover:text-malibu-light"
                  aria-label="Dismiss notification"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

