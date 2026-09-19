import { useEffect, useState } from 'react'
import { getAssessments } from '@/services/assessment.service'
import type { Assessment } from '@/types/assessment'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function AssessmentsPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAssessments = async () => {
      try {
        const data = await getAssessments()
        setAssessments(data)
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Unable to load assessments'

        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    void loadAssessments()
  }, [])

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Technical Assessments
          </h1>

          <p className="mt-2 text-slate-600">
            Select an assessment to start your technical evaluation.
          </p>
        </div>

        <Button asChild>
          <Link to="/assessments/new">
            Create assessment
          </Link>
        </Button>
      </div>

        {isLoading && (
          <p className="mt-8 text-slate-500">Loading assessments...</p>
        )}

        {error && (
          <p className="mt-8 text-red-600">{error}</p>
        )}

        {!isLoading && !error && assessments.length === 0 && (
          <p className="mt-8 text-slate-500">
            No assessments available.
          </p>
        )}

        <div className="mt-8 grid gap-4">
          {assessments.map((assessment) => (
            <article
  key={assessment.id}
  className="rounded-xl border bg-white p-6 shadow-sm"
>
  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
    <div>
      <h2 className="text-xl font-semibold">
        {assessment.name}
      </h2>

      <p className="mt-2 text-slate-600">
        {assessment.description}
      </p>

      <div className="mt-4 flex gap-6 text-sm text-slate-500">
        <span>
          {assessment.timeLimitMinutes} minutes
        </span>

        <span>
          {assessment.questionCount} questions
        </span>
      </div>
    </div>

    <Button asChild>
      <Link to={`/assessments/${assessment.id}`}>
        View assessment
      </Link>
    </Button>
  </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}