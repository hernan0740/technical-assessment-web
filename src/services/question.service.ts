import type { Question } from '@/types/question'

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