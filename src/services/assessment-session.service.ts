import type { Assessment } from '@/types/assessment'

import type {
  AssessmentSession,
  AssessmentSessionSubmission,
} from '@/types/assessment-session'

import type { Question } from '@/types/question'
import type { SubmissionResult } from '@/types/submission'

const SESSION_PREFIX = 'technical-assessment-session'

function getStorageKey(assessmentId: string) {
  return `${SESSION_PREFIX}:${assessmentId}`
}

function saveAssessmentSession(session: AssessmentSession): AssessmentSession {
  sessionStorage.setItem(getStorageKey(session.assessmentId), JSON.stringify(session))

  return session
}

export function startAssessmentSession(
  assessment: Assessment,
  questions: Question[],
  candidate: string,
): AssessmentSession {
  const now = Date.now()

  const session: AssessmentSession = {
    assessmentId: assessment.id,

    assessmentName: assessment.name,

    candidate: candidate.trim(),

    timeLimitMinutes: assessment.timeLimitMinutes,

    startedAt: now,

    questionStartedAt: now,

    currentQuestionIndex: 0,

    questions: questions.map((question) => ({
      id: question.id,

      title: question.title,

      maxScore: question.score,
    })),

    submissions: [],
  }

  return saveAssessmentSession(session)
}

export function getAssessmentSession(assessmentId: string): AssessmentSession | null {
  const storedSession = sessionStorage.getItem(getStorageKey(assessmentId))

  if (!storedSession) {
    return null
  }

  try {
    return JSON.parse(storedSession) as AssessmentSession
  } catch {
    sessionStorage.removeItem(getStorageKey(assessmentId))

    return null
  }
}

export function hasAssessmentTimeExpired(session: AssessmentSession): boolean {
  if (session.completedAt) {
    return true
  }

  const timeLimitMilliseconds = session.timeLimitMinutes * 60 * 1000

  return Date.now() - session.startedAt >= timeLimitMilliseconds
}

export function finishAssessmentByTimeout(
  assessmentId: string,
): AssessmentSession | null {
  const session = getAssessmentSession(assessmentId)

  if (!session) {
    return null
  }

  if (session.completedAt) {
    return session
  }

  const updatedSession: AssessmentSession = {
    ...session,

    completedAt: Date.now(),

    completionReason: 'TIME_EXPIRED',
  }

  return saveAssessmentSession(updatedSession)
}

export function registerAssessmentSubmission(
  assessmentId: string,
  result: SubmissionResult,
): AssessmentSession | null {
  const session = getAssessmentSession(assessmentId)

  if (!session) {
    return null
  }

  if (session.completedAt) {
    return session
  }

  const questionIndex = session.questions.findIndex(
    (question) => question.id === result.questionId,
  )

  if (questionIndex === -1) {
    return null
  }

  const question = session.questions[questionIndex]

  const submission: AssessmentSessionSubmission = {
    submissionId: result.id,

    questionId: result.questionId,

    questionTitle: question.title,

    status: result.status,

    score: result.score,

    maxScore: result.maxScore,

    passedTests: result.passedTests,

    totalTests: result.totalTests,
  }

  const submissions = session.submissions.filter(
    (currentSubmission) => currentSubmission.questionId !== result.questionId,
  )

  submissions.push(submission)

  submissions.sort((first, second) => {
    const firstIndex = session.questions.findIndex(
      (question) => question.id === first.questionId,
    )

    const secondIndex = session.questions.findIndex(
      (question) => question.id === second.questionId,
    )

    return firstIndex - secondIndex
  })

  const isLastQuestion = questionIndex === session.questions.length - 1

  const now = Date.now()

  const updatedSession: AssessmentSession = {
    ...session,

    submissions,

    currentQuestionIndex: isLastQuestion ? questionIndex : questionIndex + 1,

    questionStartedAt: isLastQuestion ? session.questionStartedAt : now,

    ...(isLastQuestion
      ? {
          completedAt: now,

          completionReason: 'COMPLETED' as const,
        }
      : {}),
  }

  return saveAssessmentSession(updatedSession)
}

export function clearAssessmentSession(assessmentId: string): void {
  sessionStorage.removeItem(getStorageKey(assessmentId))
}
