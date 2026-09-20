import type { ProgrammingLanguage } from '@/types/programming-language'
import type { ExecutionStatus } from '@/types/execution'

export type SubmissionStatus =
  | 'PASSED'
  | 'PARTIAL'
  | 'FAILED'

export interface SubmitAnswerRequest {
  assessmentId: string
  questionId: string
  candidate: string
  language: ProgrammingLanguage
  sourceCode: string
  timeSpentSeconds: number
}

export interface TestCaseResult {
  index: number
  passed: boolean
  executionStatus: ExecutionStatus
  isPrivate: boolean
}

export interface SubmissionResult {
  id: string
  assessmentId: string
  questionId: string
  candidate: string
  language: ProgrammingLanguage
  status: SubmissionStatus
  passedTests: number
  totalTests: number
  score: number
  maxScore: number
  testResults: TestCaseResult[]
  createdAt: string
  timeSpentSeconds: number
}