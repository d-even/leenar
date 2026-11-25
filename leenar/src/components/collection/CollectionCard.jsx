import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getProductsByCollection } from '../../data/products'

/**
 * Large banner card for one collection: photo, number, name, short line and "Explore".
 * The whole card is a single link to /collection/:slug.
 *
 * @param {'wide'|'tall'|'small'} size  wide = full-width hero card, tall = half-width banner, small = compact row
 */
export default function CollectionCard({ collection, index = 0, size = 'tall' }) {
  const count = getProductsByCollection(collection.slug).length
  const heights = {
    wide: 'min-h-[440px] lg:min-h-[560px]',
    tall: 'min-h-[440px] lg:min-h-[600px]',
    small: 'min-h-[320px]',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link
        to={`/collection/${collection.slug}`}
        className={`group relative isolate flex h-full items-end overflow-hidden rounded-3xl bg-espresso text-malibu-light shadow-soft transition-shadow duration-500 hover:shadow-lift ${heights[size]}`}
      >
        <img
          src={collection.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-20 size-full object-cover object-[50%_40%] transition-transform duration-[1.4s] ease-(--ease-luxe) group-hover:scale-105"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso from-15% via-espresso/75 via-45% to-espresso/0 transition-opacity duration-500 group-hover:opacity-90" />

        <div
          className={`flex w-full flex-col gap-5 p-7 sm:p-9 ${size === 'wide' ? 'lg:flex-row lg:items-end lg:justify-between lg:p-12' : ''}`}
        >
          <div>
            <p className="flex items-center gap-3 text-xs tracking-[0.3em] text-gold uppercase">
              <span className="font-serif text-base tracking-normal italic">{String(index + 1).padStart(2, '0')}</span>
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              {count} {count === 1 ? 'piece' : 'pieces'}
            </p>
            <h2
              className={`mt-3 font-serif text-malibu-light italic ${size === 'small' ? 'text-3xl' : 'text-4xl sm:text-5xl'}`}
            >
              {collection.name}
            </h2>
            <p className="mt-3 max-w-md text-sm text-malibu/85 sm:text-base">{collection.line}</p>
          </div>
          <span
            className={`inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-malibu px-6 py-3 text-xs font-medium tracking-[0.12em] text-espresso uppercase transition-colors group-hover:bg-malibu-light ${size === 'wide' ? 'lg:self-end' : ''}`}
          >
            Explore
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
