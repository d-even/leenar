import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, Truck, X } from 'lucide-react'
import Button from '../ui/Button'
import useCart from '../../hooks/useCart'
import useToast from '../../hooks/useToast'
import { formatPrice } from '../../utils/format'
import useLockBodyScroll from '../../hooks/useLockBodyScroll'
import useFocusTrap from '../../hooks/useFocusTrap'

const EASE = [0.22, 1, 0.36, 1]

/** One line in the bag: image, details, quantity stepper and remove. */
function CartLine({ line, onNavigate }) {
  const { updateQuantity, removeItem, maxQuantity } = useCart()
  const { key, id, name, image, colour, size, price, quantity } = line
  const details = [colour, size].filter(Boolean).join(' · ')

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40, transition: { duration: 0.25 } }}
      transition={{ duration: 0.35, ease: EASE }}
      className="flex gap-4 py-5"
    >
      <Link
        to={`/product/${id}`}
        onClick={onNavigate}
        className="block h-28 w-22 shrink-0 overflow-hidden rounded-lg bg-malibu"
        tabIndex={-1}
        aria-hidden="true"
      >
        {image && <img src={image} alt="" className="size-full object-cover" loading="lazy" />}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              to={`/product/${id}`}
              onClick={onNavigate}
              className="font-serif text-lg leading-snug italic hover:text-ember"
            >
              {name}
            </Link>
            {details && <p className="mt-0.5 text-xs tracking-wide text-espresso/70">{details}</p>}
          </div>
          <p className="shrink-0 text-sm font-medium text-ember">{formatPrice(price * quantity)}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          {/* Quantity stepper */}
          <div className="flex items-center rounded-full border border-espresso/20" role="group" aria-label={`Quantity of ${name}`}>
            <button
              type="button"
              onClick={() => updateQuantity(key, quantity - 1)}
              disabled={quantity <= 1}
              className="flex size-8 items-center justify-center rounded-full transition-colors hover:text-ember disabled:opacity-30"
              aria-label={`Decrease quantity of ${name}`}
            >
              <Minus size={14} />
            </button>
            <span className="w-7 text-center text-sm tabular-nums" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(key, quantity + 1)}
              disabled={quantity >= maxQuantity}
              className="flex size-8 items-center justify-center rounded-full transition-colors hover:text-ember disabled:opacity-30"
              aria-label={`Increase quantity of ${name}`}
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(key)}
            className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs text-espresso/70 transition-colors hover:text-ember"
            aria-label={`Remove ${name} from bag`}
          >
            <Trash2 size={14} /> Remove
          </button>
        </div>
      </div>
    </motion.li>
  )
}

/** Shown when the bag has nothing in it. */
function EmptyState({ onClose }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-malibu">
        <ShoppingBag size={32} strokeWidth={1.25} className="text-ember" />
      </div>
      <h3 className="mt-6 font-serif text-2xl italic">Your bag is empty</h3>
      <div className="mt-4 h-px w-12 bg-gold" aria-hidden="true" />
      <p className="mt-4 max-w-xs text-sm text-espresso/70">
        Each Leenar bag is cut, stitched and finished by hand. Find the one that's made for you.
      </p>
      <Button to="/shop" onClick={onClose} className="mt-8">
        Shop now
      </Button>
    </div>
  )
}

/**
 * CartDrawer: the shopping bag panel. Slides in from the LEFT.
 * Closes on overlay click, the X button or the Esc key; focus stays inside while open.
 */
export default function CartDrawer() {
  const { items, itemCount, subtotal, isOpen, closeCart } = useCart()
  const { showToast } = useToast()
  const panelRef = useRef(null)

  useLockBodyScroll(isOpen)
  useFocusTrap(panelRef, isOpen, closeCart)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          {/* Dark overlay */}
          <motion.div
            className="absolute inset-0 bg-espresso/55 backdrop-blur-[2px]"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute inset-y-0 left-0 flex w-full max-w-md flex-col bg-malibu-light shadow-lift"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-espresso/10 px-6 py-5">
              <h2 id="cart-title" className="font-serif text-2xl italic">
                Your Bag
                {itemCount > 0 && (
                  <span className="ml-2 font-sans text-sm not-italic text-espresso/70">
                    ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                  </span>
                )}
              </h2>
              <button
                type="button"
                onClick={closeCart}
                className="-mr-2 rounded-full p-2 transition-colors hover:bg-malibu hover:text-ember"
                aria-label="Close bag"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {items.length === 0 ? (
              <EmptyState onClose={closeCart} />
            ) : (
              <>
                {/* Items */}
                <ul className="flex-1 divide-y divide-espresso/10 overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {items.map((line) => (
                      <CartLine key={line.key} line={line} onNavigate={closeCart} />
                    ))}
                  </AnimatePresence>
                </ul>

                {/* Summary */}
                <div className="border-t border-espresso/10 bg-malibu/50 px-6 pt-5 pb-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm tracking-[0.15em] uppercase">Subtotal</span>
                    <span className="font-serif text-2xl text-ember">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-2 flex items-center gap-2 text-xs text-espresso/70">
                    <Truck size={15} className="text-gold" aria-hidden="true" />
                    Free shipping across India. Taxes included.
                  </p>
                  <div className="mt-5 space-y-3">
                    <Button
                      fullWidth
                      size="lg"
                      onClick={() => showToast('Checkout coming soon', { type: 'info' })}
                    >
                      Checkout
                    </Button>
                    <Button fullWidth variant="outline" onClick={closeCart}>
                      Continue shopping
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
