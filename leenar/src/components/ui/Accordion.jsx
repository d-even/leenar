import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

/**
 * Accordion: a list of expandable sections.
 *
 * @param {{ title: string, content: React.ReactNode }[]} items
 * @param {number} defaultOpen  index open on load (-1 for none)
 * @param {'h2'|'h3'|'h4'} headingAs  heading level for the titles, to keep the page outline in order
 */
export default function Accordion({ items, defaultOpen = 0, headingAs: Heading = 'h3' }) {
  const [open, setOpen] = useState(defaultOpen)
  const baseId = useId()

  return (
    <div className="divide-y divide-espresso/10 border-y border-espresso/10">
      {items.map(({ title, content }, index) => {
        const isOpen = open === index
        const buttonId = `${baseId}-button-${index}`
        const panelId = `${baseId}-panel-${index}`
        return (
          <div key={title}>
            <Heading>
              <button
                id={buttonId}
                type="button"
                onClick={() => setOpen(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-sans text-sm font-medium tracking-[0.15em] uppercase transition-colors hover:text-ember"
              >
                {title}
                <Plus
                  size={18}
                  strokeWidth={1.5}
                  className={`shrink-0 text-ember transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </Heading>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 text-sm leading-relaxed text-espresso/80">{content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
