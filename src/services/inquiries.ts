import { db } from './db'
import type { Inquiry, InquiryStatus } from '../pages/admin/types'

export const inquiryService = {
  async getAll(): Promise<Inquiry[]> {
    return (await db.get<Inquiry[]>('inquiries')) || []
  },

  async create(inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>): Promise<Inquiry> {
    const inquiries = await this.getAll()
    const newInquiry: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'New'
    }
    inquiries.unshift(newInquiry)
    await db.set('inquiries', inquiries)
    return newInquiry
  },

  async updateStatus(id: string, status: InquiryStatus): Promise<Inquiry | null> {
    const inquiries = await this.getAll()
    const index = inquiries.findIndex(i => i.id === id)
    if (index === -1) return null

    inquiries[index].status = status
    await db.set('inquiries', inquiries)
    return inquiries[index]
  }
}
