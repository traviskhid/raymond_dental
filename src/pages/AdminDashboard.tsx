import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  TrendingUp,
  MessageSquare
} from 'lucide-react'
import { patientService } from '../services/patients'
import { appointmentService } from '../services/appointments'
import { inquiryService } from '../services/inquiries'
import type { Patient, Appointment, Inquiry } from './admin/types'
import AddPatientModal from '../components/AddPatientModal'

const stats = [
  { label: 'Weekly patients', value: '148', change: '+12%', positive: true },
  { label: 'Revenue estimate', value: '$24k', change: '+8%', positive: true },
  { label: 'Pending inquiries', value: '12', change: '-3', positive: false },
]

const itemVariants: any = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    const [fetchedAppointments, fetchedPatients, fetchedInquiries] = await Promise.all([
      appointmentService.getAll(),
      patientService.getAll(),
      inquiryService.getAll()
    ])
    setAppointments(fetchedAppointments.slice(0, 5))
    setPatients(fetchedPatients.slice(0, 4))
    setInquiries(fetchedInquiries.slice(0, 5))
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handlePatientAdded = () => {
    setIsPatientModalOpen(false)
    fetchData()
  }

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading dashboard...</div>

  return (
    <>
      {/* Header */}
        <motion.div className="admin-header" variants={itemVariants}>
          <div>
            <p style={{ margin: '0 0 6px', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
              {today}
            </p>
            <h1>Good morning, Dr. Raymond 👋</h1>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span className="status-tag confirmed">● System Online</span>
          </div>
        </motion.div>

        {/* Metrics */}
        <motion.div className="metrics-row" variants={itemVariants}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="metric-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span>{stat.label}</span>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: stat.positive ? '#2f855a' : '#c53030',
                  background: stat.positive ? 'rgba(72,187,120,0.1)' : 'rgba(245,101,101,0.1)',
                  padding: '2px 8px',
                  borderRadius: '99px'
                }}>
                  {stat.change}
                </span>
              </div>
              <strong>{stat.value}</strong>
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>
                <TrendingUp size={14} />
                vs last week
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px', marginBottom: '32px' }}>
          {/* Today's Schedule */}
          <motion.div className="admin-panel" variants={itemVariants}>
            <div className="panel-header">
              <h3>Today's Schedule</h3>
              <button className="ghost-button" style={{ padding: '6px 14px', fontSize: '0.85rem', border: '1px solid var(--color-border-strong)', borderRadius: '8px' }}>
                View Calendar
              </button>
            </div>
            <div className="appointment-list">
              {appointments.map((apt, index) => (
                <motion.div
                  key={index}
                  className="appointment-row"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.08 }}
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.015)' }}
                >
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{
                      minWidth: '76px',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      color: 'var(--color-text-muted)',
                      fontVariantNumeric: 'tabular-nums'
                    }}>
                      {apt.time}
                    </div>
                    <div className="appointment-info">
                      <strong>{apt.patient}</strong>
                      <p>{apt.treatment}</p>
                    </div>
                  </div>
                  <span className={`status-tag ${apt.status.toLowerCase()}`}>{apt.status}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats sidebar panel */}
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="admin-panel" style={{ padding: '28px' }}>
              <h3 style={{ margin: '0 0 20px', fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                Clinic Hours
              </h3>
              {['Monday–Friday', 'Saturday', 'Sunday'].map((day, i) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--color-border)' : 'none', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>{day}</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                    {i === 0 ? '8:00 – 18:00' : i === 1 ? '9:00 – 14:00' : 'Closed'}
                  </span>
                </div>
              ))}
            </div>

            <div className="admin-panel" style={{ padding: '28px' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                Pending Actions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>New inquiries</span>
                  <span className="status-tag pending">{inquiries.filter(i => i.status === 'New').length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Unconfirmed apts.</span>
                  <span className="status-tag pending">{appointments.filter(a => a.status === 'Pending').length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Treatment plans</span>
                  <span className="status-tag confirmed">7</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Inquiries List */}
        <motion.div className="admin-panel" variants={itemVariants} style={{ marginBottom: '32px' }}>
          <div className="panel-header">
            <h3>Recent Inquiries</h3>
          </div>
          <div style={{ display: 'grid', gap: '12px' }}>
            {inquiries.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', padding: '12px 0' }}>No inquiries found.</p>
            ) : inquiries.map((inquiry, index) => (
              <motion.div
                key={inquiry.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                style={{ padding: '16px', border: '1px solid var(--color-border)', borderRadius: '12px', background: inquiry.status === 'New' ? 'rgba(43,108,176,0.03)' : 'transparent' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div>
                    <strong style={{ fontSize: '0.95rem' }}>{inquiry.name}</strong>
                    <span style={{ margin: '0 8px', color: 'var(--color-text-muted)' }}>·</span>
                    <a href={`mailto:${inquiry.email}`} style={{ fontSize: '0.85rem', color: 'var(--color-accent)' }}>{inquiry.email}</a>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{inquiry.date}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text)', lineHeight: 1.5 }}>
                  "{inquiry.message}"
                </p>
                {inquiry.status === 'New' && (
                  <div style={{ marginTop: '12px' }}>
                    <span className="status-tag pending" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <MessageSquare size={12} /> New Request
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Patient CRM Table */}
        <motion.div className="admin-panel" variants={itemVariants}>
          <div className="panel-header">
            <h3>Recent Patients</h3>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--color-border-strong)', borderRadius: '8px', padding: '6px 14px' }}>
                <Search size={14} style={{ color: 'var(--color-text-muted)' }} />
                <input placeholder="Search patients..." style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.88rem', color: 'var(--color-text)', width: '160px' }} />
              </div>
              <button className="primary-button" onClick={() => setIsPatientModalOpen(true)} style={{ padding: '8px 16px', fontSize: '0.85rem', borderRadius: '8px' }}>
                + Add Patient
              </button>
            </div>
          </div>
          <div>
            {/* Table Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1.5fr 1fr', padding: '12px 32px', background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--color-border)' }}>
              {['Patient', 'ID', 'Last Visit', 'Email', 'Status'].map(h => (
                <span key={h} style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{h}</span>
              ))}
            </div>
            {patients.map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.015)' }}
                style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1.5fr 1fr', padding: '18px 32px', borderBottom: index < patients.length - 1 ? '1px solid var(--color-border)' : 'none', alignItems: 'center', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: '0.85rem', flexShrink: 0 }}>
                    {patient.name.charAt(0)}
                  </div>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{patient.name}</span>
                </div>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>{patient.id}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{patient.lastVisit}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{patient.email}</span>
                <span className={`status-tag ${patient.status.toLowerCase()}`}>{patient.status}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <AddPatientModal 
          isOpen={isPatientModalOpen} 
          onClose={() => setIsPatientModalOpen(false)} 
          onSuccess={handlePatientAdded} 
        />
    </>
  )
}
