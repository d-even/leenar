import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import Button from '../ui/Button'
import useWishlist from '../../hooks/useWishlist'
import useCart from '../../hooks/useCart'
import useToast from '../../hooks/useToast'
import { formatPrice } from '../../utils/format'

/** "Wishlist" tab: saved bags with "Move to cart" and "Remove". */
export default function WishlistTab() {
  const { items, removeFromWishlist } = useWishlist()
  const { addItem } = useCart()
  const { showToast } = useToast()

  const moveToCart = (product) => {
    const colour = product.colours[0]
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: colour.images[0],
      colour: colour.name,
      size: product.sizes[0]?.name,
    })
    removeFromWishlist(product.id)
    showToast(`${product.name} moved to your bag`)
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-3xl">
            My <em className="text-ember">Wishlist</em>
          </h2>
          <p className="mt-1 text-sm text-espresso/65">
            {items.length} saved {items.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>
        {items.length > 0 && (
          <Link to="/wishlist" className="text-xs text-ember underline underline-offset-4">
            View as gallery
          </Link>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-2xl bg-malibu-light px-6 py-14 text-center">
          <Heart size={28} strokeWidth={1.25} className="text-ember" aria-hidden="true" />
          <h3 className="mt-4 font-serif text-2xl italic">Nothing saved yet</h3>
          <p className="mt-2 max-w-sm text-sm text-espresso/70">Tap the heart on any bag to keep it here for later.</p>
          <Button to="/shop" className="mt-7">
            Explore the shop
          </Button>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          <AnimatePresence initial={false}>
            {items.map((product) => (
              <motion.li
                key={product.id}
                layout
                exit={{ opacity: 0, x: -30, transition: { duration: 0.25 } }}
                className="flex flex-col gap-4 rounded-2xl border border-espresso/10 bg-white p-4 sm:flex-row sm:items-center sm:p-5"
              >
                <div className="flex flex-1 items-center gap-4">
                  <img
                    src={product.images[0]}
                    alt=""
                    loading="lazy"
                    className="h-24 w-20 shrink-0 rounded-lg bg-malibu object-cover"
                  />
                  <div className="min-w-0">
                    <Link to={`/product/${product.id}`} className="font-serif text-xl italic hover:text-ember">
                      {product.name}
                    </Link>
                    <p className="text-xs text-espresso/60">
                      {product.category} · {product.colours[0].name}
                    </p>
                    <p className="mt-1 font-medium text-ember">{formatPrice(product.price)}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => moveToCart(product)} className="flex-1 sm:flex-none">
                    <ShoppingBag size={14} aria-hidden="true" /> Move to cart
                  </Button>
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(product.id)}
                    className="flex size-10 shrink-0 items-center justify-center rounded-full border border-espresso/15 text-espresso/60 transition-colors hover:border-ember hover:text-ember"
                    aria-label={`Remove ${product.name} from wishlist`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  )
}
