import { useCallback, useEffect, useMemo, useState } from 'react'
import { ProfileContext } from './contexts'

/**
 * ProfileContext: the visitor's account details and saved addresses.
 * There is no sign-up or login: the profile simply lives in this browser (localStorage).
 *
 * Address shape:
 *   { id, label, fullName, phone, line1, line2, city, state, pincode, isDefault }
 */

const STORAGE_KEY = 'leenar-profile'

const EMPTY_PROFILE = { name: '', email: '', phone: '', addresses: [] }

function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return saved && typeof saved === 'object'
      ? { ...EMPTY_PROFILE, ...saved, addresses: Array.isArray(saved.addresses) ? saved.addresses : [] }
      : EMPTY_PROFILE
  } catch {
    return EMPTY_PROFILE
  }
}

const newId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`

/** Exactly one default address: the chosen one, else the first. */
function normaliseDefault(addresses, defaultId) {
  const target = defaultId ?? addresses.find((a) => a.isDefault)?.id ?? addresses[0]?.id
  return addresses.map((address) => ({ ...address, isDefault: address.id === target }))
}

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(loadProfile)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    } catch {
      /* storage unavailable: changes last for this visit only */
    }
  }, [profile])

  /** Update name / email / phone. */
  const updateDetails = useCallback((details) => setProfile((current) => ({ ...current, ...details })), [])

  const saveAddress = useCallback((address) => {
    setProfile((current) => {
      const exists = address.id && current.addresses.some((a) => a.id === address.id)
      const saved = exists ? address : { ...address, id: newId() }
      const addresses = exists
        ? current.addresses.map((a) => (a.id === saved.id ? saved : a))
        : [...current.addresses, saved]
      return { ...current, addresses: normaliseDefault(addresses, saved.isDefault ? saved.id : undefined) }
    })
  }, [])

  const deleteAddress = useCallback((id) => {
    setProfile((current) => ({
      ...current,
      addresses: normaliseDefault(current.addresses.filter((a) => a.id !== id)),
    }))
  }, [])

  const setDefaultAddress = useCallback((id) => {
    setProfile((current) => ({ ...current, addresses: normaliseDefault(current.addresses, id) }))
  }, [])

  const value = useMemo(
    () => ({
      profile,
      /** First letter of the saved name, for avatars and the navbar icon ('' when no name yet) */
      initial: profile.name.trim().charAt(0).toUpperCase(),
      updateDetails,
      saveAddress,
      deleteAddress,
      setDefaultAddress,
    }),
    [profile, updateDetails, saveAddress, deleteAddress, setDefaultAddress],
  )

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}
