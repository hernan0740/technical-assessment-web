import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { COPY } from '@/constants/copy'
import { getSubmission } from '@/services/submission.service'

import type { SubmissionResult } from '@/types/submission'

function formatTimeSpent(totalSeconds: number) {
  if (!Number.isFinite(totalSeconds)) {
    return '-'
  }

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes}m ${seconds}s`
}

export function ResultsPage() {
  const { submissionId } = useParams<{
    submissionId: string
  }>()

  const [submission, setSubmission] =
    useState<SubmissionResult | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSubmission = async () => {
      if (!submissionId) {
        setError(
          COPY.results.errors.submissionIdRequired,
        )
        setIsLoading(false)
        return
      }

      try {
        const data = await getSubmission(submissionId)

        setSubmission(data)
      } catch {
        setError(COPY.results.errors.load)
      } finally {
        setIsLoading(false)
      }
    }

    void loadSubmission()
  }, [submissionId])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <p>{COPY.results.loading}</p>
      </main>
    )
  }

  if (error || !submission) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <p className="text-red-600">
          {error ?? COPY.results.notFound}
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <header>
          <p className="text-sm text-slate-500">
            {COPY.results.eyebrow}
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            {COPY.results.title}
          </h1>

          <p className="mt-2 text-slate-600">
            {COPY.results.description}
          </p>
        </header>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">
                {COPY.results.labels.status}
              </p>

              <p className="mt-1 text-xl font-semibold">
                {
                  COPY.submissionStatus[
                    submission.status
                  ]
                }
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                {COPY.results.labels.score}
              </p>

              <p className="mt-1 text-xl font-semibold">
                {submission.score} /{' '}
                {submission.maxScore}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                {COPY.results.labels.candidate}
              </p>

              <p className="mt-1 font-medium">
                {submission.candidate}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                {COPY.results.labels.language}
              </p>

              <p className="mt-1 font-medium">
                {
                  COPY.languages[
                    submission.language
                  ]
                }
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                {COPY.results.labels.testsPassed}
              </p>

              <p className="mt-1 font-medium">
                {submission.passedTests} /{' '}
                {submission.totalTests}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                {COPY.results.labels.timeSpent}
              </p>

              <p className="mt-1 font-medium">
                {formatTimeSpent(
                  submission.timeSpentSeconds,
                )}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">
            {COPY.results.testResults.title}
          </h2>

          <div className="mt-4 space-y-3">
            {submission.testResults.map((test) => (
              <div
                key={test.index}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">
                    {
                      COPY.results.testResults
                        .testCase
                    }{' '}
                    {test.index}
                  </p>

                  <p className="text-sm text-slate-500">
                    {test.isPrivate
                      ? COPY.results.testResults
                          .private
                      : COPY.results.testResults
                          .public}
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className={
                      test.passed
                        ? 'font-semibold text-green-600'
                        : 'font-semibold text-red-600'
                    }
                  >
                    {test.passed
                      ? COPY.results.testResults
                          .passed
                      : COPY.results.testResults
                          .failed}
                  </p>

                  <p className="text-xs text-slate-500">
                    {
                      COPY.executionStatus[
                        test.executionStatus
                      ]
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6">
          <Button
            className="bg-[#0043A9] text-white hover:bg-[#00388F]"
            asChild
            variant="outline"
          >
            <Link to="/assessments">
              {COPY.results.back}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}