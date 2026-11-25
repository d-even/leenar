import { ChevronDown } from 'lucide-react'

const BASE =
  'w-full rounded-xl border bg-white px-4 py-3 text-sm text-espresso placeholder:text-espresso/35 transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold'

/**
 * Labelled input / select / textarea with an inline error message.
 *
 * @param {'input'|'select'|'textarea'} as
 * @param {string} error     shown under the field and announced to screen readers
 * @param {boolean} optional adds "(optional)" to the label
 */
export default function TextField({ id, label, error, optional = false, as = 'input', className = '', children, ...props }) {
  const Tag = as
  const field = (
    <Tag
      id={id}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${BASE} ${as === 'select' ? 'cursor-pointer appearance-none pr-10' : ''} ${
        error ? 'border-ember' : 'border-espresso/15 hover:border-espresso/30'
      }`}
      {...props}
    >
      {children}
    </Tag>
  )

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-xs font-medium tracking-[0.15em] uppercase">
        {label}{' '}
        {optional && <span className="font-normal tracking-normal text-espresso/50 normal-case">(optional)</span>}
      </label>
      {as === 'select' ? (
        <div className="relative">
          {field}
          <ChevronDown
            size={16}
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-espresso/60"
            aria-hidden="true"
          />
        </div>
      ) : (
        field
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-ember" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
