import { motion } from 'framer-motion'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import usePageMeta from '../hooks/usePageMeta'

/** Branded 404 page for any unknown route. */
export default function NotFound() {
  usePageMeta('Page Not Found')
  return (
    <Container as="section" className="flex min-h-[80vh] flex-col items-center justify-center py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        {/* Decorative "404", drawn with CSS so it isn't read as page text */}
        <span
          className="font-serif text-[7rem] leading-none text-ember/20 italic before:content-['404'] sm:text-[10rem]"
          aria-hidden="true"
        />
        <h1 className="-mt-6 font-serif text-3xl italic sm:-mt-10 sm:text-5xl">This page has wandered off</h1>
        <div className="mt-6 flex items-center gap-3" aria-hidden="true">
          <span className="h-px w-14 bg-gold" />
          <span className="size-1.5 rotate-45 bg-gold" />
          <span className="h-px w-14 bg-gold" />
        </div>
        <p className="mt-6 max-w-md text-espresso/75">
          Like a favourite bag left at a café, it isn't where you expected. Let's get you back to something beautiful.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button to="/">Back to Home</Button>
          <Button to="/shop" variant="outline">
            Browse the Shop
          </Button>
        </div>
      </motion.div>
    </Container>
  )
}
