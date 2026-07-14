// ─── Shared types ─────────────────────────────────────────────────────────────
export type AppointmentStatus = 'Confirmed' | 'Pending' | 'Cancelled'
export type PatientStatus = 'Active' | 'Inactive'
export type InquiryStatus = 'New' | 'Read' | 'Resolved'
export type SectionKey = 'overview' | 'appointments' | 'patients' | 'analytics' | 'search' | 'settings'

export interface Appointment {
  id: string
  date: string
  time: string
  patient: string
  patientId: string
  treatment: string
  status: AppointmentStatus
  notes: string
}

export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dob: string
  lastVisit: string
  nextAppointment: string
  treatments: string[]
  status: PatientStatus
  notes: string
}

export interface HoursEntry {
  day: string
  open: string
  close: string
  closed: boolean
}

export interface ClinicSettings {
  name: string
  address: string
  phone: string
  email: string
  hours: HoursEntry[]
}

export interface Inquiry {
  id: string
  name: string
  email: string
  message: string
  date: string
  status: InquiryStatus
}

// ─── Seed data ────────────────────────────────────────────────────────────────
export const TODAY = 'Jul 12, 2026'

export const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: 'apt-001', date: 'Jul 12, 2026', time: '09:00 AM', patient: 'Nina Summers',  patientId: '#00214', treatment: 'Smile Consultation', status: 'Confirmed', notes: 'First visit – full evaluation requested.' },
  { id: 'apt-002', date: 'Jul 12, 2026', time: '11:30 AM', patient: 'Jordan Lee',    patientId: '#00198', treatment: 'Implant Check',       status: 'Pending',   notes: '' },
  { id: 'apt-003', date: 'Jul 12, 2026', time: '01:00 PM', patient: 'Alex Rivera',   patientId: '#00187', treatment: 'Teeth Whitening',     status: 'Confirmed', notes: '' },
  { id: 'apt-004', date: 'Jul 12, 2026', time: '02:30 PM', patient: 'Sofia Monroe',  patientId: '#00162', treatment: 'General Checkup',     status: 'Cancelled', notes: 'Patient cancelled – travel conflict.' },
  { id: 'apt-005', date: 'Jul 12, 2026', time: '04:00 PM', patient: 'Marcus Kim',    patientId: '#00231', treatment: 'Veneer Fitting',      status: 'Confirmed', notes: '' },
  { id: 'apt-006', date: 'Jul 13, 2026', time: '10:00 AM', patient: 'Priya Nair',    patientId: '#00245', treatment: 'Root Canal',          status: 'Pending',   notes: 'Referred by Dr. Chen.' },
  { id: 'apt-007', date: 'Jul 13, 2026', time: '02:00 PM', patient: 'Tom Bradford',  patientId: '#00252', treatment: 'Crown Placement',     status: 'Confirmed', notes: '' },
  { id: 'apt-008', date: 'Jul 14, 2026', time: '09:30 AM', patient: 'Nina Summers',  patientId: '#00214', treatment: 'Veneer Consultation', status: 'Pending',   notes: '' },
  { id: 'apt-009', date: 'Jul 11, 2026', time: '10:00 AM', patient: 'Jordan Lee',    patientId: '#00198', treatment: 'Post-op Follow-up',   status: 'Confirmed', notes: '' },
  { id: 'apt-010', date: 'Jul 10, 2026', time: '03:00 PM', patient: 'Marcus Kim',    patientId: '#00231', treatment: 'Consultation',        status: 'Confirmed', notes: '' },
]

export const INITIAL_PATIENTS: Patient[] = [
  { id: '#00214', name: 'Nina Summers',  email: 'nina.s@email.com',     phone: '+1 (555) 231-4411', dob: 'March 14, 1990', lastVisit: 'Jul 12, 2026', nextAppointment: 'Aug 5, 2026',  treatments: ['Smile Consultation', 'Veneers'],            status: 'Active',   notes: 'Prefers morning slots. Mild anxiety about procedures.' },
  { id: '#00198', name: 'Jordan Lee',    email: 'j.lee@email.com',       phone: '+1 (555) 148-9002', dob: 'July 2, 1985',   lastVisit: 'Jun 28, 2026', nextAppointment: 'Jul 13, 2026', treatments: ['Implant Check', 'Implant Placement'],        status: 'Active',   notes: '' },
  { id: '#00187', name: 'Alex Rivera',   email: 'alex.r@email.com',      phone: '+1 (555) 302-7731', dob: 'Nov 28, 1992',   lastVisit: 'Jun 15, 2026', nextAppointment: 'Jul 12, 2026', treatments: ['Teeth Whitening', 'General Checkup'],       status: 'Active',   notes: 'Sensitive teeth – use low-abrasion products.' },
  { id: '#00162', name: 'Sofia Monroe',  email: 'sofia.m@email.com',     phone: '+1 (555) 489-6120', dob: 'Feb 9, 1988',    lastVisit: 'May 30, 2026', nextAppointment: '—',           treatments: ['General Checkup'],                           status: 'Inactive', notes: 'Follow-up needed. Cancelled last appointment.' },
  { id: '#00231', name: 'Marcus Kim',    email: 'm.kim@email.com',       phone: '+1 (555) 671-0034', dob: 'Sep 15, 1995',   lastVisit: 'Jul 12, 2026', nextAppointment: 'Aug 20, 2026', treatments: ['Veneer Fitting', 'Cosmetic Consultation'],  status: 'Active',   notes: '' },
  { id: '#00245', name: 'Priya Nair',    email: 'priya.n@email.com',     phone: '+1 (555) 812-3350', dob: 'May 22, 1987',   lastVisit: 'Jul 1, 2026',  nextAppointment: 'Jul 13, 2026', treatments: ['Root Canal'],                               status: 'Active',   notes: 'Referred by Dr. Chen.' },
  { id: '#00252', name: 'Tom Bradford',  email: 't.bradford@email.com',  phone: '+1 (555) 923-1188', dob: 'Jan 6, 1979',    lastVisit: 'Jun 30, 2026', nextAppointment: 'Jul 13, 2026', treatments: ['Crown Placement'],                          status: 'Active',   notes: '' },
]

export const INITIAL_INQUIRIES: Inquiry[] = [
  { id: 'inq-001', name: 'Sarah Jenkins', email: 'sarah.j@email.com', message: 'I would like to book a consultation for implants.', date: 'Jul 12, 2026', status: 'New' },
  { id: 'inq-002', name: 'David Chen', email: 'd.chen@email.com', message: 'Do you offer financing for cosmetic procedures?', date: 'Jul 11, 2026', status: 'New' },
]

export const INITIAL_SETTINGS: ClinicSettings = {
  name: 'Raymond\'s Dental Clinic',
  address: 'Accra, Ghana',
  phone: '0203607141 / 0542769355',
  email: 'hello@elladental.com',
  hours: [
    { day: 'Monday',    open: '08:00', close: '18:00', closed: false },
    { day: 'Tuesday',   open: '08:00', close: '18:00', closed: false },
    { day: 'Wednesday', open: '08:00', close: '18:00', closed: false },
    { day: 'Thursday',  open: '08:00', close: '18:00', closed: false },
    { day: 'Friday',    open: '08:00', close: '17:00', closed: false },
    { day: 'Saturday',  open: '09:00', close: '14:00', closed: false },
    { day: 'Sunday',    open: '',      close: '',      closed: true  },
  ],
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function avatarInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}
