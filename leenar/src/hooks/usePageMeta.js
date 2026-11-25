import { useEffect } from 'react'

const SITE_NAME = 'Leenar'
const DEFAULT_DESCRIPTION =
  "Leenar: premium women's leather handbags, handcrafted in India by artisans with three decades of experience."

/**
 * Sets the browser tab title and the meta description for the current page.
 * Updates the existing <meta name="description"> from index.html rather than adding a second one.
 *
 * @param {string} title        page title; " | Leenar" is appended (pass null for the plain site title)
 * @param {string} description  meta description (falls back to the site default)
 */
export default function usePageMeta(title, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Handcrafted Leather Handbags`
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)
  }, [title, description])
}
