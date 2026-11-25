/**
 * Content for the About page. Edit the text here; the page layout picks it up.
 *
 * FOUNDER PHOTOS: there are none in src/assets yet. Add a photo, import it
 * below and set `image` on the founder; until then a branded placeholder shows.
 *
 * PROCESS PHOTOS: the steps currently use close crops of product photos.
 * Swap in real workshop photos when available (same `image` field).
 */

import bag12 from '../assets/bag12.avif'
import bag14 from '../assets/bag14.avif'
import bag16 from '../assets/bag16.avif'
import bag17 from '../assets/bag17.avif'
import bag19 from '../assets/bag19.avif'
import groupShot from '../assets/d382cb92df0ab74063ca79d3c121da87.jpg'

export const FOUNDERS = [
  { name: '[Founder Name]', role: 'Co-founder & Master Artisan', image: null },
  { name: '[Founder Name]', role: 'Co-founder & Creative Director', image: null },
]

/** International houses the founders have created for (plain text, not logos). */
export const HOUSES = ['Donald J Pliner', 'Kate Spade', 'Miu Miu']

export const FOUNDER_STORY = [
  'For nearly thirty years, our founders have worked at the bench: selecting hides, cutting patterns and stitching bags by hand. Their workshop has created pieces for international houses including Donald J Pliner, Kate Spade and Miu Miu.',
  'Leenar is the label they always wanted to build: the same world-class craft, the same uncompromising leather, now carrying their own name and made for the women of India.',
]

export const STATS = [
  { value: '30+', label: 'Years of craft' },
  { value: '3', label: 'Global fashion houses' },
  { value: '100%', label: 'Real leather' },
]

/**
 * "How Your Bag Is Made". `title` + `accent` form the heading (accent shows in Ember).
 * `zoom` and `position` frame the photo as a close-up.
 */
export const PROCESS_STEPS = [
  {
    title: 'Selecting the',
    accent: 'Leather',
    detail: '100% real, top-grain',
    text: 'Every bag begins with the hide. We choose only 100% real, top-grain leather, checking each piece by hand for grain, thickness and the natural character that makes it unique.',
    image: bag14,
    alt: 'Close-up of hand-woven black leather',
    zoom: 1.6,
    position: '50% 60%',
  },
  {
    title: 'Design &',
    accent: 'Pattern Cutting',
    detail: 'Precision by hand',
    text: 'Our designers draft every silhouette on paper first. Patterns are then cut by hand, positioned to use the strongest, most beautiful part of each hide.',
    image: bag17,
    alt: 'Tan leather top-handle bag with an envelope flap',
    zoom: 1.15,
    position: '50% 50%',
  },
  {
    title: 'Hand Stitching by',
    accent: 'Artisans',
    detail: '30 years of skill',
    text: 'Panels are joined stitch by stitch by artisans with three decades at the bench. Tight, even stitching is what keeps a Leenar bag in shape for years.',
    image: bag19,
    alt: 'Detail of stitched leather panels on a cognac bowling bag',
    zoom: 1.5,
    position: '50% 55%',
  },
  {
    title: 'Edge Finishing &',
    accent: 'Hardware',
    detail: 'Painted, polished, fitted',
    text: 'Edges are sanded, painted and burnished in layers for a smooth, sealed finish. Then each clasp, lock and strap fitting is set by hand.',
    image: bag16,
    alt: 'Gold turn-lock hardware on a rose-gold leather bag',
    zoom: 1.9,
    position: '50% 58%',
  },
  {
    title: 'The Final',
    accent: 'Quality Check',
    detail: 'Every seam, every bag',
    text: 'Before a bag earns the Leenar name, it is inspected inch by inch: seams, edges, lining, hardware and shape. Anything less than perfect goes back to the bench.',
    image: bag12,
    alt: 'Black leather tote standing upright',
    zoom: 1.1,
    position: '50% 50%',
  },
  {
    title: 'Packed With Care,',
    accent: 'Delivered to You',
    detail: 'Free shipping across India',
    text: 'Your bag is wrapped in its own dust bag, boxed by hand and sent to your door with free shipping across India, ready to be carried for life.',
    image: groupShot,
    alt: 'A row of Leenar leather bags on a warm brown backdrop',
    zoom: 1.05,
    position: '50% 55%',
  },
]
