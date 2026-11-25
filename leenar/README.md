# Leenar Website

A premium, fully responsive, frontend-only e-commerce website for **Leenar (LEE-NAR)**: women's leather handbags handcrafted in India by artisans with 30 years of experience.

Built with **React 19 + Vite**, **Tailwind CSS v4**, **React Router**, **Framer Motion** and **lucide-react**. There is no backend: products come from local data files, and the cart, wishlist and profile are saved in the visitor's browser (localStorage).

---

## Run it

You need [Node.js](https://nodejs.org/) 20 or newer.

```bash
cd leenar
npm install        # first time only
npm run dev        # start the dev site at http://localhost:5173
```

Other commands:

| Command | What it does |
|---|---|
| `npm run build` | Builds the production site into `dist/` |
| `npm run preview` | Serves the built `dist/` folder locally to check it |
| `npm run lint` | Checks the code for mistakes (oxlint) |

**Deploying:** upload the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages…). It's a single-page app, so configure the host to serve `index.html` for every route (Netlify: a `_redirects` file with `/* /index.html 200`; Vercel does this automatically for Vite).

---

## Pages

| Route | Page |
|---|---|
| `/` | Home: hero, trust strip, bestsellers, customer reviews |
| `/about` | Our story: founders, how a bag is made, why choose Leenar |
| `/shop` | All bags with category, colour and price filters, and sorting |
| `/product/:id` | Product detail: gallery, colours, sizes, add to cart |
| `/collection` | All collections |
| `/collection/:slug` | One collection's bags |
| `/contact` | Contact form, details, custom & bulk orders |
| `/profile` | Account: profile, orders, wishlist, addresses (no login) |
| `/wishlist` | Saved bags |

---

## Where to edit things

Almost everything you'll want to change lives in **`src/data/`**. Edit, save, and the dev site updates instantly.

### Products and prices: `src/data/products.js`

Each product looks like this:

```js
{
  id: 'verona',                     // used in the URL: /product/verona
  name: 'Verona',
  category: 'Top-Handle',           // must be one of CATEGORIES at the top of the file
  collection: 'evening-elegance',   // must match a slug in collections.js
  price: 9490,                      // rupees, whole number, no commas
  colours: [
    { name: 'Tan',   hex: '#8A4B26', images: [bag17] },
    { name: 'Black', hex: '#1E1A17', images: [bag18] },
  ],
  sizes: [{ name: 'Medium', dimensions: '24 × 17 × 9 cm' }],
  description: '…',
  material: '…',
  care: '…',                        // optional; a standard leather care note is used if left out
  rating: 4.9,
  reviewsCount: 98,
  isBestseller: true,               // shows the Gold "Bestseller" badge and the Home bestsellers row
  isNew: false,                     // shows the "New" badge and sorts first under "Newest"
}
```

- **Change a price:** edit `price`. It updates the shop, product page, cart and orders.
- **Add a product:** copy an existing block, give it a new unique `id`, and fill in the fields.
- **Remove a product:** delete its block.
- The first colour is the default one shown on cards.

### Images: `src/assets/`

1. Put the photo in `src/assets/` (`.avif`, `.webp`, `.jpg` and `.png` all work; aim for about 1200–1600 px wide).
2. Import it at the top of the data file, e.g. `import bag21 from '../assets/bag21.avif'`.
3. Use it in a colour's `images: [...]` list (the first image is the main one).

**Replacing a photo with a sharper version:** give the new file the same name as the old one and nothing else needs changing.

| What | Where |
|---|---|
| Product photos | `src/data/products.js` (per colour) |
| Collection banners | `src/data/collections.js` (`image`) |
| Home hero | `src/components/home/Hero.jsx` |
| About page photos, founder photos, process steps | `src/data/about.js` |
| Logo | `src/assets/logo.avif` (white logo, used on dark backgrounds) |
| Favicon / app icons | `public/favicon-32.png`, `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png` |

### Other content

| What | File |
|---|---|
| Collections (name, short line, banner) | `src/data/collections.js` |
| Customer reviews on Home | `src/data/reviews.js` |
| About page text, founders, stats, process steps | `src/data/about.js` |
| Email, phone, WhatsApp, address, hours, social links, nav links | `src/data/site.js` |
| Shipping & returns text on product pages | `src/data/site.js` (`SHIPPING_RETURNS`) |
| Contact form subjects | `src/data/site.js` (`CONTACT_SUBJECTS`) |
| Sample order history on the profile | `src/data/orders.js` |
| Price filter ranges and sort options | `src/utils/shopFilters.js` |

### Brand colours and fonts: `src/index.css`

The `@theme` block at the top defines the palette (`espresso`, `ember`, `gold`, `malibu`, `malibu-light`), the fonts (Playfair Display + DM Sans, loaded in `index.html`) and the shadows. Change a value there and it updates across the whole site.

---

## Placeholders to replace before launch

- **`src/data/site.js`:** phone number, WhatsApp number, studio address, opening hours, social profile links
- **`src/data/site.js`:** the shipping and returns policy (currently a placeholder "7-day returns")
- **`src/data/about.js`:** `[Founder Name]` placeholders and founder photos; real workshop photos for the process steps
- **`src/data/products.js`:** made-up product names (beyond Aurea, Verona, Isla, Evora, Classic Mini), prices, ratings, review counts and dimensions
- **`src/data/reviews.js`:** sample reviews
- **Contact form and newsletter:** they validate and show a thank-you message but don't send anything yet. Connect a form service (Formspree, EmailJS, etc.) in `src/components/contact/ContactForm.jsx` and the newsletter in `src/components/layout/Footer.jsx`.
- **Checkout:** shows "Checkout coming soon"; connect a payment provider when ready.

---

## Project structure

```
src/
  assets/        images and logo
  components/
    ui/          Button, Container, SectionTitle, StarRating, Accordion, TextField, QuantityStepper
    layout/      Navbar, CartDrawer, Footer, Layout
    home/ about/ shop/ product/ collection/ contact/ profile/   page sections
    icons/       social icons
    ProductCard.jsx
  context/       Cart, Wishlist, Profile and Toast providers (saved to localStorage)
  data/          products, collections, reviews, about, orders, site settings
  hooks/         useCart, useWishlist, useProfile, useToast, usePageMeta, focus trap, scroll lock
  pages/         one file per route
  utils/         price formatting, shop filters, form validation
```

## Accessibility and performance notes

- Keyboard friendly: visible Gold focus rings, "Skip to content" link, focus kept inside the cart drawer, filter drawer and mobile menu, Esc to close.
- Colour contrast checked with axe-core against WCAG 2 AA.
- Animations are reduced automatically for visitors who prefer reduced motion.
- Pages are code-split and load on first visit; images below the fold lazy-load.
