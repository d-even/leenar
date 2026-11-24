import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

/**
 * Shop page (/shop).
 * TEMPORARY (Phase 3): a plain grid of every product to test ProductCard.
 * Filters, sorting and the full layout arrive in Phase 6.
 */
export default function Shop() {
  return (
    <Container as="section" size="wide" className="py-16 lg:py-24">
      <SectionTitle
        as="h1"
        eyebrow="Leenar"
        title="Shop All Bags"
        subtitle="Every Leenar piece, handcrafted in 100% real leather."
      />
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </Container>
  )
}
