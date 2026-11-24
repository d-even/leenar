import Hero from '../components/home/Hero'
import TrustStrip from '../components/home/TrustStrip'
import Bestsellers from '../components/home/Bestsellers'
import Reviews from '../components/home/Reviews'

/**
 * Home page (/).
 * Navbar and footer come from the shared Layout; the hero sits under the
 * transparent navbar (see TRANSPARENT_NAV_ROUTES).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Bestsellers />
      <Reviews />
    </>
  )
}
