import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { LanguageSelector } from '@/components/ui/code/LanguageSelector'
import { CodeEditor } from '@/components/ui/code/CodeEditor'
import { COPY } from '@/constants/copy'
import { useAssessmentTimer } from '@/hooks/useAssessmentTimer'

import { runCode } from '@/services/execution.service'
import { getQuestion } from '@/services/question.service'
import { submitAnswer } from '@/services/submission.service'

import type { ExecutionResult } from '@/types/execution'
import type { ProgrammingLanguage } from '@/types/programming-language'
import type { Question } from '@/types/question'
import type { SubmissionResult } from '@/types/submission'

function formatElapsedTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(
    seconds,
  ).padStart(2, '0')}`
}

export function QuestionSolvePage() {
  const { assessmentId, questionId } = useParams<{
    assessmentId: string
    questionId: string
  }>()

  const navigate = useNavigate()
  const { elapsedSeconds, stop } = useAssessmentTimer()

  const [language, setLanguage] =
    useState<ProgrammingLanguage>('javascript')

  const [code, setCode] = useState('')

  const [question, setQuestion] =
    useState<Question | null>(null)

  const [isLoadingQuestion, setIsLoadingQuestion] =
    useState(true)

  const [questionError, setQuestionError] =
    useState<string | null>(null)

  const [result, setResult] =
    useState<ExecutionResult | null>(null)

  const [isRunning, setIsRunning] = useState(false)

  const [error, setError] =
    useState<string | null>(null)

  const [candidate, setCandidate] = useState('')

  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null)

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  const [submissionError, setSubmissionError] =
    useState<string | null>(null)

  useEffect(() => {
    const loadQuestion = async () => {
      if (!questionId) {
        setQuestionError(
          COPY.solveQuestion.errors.questionIdRequired,
        )
        setIsLoadingQuestion(false)
        return
      }

      try {
        const data = await getQuestion(questionId)

        setQuestion(data)

        if (data.allowedLanguages.length > 0) {
          setLanguage(data.allowedLanguages[0])
        }
      } catch {
        setQuestionError(
          COPY.solveQuestion.errors.load,
        )
      } finally {
        setIsLoadingQuestion(false)
      }
    }

    void loadQuestion()
  }, [questionId])

  const handleRunCode = async () => {
    try {
      setIsRunning(true)
      setError(null)
      setResult(null)

      const executionResult = await runCode({
        language,
        sourceCode: code,
        stdin: '',
      })

      setResult(executionResult)
    } catch {
      setError(
        COPY.solveQuestion.errors.execution,
      )
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmitAnswer = async () => {
    if (!assessmentId || !questionId) {
      setSubmissionError(
        COPY.solveQuestion.errors.missingIds,
      )
      return
    }

    try {
      setIsSubmitting(true)
      setSubmissionError(null)
      setSubmissionResult(null)

      const timeSpentSeconds = stop()

      const result = await submitAnswer({
        assessmentId,
        questionId,
        candidate,
        language,
        timeSpentSeconds,
        sourceCode: code,
      })

      setSubmissionResult(result)

      navigate(`/results/${result.id}`)
    } catch {
      setSubmissionError(
        COPY.solveQuestion.errors.submission,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoadingQuestion) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-8">
        <p>
          {COPY.solveQuestion.loading}
        </p>
      </main>
    )
  }

  if (questionError || !question) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-8">
        <p className="text-red-600">
          {questionError ??
            COPY.solveQuestion.errors
              .questionNotFound}
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-sm text-slate-500">
              {COPY.solveQuestion.eyebrow}
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              {question.title}
            </h1>

            <p className="mt-3 max-w-3xl text-slate-600">
              {question.description}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {
                COPY.solveQuestion.labels
                  .maximumScore
              }
              : {question.score}{' '}
              {COPY.solveQuestion.labels.points}
            </p>
          </div>

          <div className="rounded-lg border bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500">
              {
                COPY.solveQuestion.labels
                  .timeElapsed
              }
            </p>

            <p className="mt-1 font-mono text-xl font-semibold">
              {formatElapsedTime(elapsedSeconds)}
            </p>
          </div>
        </header>

        <section className="mt-8 overflow-hidden rounded-xl border bg-white">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-semibold">
              {COPY.solveQuestion.labels.code}
            </h2>

            <LanguageSelector
              value={language}
              allowedLanguages={
                question.allowedLanguages
              }
              onChange={setLanguage}
            />
          </div>

          <CodeEditor
            language={language}
            value={code}
            onChange={setCode}
          />

          <div className="border-t p-4">
            <label
              htmlFor="candidate"
              className="mb-2 block text-sm font-medium"
            >
              {
                COPY.solveQuestion.labels
                  .candidate
              }
            </label>

            <input
              id="candidate"
              value={candidate}
              onChange={(event) =>
                setCandidate(event.target.value)
              }
              placeholder={
                COPY.solveQuestion
                  .candidatePlaceholder
              }
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
            />
          </div>

          <div className="flex justify-end gap-3 border-t p-4">
            <Button
              className="bg-[#0043A9] text-white hover:bg-[#00388F]"
              variant="outline"
              onClick={handleRunCode}
              disabled={
                isRunning ||
                isSubmitting ||
                !code.trim()
              }
            >
              {isRunning
                ? COPY.solveQuestion.running
                : COPY.solveQuestion.runCode}
            </Button>

            <Button
              className="bg-[#0043A9] text-white hover:bg-[#00388F]"
              onClick={handleSubmitAnswer}
              disabled={
                isSubmitting ||
                isRunning ||
                !code.trim() ||
                !candidate.trim()
              }
            >
              {isSubmitting
                ? COPY.solveQuestion.submitting
                : COPY.solveQuestion.submitAnswer}
            </Button>
          </div>
        </section>

        <section className="mt-6 rounded-xl border bg-slate-950 p-5 text-sm text-slate-100">
          <h2 className="mb-3 font-semibold">
            {COPY.solveQuestion.console.title}
          </h2>

          {!result && !error && (
            <p className="text-slate-400">
              {COPY.solveQuestion.console.empty}
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
                  COPY.solveQuestion.labels
                    .status
                }
                :{' '}
                {
                  COPY.executionStatus[
                    result.status
                  ]
                }
              </p>

              {result.stdout && (
                <pre className="whitespace-pre-wrap">
                  {result.stdout}
                </pre>
              )}

              {result.compileOutput && (
                <pre className="whitespace-pre-wrap text-amber-300">
                  {result.compileOutput}
                </pre>
              )}

              {result.stderr && (
                <pre className="whitespace-pre-wrap text-red-400">
                  {result.stderr}
                </pre>
              )}

              <p className="text-xs text-slate-400">
                {
                  COPY.solveQuestion.labels
                    .executionTime
                }
                : {result.time ?? '-'} s |{' '}
                {
                  COPY.solveQuestion.labels
                    .memory
                }
                : {result.memory ?? '-'} KB
              </p>
            </div>
          )}
        </section>

        {submissionError && (
          <section className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm text-red-700">
              {submissionError}
            </p>
          </section>
        )}

        {submissionResult && (
          <section className="mt-6 rounded-xl border bg-white p-5">
            <h2 className="text-lg font-semibold">
              {COPY.results.title}
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <p>
                {COPY.results.labels.status}:{' '}
                <strong>
                  {
                    COPY.submissionStatus[
                      submissionResult.status
                    ]
                  }
                </strong>
              </p>

              <p>
                {COPY.results.labels.score}:{' '}
                <strong>
                  {submissionResult.score} /{' '}
                  {submissionResult.maxScore}
                </strong>
              </p>

              <p>
                {
                  COPY.results.labels
                    .testsPassed
                }
                :{' '}
                <strong>
                  {
                    submissionResult.passedTests
                  }{' '}
                  /{' '}
                  {
                    submissionResult.totalTests
                  }
                </strong>
              </p>

              <p>
                {
                  COPY.results.labels
                    .candidate
                }
                :{' '}
                <strong>
                  {
                    submissionResult.candidate
                  }
                </strong>
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}