import { useState } from 'react'
import Button from '../ui/Button'
import TextField from '../ui/TextField'
import { INDIAN_STATES } from '../../data/indianStates'
import { PHONE_PATTERN, PINCODE_PATTERN, cleanPhone } from '../../utils/validation'

const LABELS = ['Home', 'Work', 'Other']
const EMPTY = { label: 'Home', fullName: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '', isDefault: false }

function validate(values) {
  const errors = {}
  if (values.fullName.trim().length < 2) errors.fullName = "Please enter the recipient's name."
  if (!PHONE_PATTERN.test(cleanPhone(values.phone))) errors.phone = 'Please enter a valid 10-digit mobile number.'
  if (values.line1.trim().length < 5) errors.line1 = 'Please enter the house number and street.'
  if (values.city.trim().length < 2) errors.city = 'Please enter the city.'
  if (!values.state) errors.state = 'Please choose a state.'
  if (!PINCODE_PATTERN.test(values.pincode.trim())) errors.pincode = 'Please enter a valid 6-digit PIN code.'
  return errors
}

/** Add / edit address form. `address` is the one being edited, or undefined for a new one. */
export default function AddressForm({ address, isFirst, onSave, onCancel }) {
  const [values, setValues] = useState(address ?? { ...EMPTY, isDefault: isFirst })
  const [errors, setErrors] = useState({})

  const update = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setValues((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`address-${Object.keys(found)[0]}`)?.focus()
      return
    }
    onSave({ ...values, fullName: values.fullName.trim(), city: values.city.trim(), pincode: values.pincode.trim() })
  }

  const field = (name, label, props = {}) => (
    <TextField
      id={`address-${name}`}
      label={label}
      value={values[name]}
      onChange={update(name)}
      error={errors[name]}
      {...props}
    />
  )

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-gold/40 bg-white p-5 sm:p-7"
      aria-label={address ? 'Edit address' : 'Add a new address'}
    >
      <h3 className="font-serif text-2xl italic">{address ? 'Edit address' : 'Add a new address'}</h3>

      <div className="mt-5" role="radiogroup" aria-label="Address type">
        <div className="flex gap-2">
          {LABELS.map((label) => (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={values.label === label}
              onClick={() => setValues((current) => ({ ...current, label }))}
              className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.1em] uppercase transition-colors ${
                values.label === label ? 'bg-espresso text-malibu-light' : 'border border-espresso/20 hover:border-ember hover:text-ember'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {field('fullName', 'Full name', { autoComplete: 'name' })}
        {field('phone', 'Mobile number', { type: 'tel', autoComplete: 'tel', placeholder: '+91 98765 43210' })}
        {field('line1', 'House no., building, street', { autoComplete: 'address-line1', className: 'sm:col-span-2' })}
        {field('line2', 'Area, landmark', { autoComplete: 'address-line2', optional: true, className: 'sm:col-span-2' })}
        {field('city', 'City', { autoComplete: 'address-level2' })}
        <TextField
          id="address-state"
          as="select"
          label="State"
          value={values.state}
          onChange={update('state')}
          error={errors.state}
        >
          <option value="">Select a state</option>
          {INDIAN_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </TextField>
        {field('pincode', 'PIN code', { inputMode: 'numeric', autoComplete: 'postal-code', maxLength: 6 })}
      </div>

      <label className="mt-6 flex cursor-pointer items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={values.isDefault}
          onChange={update('isDefault')}
          className="size-4 accent-ember"
        />
        Make this my default address
      </label>

      <div className="mt-7 flex flex-wrap gap-3">
        <Button type="submit">{address ? 'Save address' : 'Add address'}</Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
