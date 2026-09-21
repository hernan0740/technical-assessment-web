import {
  useEffect,
  useState,
} from 'react'

import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { COPY } from '@/constants/copy'

import {
  getAssessmentById,
} from '@/services/assessment.service'

import {
  deleteQuestion,
  getQuestionsByAssessment,
} from '@/services/question.service'

import {
  startAssessmentSession,
} from '@/services/assessment-session.service'

import type { Assessment } from '@/types/assessment'
import type { Question } from '@/types/question'

export function AssessmentDetailPage() {
  const { assessmentId } =
    useParams<{
      assessmentId: string
    }>()

  const navigate =
    useNavigate()

  const [
    assessment,
    setAssessment,
  ] =
    useState<Assessment | null>(
      null,
    )

  const [
    questions,
    setQuestions,
  ] = useState<Question[]>([])

  const [
    candidate,
    setCandidate,
  ] = useState('')

  const [
    isLoading,
    setIsLoading,
  ] = useState(true)

  const [
    error,
    setError,
  ] = useState<string | null>(
    null,
  )

  const [
    deletingQuestionId,
    setDeletingQuestionId,
  ] = useState<string | null>(
    null,
  )

  useEffect(() => {
    const loadAssessment =
      async () => {
        if (!assessmentId) {
          setError(
            COPY.assessmentDetail
              .errors
              .assessmentIdRequired,
          )

          setIsLoading(false)

          return
        }

        try {
          const [
            assessmentData,
            questionsData,
          ] = await Promise.all([
            getAssessmentById(
              assessmentId,
            ),

            getQuestionsByAssessment(
              assessmentId,
            ),
          ])

          setAssessment(
            assessmentData,
          )

          setQuestions(
            questionsData,
          )
        } catch {
          setError(
            COPY.assessmentDetail
              .errors.load,
          )
        } finally {
          setIsLoading(false)
        }
      }

    void loadAssessment()
  }, [assessmentId])

  const handleStartAssessment =
    () => {
      if (
        !assessment ||
        questions.length === 0 ||
        !candidate.trim()
      ) {
        return
      }

      const session =
        startAssessmentSession(
          assessment,
          questions,
          candidate,
        )

      const firstQuestion =
        session.questions[0]

      if (!firstQuestion) {
        return
      }

      navigate(
        `/assessments/${assessment.id}/questions/${firstQuestion.id}`,
      )
    }

  const handleDeleteQuestion =
    async (
      question: Question,
    ) => {
      const confirmed =
        window.confirm(
          COPY.assessmentDetail
            .confirmDeleteQuestion,
        )

      if (!confirmed) {
        return
      }

      try {
        setDeletingQuestionId(
          question.id,
        )

        setError(null)

        await deleteQuestion(
          question.id,
        )

        setQuestions(
          (
            currentQuestions,
          ) =>
            currentQuestions.filter(
              (
                currentQuestion,
              ) =>
                currentQuestion.id !==
                question.id,
            ),
        )

        setAssessment(
          (currentAssessment) =>
            currentAssessment
              ? {
                  ...currentAssessment,

                  questionCount:
                    Math.max(
                      0,
                      currentAssessment
                        .questionCount -
                        1,
                    ),
                }
              : currentAssessment,
        )
      } catch {
        setError(
          COPY.assessmentDetail
            .errors.delete,
        )
      } finally {
        setDeletingQuestionId(
          null,
        )
      }
    }

  if (isLoading) {
    return (
      <main className="px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-slate-500">
            {
              COPY.assessmentDetail
                .loading
            }
          </p>
        </div>
      </main>
    )
  }

  if (
    error &&
    !assessment
  ) {
    return (
      <main className="px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-red-600">
            {error}
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/assessments"
          className="text-sm text-slate-500 hover:text-slate-900"
        >
          ←{' '}
          {
            COPY.assessmentDetail
              .back
          }
        </Link>

        {assessment && (
          <>
            <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm text-slate-500">
                  {
                    COPY.assessmentDetail
                      .eyebrow
                  }
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight">
                  {assessment.name}
                </h1>

                <p className="mt-2 max-w-3xl text-slate-600">
                  {
                    assessment.description
                  }
                </p>

                <div className="mt-3 flex flex-wrap gap-5 text-sm text-slate-500">
                  <span>
                    {
                      assessment.timeLimitMinutes
                    }{' '}
                    {assessment.timeLimitMinutes ===
                    1
                      ? COPY.assessments
                          .units.minute
                      : COPY.assessments
                          .units
                          .minutes}
                  </span>

                  <span>
                    {
                      questions.length
                    }{' '}
                    {questions.length ===
                    1
                      ? COPY.assessments
                          .units
                          .question
                      : COPY.assessments
                          .units
                          .questions}
                  </span>
                </div>
              </div>

              {assessmentId && (
                <Button
                  asChild
                  variant="outline"
                >
                  <Link
                    to={`/assessments/${assessmentId}/questions/new`}
                  >
                    {
                      COPY
                        .assessmentDetail
                        .createQuestion
                    }
                  </Link>
                </Button>
              )}
            </div>

            {questions.length >
              0 && (
              <section className="mt-8 rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
                <div>
                  <h2 className="text-xl font-semibold">
                    {
                      COPY
                        .assessmentSession
                        .title
                    }
                  </h2>

                  <p className="mt-1 text-sm text-slate-600">
                    {
                      COPY
                        .assessmentSession
                        .description
                    }
                  </p>
                </div>

                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
                  <div className="flex-1">
                    <label
                      htmlFor="candidate"
                      className="mb-2 block text-sm font-medium"
                    >
                      {
                        COPY
                          .assessmentSession
                          .candidate
                      }
                    </label>

                    <input
                      id="candidate"
                      value={
                        candidate
                      }
                      onChange={(
                        event,
                      ) =>
                        setCandidate(
                          event.target
                            .value,
                        )
                      }
                      placeholder={
                        COPY
                          .assessmentSession
                          .candidatePlaceholder
                      }
                      className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={
                      handleStartAssessment
                    }
                    disabled={
                      !candidate.trim()
                    }
                    className="bg-[#0043A9] text-white hover:bg-[#00388F]"
                  >
                    {
                      COPY
                        .assessmentSession
                        .start
                    }
                  </Button>
                </div>
              </section>
            )}
          </>
        )}

        {error && assessment && (
          <p className="mt-6 text-red-600">
            {error}
          </p>
        )}

        {questions.length === 0 && (
          <div className="mt-8 rounded-xl border bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-semibold">
              {
                COPY.assessmentDetail
                  .empty.title
              }
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {
                COPY.assessmentDetail
                  .empty
                  .description
              }
            </p>

            {assessmentId && (
              <Button
                asChild
                className="mt-5 bg-[#0043A9] text-white hover:bg-[#00388F]"
              >
                <Link
                  to={`/assessments/${assessmentId}/questions/new`}
                >
                  {
                    COPY
                      .assessmentDetail
                      .createFirstQuestion
                  }
                </Link>
              </Button>
            )}
          </div>
        )}

        {questions.length >
          0 && (
          <section className="mt-8">
            <div>
              <h2 className="text-xl font-semibold">
                {
                  COPY
                    .assessmentDetail
                    .title
                }
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                {
                  COPY
                    .assessmentDetail
                    .description
                }
              </p>
            </div>

            <div className="mt-5 space-y-4">
              {questions.map(
                (
                  question,
                  index,
                ) => {
                  const isDeleting =
                    deletingQuestionId ===
                    question.id

                  return (
                    <article
                      key={
                        question.id
                      }
                      className="rounded-xl border bg-white p-6 shadow-sm"
                    >
                      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        <div className="min-w-0">
                          <p className="text-sm text-slate-500">
                            {
                              COPY
                                .assessmentDetail
                                .labels
                                .question
                            }{' '}
                            {index +
                              1}
                          </p>

                          <h3 className="mt-1 text-xl font-semibold">
                            {
                              question.title
                            }
                          </h3>

                          <p className="mt-2 max-w-3xl text-slate-600">
                            {
                              question.description
                            }
                          </p>

                          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                            <span>
                              {
                                COPY
                                  .assessmentDetail
                                  .labels
                                  .score
                              }
                              :{' '}
                              {
                                question.score
                              }
                            </span>

                            <span>
                              {
                                COPY
                                  .assessmentDetail
                                  .labels
                                  .languages
                              }
                              :{' '}
                              {question.allowedLanguages
                                .map(
                                  (
                                    language,
                                  ) =>
                                    COPY
                                      .languages[
                                      language
                                    ],
                                )
                                .join(
                                  ', ',
                                )}
                            </span>
                          </div>
                        </div>

                        <div className="flex shrink-0 gap-2">
                          <Button
                            asChild
                            variant="outline"
                          >
                            <Link
                              to={`/assessments/${assessmentId}/questions/${question.id}/edit`}
                            >
                              {
                                COPY
                                  .assessmentDetail
                                  .editQuestion
                              }
                            </Link>
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            disabled={
                              isDeleting
                            }
                            onClick={() =>
                              void handleDeleteQuestion(
                                question,
                              )
                            }
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            {isDeleting
                              ? COPY
                                  .assessmentDetail
                                  .deletingQuestion
                              : COPY
                                  .assessmentDetail
                                  .deleteQuestion}
                          </Button>
                        </div>
                      </div>
                    </article>
                  )
                },
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}