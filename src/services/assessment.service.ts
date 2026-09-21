import type {
  Assessment,
  CreateAssessmentRequest,
  UpdateAssessmentRequest,
} from '@/types/assessment'

const API_URL = import.meta.env.VITE_API_URL

export async function getAssessments(): Promise<
  Assessment[]
> {
  const response = await fetch(
    `${API_URL}/assessments`,
  )

  if (!response.ok) {
    throw new Error(
      'Unable to load assessments',
    )
  }

  return response.json() as Promise<Assessment[]>
}

export async function getAssessmentById(
  id: string,
): Promise<Assessment> {
  const response = await fetch(
    `${API_URL}/assessments/${id}`,
  )

  if (!response.ok) {
    throw new Error(
      'Unable to load assessment',
    )
  }

  return response.json() as Promise<Assessment>
}

export async function createAssessment(
  input: CreateAssessmentRequest,
): Promise<Assessment> {
  const response = await fetch(
    `${API_URL}/assessments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    },
  )

  if (!response.ok) {
    const errorBody = (await response
      .json()
      .catch(() => null)) as {
      message?: string
    } | null

    throw new Error(
      errorBody?.message ??
        'Unable to create assessment',
    )
  }

  return response.json() as Promise<Assessment>
}

export async function updateAssessment(
  id: string,
  input: UpdateAssessmentRequest,
): Promise<Assessment> {
  const response = await fetch(
    `${API_URL}/assessments/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    },
  )

  if (!response.ok) {
    throw new Error(
      'Unable to update assessment',
    )
  }

  return response.json() as Promise<Assessment>
}

export async function deleteAssessment(
  id: string,
): Promise<void> {
  const response = await fetch(
    `${API_URL}/assessments/${id}`,
    {
      method: 'DELETE',
    },
  )

  if (!response.ok) {
    throw new Error(
      'Unable to delete assessment',
    )
  }
}