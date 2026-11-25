import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../ProductCard'
import Button from '../ui/Button'
import FilterPanel from './FilterPanel'
import FilterDrawer from './FilterDrawer'
import { CATEGORIES } from '../../data/products'
import {
  PRICE_RANGES,
  SORT_OPTIONS,
  countActiveFilters,
  filterProducts,
  readFilters,
  sortProducts,
  writeFilters,
} from '../../utils/shopFilters'

/**
 * ShopBrowser: filters (sidebar on desktop, drawer on mobile), sort, count and the product grid.
 * Used by the Shop page and, in Phase 7, by each collection page.
 *
 * @param {object[]} products  the products this view can show
 */
export default function ShopBrowser({ products }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const filters = readFilters(searchParams)

  const setFilters = (next) => setSearchParams(writeFilters(next), { replace: true, preventScrollReset: true })
  const clearFilters = () => setFilters({ categories: [], colours: [], price: '', sort: filters.sort })

  // Only offer categories / colours that exist in this product set
  const { categories, colours, counts } = useMemo(() => {
    const counts = {}
    const colourMap = new Map()
    products.forEach((product) => {
      counts[product.category] = (counts[product.category] ?? 0) + 1
      product.colours.forEach(({ name, hex }) => colourMap.set(name, { name, hex }))
    })
    return {
      categories: CATEGORIES.filter((category) => counts[category]),
      colours: [...colourMap.values()],
      counts,
    }
  }, [products])

  const results = sortProducts(filterProducts(products, filters), filters.sort)
  const activeCount = countActiveFilters(filters)

  // Removable chips for each active filter
  const chips = [
    ...filters.categories.map((value) => ({
      label: value,
      remove: () => setFilters({ ...filters, categories: filters.categories.filter((v) => v !== value) }),
    })),
    ...filters.colours.map((value) => ({
      label: value,
      remove: () => setFilters({ ...filters, colours: filters.colours.filter((v) => v !== value) }),
    })),
    ...(filters.price
      ? [{ label: PRICE_RANGES.find((r) => r.id === filters.price)?.label, remove: () => setFilters({ ...filters, price: '' }) }]
      : []),
  ]

  const panel = (
    <FilterPanel filters={filters} onChange={setFilters} categories={categories} colours={colours} counts={counts} />
  )

  return (
    <div className="lg:grid lg:grid-cols-[250px_1fr] lg:gap-12 xl:gap-16">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block" aria-label="Product filters">
        <div className="no-scrollbar sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1 pb-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-2xl italic">Filters</h2>
            {activeCount > 0 && (
              <button type="button" onClick={clearFilters} className="text-xs text-ember underline underline-offset-4">
                Clear filters
              </button>
            )}
          </div>
          {panel}
        </div>
      </aside>

      <div>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-espresso/10 pb-5">
          <p className="text-sm text-espresso/70" aria-live="polite">
            Showing <span className="font-medium text-espresso">{results.length}</span> of {products.length}{' '}
            {products.length === 1 ? 'bag' : 'bags'}
          </p>

          <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto sm:items-center">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-espresso/20 px-5 text-xs font-medium tracking-[0.12em] uppercase transition-colors hover:border-ember hover:text-ember lg:hidden"
            >
              <SlidersHorizontal size={16} strokeWidth={1.5} aria-hidden="true" />
              Filters
              {activeCount > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-gold text-[0.65rem] text-espresso">
                  {activeCount}
                </span>
              )}
            </button>

            <label className="relative col-span-1 lg:col-span-2">
              <span className="sr-only">Sort by</span>
              <select
                value={filters.sort}
                onChange={(event) => setFilters({ ...filters, sort: event.target.value })}
                className="h-11 w-full cursor-pointer appearance-none rounded-full border border-espresso/20 bg-transparent pr-10 pl-5 text-xs font-medium tracking-[0.12em] uppercase transition-colors hover:border-ember focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {SORT_OPTIONS.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
                aria-hidden="true"
              />
            </label>
          </div>
        </div>

        {/* Active filter chips */}
        {chips.length > 0 && (
          <ul className="mt-5 flex flex-wrap items-center gap-2" aria-label="Active filters">
            {chips.map(({ label, remove }) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={remove}
                  className="inline-flex items-center gap-1.5 rounded-full bg-malibu px-3 py-1.5 text-xs transition-colors hover:bg-gold/40"
                  aria-label={`Remove filter: ${label}`}
                >
                  {label} <X size={12} aria-hidden="true" />
                </button>
              </li>
            ))}
            <li>
              <button type="button" onClick={clearFilters} className="px-2 text-xs text-ember underline underline-offset-4">
                Clear filters
              </button>
            </li>
          </ul>
        )}

        {/* Grid */}
        {results.length > 0 ? (
          <motion.div
            layout
            className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {results.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35 }}
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-10 flex flex-col items-center rounded-2xl bg-malibu px-6 py-16 text-center">
            <h3 className="font-serif text-2xl italic">No bags match these filters</h3>
            <p className="mt-3 max-w-sm text-sm text-espresso/70">
              Try removing a filter or two. New pieces arrive in small batches, so check back soon.
            </p>
            <Button onClick={clearFilters} className="mt-7">
              Clear filters
            </Button>
          </div>
        )}
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onClear={clearFilters}
        resultCount={results.length}
      >
        {panel}
      </FilterDrawer>
    </div>
  )
}
