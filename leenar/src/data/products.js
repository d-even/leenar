/**
 * Leenar product catalogue.
 *
 * HOW TO EDIT
 * - Prices are in rupees (₹), whole numbers, no commas.
 * - Each colour has its own photos: picking a colour on the product page
 *   shows that colour's images. The first colour is the default.
 * - To add a photo: drop it in src/assets, import it below, add it to a colour's `images`.
 * - `collection` must match a slug in collections.js.
 *
 * Fields
 *   id, slug        URL id (/product/:id); kept identical
 *   name, category, collection
 *   price           ₹
 *   colours[]       { name, hex, images[] }
 *   images[]        every photo for the product, default colour first (built automatically)
 *   sizes[]         { name, dimensions }  (dimensions in cm, W × H × D)
 *   description, material, care
 *   rating, reviewsCount, isBestseller, isNew
 */

import bag1 from '../assets/bag1.avif'
import bag2 from '../assets/bag2.avif'
import bag3 from '../assets/bag3.avif'
import bag4 from '../assets/bag4.avif'
import bag4model from '../assets/bag4model.avif'
import bag5 from '../assets/bag5.avif'
import bag5model from '../assets/bag5model.avif'
import bag6 from '../assets/bag6.avif'
import bag7 from '../assets/bag7.avif'
import bag8 from '../assets/bag8.avif'
import bag8model from '../assets/bag8model.avif'
import bag9 from '../assets/bag9.avif'
import bag10 from '../assets/bag10.avif'
import bag11 from '../assets/bag11.avif'
import bag12 from '../assets/bag12.avif'
import bag13 from '../assets/bag13.avif'
import bag14 from '../assets/bag14.avif'
import bag14model from '../assets/bag14model.avif'
import bag15 from '../assets/bag15.avif'
import bag16 from '../assets/bag16.avif'
import bag17 from '../assets/bag17.avif'
import bag18 from '../assets/bag18.avif'
import bag18model from '../assets/bag18model.avif'
import bag19 from '../assets/bag19.avif'
import bag19model from '../assets/bag19model.avif'
import bag20 from '../assets/bag20.avif'

/** Shown wherever a product has no specific care note. */
const LEATHER_CARE =
  'Wipe gently with a soft, dry cloth. Keep away from water, direct heat and sharp objects. ' +
  'Condition the leather every few months with a neutral leather balm. Store stuffed and in the dust bag provided.'

/** Product categories, in the order filters should show them. */
export const CATEGORIES = ['Top-Handle', 'Totes', 'Shoulder Bags', 'Crossbody', 'Clutches', 'Wallets', 'Backpacks']

const RAW_PRODUCTS = [
  {
    id: 'aurea',
    name: 'Aurea',
    category: 'Wallets',
    collection: 'everyday-essentials',
    price: 4490,
    colours: [
      { name: 'Whisky', hex: '#9A5A2A', images: [bag2] },
      { name: 'Mustard', hex: '#D49A2A', images: [bag4, bag4model] },
    ],
    sizes: [{ name: 'One Size', dimensions: '20 × 11 × 4 cm' }],
    description:
      'A flap wallet that doubles as an evening chain bag. Aurea holds your cards, notes and phone in a slim, softly structured silhouette, with a detachable chain so it moves from handbag to hand with ease.',
    material: '100% genuine top-grain leather, suede-finish lining, gold-tone detachable chain and magnetic closure.',
    rating: 4.8,
    reviewsCount: 126,
    isBestseller: true,
    isNew: false,
  },
  {
    id: 'verona',
    name: 'Verona',
    category: 'Top-Handle',
    collection: 'evening-elegance',
    price: 9490,
    colours: [
      { name: 'Tan', hex: '#8A4B26', images: [bag17] },
      { name: 'Black', hex: '#1E1A17', images: [bag18] },
    ],
    sizes: [
      { name: 'Medium', dimensions: '24 × 17 × 9 cm' },
      { name: 'Large', dimensions: '29 × 20 × 11 cm' },
    ],
    description:
      'Clean architectural lines and a signature envelope flap. Verona is a structured top-handle bag with a detachable shoulder strap, made to carry you from the boardroom to dinner.',
    material:
      '100% genuine top-grain leather, hand-painted edges, brushed gold hardware, cotton-twill lining with an inner zip pocket.',
    rating: 4.9,
    reviewsCount: 98,
    isBestseller: true,
    isNew: false,
  },
  {
    id: 'isla',
    name: 'Isla',
    category: 'Clutches',
    collection: 'evening-elegance',
    price: 5290,
    colours: [{ name: 'Black', hex: '#1E1A17', images: [bag8, bag8model] }],
    sizes: [{ name: 'Small', dimensions: '22 × 13 × 3 cm' }],
    description:
      'A small crossbody clutch with a soft rounded flap. Carry Isla in hand for the evening, or clip on the slim strap and wear it crossbody.',
    material: '100% genuine pebble-grain leather, microfibre lining, detachable leather strap, magnetic flap closure.',
    rating: 4.7,
    reviewsCount: 84,
    isBestseller: true,
    isNew: false,
  },
  {
    id: 'evora',
    name: 'Evora',
    category: 'Totes',
    collection: 'work-travel',
    price: 11990,
    colours: [
      { name: 'Black', hex: '#1E1A17', images: [bag12] },
      { name: 'Chocolate', hex: '#5A2F1E', images: [bag11] },
    ],
    sizes: [
      { name: 'Medium', dimensions: '32 × 26 × 13 cm' },
      { name: 'Large', dimensions: '38 × 30 × 15 cm' },
    ],
    description:
      'The everyday tote, perfected. Evora fits a 13" laptop, a notebook and everything in between, with comfortable shoulder handles and a clean, structured base that stands on its own.',
    material:
      '100% genuine full-grain leather, reinforced base, antique-gold hardware, cotton lining with laptop sleeve and two slip pockets.',
    rating: 4.8,
    reviewsCount: 152,
    isBestseller: true,
    isNew: false,
  },
  {
    id: 'classic-mini',
    name: 'Classic Mini',
    category: 'Top-Handle',
    collection: 'mini-treasures',
    price: 7990,
    colours: [{ name: 'Rose Gold', hex: '#C9937A', images: [bag16, bag5model] }],
    sizes: [{ name: 'Mini', dimensions: '19 × 13 × 7 cm' }],
    description:
      'Our signature envelope silhouette in a jewel-like metallic finish. The Classic Mini is small enough for an evening, polished enough for a wedding, and comes with a detachable crossbody strap.',
    material:
      '100% genuine metallic-finish leather, gold-tone turn-lock and hardware, suede-finish lining, detachable adjustable strap.',
    care: 'Metallic finishes are delicate: avoid abrasion and moisture. Wipe with a soft dry cloth only and store in the dust bag.',
    rating: 4.9,
    reviewsCount: 67,
    isBestseller: false,
    isNew: true,
  },
  {
    id: 'siena',
    name: 'Siena',
    category: 'Crossbody',
    collection: 'everyday-essentials',
    price: 6990,
    colours: [
      { name: 'Chestnut', hex: '#5E2E1F', images: [bag5] },
      { name: 'Black', hex: '#1E1A17', images: [bag6] },
    ],
    sizes: [{ name: 'Standard', dimensions: '23 × 18 × 8 cm' }],
    description:
      'A saddle-inspired crossbody with a polished push-lock. Siena sits neatly at the hip and keeps your essentials close, hands free, all day.',
    material: '100% genuine top-grain leather, gold-tone push-lock, adjustable leather strap, cotton-twill lining.',
    rating: 4.7,
    reviewsCount: 73,
    isBestseller: false,
    isNew: false,
  },
  {
    id: 'luna',
    name: 'Luna',
    category: 'Clutches',
    collection: 'mini-treasures',
    price: 3990,
    colours: [
      { name: 'Cocoa', hex: '#5A3020', images: [bag7] },
      { name: 'Scarlet', hex: '#C8322B', images: [bag9] },
    ],
    sizes: [{ name: 'One Size', dimensions: '21 × 12 × 4 cm' }],
    description:
      'A half-moon flap clutch with a soft, rounded line. Luna is the small, easy piece that finishes an outfit, in a classic cocoa or a confident scarlet.',
    material: '100% genuine pebble-grain leather, magnetic flap closure, microfibre lining with card slots.',
    rating: 4.6,
    reviewsCount: 58,
    isBestseller: false,
    isNew: true,
  },
  {
    id: 'nora',
    name: 'Nora',
    category: 'Backpacks',
    collection: 'everyday-essentials',
    price: 8490,
    colours: [{ name: 'Black', hex: '#1E1A17', images: [bag10] }],
    sizes: [{ name: 'Standard', dimensions: '24 × 30 × 13 cm' }],
    description:
      'A soft leather backpack with a ruched top handle and drawstring opening under a protective flap. Nora is relaxed enough for weekends and refined enough for the city.',
    material: '100% genuine nappa leather, adjustable leather shoulder straps, drawstring closure, cotton lining.',
    rating: 4.6,
    reviewsCount: 41,
    isBestseller: false,
    isNew: false,
  },
  {
    id: 'milano',
    name: 'Milano',
    category: 'Shoulder Bags',
    collection: 'work-travel',
    price: 10490,
    colours: [
      { name: 'Tan', hex: '#A66A3A', images: [bag13] },
      { name: 'Gunmetal', hex: '#4A4644', images: [bag15] },
    ],
    sizes: [{ name: 'Standard', dimensions: '34 × 22 × 12 cm' }],
    description:
      'A trapeze shoulder bag with a sculpted, flared base. Milano has room for the full working day and a silhouette that stands out in the best way.',
    material:
      '100% genuine textured leather, rolled leather handles, gold-tone feet to protect the base, zip-top closure.',
    rating: 4.7,
    reviewsCount: 62,
    isBestseller: false,
    isNew: false,
  },
  {
    id: 'kaia',
    name: 'Kaia',
    category: 'Totes',
    collection: 'work-travel',
    price: 12490,
    colours: [{ name: 'Black Weave', hex: '#1E1A17', images: [bag14, bag14model] }],
    sizes: [{ name: 'Standard', dimensions: '36 × 24 × 14 cm' }],
    description:
      'Leather strips hand-woven into a subtle basket texture, shaped into a generous trapeze tote. Kaia shows off our artisans’ craft at its most patient.',
    material: '100% genuine hand-woven leather, slim shoulder handles, zip-top closure, cotton-twill lining.',
    rating: 4.9,
    reviewsCount: 39,
    isBestseller: false,
    isNew: true,
  },
  {
    id: 'lucca',
    name: 'Lucca',
    category: 'Top-Handle',
    collection: 'limited-edition',
    price: 9990,
    colours: [
      { name: 'Cognac', hex: '#8C4A22', images: [bag19, bag19model] },
      { name: 'Black', hex: '#1E1A17', images: [bag18model] },
    ],
    sizes: [{ name: 'Standard', dimensions: '28 × 16 × 12 cm' }],
    description:
      'A bowling bag with a woven leather panel and contrast trims. Lucca is made in small batches, so each one carries a little of its maker’s hand.',
    material:
      '100% genuine leather with hand-woven panels, rolled top handles, two-way zip closure, cotton-twill lining.',
    rating: 4.8,
    reviewsCount: 47,
    isBestseller: true,
    isNew: false,
  },
  {
    id: 'zari',
    name: 'Zari',
    category: 'Crossbody',
    collection: 'limited-edition',
    price: 5990,
    colours: [
      { name: 'Gold Sequin', hex: '#C9A24A', images: [bag3] },
      { name: 'Bronze Chevron', hex: '#7A4A26', images: [bag1] },
    ],
    sizes: [{ name: 'Phone Sling', dimensions: '11 × 19 × 3 cm' }],
    description:
      'A phone sling with a hand-embellished front panel, framed in leather. Zari carries your phone, cards and lipstick, and turns a simple outfit into a festive one.',
    material:
      'Genuine leather body with hand-embellished sequin panel, gold-tone frame, detachable chain strap, satin lining.',
    care: 'Avoid pulling or snagging the embellishment. Spot-clean the leather with a dry cloth and store flat in the dust bag.',
    rating: 4.7,
    reviewsCount: 52,
    isBestseller: false,
    isNew: true,
  },
  {
    id: 'mirage',
    name: 'Mirage',
    category: 'Clutches',
    collection: 'evening-elegance',
    price: 6490,
    colours: [{ name: 'Monochrome', hex: '#2A2522', images: [bag20] }],
    sizes: [{ name: 'Minaudière', dimensions: '18 × 11 × 5 cm' }],
    description:
      'A box minaudière in a bold black-and-white chevron with a jewelled clasp. Mirage is the statement piece for weddings, galas and every night worth dressing up for.',
    material:
      'Genuine leather and hand-laid inlay on a structured frame, jewelled clasp, detachable chain, satin lining.',
    care: 'Keep away from perfume and moisture. Wipe gently with a soft dry cloth and store in the box provided.',
    rating: 4.8,
    reviewsCount: 29,
    isBestseller: false,
    isNew: true,
  },
]

/** Final product list with defaults filled in (slug, images, care). */
export const products = RAW_PRODUCTS.map((product) => ({
  ...product,
  slug: product.slug ?? product.id,
  images: product.colours.flatMap((colour) => colour.images),
  care: product.care ?? LEATHER_CARE,
}))

/* ---------- Helpers ---------- */

export const getProductById = (id) => products.find((product) => product.id === id)

export const getBestsellers = () => products.filter((product) => product.isBestseller)

export const getProductsByCollection = (slug) => products.filter((product) => product.collection === slug)

/** Colours across the whole catalogue (for the Shop filter), de-duplicated by name. */
export const ALL_COLOURS = [
  ...new Map(products.flatMap((product) => product.colours).map((colour) => [colour.name, colour])).values(),
].map(({ name, hex }) => ({ name, hex }))
