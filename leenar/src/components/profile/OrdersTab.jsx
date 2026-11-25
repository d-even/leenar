import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { ORDER_STATUSES, orders } from '../../data/orders'
import { getProductById } from '../../data/products'
import { formatPrice } from '../../utils/format'

const BADGE = {
  Processing: 'bg-gold/20 text-ember ring-1 ring-gold/50',
  Shipped: 'bg-ember text-malibu-light',
  Delivered: 'bg-espresso text-malibu-light',
}

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

/** Three-step tracker: Processing → Shipped → Delivered. */
function Tracker({ status }) {
  const reached = ORDER_STATUSES.indexOf(status)
  return (
    <ol className="flex items-center" aria-label={`Order status: ${status}`}>
      {ORDER_STATUSES.map((step, index) => (
        <li key={step} className="flex flex-1 items-center last:flex-none">
          <span className="flex flex-col items-center gap-1.5">
            <span
              className={`flex size-6 items-center justify-center rounded-full ${
                index <= reached ? 'bg-ember text-malibu-light' : 'border border-espresso/20 bg-white'
              }`}
            >
              {index <= reached && <Check size={13} strokeWidth={2.5} aria-hidden="true" />}
            </span>
            <span className={`text-[0.65rem] tracking-wide ${index <= reached ? 'text-espresso' : 'text-espresso/70'}`}>
              {step}
            </span>
          </span>
          {index < ORDER_STATUSES.length - 1 && (
            <span
              className={`mx-2 mb-5 h-px flex-1 ${index < reached ? 'bg-ember' : 'bg-espresso/15'}`}
              aria-hidden="true"
            />
          )}
        </li>
      ))}
    </ol>
  )
}

/** "My Orders" tab: sample order history with status badges. */
export default function OrdersTab() {
  return (
    <div>
      <h2 className="font-serif text-3xl">
        My <em className="text-ember">Orders</em>
      </h2>
      <p className="mt-1 text-sm text-espresso/70">{orders.length} orders · sample history for this demo</p>

      <ul className="mt-8 space-y-5">
        {orders.map((order) => {
          const lines = order.items
            .map((item) => ({ ...item, product: getProductById(item.productId) }))
            .filter((line) => line.product)
          const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0)

          return (
            <li key={order.id} className="overflow-hidden rounded-2xl border border-espresso/10 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-espresso/10 bg-malibu-light px-5 py-4 sm:px-6">
                <div className="flex flex-wrap gap-x-8 gap-y-1 text-sm">
                  <p>
                    <span className="block text-[0.65rem] tracking-[0.2em] text-espresso/70 uppercase">Order</span>
                    <span className="font-medium">{order.id}</span>
                  </p>
                  <p>
                    <span className="block text-[0.65rem] tracking-[0.2em] text-espresso/70 uppercase">Placed</span>
                    {formatDate(order.date)}
                  </p>
                  <p>
                    <span className="block text-[0.65rem] tracking-[0.2em] text-espresso/70 uppercase">Total</span>
                    <span className="text-ember">{formatPrice(total)}</span>
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-[0.65rem] font-semibold tracking-[0.15em] uppercase ${BADGE[order.status]}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[1fr_auto] md:items-center">
                <ul className="space-y-4">
                  {lines.map(({ product, colour, size, quantity }) => {
                    const image =
                      product.colours.find((c) => c.name === colour)?.images[0] ?? product.images[0]
                    return (
                      <li key={product.id} className="flex items-center gap-4">
                        <img
                          src={image}
                          alt=""
                          loading="lazy"
                          className="h-20 w-16 shrink-0 rounded-lg bg-malibu object-cover"
                        />
                        <div className="min-w-0 text-sm">
                          <Link to={`/product/${product.id}`} className="font-serif text-lg italic hover:text-ember">
                            {product.name}
                          </Link>
                          <p className="text-xs text-espresso/70">
                            {colour} · {size} · Qty {quantity}
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
                <div className="md:w-64">
                  <Tracker status={order.status} />
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
