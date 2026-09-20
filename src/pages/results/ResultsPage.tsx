import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
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
        setError('Submission id is required')
        setIsLoading(false)
        return
      }

      try {
        const data = await getSubmission(submissionId)

        setSubmission(data)
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Unable to load submission'

        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    void loadSubmission()
  }, [submissionId])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <p>Loading results...</p>
      </main>
    )
  }

  if (error || !submission) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <p className="text-red-600">
          {error ?? 'Submission not found'}
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <header>
          <p className="text-sm text-slate-500">
            Technical Assessment Result
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Submission Result
          </h1>

          <p className="mt-2 text-slate-600">
            Review the result of your submitted solution.
          </p>
        </header>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">
                Status
              </p>

              <p className="mt-1 text-xl font-semibold">
                {submission.status}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Score
              </p>

              <p className="mt-1 text-xl font-semibold">
                {submission.score} / {submission.maxScore}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Candidate
              </p>

              <p className="mt-1 font-medium">
                {submission.candidate}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Language
              </p>

              <p className="mt-1 font-medium capitalize">
                {submission.language}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Tests passed
              </p>

              <p className="mt-1 font-medium">
                {submission.passedTests} / {submission.totalTests}
              </p>
            </div>

            <div>
                <p className="text-sm text-slate-500">
                    Time spent
                </p>

                <p className="mt-1 font-medium">
                    {formatTimeSpent(submission.timeSpentSeconds)}
                </p>
                </div>
          </div>
        </section>

        <section className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">
            Test Results
          </h2>

          <div className="mt-4 space-y-3">
            {submission.testResults.map((test) => (
              <div
                key={test.index}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">
                    Test case {test.index}
                  </p>

                  <p className="text-sm text-slate-500">
                    {test.isPrivate
                      ? 'Private test case'
                      : 'Public test case'}
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
                    {test.passed ? 'Passed' : 'Failed'}
                  </p>

                  <p className="text-xs text-slate-500">
                    {test.executionStatus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6">
          <Button asChild variant="outline">
            <Link to="/assessments">
              Back to assessments
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}