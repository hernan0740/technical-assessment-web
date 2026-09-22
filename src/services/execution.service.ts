import type { ExecutionResult, RunCodeRequest } from '@/types/execution'

const API_URL = import.meta.env.VITE_API_URL

export async function runCode(input: RunCodeRequest): Promise<ExecutionResult> {
  const response = await fetch(`${API_URL}/executions/run`, {
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

    throw new Error(errorBody?.message ?? 'Unable to execute code')
  }

  return response.json() as Promise<ExecutionResult>
}
