import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import StarRating from '../ui/StarRating'
import { reviews } from '../../data/reviews'
import { getProductById } from '../../data/products'

/** One review: stars, quote, customer and the bag they bought. */
function ReviewCard({ review, index }) {
  const product = getProductById(review.productId)
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full flex-col rounded-2xl bg-malibu-light p-7 shadow-soft sm:p-8"
    >
      <span className="absolute top-4 right-6 font-serif text-7xl leading-none text-gold/25" aria-hidden="true">
        &rdquo;
      </span>
      <StarRating rating={review.rating} />
      <blockquote className="mt-5 flex-1 font-serif text-lg leading-relaxed text-espresso/90 italic">
        “{review.text}”
      </blockquote>
      <div className="mt-6 h-px w-10 bg-gold" aria-hidden="true" />
      <figcaption className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="font-medium">{review.name}</p>
          <p className="text-sm text-espresso/60">{review.city}</p>
        </div>
        {product && (
          <Link
            to={`/product/${product.id}`}
            className="text-right text-xs tracking-wide text-ember underline decoration-gold/50 underline-offset-4 hover:decoration-ember"
          >
            Bought: {product.name}
          </Link>
        )}
      </figcaption>
    </motion.figure>
  )
}

/**
 * "Loved by Our Customers": a swipeable carousel on phones,
 * a 2-column grid on tablets and 3 columns on desktop.
 */
export default function Reviews() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  // Work out which card is centred after a swipe
  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    const card = track.firstElementChild
    if (!card) return
    const step = card.getBoundingClientRect().width + 16 // card width + gap
    setActive(Math.round(track.scrollLeft / step))
  }

  const goTo = (index) => {
    const track = trackRef.current
    const card = track?.children[index]
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' })
  }

  return (
    <section className="bg-malibu py-20 lg:py-28" aria-labelledby="reviews-title">
      <Container size="wide">
        <SectionTitle
          eyebrow="Kind words"
          title={<span id="reviews-title">Loved by Our Customers</span>}
          subtitle="Thousands of women across India carry Leenar every day. Here's what a few of them say."
        />

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-3"
          aria-roledescription="carousel"
          aria-label="Customer reviews"
        >
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="w-[85%] shrink-0 snap-center md:w-auto"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${reviews.length}`}
            >
              <ReviewCard review={review} index={index} />
            </div>
          ))}
        </div>

        {/* Carousel controls (phones only) */}
        <div className="mt-8 flex items-center justify-center gap-5 md:hidden">
          <button
            type="button"
            onClick={() => goTo(Math.max(0, active - 1))}
            disabled={active === 0}
            className="flex size-10 items-center justify-center rounded-full border border-espresso/25 transition-colors hover:border-ember hover:text-ember disabled:opacity-30"
            aria-label="Previous review"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {reviews.map((review, index) => (
              <button
                key={review.id}
                type="button"
                onClick={() => goTo(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === active ? 'w-6 bg-ember' : 'w-1.5 bg-espresso/25'
                }`}
                aria-label={`Show review ${index + 1}`}
                aria-current={index === active}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(Math.min(reviews.length - 1, active + 1))}
            disabled={active === reviews.length - 1}
            className="flex size-10 items-center justify-center rounded-full border border-espresso/25 transition-colors hover:border-ember hover:text-ember disabled:opacity-30"
            aria-label="Next review"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </Container>
    </section>
  )
}
