import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, MapPin, Package, User } from 'lucide-react'
import Container from '../components/ui/Container'
import ProfileDetails from '../components/profile/ProfileDetails'
import OrdersTab from '../components/profile/OrdersTab'
import WishlistTab from '../components/profile/WishlistTab'
import AddressesTab from '../components/profile/AddressesTab'
import useProfile from '../hooks/useProfile'
import useWishlist from '../hooks/useWishlist'
import { orders } from '../data/orders'
import usePageMeta from '../hooks/usePageMeta'

const TABS = [
  { id: 'profile', label: 'My Profile', icon: User, Panel: ProfileDetails },
  { id: 'orders', label: 'My Orders', icon: Package, Panel: OrdersTab },
  { id: 'wishlist', label: 'Wishlist', icon: Heart, Panel: WishlistTab },
  { id: 'addresses', label: 'Addresses', icon: MapPin, Panel: AddressesTab },
]

/**
 * Profile page (/profile): account dashboard. No sign-up or login; details live in this browser.
 * Sidebar on desktop, scrollable tabs on phones. The open tab is in the URL (?tab=orders).
 */
export default function Profile() {
  usePageMeta('My Account', 'Your Leenar profile, orders, wishlist and saved addresses.')
  const [params, setParams] = useSearchParams()
  const { profile, initial } = useProfile()
  const { count } = useWishlist()
  const active = TABS.find((tab) => tab.id === params.get('tab')) ?? TABS[0]
  const counts = { orders: orders.length, wishlist: count, addresses: profile.addresses.length }
  const firstName = profile.name.trim().split(' ')[0]

  const select = (id) => setParams(id === 'profile' ? {} : { tab: id }, { replace: true, preventScrollReset: true })

  // Arrow keys move between tabs (standard tab-list behaviour)
  const handleKeyDown = (event) => {
    const index = TABS.indexOf(active)
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key]
    if (!step) return
    event.preventDefault()
    const next = TABS[(index + step + TABS.length) % TABS.length]
    select(next.id)
    document.getElementById(`tab-${next.id}`)?.focus()
  }

  return (
    <Container as="section" size="wide" className="py-12 lg:py-16">
      <header className="mb-10">
        <p className="text-xs tracking-[0.3em] text-ember uppercase">My Account</p>
        <h1 className="mt-3 font-serif text-4xl italic sm:text-5xl">
          {firstName ? `Welcome back, ${firstName}` : 'Welcome to Leenar'}
        </h1>
        <div className="mt-5 h-px w-14 bg-gold" aria-hidden="true" />
      </header>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
        {/* Sidebar / tabs (min-w-0 lets the tab row scroll instead of widening the page) */}
        <aside className="min-w-0">
          <div className="lg:sticky lg:top-28">
            <div className="mb-6 hidden items-center gap-4 rounded-2xl bg-gradient-to-br from-ember to-espresso p-5 text-malibu-light lg:flex">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-malibu font-serif text-xl text-espresso italic">
                {initial || <User size={20} strokeWidth={1.5} aria-hidden="true" />}
              </span>
              <div className="min-w-0">
                <p className="truncate font-serif text-lg italic">{profile.name || 'Guest'}</p>
                <p className="truncate text-xs text-malibu/70">{profile.email || 'Add your details'}</p>
              </div>
            </div>

            <div
              role="tablist"
              aria-label="Account sections"
              aria-orientation="vertical"
              onKeyDown={handleKeyDown}
              className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
            >
              {TABS.map(({ id, label, icon: Icon }) => {
                const selected = id === active.id
                return (
                  <button
                    key={id}
                    id={`tab-${id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`panel-${id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(id)}
                    className={`flex shrink-0 items-center gap-3 rounded-full px-5 py-3 text-sm transition-colors lg:rounded-xl ${
                      selected ? 'bg-espresso text-malibu-light' : 'bg-malibu text-espresso hover:bg-gold/30 lg:bg-transparent lg:hover:bg-malibu'
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.5} aria-hidden="true" className={selected ? 'text-gold' : 'text-ember'} />
                    <span className="flex-1 text-left whitespace-nowrap">{label}</span>
                    {counts[id] > 0 && (
                      <span
                        className={`rounded-full px-2 text-[0.65rem] leading-5 ${
                          selected ? 'bg-gold text-espresso' : 'bg-malibu-light text-espresso/70 lg:bg-malibu'
                        }`}
                      >
                        {counts[id]}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        {/* Active panel */}
        <div className="min-w-0 rounded-3xl bg-malibu p-5 sm:p-8 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              id={`panel-${active.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${active.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <active.Panel />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Container>
  )
}
