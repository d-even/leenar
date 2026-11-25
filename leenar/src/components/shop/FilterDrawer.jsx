import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import Button from '../ui/Button'
import useLockBodyScroll from '../../hooks/useLockBodyScroll'
import useFocusTrap from '../../hooks/useFocusTrap'

const EASE = [0.22, 1, 0.36, 1]

/** Mobile/tablet filter panel that slides in from the right. */
export default function FilterDrawer({ open, onClose, onClear, resultCount, children }) {
  const panelRef = useRef(null)
  useLockBodyScroll(open)
  useFocusTrap(panelRef, open, onClose)

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <motion.div
            className="absolute inset-0 bg-espresso/55 backdrop-blur-[2px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: EASE }}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-malibu-light shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-espresso/10 px-6 py-5">
              <h2 id="filter-title" className="font-serif text-2xl italic">
                Filters
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="-mr-2 rounded-full p-2 transition-colors hover:bg-malibu hover:text-ember"
                aria-label="Close filters"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
            <div className="grid grid-cols-2 gap-3 border-t border-espresso/10 px-6 py-5">
              <Button variant="outline" onClick={onClear}>
                Clear all
              </Button>
              <Button onClick={onClose}>
                Show {resultCount} {resultCount === 1 ? 'bag' : 'bags'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
