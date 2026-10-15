import { db } from './db'
import type { Patient } from '../pages/admin/types'

export const patientService = {
  async getAll(): Promise<Patient[]> {
    try {
      const res = await fetch('/api/patients')
      if (res.ok) {
        const data = await res.json()
        await db.set('patients', data)
        return data
      }
    } catch (err) {
      console.warn('Using local fallback for patients:', err)
    }
    return (await db.get<Patient[]>('patients')) || []
  },

  async getById(id: string): Promise<Patient | undefined> {
    try {
      const res = await fetch(`/api/patients/${encodeURIComponent(id)}`)
      if (res.ok) return await res.json()
    } catch {}
    const patients = await this.getAll()
    return patients.find((p) => p.id === id)
  },

  async create(patient: Patient): Promise<Patient> {
    try {
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient),
      })
      if (res.ok) {
        const created = await res.json()
        const patients = (await db.get<Patient[]>('patients')) || []
        patients.unshift(created)
        await db.set('patients', patients)
        return created
      }
    } catch (err) {
      console.warn('Creating patient locally:', err)
    }
    const patients = await this.getAll()
    patients.unshift(patient)
    await db.set('patients', patients)
    return patient
  },

  async update(id: string, updates: Partial<Patient>): Promise<Patient | null> {
    try {
      const res = await fetch(`/api/patients/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (res.ok) {
        const updated = await res.json()
        const patients = await this.getAll()
        const index = patients.findIndex((p) => p.id === id)
        if (index !== -1) {
          patients[index] = updated
          await db.set('patients', patients)
        }
        return updated
      }
    } catch (err) {
      console.warn('Updating patient locally:', err)
    }
    const patients = await this.getAll()
    const index = patients.findIndex((p) => p.id === id)
    if (index === -1) return null

    patients[index] = { ...patients[index], ...updates }
    await db.set('patients', patients)
    return patients[index]
  },

  async delete(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/patients/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        const patients = (await db.get<Patient[]>('patients')) || []
        await db.set(
          'patients',
          patients.filter((p) => p.id !== id)
        )
        return true
      }
    } catch (err) {
      console.warn('Deleting patient locally:', err)
    }
    const patients = await this.getAll()
    const filtered = patients.filter((p) => p.id !== id)
    await db.set('patients', filtered)
    return true
  },
}
