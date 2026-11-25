/**
 * Sample order history shown on the profile page (frontend only, no real orders).
 * Each item points to a product id in products.js; prices are read from there.
 */
export const ORDER_STATUSES = ['Processing', 'Shipped', 'Delivered']

export const orders = [
  {
    id: 'LNR-10533',
    date: '2026-11-21',
    status: 'Processing',
    items: [{ productId: 'classic-mini', colour: 'Rose Gold', size: 'Mini', quantity: 1 }],
  },
  {
    id: 'LNR-10517',
    date: '2026-11-12',
    status: 'Shipped',
    items: [
      { productId: 'aurea', colour: 'Whisky', size: 'One Size', quantity: 1 },
      { productId: 'luna', colour: 'Scarlet', size: 'One Size', quantity: 1 },
    ],
  },
  {
    id: 'LNR-10482',
    date: '2026-09-28',
    status: 'Delivered',
    items: [{ productId: 'evora', colour: 'Black', size: 'Medium', quantity: 1 }],
  },
  {
    id: 'LNR-10419',
    date: '2026-07-03',
    status: 'Delivered',
    items: [{ productId: 'verona', colour: 'Tan', size: 'Medium', quantity: 1 }],
  },
]
