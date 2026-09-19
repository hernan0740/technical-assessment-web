import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { LanguageSelector } from '@/components/ui/code/LanguageSelector'
import { CodeEditor } from '@/components/ui/code/CodeEditor'

import { runCode } from '@/services/execution.service'
import { getQuestion } from '@/services/question.service'
import { submitAnswer } from '@/services/submission.service'

import type { ExecutionResult } from '@/types/execution'
import type { ProgrammingLanguage } from '@/types/programming-language'
import type { Question } from '@/types/question'
import type { SubmissionResult } from '@/types/submission'

export function QuestionSolvePage() {
  const { assessmentId, questionId } = useParams<{
    assessmentId: string
    questionId: string
  }>()

  const [language, setLanguage] =
    useState<ProgrammingLanguage>('javascript')

  const [code, setCode] = useState('')

  const [question, setQuestion] = useState<Question | null>(null)
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true)
  const [questionError, setQuestionError] = useState<string | null>(null)

  const [result, setResult] = useState<ExecutionResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const [candidate, setCandidate] = useState('')

  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [submissionError, setSubmissionError] =
    useState<string | null>(null)

  useEffect(() => {
    const loadQuestion = async () => {
      if (!questionId) {
        setQuestionError('Question id is required')
        setIsLoadingQuestion(false)
        return
      }

      try {
        const data = await getQuestion(questionId)

        setQuestion(data)

        if (data.allowedLanguages.length > 0) {
          setLanguage(data.allowedLanguages[0])
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Unable to load question'

        setQuestionError(message)
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
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to execute code'

      setError(message)
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmitAnswer = async () => {
    if (!assessmentId || !questionId) {
      setSubmissionError(
        'Assessment or question id is missing',
      )
      return
    }

    try {
      setIsSubmitting(true)
      setSubmissionError(null)
      setSubmissionResult(null)

      const result = await submitAnswer({
        assessmentId,
        questionId,
        candidate,
        language,
        sourceCode: code,
      })

      setSubmissionResult(result)
      navigate(`/results/${result.id}`)
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to submit answer'

      setSubmissionError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoadingQuestion) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-8">
        <p>Loading question...</p>
      </main>
    )
  }

  if (questionError || !question) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-8">
        <p className="text-red-600">
          {questionError ?? 'Question not found'}
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <header>
          <p className="text-sm text-slate-500">
            Programming question
          </p>

          <h1 className="mt-1 text-2xl font-bold">
            {question.title}
          </h1>

          <p className="mt-3 max-w-3xl text-slate-600">
            {question.description}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Maximum score: {question.score} points
          </p>
        </header>

        <section className="mt-8 overflow-hidden rounded-xl border bg-white">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-semibold">Code</h2>

            <LanguageSelector
              value={language}
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
              Candidate
            </label>

            <input
              id="candidate"
              value={candidate}
              onChange={(event) =>
                setCandidate(event.target.value)
              }
              placeholder="Enter candidate name"
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
            />
          </div>

          <div className="flex justify-end gap-3 border-t p-4">
            <Button
              variant="outline"
              onClick={handleRunCode}
              disabled={
                isRunning ||
                isSubmitting ||
                !code.trim()
              }
            >
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>

            <Button
              onClick={handleSubmitAnswer}
              disabled={
                isSubmitting ||
                isRunning ||
                !code.trim() ||
                !candidate.trim()
              }
            >
              {isSubmitting
                ? 'Submitting...'
                : 'Submit Answer'}
            </Button>
          </div>
        </section>

        <section className="mt-6 rounded-xl border bg-slate-950 p-5 text-sm text-slate-100">
          <h2 className="mb-3 font-semibold">Console</h2>

          {!result && !error && (
            <p className="text-slate-400">
              Run your code to see the output.
            </p>
          )}

          {error && (
            <pre className="whitespace-pre-wrap text-red-400">
              {error}
            </pre>
          )}

          {result && (
            <div className="space-y-2">
              <p>Status: {result.status}</p>

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
                Time: {result.time ?? '-'} s | Memory:{' '}
                {result.memory ?? '-'} KB
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
              Submission Result
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <p>
                Status:{' '}
                <strong>
                  {submissionResult.status}
                </strong>
              </p>

              <p>
                Score:{' '}
                <strong>
                  {submissionResult.score} /{' '}
                  {submissionResult.maxScore}
                </strong>
              </p>

              <p>
                Tests passed:{' '}
                <strong>
                  {submissionResult.passedTests} /{' '}
                  {submissionResult.totalTests}
                </strong>
              </p>

              <p>
                Candidate:{' '}
                <strong>
                  {submissionResult.candidate}
                </strong>
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}