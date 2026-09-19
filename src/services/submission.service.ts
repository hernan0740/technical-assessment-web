import type {
  SubmissionResult,
  SubmitAnswerRequest,
} from '@/types/submission'

const API_URL = import.meta.env.VITE_API_URL

export async function submitAnswer(
  input: SubmitAnswerRequest,
): Promise<SubmissionResult> {
  const response = await fetch(`${API_URL}/submissions`, {
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
      errorBody?.message ?? 'Unable to submit answer',
    )
  }

  return response.json() as Promise<SubmissionResult>
}

export async function getSubmission(
  submissionId: string,
): Promise<SubmissionResult> {
  const response = await fetch(
    `${API_URL}/submissions/${submissionId}`,
  )

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Submission not found')
    }

    throw new Error('Unable to load submission')
  }

  return response.json() as Promise<SubmissionResult>
}