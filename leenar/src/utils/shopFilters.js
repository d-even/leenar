/**
 * Filtering and sorting for the Shop and Collection grids.
 * Filters live in the URL (?category=Totes,Clutches&colour=Black&price=5-8&sort=price-asc)
 * so a filtered view can be bookmarked or shared.
 */

export const PRICE_RANGES = [
  { id: 'under-5', label: 'Under ₹5,000', min: 0, max: 4999 },
  { id: '5-8', label: '₹5,000 – ₹8,000', min: 5000, max: 8000 },
  { id: '8-11', label: '₹8,000 – ₹11,000', min: 8001, max: 11000 },
  { id: 'over-11', label: 'Above ₹11,000', min: 11001, max: Infinity },
]

export const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'newest', label: 'Newest' },
]

const list = (value) => (value ? value.split(',').filter(Boolean) : [])

/** Reads the filter state from URLSearchParams. */
export function readFilters(params) {
  return {
    categories: list(params.get('category')),
    colours: list(params.get('colour')),
    price: params.get('price') ?? '',
    sort: params.get('sort') ?? 'featured',
  }
}

/** Writes filter state back to URLSearchParams, dropping empty values. */
export function writeFilters({ categories, colours, price, sort }) {
  const params = new URLSearchParams()
  if (categories.length) params.set('category', categories.join(','))
  if (colours.length) params.set('colour', colours.join(','))
  if (price) params.set('price', price)
  if (sort && sort !== 'featured') params.set('sort', sort)
  return params
}

export const countActiveFilters = ({ categories, colours, price }) =>
  categories.length + colours.length + (price ? 1 : 0)

export function filterProducts(products, { categories, colours, price }) {
  const range = PRICE_RANGES.find((item) => item.id === price)
  return products.filter(
    (product) =>
      (!categories.length || categories.includes(product.category)) &&
      (!colours.length || product.colours.some((colour) => colours.includes(colour.name))) &&
      (!range || (product.price >= range.min && product.price <= range.max)),
  )
}

export function sortProducts(products, sort) {
  const sorted = [...products]
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'newest':
      // New arrivals first, otherwise keep catalogue order (Array.sort is stable)
      return sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew))
    default:
      // Featured: bestsellers first, then catalogue order
      return sorted.sort((a, b) => Number(b.isBestseller) - Number(a.isBestseller))
  }
}
