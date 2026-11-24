import { useParams } from 'react-router-dom'
import PagePlaceholder from '../components/PagePlaceholder'

/** Single collection page (/collection/:slug). Built in Phase 7. */
export default function CollectionDetail() {
  const { slug } = useParams()
  return <PagePlaceholder title="Collection" subtitle={`Collection: ${slug}`} />
}
