import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ZoomIn } from 'lucide-react'

/**
 * Main product image with hover zoom (desktop) plus a row of thumbnails.
 *
 * @param {{src: string, alt: string}[]} images
 * @param {number}   activeIndex
 * @param {function} onSelect     called with the thumbnail index
 */
export default function ProductGallery({ images, activeIndex, onSelect }) {
  const [zoom, setZoom] = useState({ active: false, x: 50, y: 50 })
  const active = images[activeIndex] ?? images[0]

  // Zoom follows the pointer: the hovered point stays under the cursor
  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setZoom({
      active: true,
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div>
      <div
        className="group relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-2xl bg-malibu shadow-soft"
        onMouseMove={handleMove}
        onMouseLeave={() => setZoom((current) => ({ ...current, active: false }))}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={active.src}
            src={active.src}
            alt={active.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 size-full object-cover transition-transform duration-300 ease-out"
            style={{
              transformOrigin: `${zoom.x}% ${zoom.y}%`,
              transform: zoom.active ? 'scale(1.8)' : 'scale(1)',
            }}
          />
        </AnimatePresence>
        <span
          className="pointer-events-none absolute right-4 bottom-4 hidden items-center gap-1.5 rounded-full bg-malibu-light/90 px-3 py-1.5 text-[0.65rem] tracking-[0.15em] uppercase opacity-100 transition-opacity group-hover:opacity-0 lg:inline-flex"
          aria-hidden="true"
        >
          <ZoomIn size={13} /> Hover to zoom
        </span>
      </div>

      {images.length > 1 && (
        <ul className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1" aria-label="Product images">
          {images.map((image, index) => (
            <li key={image.src} className="shrink-0">
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-label={`Show image ${index + 1}: ${image.alt}`}
                aria-current={index === activeIndex}
                className={`block h-24 w-20 overflow-hidden rounded-lg bg-malibu transition-all sm:h-28 sm:w-24 ${
                  index === activeIndex ? 'ring-2 ring-ember ring-offset-2 ring-offset-malibu-light' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img src={image.src} alt="" loading="lazy" className="size-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
