import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import Container from '../ui/Container'
import { FOUNDERS, FOUNDER_STORY, HOUSES, STATS } from '../../data/about'

const EASE = [0.22, 1, 0.36, 1]
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: EASE },
})

/** Decorative stitched rings, echoing a hand-stitched seam. */
function StitchMark() {
  return (
    <svg viewBox="0 0 100 100" className="size-20 text-gold/80" aria-hidden="true">
      {[44, 34, 24].map((r) => (
        <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="5 4" />
      ))}
      <circle cx="50" cy="50" r="4" fill="currentColor" />
    </svg>
  )
}

/** Founder photo, or a branded placeholder until a real photo is added in data/about.js. */
function FounderPortrait({ founder, className = '' }) {
  return (
    <div
      className={`overflow-hidden rounded-full bg-gradient-to-br from-ember to-espresso shadow-lift ring-8 ring-malibu-light outline outline-1 outline-offset-8 outline-gold/60 ${className}`}
    >
      {founder.image ? (
        <img src={founder.image} alt={`${founder.name}, ${founder.role}`} className="size-full object-cover" loading="lazy" />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-2 text-center text-malibu/80">
          <User size={40} strokeWidth={1} aria-hidden="true" />
          <span className="text-[0.65rem] tracking-[0.25em] uppercase">Founder photo</span>
        </div>
      )}
    </div>
  )
}

/** Row two: "craft in numbers" card + the founders' story card. */
export default function Founders() {
  return (
    <section className="py-6 sm:py-8" aria-labelledby="founders-title">
      <Container size="wide" className="grid gap-4 sm:gap-6 lg:grid-cols-12">
        {/* Numbers card */}
        <motion.div
          {...fadeUp()}
          className="relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-ember via-[#5e2702] to-espresso p-7 text-malibu-light sm:p-9 lg:col-span-4"
        >
          <div className="flex items-start justify-between gap-4">
            <p className="max-w-[9rem] text-[0.7rem] leading-relaxed tracking-[0.25em] text-malibu/75 uppercase">
              Our craft in numbers
            </p>
            <StitchMark />
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-serif text-3xl text-malibu-light sm:text-4xl">{value}</dd>
                <dd className="mt-1 text-xs leading-snug text-malibu/70">{label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Story card */}
        <motion.div
          {...fadeUp(0.12)}
          className="relative grid overflow-hidden rounded-2xl bg-malibu md:grid-cols-5 lg:col-span-8"
        >
          <div className="relative z-10 p-7 sm:p-9 md:col-span-3 lg:p-10">
            <p className="text-xs tracking-[0.25em] text-ember uppercase">The Founders</p>
            <h2 id="founders-title" className="mt-3 font-serif text-3xl sm:text-4xl">
              Meet the <em className="text-ember">Makers</em>
            </h2>
            <div className="mt-4 h-px w-12 bg-gold" aria-hidden="true" />
            {FOUNDER_STORY.map((paragraph) => (
              <p key={paragraph.slice(0, 20)} className="mt-4 text-sm leading-relaxed text-espresso/80 sm:text-[0.95rem]">
                {paragraph}
              </p>
            ))}
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Houses our founders have created for">
              {HOUSES.map((house) => (
                <li key={house} className="text-[0.7rem] font-medium tracking-[0.2em] text-espresso/70 uppercase">
                  {house}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-espresso/10 pt-5">
              {FOUNDERS.map((founder, index) => (
                <p key={index}>
                  <span className="block font-serif text-lg italic">{founder.name}</span>
                  <span className="text-xs text-espresso/70">{founder.role}</span>
                </p>
              ))}
            </div>
          </div>

          {/* Portrait: a large circle bleeding off the edge on desktop, centred on phones */}
          <div className="relative flex items-center justify-center pb-10 md:col-span-2 md:pb-0">
            <FounderPortrait founder={FOUNDERS[0]} className="size-56 md:hidden" />
            <FounderPortrait
              founder={FOUNDERS[0]}
              className="absolute top-1/2 -right-[30%] hidden aspect-square w-[125%] -translate-y-1/2 md:block"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
