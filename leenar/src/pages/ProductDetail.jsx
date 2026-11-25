import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, HandHeart, Heart, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import Button from '../components/ui/Button'
import StarRating from '../components/ui/StarRating'
import Accordion from '../components/ui/Accordion'
import QuantityStepper from '../components/ui/QuantityStepper'
import ProductCard from '../components/ProductCard'
import ProductGallery from '../components/product/ProductGallery'
import useCart from '../hooks/useCart'
import useWishlist from '../hooks/useWishlist'
import useToast from '../hooks/useToast'
import { getProductById, products } from '../data/products'
import { getCollectionBySlug } from '../data/collections'
import { SHIPPING_RETURNS } from '../data/site'
import { formatPrice } from '../utils/format'

const EASE = [0.22, 1, 0.36, 1]

const TRUST_BADGES = [
  { icon: Truck, label: 'Free shipping across India' },
  { icon: ShieldCheck, label: '100% real leather' },
  { icon: HandHeart, label: 'Handcrafted in India' },
  { icon: RotateCcw, label: '7-day easy returns' },
]

/** Up to 4 related products: same collection first, then same category, then the rest. */
function getRelated(product) {
  const score = (other) =>
    (other.collection === product.collection ? 2 : 0) + (other.category === product.category ? 1 : 0)
  return products
    .filter((other) => other.id !== product.id)
    .map((other, index) => ({ other, index, rank: score(other) }))
    .sort((a, b) => b.rank - a.rank || a.index - b.index)
    .slice(0, 4)
    .map(({ other }) => other)
}

/** Shown when the URL doesn't match any product. */
function ProductNotFound() {
  return (
    <Container as="section" className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-serif text-7xl text-ember/20 italic" aria-hidden="true">
        Oh!
      </p>
      <h1 className="mt-2 font-serif text-3xl italic sm:text-4xl">Product not found</h1>
      <div className="mt-5 h-px w-14 bg-gold" aria-hidden="true" />
      <p className="mt-5 max-w-md text-espresso/75">
        This bag may have sold out or moved to a new home in our collection. Let's find you something just as
        beautiful.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Button to="/shop">Browse all bags</Button>
        <Button to="/collection" variant="outline">
          View collections
        </Button>
      </div>
    </Container>
  )
}

/** The product page itself. Keyed by product id so state resets between products. */
function ProductView({ product }) {
  const { addItem, openCart, maxQuantity } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { showToast } = useToast()

  // Every photo, tagged with the colour it belongs to
  const gallery = product.colours.flatMap((colour, colourIndex) =>
    colour.images.map((src, n) => ({
      src,
      colourIndex,
      alt: `${product.name} in ${colour.name}${colour.images.length > 1 ? `, view ${n + 1}` : ''}`,
    })),
  )

  const [colourIndex, setColourIndex] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)
  const [sizeIndex, setSizeIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const colour = product.colours[colourIndex]
  const size = product.sizes[sizeIndex]
  const saved = isWishlisted(product.id)
  const collection = getCollectionBySlug(product.collection)
  const related = getRelated(product)

  const selectColour = (index) => {
    setColourIndex(index)
    setImageIndex(gallery.findIndex((image) => image.colourIndex === index))
  }

  const selectImage = (index) => {
    setImageIndex(index)
    setColourIndex(gallery[index].colourIndex)
  }

  const addToBag = () => {
    addItem(
      { id: product.id, name: product.name, price: product.price, image: colour.images[0], colour: colour.name, size: size.name },
      quantity,
    )
  }

  const handleAddToCart = () => {
    addToBag()
    openCart()
  }

  const handleBuyNow = () => {
    addToBag()
    openCart()
    showToast('Added to your bag. Checkout is coming soon.', { type: 'info' })
  }

  const handleWishlist = () => {
    const added = toggleWishlist(product.id)
    showToast(added ? `${product.name} saved to your wishlist` : `${product.name} removed from your wishlist`, {
      type: added ? 'success' : 'info',
    })
  }

  const accordion = [
    { title: 'Description', content: <p>{product.description}</p> },
    {
      title: 'Material & Care',
      content: (
        <>
          <p>
            <span className="font-medium text-espresso">Material: </span>
            {product.material}
          </p>
          <p className="mt-3">
            <span className="font-medium text-espresso">Care: </span>
            {product.care}
          </p>
        </>
      ),
    },
    {
      title: 'Dimensions',
      content: (
        <table className="w-full text-left">
          <caption className="sr-only">Sizes and dimensions</caption>
          <thead>
            <tr className="text-xs tracking-[0.15em] text-espresso/55 uppercase">
              <th scope="col" className="pb-2 font-medium">Size</th>
              <th scope="col" className="pb-2 font-medium">W × H × D</th>
            </tr>
          </thead>
          <tbody>
            {product.sizes.map((item) => (
              <tr key={item.name} className="border-t border-espresso/10">
                <td className="py-2.5">{item.name}</td>
                <td className="py-2.5">{item.dimensions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
    {
      title: 'Shipping & Returns',
      content: (
        <ul className="list-disc space-y-2 pl-5 marker:text-gold">
          {SHIPPING_RETURNS.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ),
    },
  ]

  return (
    <>
      <Container size="wide" className="pt-8 pb-20 lg:pt-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs tracking-wide text-espresso/60">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link to="/" className="hover:text-ember">Home</Link></li>
            <li aria-hidden="true"><ChevronRight size={12} /></li>
            <li><Link to="/shop" className="hover:text-ember">Shop</Link></li>
            <li aria-hidden="true"><ChevronRight size={12} /></li>
            <li aria-current="page" className="text-espresso">{product.name}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <ProductGallery images={gallery} activeIndex={imageIndex} onSelect={selectImage} />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs tracking-[0.25em] text-ember uppercase">{product.category}</span>
              {collection && (
                <>
                  <span className="text-gold" aria-hidden="true">·</span>
                  <Link
                    to={`/collection/${collection.slug}`}
                    className="text-xs tracking-[0.25em] text-espresso/60 uppercase hover:text-ember"
                  >
                    {collection.name}
                  </Link>
                </>
              )}
              {product.isBestseller && (
                <span className="ml-1 rounded-full bg-gold px-2.5 py-0.5 text-[0.6rem] font-semibold tracking-[0.15em] text-espresso uppercase">
                  Bestseller
                </span>
              )}
              {product.isNew && (
                <span className="ml-1 rounded-full bg-espresso px-2.5 py-0.5 text-[0.6rem] font-semibold tracking-[0.15em] text-malibu-light uppercase">
                  New
                </span>
              )}
            </div>

            <div className="mt-3 flex items-start justify-between gap-4">
              <h1 className="font-serif text-4xl italic sm:text-5xl">{product.name}</h1>
              <button
                type="button"
                onClick={handleWishlist}
                aria-pressed={saved}
                aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
                className="mt-1 flex size-12 shrink-0 items-center justify-center rounded-full border border-espresso/15 transition-all hover:scale-105 hover:border-ember hover:text-ember"
              >
                <Heart size={20} strokeWidth={1.5} className={saved ? 'fill-ember text-ember' : ''} />
              </button>
            </div>

            <div className="mt-3 flex items-center gap-3 text-sm text-espresso/70">
              <StarRating rating={product.rating} />
              <span>
                {product.rating} · {product.reviewsCount} reviews
              </span>
            </div>

            <p className="mt-6 font-serif text-3xl text-ember">{formatPrice(product.price)}</p>
            <p className="mt-1 text-xs text-espresso/55">Inclusive of all taxes · Free shipping across India</p>

            <div className="mt-6 h-px w-14 bg-gold" aria-hidden="true" />
            <p className="mt-6 max-w-xl leading-relaxed text-espresso/80">{product.description}</p>

            {/* Colour */}
            <fieldset className="mt-8">
              <legend className="text-xs font-medium tracking-[0.2em] uppercase">
                Colour: <span className="font-normal tracking-normal text-espresso/70 normal-case">{colour.name}</span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.colours.map((option, index) => (
                  <button
                    key={option.name}
                    type="button"
                    onClick={() => selectColour(index)}
                    aria-pressed={index === colourIndex}
                    aria-label={option.name}
                    title={option.name}
                    className={`size-10 rounded-full border-[3px] border-malibu-light ring-1 transition-all ${
                      index === colourIndex ? 'scale-110 ring-2 ring-ember' : 'ring-espresso/20 hover:ring-ember/60'
                    }`}
                    style={{ backgroundColor: option.hex }}
                  />
                ))}
              </div>
            </fieldset>

            {/* Size */}
            <fieldset className="mt-8">
              <legend className="text-xs font-medium tracking-[0.2em] uppercase">
                Size: <span className="font-normal tracking-normal text-espresso/70 normal-case">{size.name}</span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.sizes.map((option, index) => (
                  <button
                    key={option.name}
                    type="button"
                    onClick={() => setSizeIndex(index)}
                    aria-pressed={index === sizeIndex}
                    className={`rounded-xl border px-5 py-3 text-left transition-colors ${
                      index === sizeIndex
                        ? 'border-espresso bg-espresso text-malibu-light'
                        : 'border-espresso/20 hover:border-ember hover:text-ember'
                    }`}
                  >
                    <span className="block text-sm font-medium">{option.name}</span>
                    <span className={`block text-xs ${index === sizeIndex ? 'text-malibu/75' : 'text-espresso/55'}`}>
                      {option.dimensions}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Quantity + actions */}
            <div className="mt-8">
              <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase">
                Quantity
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <QuantityStepper value={quantity} onChange={setQuantity} max={maxQuantity} label="Quantity" />
                <Button size="lg" onClick={handleAddToCart} className="sm:flex-1">
                  Add to Cart · {formatPrice(product.price * quantity)}
                </Button>
              </div>
              <Button size="lg" variant="outline" fullWidth onClick={handleBuyNow} className="mt-3">
                Buy Now
              </Button>
            </div>

            {/* Trust badges */}
            <ul className="mt-8 grid grid-cols-2 gap-3">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 rounded-xl bg-malibu px-4 py-3 text-xs">
                  <Icon size={18} strokeWidth={1.5} className="shrink-0 text-ember" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Accordion items={accordion} defaultOpen={-1} />
            </div>
          </motion.div>
        </div>
      </Container>

      {/* You may also like */}
      <section className="border-t border-gold/25 bg-malibu py-20" aria-labelledby="related-title">
        <Container size="wide">
          <SectionTitle eyebrow="Complete the look" title={<span id="related-title">You May Also Like</span>} />
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {related.map((item, index) => (
              <ProductCard key={item.id} product={item} index={index} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

/** Product detail page (/product/:id). */
export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)
  if (!product) return <ProductNotFound />
  return <ProductView key={product.id} product={product} />
}
