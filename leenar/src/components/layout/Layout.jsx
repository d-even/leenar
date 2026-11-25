import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import { TRANSPARENT_NAV_ROUTES } from './navConfig'
import CartDrawer from './CartDrawer'
import Footer from './Footer'
import ScrollToTop from '../ScrollToTop'

/** Shown briefly while a page's code downloads. */
function PageLoader() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status">
      <span className="size-8 animate-spin rounded-full border-2 border-gold/30 border-t-ember" aria-hidden="true" />
      <span className="sr-only">Loading</span>
    </div>
  )
}

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
        <Suspense fallback={<PageLoader />}>
          {/* Soft fade between pages. Opacity only: a transform here would break fixed drawers inside pages */}
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
