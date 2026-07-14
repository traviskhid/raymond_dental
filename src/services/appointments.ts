import { db } from './db'
import type { Appointment, AppointmentStatus } from '../pages/admin/types'

export const appointmentService = {
  async getAll(): Promise<Appointment[]> {
    return (await db.get<Appointment[]>('appointments')) || []
  },

  async getById(id: string): Promise<Appointment | undefined> {
    const appointments = await this.getAll()
    return appointments.find(a => a.id === id)
  },

  async create(appointment: Appointment): Promise<Appointment> {
    const appointments = await this.getAll()
    appointments.push(appointment)
    await db.set('appointments', appointments)
    return appointment
  },

  async updateStatus(id: string, status: AppointmentStatus): Promise<Appointment | null> {
    const appointments = await this.getAll()
    const index = appointments.findIndex(a => a.id === id)
    if (index === -1) return null

    appointments[index].status = status
    await db.set('appointments', appointments)
    return appointments[index]
  },

  async delete(id: string): Promise<boolean> {
    const appointments = await this.getAll()
    const filtered = appointments.filter(a => a.id !== id)
    await db.set('appointments', filtered)
    return true
  }
}
