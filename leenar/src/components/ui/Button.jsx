import { Link } from 'react-router-dom'

/**
 * Button: the one button style used across the site.
 *
 * Renders a router <Link> when `to` is given, an <a> when `href` is given,
 * otherwise a native <button>.
 *
 * @param {'primary'|'outline'|'ghost'|'light'|'outlineLight'} variant
 *   primary: solid Espresso, Ember on hover
 *   outline: Espresso border, fills on hover
 *   ghost:   text only with an underline accent
 *   light:   Malibu fill, for use on dark (Espresso / photo) backgrounds
 *   outlineLight: light border, for use on dark backgrounds
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} fullWidth
 */
const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium tracking-[0.08em] uppercase ' +
  'transition-all duration-300 ease-(--ease-luxe) disabled:cursor-not-allowed disabled:opacity-50 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold'

const VARIANTS = {
  primary: 'bg-espresso text-malibu-light shadow-soft hover:bg-ember hover:shadow-lift',
  outline: 'border border-espresso text-espresso hover:bg-espresso hover:text-malibu-light',
  ghost:
    'rounded-none px-0! text-espresso underline decoration-gold decoration-1 underline-offset-8 hover:text-ember hover:decoration-2',
  light: 'bg-malibu text-espresso shadow-soft hover:bg-malibu-light hover:shadow-lift',
  outlineLight: 'border border-malibu/70 text-malibu-light hover:border-malibu hover:bg-malibu hover:text-espresso',
}

const SIZES = {
  sm: 'px-5 py-2 text-[0.7rem]',
  md: 'px-7 py-3 text-xs',
  lg: 'px-9 py-4 text-sm',
}

export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  type = 'button',
  children,
  ...props
}) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? 'w-full' : ''} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
