import Container from './ui/Container'
import SectionTitle from './ui/SectionTitle'

/**
 * Temporary page body used while a page is still waiting for its build phase.
 * Each page replaces this with its real content in later phases.
 */
export default function PagePlaceholder({ title, subtitle, children }) {
  return (
    <Container as="section" className="flex min-h-[70vh] flex-col items-center justify-center py-24">
      <SectionTitle as="h1" eyebrow="Leenar" title={title} subtitle={subtitle} />
      {children}
    </Container>
  )
}
