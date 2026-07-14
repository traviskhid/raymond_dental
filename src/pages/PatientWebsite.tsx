import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ChevronDown,
  Clock3,
  HeartPulse,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  CheckCircle2,
} from 'lucide-react'
import heroBg from '../assets/hero-bg.png'
import { inquiryService } from '../services/inquiries'

const services = [
  {
    title: 'Cosmetic Dentistry',
    description: 'Smile design, veneers, and whitening with sculpted precision for a flawless look.',
    icon: Sparkles,
  },
  {
    title: 'Implants & Restorations',
    description: 'Restore confident function with seamless, natural-looking results built to last.',
    icon: ShieldCheck,
  },
  {
    title: 'General Care',
    description: 'Comfort-first checkups, prevention, and restorative treatment in a calm setting.',
    icon: Stethoscope,
  },
]

const testimonials = [
  {
    quote: 'The whole experience felt calm, elevated, and deeply personal. My smile now feels effortless.',
    name: 'Maya R.',
    role: 'Cosmetic patient',
  },
  {
    quote: 'Every detail felt intentional—from booking to follow-up. The team made me feel at ease instantly.',
    name: 'Daniel T.',
    role: 'Implant patient',
  },
  {
    quote: 'Modern, warm, and incredibly professional. I trusted them with my smile right away.',
    name: 'Alicia P.',
    role: 'General care',
  },
]

const faqs = [
  {
    question: 'Do you offer same-week appointments?',
    answer: 'Yes. We reserve flexibility for urgent care and new patient visits throughout the week.',
  },
  {
    question: 'Can I book a consultation online?',
    answer: 'Absolutely. Our booking flow takes less than two minutes and can be completed from any device.',
  },
  {
    question: 'Do you offer financing options?',
    answer: 'We offer transparent payment options and support plans tailored to your treatment goals.',
  },
]

const pageVariants: any = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.1 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } },
}

const childVariants: any = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function PatientWebsite() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  // Form State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await inquiryService.create({ name, email, message })
    setIsSubmitting(false)
    setSubmitted(true)
    setName('')
    setEmail('')
    setMessage('')
    setTimeout(() => setSubmitted(false), 5000)
  }

  const nextTestimonial = () => {
    setActiveTestimonial((current) => (current + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveTestimonial((current) => (current - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <motion.div
      className="app-shell"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      <header className="topbar">
        <div className="brand-mark">
          <span className="brand-icon">
            <HeartPulse size={18} />
          </span>
          <span>Raymond's Dental Clinic</span>
        </div>
        <nav className="topnav">
          <a href="#services">Services</a>
          <a href="#results">Results</a>
          <a href="#contact">Contact</a>
        </nav>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/admin/login" className="ghost-button">Admin Login</Link>
          <a className="primary-button" href="#contact" style={{ padding: '10px 20px' }}>Book Visit</a>
        </div>
      </header>

      <main className="page-container">
        <motion.section className="hero-section" variants={childVariants}>
          <div className="hero-copy">
            <motion.p className="eyebrow" variants={childVariants}>Luxury modern dentistry</motion.p>
            <motion.h1 variants={childVariants}>Confidence starts with a smile that feels truly yours.</motion.h1>
            <motion.p className="hero-text" variants={childVariants}>
              Discover elevated care, gentle precision, and a premium experience designed entirely around your comfort and well-being.
            </motion.p>
            <motion.div className="hero-actions" variants={childVariants}>
              <a className="primary-button" href="#contact">
                Book Appointment <ArrowRight size={18} />
              </a>
              <a className="secondary-button" href="#services">
                Explore Services
              </a>
            </motion.div>
            <motion.div className="hero-highlights" variants={childVariants}>
              <div>
                <ShieldCheck size={18} />
                <span>Same-week availability</span>
              </div>
              <div>
                <Sparkles size={18} />
                <span>Digital smile planning</span>
              </div>
            </motion.div>
          </div>

          <motion.div className="hero-visual" variants={childVariants} whileHover={{ scale: 1.02 }} transition={{ type: 'spring', bounce: 0.4 }}>
            <img src={heroBg} alt="Premium Dental Clinic" className="hero-image" />
            <motion.div 
              className="floating-badge"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="icon-box"><HeartPulse size={20} /></div>
              <div>
                <p>Gentle Care Flow</p>
                <span>Advanced 3D Imaging</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className="section-card"
          id="services"
          initial="initial"
          whileInView="in"
          viewport={{ once: true, amount: 0.2 }}
          variants={pageVariants}
        >
          <div className="section-heading">
            <p className="eyebrow">Tailored Care</p>
            <h2>Exceptional services with an immersive experience.</h2>
          </div>
          <div className="service-grid">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <motion.article
                  key={service.title}
                  className="service-card"
                  variants={childVariants}
                >
                  <div className="service-icon">
                    <Icon size={28} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </motion.article>
              )
            })}
          </div>
        </motion.section>

        <motion.section
          className="section-card split-layout"
          id="results"
          initial="initial"
          whileInView="in"
          viewport={{ once: true, amount: 0.2 }}
          variants={pageVariants}
        >
          <motion.div variants={childVariants}>
            <p className="eyebrow">Smile transformations</p>
            <h2>Before and after, with subtle precision.</h2>
            <p className="section-copy">
              Our treatment planning blends artistry and advanced diagnostics so each smile feels natural, healthy, and beautifully confident.
            </p>
            <div className="transformation-bar">
              <div className="before-text">Before</div>
              <div className="after-text">After</div>
              {/* Note: In a real app, this would use a draggable before/after slider component */}
              <div style={{ width: '50%', height: '100%', background: '#e0d8d0', borderRight: '2px solid #fff' }}></div>
              <div style={{ width: '50%', height: '100%', background: '#fbfbf9', position: 'absolute', top: 0, right: 0, zIndex: -1 }}></div>
            </div>
          </motion.div>

          <motion.div className="testimonial-card" variants={childVariants}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', justifyContent: 'flex-end' }}>
              <button onClick={prevTestimonial} className="ghost-button" style={{ padding: '8px', borderRadius: '50%' }}>←</button>
              <button onClick={nextTestimonial} className="ghost-button" style={{ padding: '8px', borderRadius: '50%' }}>→</button>
            </div>
            <p className="testimonial-quote">“{testimonials[activeTestimonial].quote}”</p>
            <div className="testimonial-meta">
              <strong>{testimonials[activeTestimonial].name}</strong>
              <span>{testimonials[activeTestimonial].role}</span>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          className="section-card faq-contact-grid"
          id="contact"
          initial="initial"
          whileInView="in"
          viewport={{ once: true, amount: 0.2 }}
          variants={pageVariants}
        >
          <motion.div className="faq-panel" variants={childVariants}>
            <p className="eyebrow">FAQ</p>
            <h2>Everything you need to know before your visit.</h2>
            <div style={{ marginTop: '32px' }}>
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index
                return (
                  <div key={faq.question} className="faq-item">
                    <button type="button" onClick={() => setActiveFaq(isOpen ? null : index)}>
                      <span>{faq.question}</span>
                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown size={20} /></motion.div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: 'hidden' }}
                        >
                          {faq.answer}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div className="contact-panel" variants={childVariants}>
            <p className="eyebrow">Contact</p>
            <h2>Request a consultation.</h2>
            <form className="contact-form" onSubmit={handleInquirySubmit}>
              <div className="input-group">
                <input type="text" id="name" placeholder=" " required value={name} onChange={e => setName(e.target.value)} />
                <label htmlFor="name">Full Name</label>
              </div>
              <div className="input-group">
                <input type="email" id="email" placeholder=" " required value={email} onChange={e => setEmail(e.target.value)} />
                <label htmlFor="email">Email Address</label>
              </div>
              <div className="input-group">
                <textarea id="message" rows={4} placeholder=" " required value={message} onChange={e => setMessage(e.target.value)}></textarea>
                <label htmlFor="message">How can we help?</label>
              </div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </button>
              {submitted && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#2f855a', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', fontSize: '0.9rem', fontWeight: 500 }}>
                  <CheckCircle2 size={16} /> Request sent successfully. We will contact you soon!
                </motion.div>
              )}
            </form>
            <div className="contact-details">
              <div>
                <PhoneCall size={18} />
                <span>0203607141 / 0542769355</span>
              </div>
              <div>
                <Clock3 size={18} />
                <span>Mon–Sat · 8:00–18:00</span>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </main>

      <footer className="footer">
        <p>Raymond's Dental Clinic · Calm care, sculpted confidence.</p>
      </footer>
    </motion.div>
  )
}
