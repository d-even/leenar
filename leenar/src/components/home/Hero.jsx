import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Button from '../ui/Button'
import Container from '../ui/Container'
import heroWide from '../../assets/d382cb92df0ab74063ca79d3c121da87.jpg'
import heroTall from '../../assets/bag19model.avif'

const EASE = [0.22, 1, 0.36, 1]

/** Staggered fade-up for the hero copy. */
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

/**
 * Home hero: full-bleed photo (landscape group shot on desktop, a portrait
 * model shot on phones) with the headline, subline and two calls to action.
 */
export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-espresso text-malibu-light md:items-center">
      {/* Background photo with a slow settle-in zoom */}
      <motion.picture
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
        className="absolute inset-0 -z-20"
      >
        <source media="(max-width: 767px)" srcSet={heroTall} />
        <img
          src={heroWide}
          alt="Leenar leather bags in whisky, tan, mustard and black, arranged on a warm brown backdrop"
          fetchPriority="high"
          className="size-full object-cover object-[50%_60%]"
        />
      </motion.picture>

      {/* Overlays: keep the text readable over any part of the photo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso from-40% via-espresso/85 via-62% to-transparent md:bg-gradient-to-r md:from-espresso/90 md:via-espresso/50 md:to-transparent" />

      <Container size="wide" className="pt-28 pb-20 md:py-32">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.15, delayChildren: 0.4 }}
          className="max-w-xl lg:max-w-3xl"
        >
          <motion.p variants={item} className="flex items-center gap-3 text-xs tracking-[0.3em] text-gold uppercase">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            Handcrafted in India
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 font-serif text-5xl leading-[1.05] text-malibu-light italic sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Crafted by Hand.
            <br />
            <span className="text-malibu">Carried for Life.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-md text-base text-malibu/85 sm:text-lg">
            Thirty years of artisan craft in every stitch. Made from 100% real leather by the same hands that once created
            for the world's finest fashion houses.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <Button to="/shop" variant="light" size="lg">
              Shop Now
            </Button>
            <Button to="/about" variant="outlineLight" size="lg">
              Our Story
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll hint (desktop only) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] tracking-[0.3em] text-malibu/70 uppercase md:flex"
        aria-hidden="true"
      >
        Scroll
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={16} strokeWidth={1.5} />
        </motion.span>
      </motion.div>
    </section>
  )
}
