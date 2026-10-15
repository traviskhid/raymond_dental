import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.resolve(__dirname, '../clinic.db')

export const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')

// ─── Initialize Schema ────────────────────────────────────────────────────────
export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      dob TEXT,
      lastVisit TEXT,
      nextAppointment TEXT,
      treatments TEXT,
      status TEXT DEFAULT 'Active',
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      patient TEXT NOT NULL,
      patientId TEXT,
      treatment TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Pending',
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      date TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'New',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // Check if seeding is needed
  const patientCount = db.prepare('SELECT COUNT(*) as count FROM patients').get().count
  if (patientCount === 0) {
    seedData()
  }
}

// ─── Seed Initial Clinical Data ──────────────────────────────────────────────
function seedData() {
  const insertPatient = db.prepare(`
    INSERT INTO patients (id, name, email, phone, dob, lastVisit, nextAppointment, treatments, status, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const patients = [
    { id: '#00214', name: 'Nina Summers', email: 'nina.s@email.com', phone: '+1 (555) 231-4411', dob: 'March 14, 1990', lastVisit: 'Jul 12, 2026', nextAppointment: 'Aug 5, 2026', treatments: JSON.stringify(['Smile Consultation', 'Veneers']), status: 'Active', notes: 'Prefers morning slots. Mild anxiety about procedures.' },
    { id: '#00198', name: 'Jordan Lee', email: 'j.lee@email.com', phone: '+1 (555) 148-9002', dob: 'July 2, 1985', lastVisit: 'Jun 28, 2026', nextAppointment: 'Jul 13, 2026', treatments: JSON.stringify(['Implant Check', 'Implant Placement']), status: 'Active', notes: '' },
    { id: '#00187', name: 'Alex Rivera', email: 'alex.r@email.com', phone: '+1 (555) 302-7731', dob: 'Nov 28, 1992', lastVisit: 'Jun 15, 2026', nextAppointment: 'Jul 12, 2026', treatments: JSON.stringify(['Teeth Whitening', 'General Checkup']), status: 'Active', notes: 'Sensitive teeth – use low-abrasion products.' },
    { id: '#00162', name: 'Sofia Monroe', email: 'sofia.m@email.com', phone: '+1 (555) 489-6120', dob: 'Feb 9, 1988', lastVisit: 'May 30, 2026', nextAppointment: '—', treatments: JSON.stringify(['General Checkup']), status: 'Inactive', notes: 'Follow-up needed. Cancelled last appointment.' },
    { id: '#00231', name: 'Marcus Kim', email: 'm.kim@email.com', phone: '+1 (555) 671-0034', dob: 'Sep 15, 1995', lastVisit: 'Jul 12, 2026', nextAppointment: 'Aug 20, 2026', treatments: JSON.stringify(['Veneer Fitting', 'Cosmetic Consultation']), status: 'Active', notes: '' },
    { id: '#00245', name: 'Priya Nair', email: 'priya.n@email.com', phone: '+1 (555) 812-3350', dob: 'May 22, 1987', lastVisit: 'Jul 1, 2026', nextAppointment: 'Jul 13, 2026', treatments: JSON.stringify(['Root Canal']), status: 'Active', notes: 'Referred by Dr. Chen.' },
    { id: '#00252', name: 'Tom Bradford', email: 't.bradford@email.com', phone: '+1 (555) 923-1188', dob: 'Jan 6, 1979', lastVisit: 'Jun 30, 2026', nextAppointment: 'Jul 13, 2026', treatments: JSON.stringify(['Crown Placement']), status: 'Active', notes: '' },
  ]

  const insertPatientsTx = db.transaction((list) => {
    for (const p of list) {
      insertPatient.run(p.id, p.name, p.email, p.phone, p.dob, p.lastVisit, p.nextAppointment, p.treatments, p.status, p.notes)
    }
  })
  insertPatientsTx(patients)

  const insertAppointment = db.prepare(`
    INSERT INTO appointments (id, date, time, patient, patientId, treatment, status, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const appointments = [
    { id: 'apt-001', date: 'Jul 12, 2026', time: '09:00 AM', patient: 'Nina Summers', patientId: '#00214', treatment: 'Smile Consultation', status: 'Confirmed', notes: 'First visit – full evaluation requested.' },
    { id: 'apt-002', date: 'Jul 12, 2026', time: '11:30 AM', patient: 'Jordan Lee', patientId: '#00198', treatment: 'Implant Check', status: 'Pending', notes: '' },
    { id: 'apt-003', date: 'Jul 12, 2026', time: '01:00 PM', patient: 'Alex Rivera', patientId: '#00187', treatment: 'Teeth Whitening', status: 'Confirmed', notes: '' },
    { id: 'apt-004', date: 'Jul 12, 2026', time: '02:30 PM', patient: 'Sofia Monroe', patientId: '#00162', treatment: 'General Checkup', status: 'Cancelled', notes: 'Patient cancelled – travel conflict.' },
    { id: 'apt-005', date: 'Jul 12, 2026', time: '04:00 PM', patient: 'Marcus Kim', patientId: '#00231', treatment: 'Veneer Fitting', status: 'Confirmed', notes: '' },
    { id: 'apt-006', date: 'Jul 13, 2026', time: '10:00 AM', patient: 'Priya Nair', patientId: '#00245', treatment: 'Root Canal', status: 'Pending', notes: 'Referred by Dr. Chen.' },
    { id: 'apt-007', date: 'Jul 13, 2026', time: '02:00 PM', patient: 'Tom Bradford', patientId: '#00252', treatment: 'Crown Placement', status: 'Confirmed', notes: '' },
    { id: 'apt-008', date: 'Jul 14, 2026', time: '09:30 AM', patient: 'Nina Summers', patientId: '#00214', treatment: 'Veneer Consultation', status: 'Pending', notes: '' },
    { id: 'apt-009', date: 'Jul 11, 2026', time: '10:00 AM', patient: 'Jordan Lee', patientId: '#00198', treatment: 'Post-op Follow-up', status: 'Confirmed', notes: '' },
    { id: 'apt-010', date: 'Jul 10, 2026', time: '03:00 PM', patient: 'Marcus Kim', patientId: '#00231', treatment: 'Consultation', status: 'Confirmed', notes: '' },
  ]

  const insertApptsTx = db.transaction((list) => {
    for (const a of list) {
      insertAppointment.run(a.id, a.date, a.time, a.patient, a.patientId, a.treatment, a.status, a.notes)
    }
  })
  insertApptsTx(appointments)

  const insertInquiry = db.prepare(`
    INSERT INTO inquiries (id, name, email, message, date, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `)

  const inquiries = [
    { id: 'inq-001', name: 'Sarah Jenkins', email: 'sarah.j@email.com', message: 'I would like to book a consultation for implants.', date: 'Jul 12, 2026', status: 'New' },
    { id: 'inq-002', name: 'David Chen', email: 'd.chen@email.com', message: 'Do you offer financing for cosmetic procedures?', date: 'Jul 11, 2026', status: 'New' },
  ]

  const insertInquiriesTx = db.transaction((list) => {
    for (const i of list) {
      insertInquiry.run(i.id, i.name, i.email, i.message, i.date, i.status)
    }
  })
  insertInquiriesTx(inquiries)

  const clinicSettings = {
    name: "Raymond's Dental Clinic",
    address: 'Accra, Ghana',
    phone: '0203607141 / 0542769355',
    email: 'hello@elladental.com',
    hours: [
      { day: 'Monday', open: '08:00', close: '18:00', closed: false },
      { day: 'Tuesday', open: '08:00', close: '18:00', closed: false },
      { day: 'Wednesday', open: '08:00', close: '18:00', closed: false },
      { day: 'Thursday', open: '08:00', close: '18:00', closed: false },
      { day: 'Friday', open: '08:00', close: '17:00', closed: false },
      { day: 'Saturday', open: '09:00', close: '14:00', closed: false },
      { day: 'Sunday', open: '', close: '', closed: true },
    ],
  }

  db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run('clinic_config', JSON.stringify(clinicSettings))
}

// Initialize on load
initDatabase()

// ─── CRUD DAO Functions ───────────────────────────────────────────────────────

export const patientDao = {
  getAll() {
    const rows = db.prepare('SELECT * FROM patients ORDER BY created_at DESC').all()
    return rows.map((r) => ({
      ...r,
      treatments: r.treatments ? JSON.parse(r.treatments) : [],
    }))
  },

  getById(id) {
    const r = db.prepare('SELECT * FROM patients WHERE id = ?').get(id)
    if (!r) return null
    return { ...r, treatments: r.treatments ? JSON.parse(r.treatments) : [] }
  },

  create(patient) {
    const treatments = Array.isArray(patient.treatments)
      ? JSON.stringify(patient.treatments)
      : '[]'
    db.prepare(`
      INSERT INTO patients (id, name, email, phone, dob, lastVisit, nextAppointment, treatments, status, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      patient.id,
      patient.name,
      patient.email || '',
      patient.phone || '',
      patient.dob || '',
      patient.lastVisit || '—',
      patient.nextAppointment || '—',
      treatments,
      patient.status || 'Active',
      patient.notes || ''
    )
    return this.getById(patient.id)
  },

  update(id, updates) {
    const existing = this.getById(id)
    if (!existing) return null
    const merged = { ...existing, ...updates }
    const treatments = Array.isArray(merged.treatments)
      ? JSON.stringify(merged.treatments)
      : '[]'

    db.prepare(`
      UPDATE patients
      SET name = ?, email = ?, phone = ?, dob = ?, lastVisit = ?, nextAppointment = ?, treatments = ?, status = ?, notes = ?
      WHERE id = ?
    `).run(
      merged.name,
      merged.email,
      merged.phone,
      merged.dob,
      merged.lastVisit,
      merged.nextAppointment,
      treatments,
      merged.status,
      merged.notes,
      id
    )
    return this.getById(id)
  },

  delete(id) {
    const res = db.prepare('DELETE FROM patients WHERE id = ?').run(id)
    return res.changes > 0
  },
}

export const appointmentDao = {
  getAll() {
    return db.prepare('SELECT * FROM appointments ORDER BY created_at DESC').all()
  },

  getById(id) {
    return db.prepare('SELECT * FROM appointments WHERE id = ?').get(id) || null
  },

  create(apt) {
    db.prepare(`
      INSERT INTO appointments (id, date, time, patient, patientId, treatment, status, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      apt.id,
      apt.date,
      apt.time,
      apt.patient,
      apt.patientId || '',
      apt.treatment,
      apt.status || 'Pending',
      apt.notes || ''
    )
    return this.getById(apt.id)
  },

  updateStatus(id, status) {
    db.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(status, id)
    return this.getById(id)
  },

  delete(id) {
    const res = db.prepare('DELETE FROM appointments WHERE id = ?').run(id)
    return res.changes > 0
  },
}

export const inquiryDao = {
  getAll() {
    return db.prepare('SELECT * FROM inquiries ORDER BY created_at DESC').all()
  },

  create(inq) {
    const id = inq.id || `inq-${Date.now()}`
    const date = inq.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    const status = inq.status || 'New'
    db.prepare(`
      INSERT INTO inquiries (id, name, email, message, date, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, inq.name, inq.email, inq.message, date, status)
    return db.prepare('SELECT * FROM inquiries WHERE id = ?').get(id)
  },

  updateStatus(id, status) {
    db.prepare('UPDATE inquiries SET status = ? WHERE id = ?').run(status, id)
    return db.prepare('SELECT * FROM inquiries WHERE id = ?').get(id)
  },
}

export const settingsDao = {
  get() {
    const row = db.prepare('SELECT value FROM settings WHERE key = ?').get('clinic_config')
    return row ? JSON.parse(row.value) : null
  },

  update(settings) {
    db.prepare('INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)').run(
      'clinic_config',
      JSON.stringify(settings)
    )
    return settings
  },
}
