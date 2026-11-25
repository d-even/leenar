import { useState } from 'react'
import { ChevronDown, LoaderCircle, Send } from 'lucide-react'
import Button from '../ui/Button'
import useToast from '../../hooks/useToast'
import { CONTACT_SUBJECTS } from '../../data/site'

const EMPTY = { name: '', email: '', phone: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Optional phone: 10-digit Indian mobile, with or without +91 / 0, spaces or dashes
const PHONE_PATTERN = /^(?:\+?91|0)?[6-9]\d{9}$/

/** Returns an { field: message } object; empty when the form is valid. */
function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please tell us your name.'
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.replace(/[\s-]/g, '')))
    errors.phone = 'Please enter a valid 10-digit mobile number.'
  if (values.message.trim().length < 10) errors.message = 'Please write a short message (at least 10 characters).'
  return errors
}

const FIELD =
  'w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-espresso placeholder:text-espresso/35 transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold'

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-medium tracking-[0.15em] uppercase">
        {label} {optional && <span className="font-normal tracking-normal text-espresso/50 normal-case">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-ember" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Contact form (frontend only). Validates on submit and as fields are corrected,
 * then shows a success toast and resets. `subject` is controlled by the page so the
 * custom / bulk order cards can pre-select it.
 */
export default function ContactForm({ subject, onSubjectChange }) {
  const { showToast } = useToast()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const update = (field) => (event) => {
    const next = { ...values, [field]: event.target.value }
    setValues(next)
    // Clear an error as soon as the field becomes valid
    if (errors[field]) setErrors((current) => ({ ...current, [field]: validate(next)[field] }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      // Move focus to the first problem so keyboard and screen-reader users land on it
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus()
      return
    }
    setSubmitting(true)
    // No backend yet: simulate sending
    window.setTimeout(() => {
      setSubmitting(false)
      setValues(EMPTY)
      onSubjectChange('general')
      showToast(`Thank you, ${values.name.trim().split(' ')[0]}! We'll reply within one working day.`)
    }, 900)
  }

  const describedBy = (field) => (errors[field] ? `contact-${field}-error` : undefined)
  const border = (field) => (errors[field] ? 'border-ember' : 'border-espresso/15 hover:border-espresso/30')

  return (
    <form id="contact-form" onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Contact form">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Name" error={errors.name}>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            placeholder="Your full name"
            className={`${FIELD} ${border('name')}`}
          />
        </Field>
        <Field id="contact-email" label="Email" error={errors.email}>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            placeholder="you@example.com"
            className={`${FIELD} ${border('email')}`}
          />
        </Field>
        <Field id="contact-phone" label="Phone" optional error={errors.phone}>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={update('phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy('phone')}
            placeholder="+91 98765 43210"
            className={`${FIELD} ${border('phone')}`}
          />
        </Field>
        <Field id="contact-subject" label="Subject">
          <div className="relative">
            <select
              id="contact-subject"
              value={subject}
              onChange={(event) => onSubjectChange(event.target.value)}
              className={`${FIELD} cursor-pointer appearance-none border-espresso/15 pr-10 hover:border-espresso/30`}
            >
              {CONTACT_SUBJECTS.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-espresso/60"
              aria-hidden="true"
            />
          </div>
        </Field>
      </div>

      <Field id="contact-message" label="Message" error={errors.message}>
        <textarea
          id="contact-message"
          rows={6}
          value={values.message}
          onChange={update('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy('message')}
          placeholder={
            subject === 'custom'
              ? 'Tell us about the bag you have in mind: style, colour, size, initials…'
              : subject === 'bulk'
                ? 'Tell us about your order: occasion, quantity, timeline and budget…'
                : 'How can we help?'
          }
          className={`${FIELD} resize-y ${border('message')}`}
        />
      </Field>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-espresso/55">We respond to every message, usually within one working day.</p>
        <Button type="submit" size="lg" disabled={submitting} className="sm:min-w-52">
          {submitting ? (
            <>
              <LoaderCircle size={16} className="animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Send message <Send size={15} aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
