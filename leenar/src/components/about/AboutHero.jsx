import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container'
import Button from '../ui/Button'
import heroA from '../../assets/bag19model.avif'
import heroB from '../../assets/bag14model.avif'
import heroC from '../../assets/bag8model.avif'

const EASE = [0.22, 1, 0.36, 1]
const PANELS = [
  { src: heroA, alt: 'A woman holding the cognac Lucca bowling bag' },
  { src: heroB, alt: 'The black woven Kaia tote carried on the shoulder' },
  { src: heroC, alt: 'The black Isla clutch held at the waist' },
]

/**
 * About hero: a rounded, inset photo card (three model shots side by side on
 * larger screens, one on phones). Headline bottom-left, intro + button bottom-right.
 */
export default function AboutHero() {
  return (
    <section className="pt-4 sm:pt-6">
      <Container size="wide">
        <div className="relative isolate flex min-h-[600px] items-end overflow-hidden rounded-3xl bg-espresso text-malibu-light lg:h-[78vh] lg:max-h-[760px]">
          {/* Photo panels */}
          <div className="absolute inset-0 -z-20 grid grid-cols-1 md:grid-cols-3">
            {PANELS.map(({ src, alt }, index) => (
              <motion.img
                key={src}
                src={src}
                alt={alt}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.6, delay: index * 0.15, ease: EASE }}
                className={`size-full object-cover object-[50%_40%] ${index > 0 ? 'hidden md:block' : ''}`}
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
            ))}
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso from-40% via-espresso/85 via-62% to-espresso/10 lg:from-15% lg:via-espresso/60 lg:via-50%" />

          <div className="grid w-full gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:items-end lg:p-14">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
              className="lg:col-span-7"
            >
              <p className="flex items-center gap-3 text-xs tracking-[0.3em] text-gold uppercase">
                <span className="h-px w-8 bg-gold" aria-hidden="true" />
                Our Story
              </p>
              <h1 className="mt-5 font-serif text-4xl leading-[1.08] text-malibu-light sm:text-5xl lg:text-6xl">
                Thirty Years of <em className="text-gold">Craft</em>
                <br className="hidden sm:block" /> In Every Leenar Bag
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
              className="lg:col-span-5 lg:pb-2"
            >
              <p className="max-w-md text-base text-malibu/85">
                Leenar is the label of a family of master artisans who spent three decades creating for the world's
                leading fashion houses. Now every stitch carries our own name.
              </p>
              <Button to="/shop" variant="light" className="mt-6">
                Shop the collection <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
