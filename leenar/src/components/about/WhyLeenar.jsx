import { motion } from 'framer-motion'
import { Gem, HandHeart, ShieldCheck } from 'lucide-react'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import tallImage from '../../assets/bag18model.avif'
import wideImage from '../../assets/d382cb92df0ab74063ca79d3c121da87.jpg'

const EASE = [0.22, 1, 0.36, 1]
const tile = (delay) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: EASE },
})

function LightTile({ icon: Icon, title, text, delay }) {
  return (
    <motion.div
      {...tile(delay)}
      className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-malibu to-[#f6dc9a] p-8 text-center"
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-malibu-light text-ember shadow-soft">
        <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-serif text-xl">{title}</h3>
      <p className="mt-2 max-w-xs text-sm text-espresso/70">{text}</p>
    </motion.div>
  )
}

/** "Why Choose Leenar": a bento grid of reasons. */
export default function WhyLeenar() {
  return (
    <section className="pb-20 lg:pb-28" aria-labelledby="why-title">
      <Container size="wide">
        <SectionTitle
          align="left"
          eyebrow="The Leenar difference"
          title={
            <span id="why-title">
              Why Choose <span className="text-ember">Leenar</span>
            </span>
          }
        />

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 lg:grid-rows-[minmax(240px,auto)_minmax(260px,auto)]">
          <LightTile
            icon={ShieldCheck}
            title="100% Real Leather"
            text="Only genuine top-grain and full-grain hides. Never PU, never bonded leather."
            delay={0}
          />
          <LightTile
            icon={HandHeart}
            title="Artisan Expertise"
            text="Made by hands that have crafted for international fashion houses for thirty years."
            delay={0.1}
          />

          {/* Tall dark tile */}
          <motion.div
            {...tile(0.2)}
            className="relative isolate flex min-h-[460px] flex-col justify-between overflow-hidden rounded-2xl bg-espresso p-8 text-malibu-light lg:row-span-2"
          >
            <img src={tallImage} alt="" loading="lazy" className="absolute inset-0 -z-20 size-full object-cover opacity-60" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-espresso/85 via-espresso/40 to-espresso/95" />
            <div className="text-center">
              <Gem size={22} strokeWidth={1.5} className="mx-auto text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-3xl text-malibu-light">
                Made in <em className="text-gold">Small Batches</em>
              </h3>
              <p className="mx-auto mt-3 max-w-xs text-sm text-malibu/80">
                Limited production means every piece gets the time it deserves, and you won't see your bag everywhere.
              </p>
            </div>
            <div>
              <div className="mb-4 h-px w-10 bg-gold" aria-hidden="true" />
              <h4 className="font-sans text-base font-medium text-malibu-light">Care for Life</h4>
              <p className="mt-1 text-sm text-malibu/75">
                Questions about care or a repair? Write to us any time: we look after every bag we make.
              </p>
            </div>
          </motion.div>

          {/* Wide image tile */}
          <motion.div
            {...tile(0.15)}
            className="relative isolate flex min-h-[260px] items-end justify-center overflow-hidden rounded-2xl bg-espresso p-8 text-center text-malibu-light lg:col-span-2"
          >
            <img
              src={wideImage}
              alt=""
              loading="lazy"
              className="absolute inset-0 -z-20 size-full object-cover object-[50%_60%] transition-transform duration-[1.5s] ease-(--ease-luxe) hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-espresso/95 via-espresso/40 to-transparent" />
            <div className="pointer-events-none">
              <h3 className="font-serif text-3xl text-malibu-light">
                Finished Like <em className="text-gold">Couture</em>
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-malibu/80">
                Hand-painted edges, hand-set hardware and an inch-by-inch quality check on every single bag.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
