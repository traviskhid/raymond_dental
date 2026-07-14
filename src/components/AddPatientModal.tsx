import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { Patient } from '../pages/admin/types'
import { patientService } from '../services/patients'

interface AddPatientModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (patient: Patient) => void
}

export default function AddPatientModal({ isOpen, onClose, onSuccess }: AddPatientModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Auto-generate some fields for the mock backend
    const newPatient: Patient = {
      id: `#${Math.floor(10000 + Math.random() * 90000)}`, // random ID like #12345
      name,
      email,
      phone,
      dob,
      notes,
      lastVisit: '—',
      nextAppointment: '—',
      treatments: [],
      status: 'Active'
    }

    const created = await patientService.create(newPatient)
    setIsSubmitting(false)
    onSuccess(created)
    
    // Reset form
    setName('')
    setEmail('')
    setPhone('')
    setDob('')
    setNotes('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={onClose}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999 }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="modal-content admin-panel"
            style={{ position: 'fixed', top: '10vh', left: '0', right: '0', margin: '0 auto', maxWidth: '500px', zIndex: 1000, padding: '32px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Register New Patient</h2>
              <button onClick={onClose} className="ghost-button" style={{ padding: '8px', borderRadius: '50%' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600 }}>Full Name</label>
                <input required value={name} onChange={e => setName(e.target.value)} type="text" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border-strong)', outline: 'none' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600 }}>Email</label>
                  <input required value={email} onChange={e => setEmail(e.target.value)} type="email" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border-strong)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600 }}>Phone</label>
                  <input required value={phone} onChange={e => setPhone(e.target.value)} type="tel" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border-strong)', outline: 'none' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600 }}>Date of Birth</label>
                <input required value={dob} onChange={e => setDob(e.target.value)} type="date" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border-strong)', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600 }}>Initial Notes (Optional)</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border-strong)', outline: 'none', resize: 'vertical' }} />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={onClose} className="ghost-button" style={{ padding: '10px 20px', borderRadius: '8px' }}>Cancel</button>
                <button type="submit" className="primary-button" disabled={isSubmitting} style={{ padding: '10px 20px', borderRadius: '8px' }}>
                  {isSubmitting ? 'Registering...' : 'Register Patient'}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
