import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import Button from '../components/ui/Button'
import ShopBrowser from '../components/shop/ShopBrowser'
import CollectionCard from '../components/collection/CollectionCard'
import { collections, getCollectionBySlug } from '../data/collections'
import { getProductsByCollection } from '../data/products'

const EASE = [0.22, 1, 0.36, 1]

function CollectionNotFound() {
  return (
    <Container as="section" className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="font-serif text-3xl italic sm:text-4xl">Collection not found</h1>
      <div className="mt-5 h-px w-14 bg-gold" aria-hidden="true" />
      <p className="mt-5 max-w-md text-espresso/75">
        We couldn't find that collection. It may have been renamed. Here are all of our current edits.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Button to="/collection">View all collections</Button>
        <Button to="/shop" variant="outline">
          Shop all bags
        </Button>
      </div>
    </Container>
  )
}

/** Single collection page (/collection/:slug): banner header + that collection's products. */
export default function CollectionDetail() {
  const { slug } = useParams()
  const collection = getCollectionBySlug(slug)
  if (!collection) return <CollectionNotFound />

  const items = getProductsByCollection(slug)
  const position = collections.indexOf(collection)
  const others = collections.filter((other) => other.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Banner */}
      <section className="pt-4 sm:pt-6">
        <Container size="wide">
          <div className="relative isolate flex min-h-[380px] items-end overflow-hidden rounded-3xl bg-espresso text-malibu-light lg:min-h-[460px]">
            <motion.img
              key={collection.image}
              src={collection.image}
              alt=""
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.6, ease: EASE }}
              className="absolute inset-0 -z-20 size-full object-cover object-[50%_40%]"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso via-espresso/55 to-espresso/10 lg:bg-gradient-to-r lg:from-espresso/90 lg:via-espresso/50 lg:to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
              className="w-full p-7 sm:p-10 lg:p-14"
            >
              <nav aria-label="Breadcrumb" className="mb-6 text-xs text-malibu/70">
                <ol className="flex flex-wrap items-center gap-1.5">
                  <li><Link to="/" className="hover:text-gold">Home</Link></li>
                  <li aria-hidden="true"><ChevronRight size={12} /></li>
                  <li><Link to="/collection" className="hover:text-gold">Collections</Link></li>
                  <li aria-hidden="true"><ChevronRight size={12} /></li>
                  <li aria-current="page" className="text-malibu-light">{collection.name}</li>
                </ol>
              </nav>
              <p className="flex items-center gap-3 text-xs tracking-[0.3em] text-gold uppercase">
                <span className="font-serif text-base tracking-normal italic">
                  {String(position + 1).padStart(2, '0')}
                </span>
                <span className="h-px w-8 bg-gold" aria-hidden="true" />
                Collection
              </p>
              <h1 className="mt-4 font-serif text-4xl text-malibu-light italic sm:text-5xl lg:text-6xl">
                {collection.name}
              </h1>
              <p className="mt-4 max-w-lg text-base text-malibu/85 sm:text-lg">{collection.line}</p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Products */}
      <Container as="section" size="wide" className="py-12 lg:py-16" aria-label={`${collection.name} products`}>
        <ShopBrowser key={slug} products={items} />
      </Container>

      {/* Other collections */}
      <section className="border-t border-gold/25 bg-malibu py-20" aria-labelledby="more-collections">
        <Container size="wide">
          <SectionTitle eyebrow="Keep exploring" title={<span id="more-collections">More Collections</span>} />
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {others.map((other) => (
              <CollectionCard
                key={other.slug}
                collection={other}
                index={collections.indexOf(other)}
                size="small"
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
