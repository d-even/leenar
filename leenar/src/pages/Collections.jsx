import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import CollectionCard from '../components/collection/CollectionCard'
import { collections } from '../data/collections'
import usePageMeta from '../hooks/usePageMeta'

/**
 * Collections page (/collection): every collection as a large banner card.
 * The first one is full width; the rest sit in pairs.
 */
export default function Collections() {
  usePageMeta('Collections', 'Explore Leenar collections: Everyday Essentials, Evening Elegance, Work & Travel, Mini Treasures and Limited Edition leather bags.')
  const [featured, ...rest] = collections

  return (
    <Container as="section" size="wide" className="py-14 lg:py-20">
      <SectionTitle
        as="h1"
        eyebrow="Curated edits"
        title="Our Collections"
        subtitle="Five edits, each made for a different moment of your day, all handcrafted in 100% real leather."
      />
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <CollectionCard collection={featured} index={0} size="wide" />
        </div>
        {rest.map((collection, index) => (
          <CollectionCard key={collection.slug} collection={collection} index={index + 1} size="tall" />
        ))}
      </div>
    </Container>
  )
}
