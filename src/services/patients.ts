import { db } from './db'
import type { Patient } from '../pages/admin/types'

export const patientService = {
  async getAll(): Promise<Patient[]> {
    return (await db.get<Patient[]>('patients')) || []
  },

  async getById(id: string): Promise<Patient | undefined> {
    const patients = await this.getAll()
    return patients.find(p => p.id === id)
  },

  async create(patient: Patient): Promise<Patient> {
    const patients = await this.getAll()
    patients.push(patient)
    await db.set('patients', patients)
    return patient
  },

  async update(id: string, updates: Partial<Patient>): Promise<Patient | null> {
    const patients = await this.getAll()
    const index = patients.findIndex(p => p.id === id)
    if (index === -1) return null

    patients[index] = { ...patients[index], ...updates }
    await db.set('patients', patients)
    return patients[index]
  },

  async delete(id: string): Promise<boolean> {
    const patients = await this.getAll()
    const filtered = patients.filter(p => p.id !== id)
    await db.set('patients', filtered)
    return true
  }
}
