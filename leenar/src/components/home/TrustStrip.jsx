import { Gem, HandHeart, ShieldCheck } from 'lucide-react'
import Container from '../ui/Container'

const POINTS = [
  { icon: ShieldCheck, label: '100% Real Leather' },
  { icon: HandHeart, label: 'Handcrafted by Artisans' },
  { icon: Gem, label: 'Limited Production' },
]

/** Slim band of brand promises, placed between Home sections. */
export default function TrustStrip() {
  return (
    <section aria-label="Our promise" className="border-y border-gold/30 bg-malibu">
      <Container size="wide">
        <ul className="grid grid-cols-1 divide-y divide-gold/25 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {POINTS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center justify-center gap-3 py-4 text-xs font-medium tracking-[0.2em] text-espresso uppercase sm:py-5"
            >
              <Icon size={18} strokeWidth={1.5} className="shrink-0 text-ember" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
