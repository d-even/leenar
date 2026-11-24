import { useCallback, useEffect, useMemo, useState } from 'react'
import { WishlistContext } from './contexts'
import { getProductById } from '../data/products'

/**
 * WishlistContext: the visitor's saved products.
 * Stores product ids only, saved to localStorage so they survive a refresh.
 */

const STORAGE_KEY = 'leenar-wishlist'

function loadWishlist() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    // Drop ids for products that no longer exist in the catalogue
    return Array.isArray(saved) ? saved.filter((id) => getProductById(id)) : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(loadWishlist)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      /* storage unavailable: wishlist still works for this visit */
    }
  }, [ids])

  const isWishlisted = useCallback((id) => ids.includes(id), [ids])

  /** Adds the product if it's not saved, removes it if it is. Returns the new state. */
  const toggleWishlist = useCallback(
    (id) => {
      const willAdd = !ids.includes(id)
      setIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
      return willAdd
    },
    [ids],
  )

  const removeFromWishlist = useCallback((id) => setIds((current) => current.filter((item) => item !== id)), [])
  const clearWishlist = useCallback(() => setIds([]), [])

  const value = useMemo(
    () => ({
      ids,
      items: ids.map(getProductById).filter(Boolean),
      count: ids.length,
      isWishlisted,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
    }),
    [ids, isWishlisted, toggleWishlist, removeFromWishlist, clearWishlist],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}
