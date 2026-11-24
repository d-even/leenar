import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import { TRANSPARENT_NAV_ROUTES } from './navConfig'
import CartDrawer from './CartDrawer'
import Footer from './Footer'
import ScrollToTop from '../ScrollToTop'

/**
 * Shared page shell: navbar, cart drawer, the current page, footer.
 * Pages with a full-bleed hero (see TRANSPARENT_NAV_ROUTES) sit underneath the
 * transparent navbar; every other page is pushed down to clear it.
 */
export default function Layout() {
  const { pathname } = useLocation()
  const underNav = TRANSPARENT_NAV_ROUTES.includes(pathname)

  return (
    <div className="flex min-h-svh flex-col">
      <ScrollToTop />

      {/* Lets keyboard users jump past the navigation */}
      <a
        href="#main"
        className="sr-only z-[80] rounded-full bg-gold px-5 py-2 text-sm font-medium text-espresso focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <Navbar />
      <CartDrawer />

      <main id="main" tabIndex={-1} className={`flex-1 focus:outline-none ${underNav ? '' : 'pt-16 lg:pt-20'}`}>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
