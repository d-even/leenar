import { useState } from 'react'
import { Mail, PencilLine, Phone, User } from 'lucide-react'
import Button from '../ui/Button'
import TextField from '../ui/TextField'
import useProfile from '../../hooks/useProfile'
import useToast from '../../hooks/useToast'
import { EMAIL_PATTERN, PHONE_PATTERN, cleanPhone } from '../../utils/validation'

function validate({ name, email, phone }) {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'Please enter your name.'
  if (email.trim() && !EMAIL_PATTERN.test(email.trim())) errors.email = 'Please enter a valid email address.'
  if (phone.trim() && !PHONE_PATTERN.test(cleanPhone(phone))) errors.phone = 'Please enter a valid 10-digit mobile number.'
  return errors
}

/** "My Profile" tab: avatar, name, email and phone, with an edit form. */
export default function ProfileDetails() {
  const { profile, initial, updateDetails } = useProfile()
  const { showToast } = useToast()
  const isEmpty = !profile.name.trim()
  const [editing, setEditing] = useState(isEmpty)
  const [values, setValues] = useState({ name: profile.name, email: profile.email, phone: profile.phone })
  const [errors, setErrors] = useState({})

  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }))

  const startEditing = () => {
    setValues({ name: profile.name, email: profile.email, phone: profile.phone })
    setErrors({})
    setEditing(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`profile-${Object.keys(found)[0]}`)?.focus()
      return
    }
    updateDetails({ name: values.name.trim(), email: values.email.trim(), phone: values.phone.trim() })
    setEditing(false)
    showToast('Your profile has been saved')
  }

  const rows = [
    { icon: User, label: 'Name', value: profile.name },
    { icon: Mail, label: 'Email', value: profile.email },
    { icon: Phone, label: 'Phone', value: profile.phone },
  ]

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <span
          className="flex size-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ember to-espresso font-serif text-4xl text-malibu-light italic ring-4 ring-malibu-light outline outline-1 outline-offset-4 outline-gold/60"
          aria-hidden="true"
        >
          {initial || <User size={36} strokeWidth={1.25} />}
        </span>
        <div className="flex-1">
          <h2 className="font-serif text-3xl">
            {isEmpty ? (
              <>
                Your <em className="text-ember">Profile</em>
              </>
            ) : (
              <em>{profile.name}</em>
            )}
          </h2>
          <p className="mt-1 text-sm text-espresso/70">
            {isEmpty
              ? 'Add your details to make ordering and enquiries quicker.'
              : 'Your details are saved in this browser.'}
          </p>
        </div>
        {!editing && (
          <Button variant="outline" size="sm" onClick={startEditing} className="self-start sm:self-center">
            <PencilLine size={14} aria-hidden="true" /> Edit profile
          </Button>
        )}
      </div>

      <div className="mt-8 h-px bg-espresso/10" aria-hidden="true" />

      {editing ? (
        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5" aria-label="Edit profile">
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="profile-name"
              label="Full name"
              autoComplete="name"
              value={values.name}
              onChange={update('name')}
              error={errors.name}
              placeholder="Your full name"
              className="sm:col-span-2"
            />
            <TextField
              id="profile-email"
              label="Email"
              type="email"
              optional
              autoComplete="email"
              value={values.email}
              onChange={update('email')}
              error={errors.email}
              placeholder="you@example.com"
            />
            <TextField
              id="profile-phone"
              label="Phone"
              type="tel"
              optional
              autoComplete="tel"
              value={values.phone}
              onChange={update('phone')}
              error={errors.phone}
              placeholder="+91 98765 43210"
            />
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="submit">Save changes</Button>
            {!isEmpty && (
              <Button variant="outline" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      ) : (
        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {rows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl bg-malibu-light p-5">
              <dt className="flex items-center gap-2 text-[0.7rem] tracking-[0.2em] text-espresso/70 uppercase">
                <Icon size={14} className="text-ember" aria-hidden="true" /> {label}
              </dt>
              <dd className="mt-2 break-words">{value || <span className="text-espresso/40">Not added</span>}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
