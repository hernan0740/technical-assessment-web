import type {
  Assessment,
  CreateAssessmentRequest,
} from '@/types/assessment'



const API_URL = import.meta.env.VITE_API_URL

export async function getAssessments(): Promise<Assessment[]> {
  const response = await fetch(`${API_URL}/assessments`)

  if (!response.ok) {
    throw new Error('Unable to load assessments')
  }

  return response.json() as Promise<Assessment[]>
}

export async function createAssessment(
  input: CreateAssessmentRequest,
): Promise<Assessment> {
  const response = await fetch(`${API_URL}/assessments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as {
      message?: string
    } | null

    throw new Error(
      errorBody?.message ?? 'Unable to create assessment',
    )
  }

  return response.json() as Promise<Assessment>
}