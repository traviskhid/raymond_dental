import express from 'express'
import cors from 'cors'
import {
  patientDao,
  appointmentDao,
  inquiryDao,
  settingsDao,
  db,
} from './db.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// ─── Health & Database Info ──────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  try {
    const version = db.prepare('SELECT sqlite_version() as version').get().version
    const counts = {
      patients: db.prepare('SELECT COUNT(*) as count FROM patients').get().count,
      appointments: db.prepare('SELECT COUNT(*) as count FROM appointments').get().count,
      inquiries: db.prepare('SELECT COUNT(*) as count FROM inquiries').get().count,
    }
    res.json({
      status: 'healthy',
      database: 'SQLite',
      sqliteVersion: version,
      records: counts,
    })
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message })
  }
})

// ─── Patients Endpoints ──────────────────────────────────────────────────────
app.get('/api/patients', (req, res) => {
  try {
    const patients = patientDao.getAll()
    res.json(patients)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/patients/:id', (req, res) => {
  try {
    const patient = patientDao.getById(req.params.id)
    if (!patient) return res.status(404).json({ error: 'Patient not found' })
    res.json(patient)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/patients', (req, res) => {
  try {
    const created = patientDao.create(req.body)
    res.status(201).json(created)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.put('/api/patients/:id', (req, res) => {
  try {
    const updated = patientDao.update(req.params.id, req.body)
    if (!updated) return res.status(404).json({ error: 'Patient not found' })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete('/api/patients/:id', (req, res) => {
  try {
    const success = patientDao.delete(req.params.id)
    res.json({ success })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─── Appointments Endpoints ──────────────────────────────────────────────────
app.get('/api/appointments', (req, res) => {
  try {
    const appts = appointmentDao.getAll()
    res.json(appts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/appointments/:id', (req, res) => {
  try {
    const apt = appointmentDao.getById(req.params.id)
    if (!apt) return res.status(404).json({ error: 'Appointment not found' })
    res.json(apt)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/appointments', (req, res) => {
  try {
    const created = appointmentDao.create(req.body)
    res.status(201).json(created)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.put('/api/appointments/:id/status', (req, res) => {
  try {
    const { status } = req.body
    const updated = appointmentDao.updateStatus(req.params.id, status)
    if (!updated) return res.status(404).json({ error: 'Appointment not found' })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete('/api/appointments/:id', (req, res) => {
  try {
    const success = appointmentDao.delete(req.params.id)
    res.json({ success })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─── Inquiries Endpoints ─────────────────────────────────────────────────────
app.get('/api/inquiries', (req, res) => {
  try {
    const inquiries = inquiryDao.getAll()
    res.json(inquiries)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/inquiries', (req, res) => {
  try {
    const created = inquiryDao.create(req.body)
    res.status(201).json(created)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.put('/api/inquiries/:id/status', (req, res) => {
  try {
    const { status } = req.body
    const updated = inquiryDao.updateStatus(req.params.id, status)
    if (!updated) return res.status(404).json({ error: 'Inquiry not found' })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─── Settings Endpoints ──────────────────────────────────────────────────────
app.get('/api/settings', (req, res) => {
  try {
    const settings = settingsDao.get()
    res.json(settings)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.put('/api/settings', (req, res) => {
  try {
    const updated = settingsDao.update(req.body)
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default app

if (process.env.NODE_ENV !== 'test' && !process.env.VITE_DEV_SERVER) {
  app.listen(PORT, () => {
    console.log(`[SQLite Server] Running on http://localhost:${PORT}`)
  })
}
