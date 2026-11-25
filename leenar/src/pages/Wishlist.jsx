import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import Button from '../components/ui/Button'
import ProductCard from '../components/ProductCard'
import useWishlist from '../hooks/useWishlist'

/**
 * Wishlist page (/wishlist): every bag saved with the heart icon.
 * Tapping a heart again removes the bag; "Add to bag" works as on the shop.
 */
export default function Wishlist() {
  const { items, count } = useWishlist()

  return (
    <Container as="section" size="wide" className="py-16 lg:py-24">
      <SectionTitle
        as="h1"
        eyebrow="Saved for later"
        title="My Wishlist"
        subtitle={
          count > 0
            ? `${count} ${count === 1 ? 'piece' : 'pieces'} you love, waiting for the right moment.`
            : 'Tap the heart on any bag to keep it here.'
        }
      />

      {count === 0 ? (
        <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl bg-malibu px-8 py-14 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-malibu-light text-ember shadow-soft">
            <Heart size={26} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <h2 className="mt-6 font-serif text-2xl italic">Your wishlist is empty</h2>
          <p className="mt-3 text-sm text-espresso/70">
            Explore our handcrafted collection and save the pieces that speak to you.
          </p>
          <Button to="/shop" className="mt-8">
            Explore the shop
          </Button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {items.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </Container>
  )
}
