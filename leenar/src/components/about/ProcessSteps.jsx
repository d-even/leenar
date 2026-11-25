import { motion } from 'framer-motion'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import { PROCESS_STEPS } from '../../data/about'

const EASE = [0.22, 1, 0.36, 1]

/**
 * "How Your Bag Is Made": six numbered cards.
 * On desktop each card is sticky with a growing offset, so they stack up
 * like a deck as you scroll. On phones they're a simple vertical list.
 */
export default function ProcessSteps() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="process-title">
      <Container size="wide">
        <SectionTitle
          align="left"
          eyebrow="From hide to hand"
          title={
            <span id="process-title">
              How Your Bag Is <span className="text-ember">Made</span>
            </span>
          }
          subtitle="Six careful steps, every one of them done by hand in our workshop in India."
        />

        <ol className="space-y-5 lg:space-y-0 lg:pb-16">
          {PROCESS_STEPS.map((step, index) => (
            <li
              key={step.accent}
              className="lg:sticky lg:top-(--stack-top) lg:mb-10"
              style={{ '--stack-top': `${104 + index * 26}px` }}
            >
              <motion.article
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: EASE }}
                className="grid overflow-hidden rounded-2xl border border-espresso/10 bg-white shadow-soft md:grid-cols-2 lg:h-[420px]"
              >
                {/* Text */}
                <div className="flex flex-col p-7 sm:p-10 lg:p-12">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-serif text-6xl leading-none text-gold/35 italic sm:text-7xl" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="rounded-full bg-malibu px-3 py-1 text-[0.65rem] font-medium tracking-[0.15em] text-ember uppercase">
                      {step.detail}
                    </span>
                  </div>
                  <div className="mt-8 lg:mt-auto">
                    <p className="text-xs tracking-[0.2em] text-espresso/50 uppercase">
                      Step {index + 1} of {PROCESS_STEPS.length}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl">
                      {step.title} <em className="text-ember">{step.accent}</em>
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-espresso/75 sm:text-base">{step.text}</p>
                  </div>
                </div>

                {/* Photo */}
                <div className="relative h-64 overflow-hidden bg-malibu sm:h-80 md:h-auto">
                  <img
                    src={step.image}
                    alt={step.alt}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover"
                    style={{ objectPosition: step.position, transform: `scale(${step.zoom})` }}
                  />
                </div>
              </motion.article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
