/**
 * Brand-wide details used by the footer and (later) the contact page.
 * Replace the placeholder values with the real ones.
 */
export const SITE = {
  name: 'Leenar',
  tagline: 'Premium leather bags handcrafted in India with three decades of artisan expertise.',
  email: 'hello@lee-nar.com',
  phone: '+91 00000 00000', // placeholder
  whatsapp: '910000000000', // placeholder: country code + number, digits only
  address: 'Studio address, City, State, India', // placeholder
}

/** Social profile links (placeholders until the real handles are added). */
export const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://www.instagram.com/' },
  { name: 'Facebook', href: 'https://www.facebook.com/' },
  { name: 'Pinterest', href: 'https://www.pinterest.com/' },
  { name: 'WhatsApp', href: `https://wa.me/${SITE.whatsapp}` },
]

/** Main navigation, in display order. */
export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Shop', to: '/shop' },
  { label: 'Collection', to: '/collection' },
  { label: 'Contact', to: '/contact' },
]

/**
 * Shipping & returns copy shown on every product page.
 * Placeholder policy: confirm the real terms before launch.
 */
export const SHIPPING_RETURNS = [
  'Free shipping across India on every order. Dispatched within 2–3 working days; delivery usually takes 4–7 working days.',
  'Easy 7-day returns on unused bags in their original packaging. Personalised and custom orders cannot be returned.',
  'Every bag arrives in a Leenar dust bag and gift-ready box.',
]
