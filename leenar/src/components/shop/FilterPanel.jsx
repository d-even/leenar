import { useId } from 'react'
import { Check } from 'lucide-react'
import { PRICE_RANGES } from '../../utils/shopFilters'

/** A titled group inside the filter panel. */
function FilterGroup({ title, children }) {
  const titleId = useId()
  return (
    <div role="group" aria-labelledby={titleId} className="border-b border-espresso/10 py-6 first:pt-0 last:border-b-0">
      <p id={titleId} className="mb-4 text-xs font-medium tracking-[0.2em] text-espresso uppercase">
        {title}
      </p>
      {children}
    </div>
  )
}

const toggle = (values, value) => (values.includes(value) ? values.filter((v) => v !== value) : [...values, value])

/**
 * Category, colour and price filters. Used in the desktop sidebar and the mobile drawer.
 *
 * @param {object}   filters     { categories, colours, price, sort }
 * @param {function} onChange    receives the updated filters object
 * @param {string[]} categories  categories to offer
 * @param {{name,hex}[]} colours colours to offer
 * @param {object}   counts      { [category]: number } for the current product set
 */
export default function FilterPanel({ filters, onChange, categories, colours, counts }) {
  // The panel renders twice (sidebar + drawer), so each copy needs its own radio group name
  const priceGroup = useId()

  return (
    <div>
      <FilterGroup title="Category">
        <ul className="space-y-1">
          {categories.map((category) => {
            const checked = filters.categories.includes(category)
            return (
              <li key={category}>
                <label className="group flex cursor-pointer items-center gap-3 py-1.5 text-sm">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={checked}
                    onChange={() => onChange({ ...filters, categories: toggle(filters.categories, category) })}
                  />
                  <span
                    className={`flex size-5 items-center justify-center rounded border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold ${
                      checked ? 'border-espresso bg-espresso text-malibu-light' : 'border-espresso/30 group-hover:border-ember'
                    }`}
                    aria-hidden="true"
                  >
                    {checked && <Check size={13} strokeWidth={2.5} />}
                  </span>
                  <span className={`flex-1 ${checked ? 'font-medium' : 'text-espresso/80 group-hover:text-ember'}`}>
                    {category}
                  </span>
                  <span className="text-xs text-espresso/45">{counts[category] ?? 0}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </FilterGroup>

      <FilterGroup title="Colour">
        <ul className="grid grid-cols-5 gap-3 sm:grid-cols-6 lg:grid-cols-4">
          {colours.map(({ name, hex }) => {
            const checked = filters.colours.includes(name)
            return (
              <li key={name}>
                <label className="flex cursor-pointer flex-col items-center gap-1.5" title={name}>
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={checked}
                    onChange={() => onChange({ ...filters, colours: toggle(filters.colours, name) })}
                  />
                  <span
                    className={`flex size-8 items-center justify-center rounded-full border-2 border-malibu-light ring-1 transition-all peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold ${
                      checked ? 'scale-110 ring-2 ring-ember' : 'ring-espresso/20 hover:ring-ember/60'
                    }`}
                    style={{ backgroundColor: hex }}
                    aria-hidden="true"
                  >
                    {checked && <Check size={14} strokeWidth={2.5} className="text-white mix-blend-difference" />}
                  </span>
                  <span className="text-center text-[0.65rem] leading-tight text-espresso/70">{name}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </FilterGroup>

      <FilterGroup title="Price">
        <ul className="space-y-1">
          {[{ id: '', label: 'Any price' }, ...PRICE_RANGES].map(({ id, label }) => {
            const checked = filters.price === id
            return (
              <li key={id || 'any'}>
                <label className="group flex cursor-pointer items-center gap-3 py-1.5 text-sm">
                  <input
                    type="radio"
                    name={priceGroup}
                    className="peer sr-only"
                    checked={checked}
                    onChange={() => onChange({ ...filters, price: id })}
                  />
                  <span
                    className={`flex size-5 items-center justify-center rounded-full border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold ${
                      checked ? 'border-espresso' : 'border-espresso/30 group-hover:border-ember'
                    }`}
                    aria-hidden="true"
                  >
                    {checked && <span className="size-2.5 rounded-full bg-espresso" />}
                  </span>
                  <span className={checked ? 'font-medium' : 'text-espresso/80 group-hover:text-ember'}>{label}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </FilterGroup>
    </div>
  )
}
