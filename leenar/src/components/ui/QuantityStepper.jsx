import { Minus, Plus } from 'lucide-react'

/** − / value / + control. */
export default function QuantityStepper({ value, onChange, min = 1, max = 10, label = 'Quantity', className = '' }) {
  return (
    <div className={`inline-flex h-12 items-center self-start rounded-full border border-espresso/20 ${className}`} role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="flex size-12 items-center justify-center rounded-full transition-colors hover:text-ember disabled:opacity-30"
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <span className="w-8 text-center tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex size-12 items-center justify-center rounded-full transition-colors hover:text-ember disabled:opacity-30"
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  )
}
