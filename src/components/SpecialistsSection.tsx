import { motion } from 'framer-motion'
import { ShieldCheck, GraduationCap, Calendar } from 'lucide-react'

const specialists = [
  {
    name: 'Dr. Raymond Mawuli',
    title: 'Clinical Director & Aesthetic Lead',
    qualifications: 'BDS (Hons), MSc Cosmetic Dentistry (London)',
    specialty: 'Minimally Invasive Veneers & Full Mouth Reconstruction',
    experience: '14+ Years Experience',
    accreditations: ['Royal College of Surgeons', 'British Academy of Cosmetic Dentistry'],
    initials: 'RM',
    accentColor: 'linear-gradient(135deg, #1e3a47 0%, #2c5364 100%)',
  },
  {
    name: 'Dr. Elena Vance',
    title: 'Specialist Orthodontist',
    qualifications: 'DDS, MOrth RCSEd, Diamond Invisalign Provider',
    specialty: 'Discreet Adult Orthodontics & Digital Arch Alignment',
    experience: '10+ Years Experience',
    accreditations: ['European Orthodontic Society', 'Invisalign Apex Elite'],
    initials: 'EV',
    accentColor: 'linear-gradient(135deg, #b09170 0%, #c4a98a 100%)',
  },
  {
    name: 'Dr. Marcus Chen',
    title: 'Periodontist & Implant Surgeon',
    qualifications: 'BDS, Dip Imp Dent RCS (Eng), FICOI',
    specialty: 'Guided 3D Keyhole Implants & Soft Tissue Aesthetics',
    experience: '12+ Years Experience',
    accreditations: ['International Congress of Oral Implantologists', 'ITI Fellow'],
    initials: 'MC',
    accentColor: 'linear-gradient(135deg, #1e3a47 0%, #3a6073 100%)',
  },
]

export default function SpecialistsSection() {
  return (
    <section className="section-card specialists-section" id="specialists">
      <div className="section-heading">
        <p className="eyebrow">World-Class Clinical Faculty</p>
        <h2>Led by accomplished dental surgeons and specialists.</h2>
        <p className="section-copy" style={{ margin: '8px auto 0', maxWidth: '640px' }}>
          Every treatment is planned and executed by registered specialists with decades of combined clinical training and advanced post-graduate fellowships.
        </p>
      </div>

      <div className="specialists-grid">
        {specialists.map((spec, index) => (
          <motion.div
            key={spec.name}
            className="specialist-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <div className="specialist-banner">
              <div
                className="specialist-avatar"
                style={{ background: spec.accentColor }}
              >
                <span>{spec.initials}</span>
              </div>
              <span className="exp-badge">
                <Calendar size={12} /> {spec.experience}
              </span>
            </div>

            <div className="specialist-content">
              <h3>{spec.name}</h3>
              <div className="specialist-title">{spec.title}</div>
              <div className="specialist-quals">
                <GraduationCap size={14} />
                <span>{spec.qualifications}</span>
              </div>

              <div className="specialist-focus">
                <span className="focus-label">Focus:</span>
                <span className="focus-text">{spec.specialty}</span>
              </div>

              <div className="specialist-accreditations">
                {spec.accreditations.map((acc, idx) => (
                  <div key={idx} className="accreditation-item">
                    <ShieldCheck size={13} color="var(--color-accent-dark)" />
                    <span>{acc}</span>
                  </div>
                ))}
              </div>

              <div className="specialist-footer">
                <a href="#contact" className="consult-link">
                  Request Consultation with {spec.name.split(' ')[1]} →
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
