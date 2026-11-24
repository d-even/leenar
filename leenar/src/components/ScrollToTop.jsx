import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls the window back to the top whenever the route path changes.
 * Links to an in-page anchor (#section) are left alone.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
