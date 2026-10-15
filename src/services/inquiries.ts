import { db } from './db'
import type { Inquiry, InquiryStatus } from '../pages/admin/types'

export const inquiryService = {
  async getAll(): Promise<Inquiry[]> {
    try {
      const res = await fetch('/api/inquiries')
      if (res.ok) {
        const data = await res.json()
        await db.set('inquiries', data)
        return data
      }
    } catch (err) {
      console.warn('Using local fallback for inquiries:', err)
    }
    return (await db.get<Inquiry[]>('inquiries')) || []
  },

  async create(inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>): Promise<Inquiry> {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry),
      })
      if (res.ok) {
        const created = await res.json()
        const inquiries = (await db.get<Inquiry[]>('inquiries')) || []
        inquiries.unshift(created)
        await db.set('inquiries', inquiries)
        return created
      }
    } catch (err) {
      console.warn('Creating inquiry locally:', err)
    }
    const inquiries = await this.getAll()
    const newInquiry: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'New',
    }
    inquiries.unshift(newInquiry)
    await db.set('inquiries', inquiries)
    return newInquiry
  },

  async updateStatus(id: string, status: InquiryStatus): Promise<Inquiry | null> {
    try {
      const res = await fetch(`/api/inquiries/${encodeURIComponent(id)}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        const updated = await res.json()
        const inquiries = await this.getAll()
        const idx = inquiries.findIndex((i) => i.id === id)
        if (idx !== -1) {
          inquiries[idx].status = status
          await db.set('inquiries', inquiries)
        }
        return updated
      }
    } catch (err) {
      console.warn('Updating inquiry status locally:', err)
    }
    const inquiries = await this.getAll()
    const index = inquiries.findIndex((i) => i.id === id)
    if (index === -1) return null

    inquiries[index].status = status
    await db.set('inquiries', inquiries)
    return inquiries[index]
  },
}
