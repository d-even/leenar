import PagePlaceholder from '../components/PagePlaceholder'
import Button from '../components/ui/Button'
import useCart from '../hooks/useCart'
import useToast from '../hooks/useToast'
import aureaImage from '../assets/bag2.avif'
import veronaImage from '../assets/bag17.avif'

/*
 * TEMPORARY (Phase 2): sample items to test the cart drawer before
 * real product data exists. Replaced by the product grid in Phase 3/6.
 */
const SAMPLE_ITEMS = [
  { id: 'aurea', name: 'Aurea', image: aureaImage, colour: 'Whisky', size: 'One size', price: 4890 },
  { id: 'verona', name: 'Verona', image: veronaImage, colour: 'Tan', size: 'Medium', price: 9490 },
]

/** Shop page (/shop). Built in Phase 6. */
export default function Shop() {
  const { addItem, openCart } = useCart()
  const { showToast } = useToast()

  const addSample = (item) => {
    addItem(item)
    showToast(`${item.name} added to your bag`)
    openCart()
  }

  return (
    <PagePlaceholder title="Shop All Bags" subtitle="Every Leenar piece, handcrafted in 100% real leather.">
      <div className="flex flex-wrap justify-center gap-4">
        {SAMPLE_ITEMS.map((item) => (
          <Button key={item.id} variant="outline" onClick={() => addSample(item)}>
            Add sample: {item.name}
          </Button>
        ))}
      </div>
    </PagePlaceholder>
  )
}
