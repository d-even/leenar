import PagePlaceholder from '../components/PagePlaceholder'
import Button from '../components/ui/Button'

/** Home page (/). Built in Phase 4; for now it previews the button styles. */
export default function Home() {
  return (
    <PagePlaceholder title="Crafted by Hand. Carried for Life." subtitle="Home">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button to="/shop">Shop Now</Button>
        <Button to="/about" variant="outline">
          Our Story
        </Button>
        <Button to="/collection" variant="ghost">
          View Collections
        </Button>
      </div>
    </PagePlaceholder>
  )
}
