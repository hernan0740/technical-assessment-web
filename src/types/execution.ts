import type { ProgrammingLanguage } from '@/types/programming-language'

export type ExecutionStatus =
  | 'SUCCESS'
  | 'COMPILATION_ERROR'
  | 'RUNTIME_ERROR'
  | 'TIMEOUT'
  | 'ERROR'

export interface RunCodeRequest {
  language: ProgrammingLanguage
  sourceCode: string
  stdin?: string
}

export interface ExecutionResult {
  status: ExecutionStatus
  stdout: string | null
  stderr: string | null
  compileOutput: string | null
  time: number | null
  memory: number | null
}