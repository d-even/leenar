import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Gift, Mail, MapPin, Palette, Phone } from 'lucide-react'
import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import ContactForm from '../components/contact/ContactForm'
import { WhatsAppIcon } from '../components/icons/SocialIcons'
import { SOCIAL_ICONS } from '../components/icons/socialIconMap'
import { CONTACT_SUBJECTS, SITE, SOCIAL_LINKS } from '../data/site'

const EASE = [0.22, 1, 0.36, 1]
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: EASE },
})

const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hello Leenar, I have a question about ')}`

const ORDER_TYPES = [
  {
    subject: 'custom',
    icon: Palette,
    title: 'Custom Orders',
    accent: 'Made for You',
    text: 'Choose your leather, colour, size and hardware, or add your initials. Our artisans will craft a one-of-a-kind piece around your idea.',
    points: ['Personal initials & monograms', 'Your choice of leather and colour', 'Sizes adapted to your needs'],
  },
  {
    subject: 'bulk',
    icon: Gift,
    title: 'Bulk & Business',
    accent: 'Enquiries',
    text: 'Corporate gifting, wedding favours, boutique and hotel partnerships: we make small and large batches with the same hand-finished quality.',
    points: ['Corporate & festive gifting', 'Wedding & trousseau orders', 'Boutique and retail partnerships'],
  },
]

/** Contact page body; `initial` is the subject from the URL (?subject=custom). */
function ContactContent({ initial }) {
  const [subject, setSubject] = useState(CONTACT_SUBJECTS.some(({ id }) => id === initial) ? initial : 'general')

  // Pick a subject from the custom / bulk cards, then take the visitor to the form
  const startEnquiry = (id) => {
    setSubject(id)
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    window.setTimeout(() => document.getElementById('contact-message')?.focus({ preventScroll: true }), 600)
  }

  const details = [
    { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Phone, label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Studio', value: SITE.address },
    { icon: Clock, label: 'Hours', value: SITE.hours },
  ]

  return (
    <>
      <Container as="section" size="wide" className="py-14 lg:py-20">
        <SectionTitle
          as="h1"
          eyebrow="Get in touch"
          title="We'd Love to Hear From You"
          subtitle="We respond to every message. Ask about a bag, an order, care, or something made just for you."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Form */}
          <motion.div {...fadeUp()} className="rounded-3xl bg-malibu p-6 sm:p-10 lg:col-span-7 lg:p-12">
            <h2 className="font-serif text-3xl">
              Send us a <em className="text-ember">Message</em>
            </h2>
            <div className="mt-4 mb-8 h-px w-12 bg-gold" aria-hidden="true" />
            <ContactForm subject={subject} onSubjectChange={setSubject} />
          </motion.div>

          {/* Details */}
          <motion.aside
            {...fadeUp(0.12)}
            className="flex flex-col rounded-3xl bg-gradient-to-br from-ember via-[#5e2702] to-espresso p-6 text-malibu-light sm:p-10 lg:col-span-5 lg:p-12"
            aria-label="Contact details"
          >
            <h2 className="font-serif text-3xl text-malibu-light">
              Contact <em className="text-gold">Details</em>
            </h2>
            <div className="mt-4 h-px w-12 bg-gold" aria-hidden="true" />

            <ul className="mt-8 space-y-6">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-malibu/25 text-gold">
                    <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.7rem] tracking-[0.2em] text-malibu/60 uppercase">{label}</p>
                    {href ? (
                      <a href={href} className="mt-0.5 block break-words hover:text-gold">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center justify-center gap-3 rounded-full bg-malibu px-7 py-4 text-sm font-medium tracking-[0.08em] text-espresso uppercase shadow-soft transition-all hover:bg-malibu-light hover:shadow-lift"
            >
              <WhatsAppIcon size={20} /> Chat on WhatsApp
            </a>

            <div className="mt-auto pt-10">
              <p className="text-[0.7rem] tracking-[0.2em] text-malibu/60 uppercase">Follow our craft</p>
              <ul className="mt-4 flex gap-3">
                {SOCIAL_LINKS.map(({ name, href }) => {
                  const Icon = SOCIAL_ICONS[name]
                  return (
                    <li key={name}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Leenar on ${name}`}
                        className="flex size-10 items-center justify-center rounded-full border border-malibu/25 transition-colors hover:border-gold hover:text-gold"
                      >
                        <Icon size={18} />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </motion.aside>
        </div>
      </Container>

      {/* Custom & bulk orders */}
      <section id="custom-orders" className="border-t border-gold/25 bg-malibu py-20 lg:py-24" aria-labelledby="orders-title">
        <Container size="wide">
          <SectionTitle
            align="left"
            eyebrow="Beyond the collection"
            title={
              <span id="orders-title">
                Custom & Bulk <span className="text-ember">Orders</span>
              </span>
            }
            subtitle="The same hands that make our collection can make something entirely yours."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {ORDER_TYPES.map(({ subject: id, icon: Icon, title, accent, text, points }, index) => (
              <motion.article
                key={id}
                {...fadeUp(index * 0.12)}
                className="flex flex-col rounded-3xl bg-malibu-light p-7 shadow-soft sm:p-10"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-malibu text-ember">
                  <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-serif text-3xl">
                  {title} <em className="text-ember">{accent}</em>
                </h3>
                <p className="mt-4 text-espresso/75">{text}</p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {points.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <span className="size-1.5 rotate-45 bg-gold" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => startEnquiry(id)}
                  className="mt-8 inline-flex items-center gap-2 self-start text-sm font-medium tracking-[0.1em] text-espresso uppercase underline decoration-gold underline-offset-8 transition-colors hover:text-ember"
                >
                  Start an enquiry <ArrowRight size={15} aria-hidden="true" />
                </button>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

/**
 * Contact page (/contact). Keyed by the ?subject= value so links like the footer's
 * "Custom & Bulk Orders" pre-select the subject even when already on this page.
 */
export default function Contact() {
  const [params] = useSearchParams()
  const initial = params.get('subject')
  return <ContactContent key={initial ?? 'general'} initial={initial} />
}
