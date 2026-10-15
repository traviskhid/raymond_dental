import { db } from './db'
import type { Appointment, AppointmentStatus } from '../pages/admin/types'

export const appointmentService = {
  async getAll(): Promise<Appointment[]> {
    try {
      const res = await fetch('/api/appointments')
      if (res.ok) {
        const data = await res.json()
        await db.set('appointments', data)
        return data
      }
    } catch (err) {
      console.warn('Using local fallback for appointments:', err)
    }
    return (await db.get<Appointment[]>('appointments')) || []
  },

  async getById(id: string): Promise<Appointment | undefined> {
    try {
      const res = await fetch(`/api/appointments/${encodeURIComponent(id)}`)
      if (res.ok) return await res.json()
    } catch {}
    const appointments = await this.getAll()
    return appointments.find((a) => a.id === id)
  },

  async create(appointment: Appointment): Promise<Appointment> {
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment),
      })
      if (res.ok) {
        const created = await res.json()
        const appts = (await db.get<Appointment[]>('appointments')) || []
        appts.unshift(created)
        await db.set('appointments', appts)
        return created
      }
    } catch (err) {
      console.warn('Creating appointment locally:', err)
    }
    const appointments = await this.getAll()
    appointments.unshift(appointment)
    await db.set('appointments', appointments)
    return appointment
  },

  async updateStatus(id: string, status: AppointmentStatus): Promise<Appointment | null> {
    try {
      const res = await fetch(`/api/appointments/${encodeURIComponent(id)}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        const updated = await res.json()
        const appts = await this.getAll()
        const idx = appts.findIndex((a) => a.id === id)
        if (idx !== -1) {
          appts[idx].status = status
          await db.set('appointments', appts)
        }
        return updated
      }
    } catch (err) {
      console.warn('Updating appointment status locally:', err)
    }
    const appointments = await this.getAll()
    const index = appointments.findIndex((a) => a.id === id)
    if (index === -1) return null

    appointments[index].status = status
    await db.set('appointments', appointments)
    return appointments[index]
  },

  async delete(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/appointments/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        const appts = (await db.get<Appointment[]>('appointments')) || []
        await db.set(
          'appointments',
          appts.filter((a) => a.id !== id)
        )
        return true
      }
    } catch (err) {
      console.warn('Deleting appointment locally:', err)
    }
    const appointments = await this.getAll()
    const filtered = appointments.filter((a) => a.id !== id)
    await db.set('appointments', filtered)
    return true
  },
}
