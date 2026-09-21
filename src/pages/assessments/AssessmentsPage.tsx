import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { AppHeader } from '@/components/layout/AppHeader'
import { Button } from '@/components/ui/button'
import { COPY } from '@/constants/copy'
import { getAssessments } from '@/services/assessment.service'

import type { Assessment } from '@/types/assessment'

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
            : COPY.assessments.errors.load

        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    void loadAssessments()
  }, [])

  return (
      <main className="px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {COPY.assessments.title}
              </h1>

              <p className="mt-2 text-slate-600">
                {COPY.assessments.description}
              </p>
            </div>

            <Button
              asChild
              className="bg-[#0043A9] text-white hover:bg-[#00388F]"
            >
              <Link to="/assessments/new">
                {COPY.assessments.createButton}
              </Link>
            </Button>
          </div>

          {isLoading && (
            <p className="mt-8 text-slate-500">
              {COPY.assessments.loading}
            </p>
          )}

          {error && (
            <p className="mt-8 text-red-600">
              {error}
            </p>
          )}

          {!isLoading &&
            !error &&
            assessments.length === 0 && (
              <div className="mt-8 rounded-xl border bg-white p-8 text-center shadow-sm">
                <h2 className="text-lg font-semibold">
                  {COPY.assessments.empty.title}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {COPY.assessments.empty.description}
                </p>
              </div>
            )}

          <div className="mt-8 grid gap-4">
            {assessments.map((assessment) => {
              const minuteLabel =
                assessment.timeLimitMinutes === 1
                  ? COPY.assessments.units.minute
                  : COPY.assessments.units.minutes

              const questionLabel =
                assessment.questionCount === 1
                  ? COPY.assessments.units.question
                  : COPY.assessments.units.questions

              return (
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
                          {assessment.timeLimitMinutes}{' '}
                          {minuteLabel}
                        </span>

                        <span>
                          {assessment.questionCount}{' '}
                          {questionLabel}
                        </span>
                      </div>
                    </div>

                    <Button
                      asChild
                      className="bg-[#0043A9] text-white hover:bg-[#00388F]"
                    >
                      <Link
                        to={`/assessments/${assessment.id}`}
                      >
                        {COPY.assessments.viewButton}
                      </Link>
                    </Button>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </main>
  )
}