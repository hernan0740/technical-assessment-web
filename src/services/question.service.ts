import type {
  CreateQuestionRequest,
  Question,
  UpdateQuestionRequest,
} from '@/types/question'

const API_URL = import.meta.env.VITE_API_URL

export async function getQuestion(
  questionId: string,
): Promise<Question> {
  const response = await fetch(
    `${API_URL}/questions/${questionId}`,
  )

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Question not found')
    }

    throw new Error('Unable to load question')
  }

  return response.json() as Promise<Question>
}

export async function getQuestionsByAssessment(
  assessmentId: string,
): Promise<Question[]> {
  const response = await fetch(
    `${API_URL}/assessments/${assessmentId}/questions`,
  )

  if (!response.ok) {
    throw new Error('Unable to load questions')
  }

  return response.json() as Promise<Question[]>
}

export async function createQuestion(
  assessmentId: string,
  input: CreateQuestionRequest,
): Promise<Question> {
  const response = await fetch(
    `${API_URL}/assessments/${assessmentId}/questions`,
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
        'Unable to create question',
    )
  }

  return response.json() as Promise<Question>
}

export async function updateQuestion(
  questionId: string,
  input: UpdateQuestionRequest,
): Promise<Question> {
  const response = await fetch(
    `${API_URL}/questions/${questionId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    },
  )

  if (!response.ok) {
    throw new Error('Unable to update question')
  }

  return response.json() as Promise<Question>
}

export async function deleteQuestion(
  questionId: string,
): Promise<void> {
  const response = await fetch(
    `${API_URL}/questions/${questionId}`,
    {
      method: 'DELETE',
    },
  )

  if (!response.ok) {
    throw new Error('Unable to delete question')
  }
}