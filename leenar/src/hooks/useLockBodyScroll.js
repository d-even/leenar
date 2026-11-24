import { useEffect } from 'react'

/**
 * Stops the page behind a drawer / overlay from scrolling while `locked` is true.
 * Pads the body by the scrollbar width so the layout doesn't jump.
 */
export default function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return
    const { overflow, paddingRight } = document.body.style
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [locked])
}
