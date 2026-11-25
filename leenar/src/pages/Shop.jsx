import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import ShopBrowser from '../components/shop/ShopBrowser'
import { products } from '../data/products'

/** Shop page (/shop): every product with filters and sorting. */
export default function Shop() {
  return (
    <>
      <header className="border-b border-gold/25 bg-malibu">
        <Container size="wide" className="pt-14 pb-4 lg:pt-20">
          <SectionTitle
            as="h1"
            eyebrow="The Collection"
            title="Shop All Bags"
            subtitle="Every Leenar piece, cut, stitched and finished by hand in 100% real leather."
          />
        </Container>
      </header>
      <Container as="section" size="wide" className="py-12 lg:py-16" aria-label="Products">
        <ShopBrowser products={products} />
      </Container>
    </>
  )
}
