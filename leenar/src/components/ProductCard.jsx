import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import useCart from '../hooks/useCart'
import useWishlist from '../hooks/useWishlist'
import useToast from '../hooks/useToast'
import { formatPrice } from '../utils/format'

/**
 * ProductCard: the product tile used in grids and rows.
 *
 * - The whole card links to /product/:id (a "stretched" link on the name,
 *   so the heart and quick-add buttons stay separate, valid controls).
 * - Hovering swaps to the second photo when there is one.
 * - Quick add puts the default colour and first size in the bag.
 *
 * @param {object} product  an item from data/products.js
 * @param {number} index    position in the grid, used to stagger the fade-in
 */
export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { showToast } = useToast()

  const { id, name, price, colours, sizes, images, isBestseller, isNew } = product
  const defaultColour = colours[0]
  const [primaryImage, hoverImage] = images
  const saved = isWishlisted(id)

  const handleQuickAdd = () => {
    addItem({
      id,
      name,
      price,
      image: defaultColour.images[0],
      colour: defaultColour.name,
      size: sizes[0]?.name,
    })
    showToast(`${name} added to your bag`)
  }

  const handleWishlist = () => {
    const added = toggleWishlist(id)
    showToast(added ? `${name} saved to your wishlist` : `${name} removed from your wishlist`, {
      type: added ? 'success' : 'info',
    })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-malibu shadow-soft transition-shadow duration-500 group-hover:shadow-lift">
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={`${name} in ${defaultColour.name}`}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 size-full object-cover transition-all duration-700 ease-(--ease-luxe) group-hover:scale-105 ${
              hoverImage ? 'group-hover:opacity-0' : ''
            }`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-serif text-2xl text-ember/40 italic">
            Leenar
          </div>
        )}
        {hoverImage && (
          <img
            src={hoverImage}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full scale-105 object-cover opacity-0 transition-all duration-700 ease-(--ease-luxe) group-hover:scale-100 group-hover:opacity-100"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {isBestseller && (
            <span className="rounded-full bg-gold px-3 py-1 text-[0.65rem] font-semibold tracking-[0.15em] text-espresso uppercase">
              Bestseller
            </span>
          )}
          {isNew && (
            <span className="rounded-full bg-espresso px-3 py-1 text-[0.65rem] font-semibold tracking-[0.15em] text-malibu-light uppercase">
              New
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
          className="absolute top-3 right-3 z-10 flex size-10 items-center justify-center rounded-full bg-malibu-light/90 text-espresso shadow-soft backdrop-blur-sm transition-all hover:scale-110 hover:text-ember"
        >
          <motion.span key={String(saved)} initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="flex">
            <Heart size={18} strokeWidth={1.75} className={saved ? 'fill-ember text-ember' : ''} />
          </motion.span>
        </button>

        {/* Quick add: round icon on touch screens, a full bar that slides up on hover for desktop */}
        <button
          type="button"
          onClick={handleQuickAdd}
          aria-label={`Add ${name} to bag`}
          className="absolute right-3 bottom-3 z-10 flex size-11 items-center justify-center gap-2 rounded-full bg-espresso text-malibu-light shadow-lift transition-all duration-500 ease-(--ease-luxe) hover:bg-ember lg:left-3 lg:size-auto lg:h-11 lg:translate-y-4 lg:opacity-0 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
        >
          <ShoppingBag size={17} strokeWidth={1.75} />
          <span className="hidden text-xs font-medium tracking-[0.15em] uppercase lg:inline">Add to bag</span>
        </button>
      </div>

      {/* Details */}
      <div className="mt-4 flex items-start justify-between gap-3 px-1">
        <div className="min-w-0">
          <h3 className="font-serif text-xl italic">
            {/* Stretched link: its ::after covers the whole card */}
            <Link
              to={`/product/${id}`}
              className="transition-colors after:absolute after:inset-0 after:rounded-xl hover:text-ember"
            >
              {name}
            </Link>
          </h3>
          <div className="mt-1.5 flex items-center gap-2 text-xs text-espresso/65">
            <span className="flex -space-x-1" aria-hidden="true">
              {colours.map((colour) => (
                <span
                  key={colour.name}
                  className="size-3.5 rounded-full border border-malibu-light ring-1 ring-espresso/15"
                  style={{ backgroundColor: colour.hex }}
                />
              ))}
            </span>
            <span>
              {defaultColour.name}
              {colours.length > 1 && ` + ${colours.length - 1} more`}
            </span>
          </div>
        </div>
        <p className="shrink-0 pt-1 font-medium text-ember">{formatPrice(price)}</p>
      </div>
    </motion.article>
  )
}
