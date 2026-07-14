import { INITIAL_APPOINTMENTS, INITIAL_PATIENTS, INITIAL_SETTINGS, INITIAL_INQUIRIES } from '../pages/admin/types'

// A mock delay to simulate network requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Helper: check if a key has valid non-empty array data
const needsSeed = (key: string): boolean => {
  const data = localStorage.getItem(key)
  if (!data) return true
  try {
    const parsed = JSON.parse(data)
    return !Array.isArray(parsed) || parsed.length === 0
  } catch {
    return true
  }
}

// Helper: check if a key has valid object data
const needsObjectSeed = (key: string): boolean => {
  const data = localStorage.getItem(key)
  if (!data) return true
  try {
    JSON.parse(data)
    return false
  } catch {
    return true
  }
}

// Initialize DB if empty or missing
export const initializeMockDB = () => {
  if (needsSeed('db_patients')) {
    localStorage.setItem('db_patients', JSON.stringify(INITIAL_PATIENTS))
  }
  if (needsSeed('db_appointments')) {
    localStorage.setItem('db_appointments', JSON.stringify(INITIAL_APPOINTMENTS))
  }
  if (needsObjectSeed('db_settings')) {
    localStorage.setItem('db_settings', JSON.stringify(INITIAL_SETTINGS))
  }
  if (needsSeed('db_inquiries')) {
    localStorage.setItem('db_inquiries', JSON.stringify(INITIAL_INQUIRIES))
  }
}

// Initialize on import
initializeMockDB()

export const db = {
  async get<T>(collection: string): Promise<T> {
    await delay(300)
    const data = localStorage.getItem(`db_${collection}`)
    return data ? JSON.parse(data) : null as T
  },

  async set<T>(collection: string, data: T): Promise<void> {
    await delay(300)
    localStorage.setItem(`db_${collection}`, JSON.stringify(data))
  }
}
