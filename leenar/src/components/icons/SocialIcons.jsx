/**
 * Simple line-style social icons (lucide-react no longer ships brand logos).
 * They match lucide's 24px grid and 1.5 stroke so they sit nicely beside it.
 */
const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const InstagramIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} {...base} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
  </svg>
)

export const FacebookIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} {...base} {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

export const PinterestIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} {...base} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M10.6 9.5 8.5 21" />
    <path d="M9.3 15.2c.7.6 1.6.9 2.6.9 2.6 0 4.4-2.2 4.4-5 0-2.6-2-4.6-4.7-4.6-3 0-5 2.1-5 4.6 0 1 .4 1.9 1 2.4" />
  </svg>
)

export const WhatsAppIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} {...base} {...props}>
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
)

