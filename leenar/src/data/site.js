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
