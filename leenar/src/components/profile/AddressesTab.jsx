import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, PencilLine, Plus, Trash2 } from 'lucide-react'
import AddressForm from './AddressForm'
import useProfile from '../../hooks/useProfile'
import useToast from '../../hooks/useToast'

/** "Addresses" tab: saved addresses with add, edit, delete and set-default. */
export default function AddressesTab() {
  const { profile, saveAddress, deleteAddress, setDefaultAddress } = useProfile()
  const { showToast } = useToast()
  const { addresses } = profile
  // null = list view, 'new' = adding, otherwise the id being edited
  const [editing, setEditing] = useState(null)
  const [confirmingDelete, setConfirmingDelete] = useState(null)

  const handleSave = (address) => {
    saveAddress(address)
    showToast(editing === 'new' ? 'Address added' : 'Address updated')
    setEditing(null)
  }

  const handleDelete = (id) => {
    deleteAddress(id)
    setConfirmingDelete(null)
    showToast('Address deleted', { type: 'info' })
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-3xl">
            Saved <em className="text-ember">Addresses</em>
          </h2>
          <p className="mt-1 text-sm text-espresso/70">Free shipping to every address in India.</p>
        </div>
      </div>

      <div className="mt-8">
        {editing ? (
          <AddressForm
            key={editing}
            address={addresses.find((a) => a.id === editing)}
            isFirst={addresses.length === 0}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
          />
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            <AnimatePresence initial={false}>
              {addresses.map((address) => (
                <motion.li
                  key={address.id}
                  layout
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                  className={`flex flex-col rounded-2xl border bg-white p-5 sm:p-6 ${
                    address.isDefault ? 'border-gold' : 'border-espresso/10'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-malibu px-3 py-1 text-[0.65rem] font-semibold tracking-[0.15em] text-ember uppercase">
                      {address.label}
                    </span>
                    {address.isDefault && (
                      <span className="text-[0.65rem] font-semibold tracking-[0.15em] text-ember uppercase">Default</span>
                    )}
                  </div>
                  <address className="mt-4 flex-1 text-sm leading-relaxed not-italic">
                    <span className="font-medium">{address.fullName}</span>
                    <br />
                    {address.line1}
                    {address.line2 && (
                      <>
                        <br />
                        {address.line2}
                      </>
                    )}
                    <br />
                    {address.city}, {address.state} {address.pincode}
                    <br />
                    <span className="text-espresso/70">Phone: {address.phone}</span>
                  </address>

                  {confirmingDelete === address.id ? (
                    <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl bg-malibu-light p-3 text-sm" role="alert">
                      <span className="flex-1">Delete this address?</span>
                      <button
                        type="button"
                        onClick={() => handleDelete(address.id)}
                        className="rounded-full bg-ember px-4 py-1.5 text-xs font-medium text-malibu-light hover:bg-espresso"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmingDelete(null)}
                        className="px-2 text-xs underline underline-offset-4"
                      >
                        Keep
                      </button>
                    </div>
                  ) : (
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-espresso/10 pt-4 text-xs">
                      <button
                        type="button"
                        onClick={() => setEditing(address.id)}
                        className="inline-flex items-center gap-1.5 hover:text-ember"
                        aria-label={`Edit ${address.label} address`}
                      >
                        <PencilLine size={14} aria-hidden="true" /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmingDelete(address.id)}
                        className="inline-flex items-center gap-1.5 hover:text-ember"
                        aria-label={`Delete ${address.label} address`}
                      >
                        <Trash2 size={14} aria-hidden="true" /> Delete
                      </button>
                      {!address.isDefault && (
                        <button
                          type="button"
                          onClick={() => setDefaultAddress(address.id)}
                          className="ml-auto text-ember underline underline-offset-4"
                        >
                          Set as default
                        </button>
                      )}
                    </div>
                  )}
                </motion.li>
              ))}
            </AnimatePresence>

            <li>
              <button
                type="button"
                onClick={() => setEditing('new')}
                className="flex h-full min-h-48 w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-espresso/20 p-6 text-sm transition-colors hover:border-ember hover:text-ember"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-malibu text-ember">
                  {addresses.length ? <Plus size={20} aria-hidden="true" /> : <MapPin size={20} aria-hidden="true" />}
                </span>
                {addresses.length ? 'Add a new address' : 'Add your first address'}
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}
