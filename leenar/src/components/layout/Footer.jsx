import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container'
import useToast from '../../hooks/useToast'
import { SITE, SOCIAL_LINKS } from '../../data/site'
import { SOCIAL_ICONS } from '../icons/socialIconMap'
import logo from '../../assets/logo.avif'

/**
 * Footer link columns.
 * Help pages (Shipping, Returns, Privacy, Terms) don't exist yet,
 * so they point to Contact until those pages are written.
 */
const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'All Bags', to: '/shop' },
      { label: 'Collections', to: '/collection' },
      { label: 'Evening Elegance', to: '/collection/evening-elegance' },
      { label: 'Mini Treasures', to: '/collection/mini-treasures' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Story', to: '/about' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Custom & Bulk Orders', to: '/contact?subject=custom' },
      { label: 'My Account', to: '/profile' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Shipping', to: '/contact' },
      { label: 'Returns', to: '/contact' },
      { label: 'Privacy Policy', to: '/contact' },
      { label: 'Terms & Conditions', to: '/contact' },
    ],
  },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Newsletter sign-up (frontend only: validates, then thanks the visitor). */
function Newsletter() {
  const { showToast } = useToast()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setEmail('')
    showToast('Thank you for joining the Leenar circle')
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-sm">
      <label htmlFor="newsletter-email" className="text-xs tracking-[0.2em] text-gold uppercase">
        Join the Leenar circle
      </label>
      <p className="mt-2 text-sm text-malibu/70">New arrivals, limited editions and stories from our workshop.</p>
      <div className="mt-4 flex items-center border-b border-malibu/30 transition-colors focus-within:border-gold">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          autoComplete="email"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'newsletter-error' : undefined}
          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-malibu-light placeholder:text-malibu/40 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full p-2 text-malibu-light transition-colors hover:text-gold"
          aria-label="Subscribe"
        >
          <ArrowRight size={20} strokeWidth={1.5} />
        </button>
      </div>
      {error && (
        <p id="newsletter-error" className="mt-2 text-xs text-gold" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}

export default function Footer() {
  return (
    <footer className="bg-espresso text-malibu">
      <Container size="wide" className="pt-16 pb-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" aria-label="Leenar, home" className="inline-block">
              <img src={logo} alt="Leenar" width="768" height="182" className="h-8 w-auto" loading="lazy" />
            </Link>
            <p className="mt-6 max-w-xs font-serif text-lg leading-relaxed text-malibu/85 italic">{SITE.tagline}</p>
            <ul className="mt-8 flex gap-3">
              {SOCIAL_LINKS.map(({ name, href }) => {
                const Icon = SOCIAL_ICONS[name]
                return (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Leenar on ${name}`}
                      className="flex size-10 items-center justify-center rounded-full border border-malibu/25 text-malibu transition-colors hover:border-gold hover:text-gold"
                    >
                      <Icon size={18} />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {COLUMNS.map(({ title, links }) => (
              <div key={title}>
                <h2 className="font-sans text-xs font-medium tracking-[0.2em] text-gold uppercase">{title}</h2>
                <ul className="mt-5 space-y-3 text-sm">
                  {links.map(({ label, to }) => (
                    <li key={label}>
                      <Link to={to} className="text-malibu/75 hover:text-malibu-light">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <Newsletter />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-3 border-t border-gold/25 pt-6 text-xs text-malibu/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Leenar. All rights reserved.</p>
          <p>Handcrafted in India · 100% Real Leather</p>
        </div>
      </Container>
    </footer>
  )
}
