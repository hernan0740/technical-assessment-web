export interface Assessment {
  id: string
  name: string
  description: string
  timeLimitMinutes: number
  questionCount: number
  createdAt: string
}

export interface CreateAssessmentRequest {
  name: string
  description: string
  timeLimitMinutes: number
}

export interface UpdateAssessmentRequest {
  name?: string
  description?: string
  timeLimitMinutes?: number
}
