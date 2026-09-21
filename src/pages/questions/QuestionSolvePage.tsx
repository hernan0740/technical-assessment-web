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
import { CodeEditor } from '@/components/ui/code/CodeEditor'
import { LanguageSelector } from '@/components/ui/code/LanguageSelector'
import { COPY } from '@/constants/copy'

import {
  finishAssessmentByTimeout,
  getAssessmentSession,
  hasAssessmentTimeExpired,
  registerAssessmentSubmission,
} from '@/services/assessment-session.service'

import { runCode } from '@/services/execution.service'
import { getQuestion } from '@/services/question.service'
import { submitAnswer } from '@/services/submission.service'

import type { AssessmentSession } from '@/types/assessment-session'
import type { ExecutionResult } from '@/types/execution'
import type { ProgrammingLanguage } from '@/types/programming-language'
import type { Question } from '@/types/question'

function formatTime(
  totalSeconds: number,
) {
  const minutes =
    Math.floor(
      totalSeconds / 60,
    )

  const seconds =
    totalSeconds % 60

  return `${String(
    minutes,
  ).padStart(
    2,
    '0',
  )}:${String(
    seconds,
  ).padStart(
    2,
    '0',
  )}`
}

export function QuestionSolvePage() {
  const {
    assessmentId,
    questionId,
  } = useParams<{
    assessmentId: string
    questionId: string
  }>()

  const navigate =
    useNavigate()

  const [
    session,
    setSession,
  ] =
    useState<AssessmentSession | null>(
      null,
    )

  const [
    now,
    setNow,
  ] = useState(
    Date.now(),
  )

  const [
    language,
    setLanguage,
  ] =
    useState<ProgrammingLanguage>(
      'javascript',
    )

  const [
    code,
    setCode,
  ] = useState('')

  const [
    question,
    setQuestion,
  ] =
    useState<Question | null>(
      null,
    )

  const [
    selectedPublicTestCaseIndex,
    setSelectedPublicTestCaseIndex,
  ] = useState(0)

  const [
    isLoadingQuestion,
    setIsLoadingQuestion,
  ] = useState(true)

  const [
    questionError,
    setQuestionError,
  ] =
    useState<string | null>(
      null,
    )

  const [
    result,
    setResult,
  ] =
    useState<ExecutionResult | null>(
      null,
    )

  const [
    isRunning,
    setIsRunning,
  ] =
    useState(false)

  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null,
    )

  const [
    isSubmitting,
    setIsSubmitting,
  ] =
    useState(false)

  const [
    submissionError,
    setSubmissionError,
  ] =
    useState<string | null>(
      null,
    )

  /*
   * Actualiza el reloj visual
   * cada segundo.
   */
  useEffect(() => {
    const intervalId =
      window.setInterval(
        () => {
          setNow(
            Date.now(),
          )
        },
        1000,
      )

    return () => {
      window.clearInterval(
        intervalId,
      )
    }
  }, [])

  /*
   * Carga y valida la sesión.
   */
  useEffect(() => {
    const loadQuestion =
      async () => {
        if (
          !assessmentId ||
          !questionId
        ) {
          setQuestionError(
            COPY.solveQuestion
              .errors
              .missingIds,
          )

          setIsLoadingQuestion(
            false,
          )

          return
        }

        const activeSession =
          getAssessmentSession(
            assessmentId,
          )

        if (!activeSession) {
          setQuestionError(
            COPY.solveQuestion
              .errors
              .noActiveSession,
          )

          setIsLoadingQuestion(
            false,
          )

          return
        }

        /*
         * Si la prueba ya terminó,
         * no permitimos volver
         * a resolver preguntas.
         */
        if (
          activeSession.completedAt
        ) {
          navigate(
            `/assessments/${assessmentId}/results`,
            {
              replace: true,
            },
          )

          return
        }

        /*
         * También validamos el tiempo
         * al entrar/refrescar la página.
         */
        if (
          hasAssessmentTimeExpired(
            activeSession,
          )
        ) {
          finishAssessmentByTimeout(
            assessmentId,
          )

          navigate(
            `/assessments/${assessmentId}/results`,
            {
              replace: true,
            },
          )

          return
        }

        const activeQuestion =
          activeSession.questions[
            activeSession
              .currentQuestionIndex
          ]

        /*
         * Evita saltarse preguntas
         * modificando manualmente la URL.
         */
        if (
          activeQuestion &&
          activeQuestion.id !==
            questionId
        ) {
          navigate(
            `/assessments/${assessmentId}/questions/${activeQuestion.id}`,
            {
              replace: true,
            },
          )

          return
        }

        setSession(
          activeSession,
        )

        setIsLoadingQuestion(
          true,
        )

        setQuestionError(
          null,
        )

        setCode('')
        setResult(null)
        setError(null)

        setSubmissionError(
          null,
        )

        setSelectedPublicTestCaseIndex(
          0,
        )

        try {
          const data =
            await getQuestion(
              questionId,
            )

          setQuestion(data)

          if (
            data.allowedLanguages
              .length > 0
          ) {
            setLanguage(
              data.allowedLanguages[
                0
              ],
            )
          }
        } catch {
          setQuestionError(
            COPY.solveQuestion
              .errors.load,
          )
        } finally {
          setIsLoadingQuestion(
            false,
          )
        }
      }

    void loadQuestion()
  }, [
    assessmentId,
    questionId,
    navigate,
  ])

  /*
   * Detecta automáticamente cuando
   * el tiempo llega a cero.
   *
   * Si justo se está enviando una
   * respuesta, esperamos a que termine
   * ese request para no perder una
   * respuesta enviada a tiempo.
   */
  useEffect(() => {
    if (
      !assessmentId ||
      !session ||
      session.completedAt ||
      isSubmitting
    ) {
      return
    }

    const timeLimitMilliseconds =
      session.timeLimitMinutes *
      60 *
      1000

    const elapsedMilliseconds =
      now -
      session.startedAt

    if (
      elapsedMilliseconds <
      timeLimitMilliseconds
    ) {
      return
    }

    const updatedSession =
      finishAssessmentByTimeout(
        assessmentId,
      )

    if (!updatedSession) {
      return
    }

    setSession(
      updatedSession,
    )

    navigate(
      `/assessments/${assessmentId}/results`,
      {
        replace: true,
      },
    )
  }, [
    assessmentId,
    session,
    now,
    isSubmitting,
    navigate,
  ])

  const selectedPublicTestCase =
    question?.testCases[
      selectedPublicTestCaseIndex
    ] ?? null

  const currentQuestionIndex =
    session
      ? session.questions.findIndex(
          (
            currentQuestion,
          ) =>
            currentQuestion.id ===
            questionId,
        )
      : -1

  const elapsedSeconds =
    session
      ? Math.max(
          0,
          Math.floor(
            (now -
              session.startedAt) /
              1000,
          ),
        )
      : 0

  const totalTimeSeconds =
    session
      ? session.timeLimitMinutes *
        60
      : 0

  const remainingSeconds =
    Math.max(
      0,
      totalTimeSeconds -
        elapsedSeconds,
    )

  const handleRunCode =
    async () => {
      if (
        !session ||
        hasAssessmentTimeExpired(
          session,
        )
      ) {
        if (assessmentId) {
          finishAssessmentByTimeout(
            assessmentId,
          )

          navigate(
            `/assessments/${assessmentId}/results`,
            {
              replace: true,
            },
          )
        }

        return
      }

      try {
        setIsRunning(true)

        setError(null)
        setResult(null)

        const executionResult =
          await runCode({
            language,

            sourceCode:
              code,

            stdin:
              selectedPublicTestCase
                ?.input ?? '',
          })

        setResult(
          executionResult,
        )
      } catch {
        setError(
          COPY.solveQuestion
            .errors.execution,
        )
      } finally {
        setIsRunning(false)
      }
    }

  const handleSubmitAnswer =
    async () => {
      if (
        !assessmentId ||
        !questionId ||
        !session
      ) {
        setSubmissionError(
          COPY.solveQuestion
            .errors
            .missingIds,
        )

        return
      }

      const currentSession =
        getAssessmentSession(
          assessmentId,
        )

      if (!currentSession) {
        setSubmissionError(
          COPY.solveQuestion
            .errors
            .noActiveSession,
        )

        return
      }

      /*
       * Si ya se había agotado
       * el tiempo antes de presionar
       * Submit, no enviamos respuesta.
       */
      if (
        hasAssessmentTimeExpired(
          currentSession,
        )
      ) {
        finishAssessmentByTimeout(
          assessmentId,
        )

        navigate(
          `/assessments/${assessmentId}/results`,
          {
            replace: true,
          },
        )

        return
      }

      try {
        setIsSubmitting(
          true,
        )

        setSubmissionError(
          null,
        )

        /*
         * Tiempo empleado únicamente
         * en esta pregunta.
         */
        const timeSpentSeconds =
          Math.max(
            0,
            Math.floor(
              (Date.now() -
                currentSession.questionStartedAt) /
                1000,
            ),
          )

        const submission =
          await submitAnswer({
            assessmentId,

            questionId,

            candidate:
              currentSession.candidate,

            language,

            sourceCode:
              code,

            timeSpentSeconds,
          })

        const updatedSession =
          registerAssessmentSubmission(
            assessmentId,
            submission,
          )

        if (!updatedSession) {
          setSubmissionError(
            COPY.solveQuestion
              .errors
              .sessionUpdate,
          )

          return
        }

        /*
         * Si era la última pregunta,
         * termina normalmente.
         */
        if (
          updatedSession.completedAt
        ) {
          navigate(
            `/assessments/${assessmentId}/results`,
          )

          return
        }

        /*
         * La respuesta sí alcanzó
         * a enviarse, pero puede que
         * durante la ejecución de Judge0
         * haya terminado el tiempo.
         */
        if (
          hasAssessmentTimeExpired(
            updatedSession,
          )
        ) {
          finishAssessmentByTimeout(
            assessmentId,
          )

          navigate(
            `/assessments/${assessmentId}/results`,
            {
              replace: true,
            },
          )

          return
        }

        const nextQuestion =
          updatedSession.questions[
            updatedSession
              .currentQuestionIndex
          ]

        if (!nextQuestion) {
          setSubmissionError(
            COPY.solveQuestion
              .errors
              .nextQuestion,
          )

          return
        }

        navigate(
          `/assessments/${assessmentId}/questions/${nextQuestion.id}`,
        )
      } catch {
        setSubmissionError(
          COPY.solveQuestion
            .errors
            .submission,
        )
      } finally {
        setIsSubmitting(
          false,
        )
      }
    }

  if (isLoadingQuestion) {
    return (
      <main className="px-6 py-8">
        <p>
          {
            COPY.solveQuestion
              .loading
          }
        </p>
      </main>
    )
  }

  if (
    questionError ||
    !question ||
    !session
  ) {
    return (
      <main className="px-6 py-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-red-600">
            {questionError ??
              COPY.solveQuestion
                .errors
                .questionNotFound}
          </p>

          {assessmentId && (
            <Button
              asChild
              variant="outline"
              className="mt-5"
            >
              <Link
                to={`/assessments/${assessmentId}`}
              >
                {
                  COPY
                    .assessmentSession
                    .back
                }
              </Link>
            </Button>
          )}
        </div>
      </main>
    )
  }

  const isTimeAlmostOver =
    remainingSeconds <= 60

  return (
    <main className="px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-xl border bg-white px-5 py-4 shadow-sm">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-[#0043A9]">
                {
                  session.assessmentName
                }
              </p>

              <p className="mt-1 text-sm text-slate-600">
                {
                  COPY.solveQuestion
                    .labels
                    .candidate
                }
                :{' '}
                <strong className="text-slate-900">
                  {
                    session.candidate
                  }
                </strong>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-sm font-medium">
                {
                  COPY.solveQuestion
                    .labels.question
                }{' '}
                {currentQuestionIndex +
                  1}{' '}
                {
                  COPY.solveQuestion
                    .labels.of
                }{' '}
                {
                  session.questions
                    .length
                }
              </p>

              <p
                className={`mt-1 font-mono text-xl font-semibold ${
                  isTimeAlmostOver
                    ? 'text-red-600'
                    : ''
                }`}
              >
                {formatTime(
                  remainingSeconds,
                )}
              </p>

              <p className="text-xs text-slate-500">
                {
                  COPY.solveQuestion
                    .labels
                    .timeRemaining
                }
              </p>
            </div>
          </div>
        </div>

        <header>
          <p className="text-sm text-slate-500">
            {
              COPY.solveQuestion
                .eyebrow
            }
          </p>

          <h1 className="mt-1 text-2xl font-bold">
            {question.title}
          </h1>

          <p className="mt-3 max-w-3xl text-slate-600">
            {
              question.description
            }
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {
              COPY.solveQuestion
                .labels
                .maximumScore
            }
            : {question.score}{' '}
            {
              COPY.solveQuestion
                .labels.points
            }
          </p>
        </header>

        <section className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold">
              {
                COPY.solveQuestion
                  .publicTests
                  .title
              }
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {
                COPY.solveQuestion
                  .publicTests
                  .description
              }
            </p>
          </div>

          {question.testCases
            .length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">
              {
                COPY.solveQuestion
                  .publicTests.empty
              }
            </p>
          ) : (
            <div className="mt-5 space-y-4">
              {question.testCases
                .length > 1 && (
                <div className="max-w-xs">
                  <label
                    htmlFor="public-test-case"
                    className="mb-2 block text-sm font-medium"
                  >
                    {
                      COPY
                        .solveQuestion
                        .publicTests
                        .select
                    }
                  </label>

                  <select
                    id="public-test-case"
                    value={
                      selectedPublicTestCaseIndex
                    }
                    onChange={(
                      event,
                    ) =>
                      setSelectedPublicTestCaseIndex(
                        Number(
                          event
                            .target
                            .value,
                        ),
                      )
                    }
                    className="w-full rounded-md border bg-white px-3 py-2 text-sm outline-none focus:ring-2"
                  >
                    {question.testCases.map(
                      (
                        _,
                        index,
                      ) => (
                        <option
                          key={
                            index
                          }
                          value={
                            index
                          }
                        >
                          {
                            COPY
                              .solveQuestion
                              .publicTests
                              .option
                          }{' '}
                          {index +
                            1}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              )}

              {selectedPublicTestCase && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border bg-slate-50 p-4">
                    <p className="text-sm font-medium">
                      {
                        COPY
                          .solveQuestion
                          .publicTests
                          .input
                      }
                    </p>

                    <pre className="mt-2 whitespace-pre-wrap font-mono text-sm text-slate-700">
                      {
                        selectedPublicTestCase.input
                      }
                    </pre>
                  </div>

                  <div className="rounded-lg border bg-slate-50 p-4">
                    <p className="text-sm font-medium">
                      {
                        COPY
                          .solveQuestion
                          .publicTests
                          .expectedOutput
                      }
                    </p>

                    <pre className="mt-2 whitespace-pre-wrap font-mono text-sm text-slate-700">
                      {
                        selectedPublicTestCase.expectedOutput
                      }
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        <section className="mt-6 overflow-hidden rounded-xl border bg-white">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-semibold">
              {
                COPY.solveQuestion
                  .labels.code
              }
            </h2>

            <LanguageSelector
              value={language}
              allowedLanguages={
                question.allowedLanguages
              }
              onChange={
                setLanguage
              }
            />
          </div>

          <CodeEditor
            language={language}
            value={code}
            onChange={setCode}
          />

          <div className="flex justify-end gap-3 border-t p-4">
            <Button
              variant="outline"
              onClick={
                handleRunCode
              }
              disabled={
                isRunning ||
                isSubmitting ||
                !code.trim()
              }
            >
              {isRunning
                ? COPY
                    .solveQuestion
                    .running
                : COPY
                    .solveQuestion
                    .runCode}
            </Button>

            <Button
              className="bg-[#0043A9] text-white hover:bg-[#00388F]"
              onClick={
                handleSubmitAnswer
              }
              disabled={
                isSubmitting ||
                isRunning ||
                !code.trim()
              }
            >
              {isSubmitting
                ? COPY
                    .solveQuestion
                    .submitting
                : currentQuestionIndex ===
                    session.questions
                      .length -
                      1
                  ? COPY
                      .solveQuestion
                      .finishAssessment
                  : COPY
                      .solveQuestion
                      .submitAnswer}
            </Button>
          </div>
        </section>

        <section className="mt-6 rounded-xl border bg-slate-950 p-5 text-sm text-slate-100">
          <h2 className="mb-3 font-semibold">
            {
              COPY.solveQuestion
                .console.title
            }
          </h2>

          {!result &&
            !error && (
              <p className="text-slate-400">
                {
                  COPY
                    .solveQuestion
                    .console.empty
                }
              </p>
            )}

          {error && (
            <pre className="whitespace-pre-wrap text-red-400">
              {error}
            </pre>
          )}

          {result && (
            <div className="space-y-2">
              <p>
                {
                  COPY.solveQuestion
                    .labels.status
                }
                :{' '}
                {
                  COPY
                    .executionStatus[
                    result.status
                  ]
                }
              </p>

              {result.stdout && (
                <pre className="whitespace-pre-wrap">
                  {
                    result.stdout
                  }
                </pre>
              )}

              {result.compileOutput && (
                <pre className="whitespace-pre-wrap text-amber-300">
                  {
                    result.compileOutput
                  }
                </pre>
              )}

              {result.stderr && (
                <pre className="whitespace-pre-wrap text-red-400">
                  {
                    result.stderr
                  }
                </pre>
              )}

              <p className="text-xs text-slate-400">
                {
                  COPY.solveQuestion
                    .labels
                    .executionTime
                }
                :{' '}
                {result.time ??
                  '-'}{' '}
                s |{' '}
                {
                  COPY.solveQuestion
                    .labels.memory
                }
                :{' '}
                {result.memory ??
                  '-'}{' '}
                KB
              </p>
            </div>
          )}
        </section>

        {submissionError && (
          <section className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm text-red-700">
              {
                submissionError
              }
            </p>
          </section>
        )}
      </div>
    </main>
  )
}