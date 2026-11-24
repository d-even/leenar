/**
 * Leenar collections. Each product's `collection` field (products.js) points to one of these slugs.
 * `image` is the banner shown on the Collection pages.
 */

import groupShot from '../assets/d382cb92df0ab74063ca79d3c121da87.jpg'
import bag20 from '../assets/bag20.avif'
import bag14model from '../assets/bag14model.avif'
import bag5model from '../assets/bag5model.avif'
import bag19model from '../assets/bag19model.avif'

export const collections = [
  {
    name: 'Everyday Essentials',
    slug: 'everyday-essentials',
    line: 'Effortless pieces made for every day, every errand, every season.',
    image: groupShot,
  },
  {
    name: 'Evening Elegance',
    slug: 'evening-elegance',
    line: 'Polished silhouettes for dinners, weddings and nights to remember.',
    image: bag20,
  },
  {
    name: 'Work & Travel',
    slug: 'work-travel',
    line: 'Structured, generous bags that carry the whole working day.',
    image: bag14model,
  },
  {
    name: 'Mini Treasures',
    slug: 'mini-treasures',
    line: 'Small in size, rich in detail: little bags with big presence.',
    image: bag5model,
  },
  {
    name: 'Limited Edition',
    slug: 'limited-edition',
    line: 'Hand-woven and hand-embellished pieces, made in small batches.',
    image: bag19model,
  },
]

export const getCollectionBySlug = (slug) => collections.find((collection) => collection.slug === slug)
