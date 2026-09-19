import type { Assessment } from '@/types/assessment'

const API_URL = import.meta.env.VITE_API_URL

export async function getAssessments(): Promise<Assessment[]> {
  const response = await fetch(`${API_URL}/assessments`)

  if (!response.ok) {
    throw new Error('Unable to load assessments')
  }

  return response.json() as Promise<Assessment[]>
}