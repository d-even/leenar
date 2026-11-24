import { Star } from 'lucide-react'

/**
 * StarRating: five Gold stars, filled to match `rating` (supports halves and decimals).
 *
 * @param {number} rating  0–5
 * @param {number} size    star size in px
 */
export default function StarRating({ rating, size = 16, className = '' }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} role="img" aria-label={`Rated ${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((index) => {
        // How much of this star is filled: 0–100%
        const fill = Math.max(0, Math.min(1, rating - index)) * 100
        return (
          <span key={index} className="relative inline-flex" aria-hidden="true">
            <Star size={size} strokeWidth={1.5} className="text-gold/40" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill}%` }}>
              <Star size={size} strokeWidth={1.5} className="fill-gold text-gold" />
            </span>
          </span>
        )
      })}
    </div>
  )
}
