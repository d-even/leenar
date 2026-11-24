import { motion } from 'framer-motion'

/**
 * SectionTitle: italic serif heading, a thin Gold divider and an optional subtitle.
 * Fades up into view the first time it scrolls on screen.
 *
 * @param {string} eyebrow   small uppercase label above the title (optional)
 * @param {string} title
 * @param {string} subtitle  optional supporting line
 * @param {'center'|'left'} align
 * @param {'h1'|'h2'|'h3'} as  heading level, so each page keeps a correct outline
 * @param {boolean} light    use light text for dark backgrounds
 */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  as: Heading = 'h2',
  light = false,
  className = '',
}) {
  const centered = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-10 flex flex-col md:mb-14 ${centered ? 'items-center text-center' : 'items-start text-left'} ${className}`}
    >
      {eyebrow && (
        <p className={`mb-3 text-xs font-medium tracking-[0.25em] uppercase ${light ? 'text-gold' : 'text-ember'}`}>
          {eyebrow}
        </p>
      )}

      <Heading
        className={`font-serif text-3xl italic sm:text-4xl lg:text-5xl ${light ? 'text-malibu-light' : 'text-espresso'}`}
      >
        {title}
      </Heading>

      {/* Thin Gold divider with a small diamond in the middle */}
      <div className="mt-5 flex items-center gap-3" aria-hidden="true">
        <span className="h-px w-10 bg-gold sm:w-14" />
        <span className="size-1.5 rotate-45 bg-gold" />
        <span className="h-px w-10 bg-gold sm:w-14" />
      </div>

      {subtitle && (
        <p
          className={`mt-5 max-w-2xl text-base sm:text-lg ${light ? 'text-malibu/85' : 'text-espresso/75'}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
