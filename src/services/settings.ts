import { db } from './db'
import type { ClinicSettings } from '../pages/admin/types'

export const settingsService = {
  async get(): Promise<ClinicSettings | null> {
    try {
      const res = await fetch('/api/settings')
      if (res.ok) {
        const data = await res.json()
        await db.set('settings', data)
        return data
      }
    } catch (err) {
      console.warn('Using local fallback for settings:', err)
    }
    return await db.get<ClinicSettings>('settings')
  },

  async update(settings: ClinicSettings): Promise<ClinicSettings> {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (res.ok) {
        const updated = await res.json()
        await db.set('settings', updated)
        return updated
      }
    } catch (err) {
      console.warn('Updating settings locally:', err)
    }
    await db.set('settings', settings)
    return settings
  },
}
