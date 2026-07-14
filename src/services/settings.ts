import { db } from './db'
import type { ClinicSettings } from '../pages/admin/types'

export const settingsService = {
  async get(): Promise<ClinicSettings | null> {
    return await db.get<ClinicSettings>('settings')
  },

  async update(settings: ClinicSettings): Promise<ClinicSettings> {
    await db.set('settings', settings)
    return settings
  }
}
