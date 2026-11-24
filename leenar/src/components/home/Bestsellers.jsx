import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'
import ProductCard from '../ProductCard'
import { getBestsellers } from '../../data/products'

/** "Our Bestsellers": the first four products marked isBestseller. */
export default function Bestsellers() {
  const bestsellers = getBestsellers().slice(0, 4)

  return (
    <section className="py-20 lg:py-28" aria-labelledby="bestsellers-title">
      <Container size="wide">
        <SectionTitle
          eyebrow="Most loved"
          title={<span id="bestsellers-title">Our Bestsellers</span>}
          subtitle="The pieces our customers return to again and again, each one cut and stitched by hand."
        />

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {bestsellers.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button to="/shop" variant="outline">
            View all bags <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  )
}
