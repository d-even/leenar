import { useContext } from 'react'
import { ProfileContext } from '../context/contexts'

/** Access the profile from any component inside <ProfileProvider>. */
export default function useProfile() {
  const context = useContext(ProfileContext)
  if (!context) throw new Error('useProfile must be used inside <ProfileProvider>')
  return context
}
