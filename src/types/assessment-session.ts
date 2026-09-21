import type { SubmissionResult } from '@/types/submission'

export type AssessmentCompletionReason =
  | 'COMPLETED'
  | 'TIME_EXPIRED'

export interface AssessmentSessionQuestion {
  id: string
  title: string
  maxScore: number
}

export interface AssessmentSessionSubmission {
  submissionId: string
  questionId: string
  questionTitle: string
  status: SubmissionResult['status']
  score: number
  maxScore: number
  passedTests: number
  totalTests: number
}

export interface AssessmentSession {
  assessmentId: string
  assessmentName: string
  candidate: string
  timeLimitMinutes: number

  startedAt: number
  questionStartedAt: number

  completedAt?: number
  completionReason?: AssessmentCompletionReason

  currentQuestionIndex: number

  questions: AssessmentSessionQuestion[]

  submissions: AssessmentSessionSubmission[]
}