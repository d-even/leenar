import { useParams } from 'react-router-dom'
import PagePlaceholder from '../components/PagePlaceholder'

/** Product detail page (/product/:id). Built in Phase 6. */
export default function ProductDetail() {
  const { id } = useParams()
  return <PagePlaceholder title="Product Detail" subtitle={`Product: ${id}`} />
}
