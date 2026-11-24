import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, ShoppingBag, User, X } from 'lucide-react'
import Container from '../ui/Container'
import useCart from '../../hooks/useCart'
import { NAV_LINKS, SITE, SOCIAL_LINKS } from '../../data/site'
import { SOCIAL_ICONS } from '../icons/socialIconMap'
import useLockBodyScroll from '../../hooks/useLockBodyScroll'
import useFocusTrap from '../../hooks/useFocusTrap'
import logo from '../../assets/logo.avif'
import { NAV_HEIGHT, TRANSPARENT_NAV_ROUTES } from './navConfig'

function Logo({ className = '' }) {
  return (
    <Link to="/" className={`shrink-0 ${className}`} aria-label="Leenar, home">
      <img src={logo} alt="Leenar" width="768" height="182" className="h-6 w-auto sm:h-7 lg:h-8" />
    </Link>
  )
}

function CartButton() {
  const { itemCount, openCart } = useCart()
  return (
    <button
      type="button"
      onClick={openCart}
      className="relative rounded-full p-2 text-malibu-light transition-colors hover:text-gold"
      aria-label={`Open shopping bag, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
    >
      <ShoppingBag size={22} strokeWidth={1.5} />
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            key={itemCount}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            className="absolute -top-0.5 -right-0.5 flex min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[0.65rem] leading-5 font-semibold text-espresso"
            aria-hidden="true"
          >
            {itemCount > 99 ? '99+' : itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

function ProfileLink() {
  return (
    <Link
      to="/profile"
      className="rounded-full p-2 text-malibu-light transition-colors hover:text-gold"
      aria-label="My account"
    >
      <User size={22} strokeWidth={1.5} />
    </Link>
  )
}

/** Full-screen mobile menu. */
function MobileMenu({ open, onClose }) {
  const panelRef = useRef(null)
  useLockBodyScroll(open)
  useFocusTrap(panelRef, open, onClose)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-espresso text-malibu-light lg:hidden"
        >
          <Container size="wide" className={`flex shrink-0 items-center justify-between ${NAV_HEIGHT}`}>
            <button
              type="button"
              onClick={onClose}
              className="-ml-2 rounded-full p-2 transition-colors hover:text-gold"
              aria-label="Close menu"
            >
              <X size={26} strokeWidth={1.5} />
            </button>
            <Logo />
          </Container>

          <Container size="wide" as="nav" aria-label="Mobile" className="flex flex-1 flex-col justify-center py-10">
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, to }, index) => (
                <motion.li
                  key={to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group inline-flex items-baseline gap-4 py-1 font-serif text-4xl italic transition-colors sm:text-5xl ${
                        isActive ? 'text-gold' : 'text-malibu-light hover:text-gold'
                      }`
                    }
                  >
                    <span className="font-sans text-xs not-italic tracking-[0.2em] text-malibu/50">
                      0{index + 1}
                    </span>
                    {label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 h-px w-16 bg-gold" aria-hidden="true" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-8 space-y-6 text-sm"
            >
              <Link to="/profile" onClick={onClose} className="inline-flex items-center gap-2 hover:text-gold">
                <User size={18} strokeWidth={1.5} /> My Account
              </Link>
              <p className="text-malibu/70">
                <a href={`mailto:${SITE.email}`} className="hover:text-gold">
                  {SITE.email}
                </a>
              </p>
              <ul className="flex gap-3">
                {SOCIAL_LINKS.map(({ name, href }) => {
                  const Icon = SOCIAL_ICONS[name]
                  return (
                    <li key={name}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Leenar on ${name}`}
                        className="flex size-10 items-center justify-center rounded-full border border-malibu/25 transition-colors hover:border-gold hover:text-gold"
                      >
                        <Icon size={18} />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const transparent = TRANSPARENT_NAV_ROUTES.includes(pathname) && !scrolled

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          transparent
            ? 'bg-gradient-to-b from-espresso/60 to-transparent'
            : 'bg-espresso/95 shadow-soft backdrop-blur-md'
        }`}
      >
        <Container size="wide" className={`flex items-center justify-between gap-4 ${NAV_HEIGHT}`}>
          {/* Left: hamburger (mobile) / links (desktop) */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="-ml-2 rounded-full p-2 text-malibu-light transition-colors hover:text-gold lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `group relative py-2 text-[0.78rem] font-medium tracking-[0.2em] uppercase transition-colors ${
                        isActive ? 'text-malibu-light' : 'text-malibu/80 hover:text-malibu-light'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {label}
                        {/* Gold underline: full width when active, grows in on hover */}
                        <span
                          className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ${
                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: account, cart, then the logo in the far right corner */}
          <div className="flex items-center gap-1 sm:gap-2">
            <ProfileLink />
            <CartButton />
            <span className="mx-2 hidden h-6 w-px bg-malibu/25 sm:block lg:mx-4" aria-hidden="true" />
            <Logo className="ml-2 sm:ml-0" />
          </div>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
