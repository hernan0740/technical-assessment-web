import type { ProgrammingLanguage } from '@/types/programming-language'

export interface PublicTestCase {
  input: string
  expectedOutput: string
}

export interface Question {
  id: string
  assessmentId: string
  title: string
  description: string
  allowedLanguages: ProgrammingLanguage[]
  testCases: PublicTestCase[]
  score: number
  createdAt: string
}

export interface CreateTestCaseRequest {
  input: string
  expectedOutput: string
  isPrivate: boolean
}

export interface CreateQuestionRequest {
  title: string
  description: string
  allowedLanguages: ProgrammingLanguage[]
  testCases: CreateTestCaseRequest[]
  score: number
}

export interface UpdateQuestionRequest {
  title?: string
  description?: string
  allowedLanguages?: ProgrammingLanguage[]
  score?: number
}
