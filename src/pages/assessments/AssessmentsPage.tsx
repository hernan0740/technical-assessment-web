import {
  useEffect,
  useState,
} from 'react'

import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { COPY } from '@/constants/copy'

import {
  deleteAssessment,
  getAssessments,
} from '@/services/assessment.service'

import type { Assessment } from '@/types/assessment'

export function AssessmentsPage() {
  const [
    assessments,
    setAssessments,
  ] = useState<Assessment[]>([])

  const [
    isLoading,
    setIsLoading,
  ] = useState(true)

  const [
    deletingId,
    setDeletingId,
  ] = useState<string | null>(null)

  const [
    error,
    setError,
  ] = useState<string | null>(null)

  useEffect(() => {
    const loadAssessments = async () => {
      try {
        const data =
          await getAssessments()

        setAssessments(data)
      } catch {
        setError(
          COPY.assessments.errors.load,
        )
      } finally {
        setIsLoading(false)
      }
    }

    void loadAssessments()
  }, [])

  const handleDelete = async (
    assessment: Assessment,
  ) => {
    const confirmed = window.confirm(
      COPY.assessments.confirmDelete,
    )

    if (!confirmed) {
      return
    }

    try {
      setDeletingId(assessment.id)
      setError(null)

      await deleteAssessment(
        assessment.id,
      )

      setAssessments(
        (currentAssessments) =>
          currentAssessments.filter(
            (currentAssessment) =>
              currentAssessment.id !==
              assessment.id,
          ),
      )
    } catch {
      setError(
        COPY.assessments.errors.delete,
      )
    } finally {
      setDeletingId(null)
    }
  }

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
              {
                COPY.assessments
                  .createButton
              }
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
                {
                  COPY.assessments.empty
                    .title
                }
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {
                  COPY.assessments.empty
                    .description
                }
              </p>
            </div>
          )}

        <div className="mt-8 grid gap-4">
          {assessments.map(
            (assessment) => {
              const minuteLabel =
                assessment.timeLimitMinutes ===
                1
                  ? COPY.assessments.units
                      .minute
                  : COPY.assessments.units
                      .minutes

              const questionLabel =
                assessment.questionCount ===
                1
                  ? COPY.assessments.units
                      .question
                  : COPY.assessments.units
                      .questions

              const isDeleting =
                deletingId ===
                assessment.id

              return (
                <article
                  key={assessment.id}
                  className="rounded-xl border bg-white p-6 shadow-sm"
                >
                  <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                    <div className="min-w-0">
                      <h2 className="truncate text-xl font-semibold">
                        {assessment.name}
                      </h2>

                      <p className="mt-2 line-clamp-2 max-w-2xl text-slate-600">
                        {
                          assessment.description
                        }
                      </p>

                      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                        <span>
                          {
                            assessment.timeLimitMinutes
                          }{' '}
                          {minuteLabel}
                        </span>

                        <span>
                          {
                            assessment.questionCount
                          }{' '}
                          {questionLabel}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:min-w-[270px] sm:flex-nowrap sm:justify-end">
                      <Button
                        asChild
                        className="bg-[#0043A9] text-white hover:bg-[#00388F]"
                      >
                        <Link
                          to={`/assessments/${assessment.id}`}
                        >
                          {
                            COPY.assessments
                              .viewButton
                          }
                        </Link>
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                      >
                        <Link
                          to={`/assessments/${assessment.id}/edit`}
                        >
                          {
                            COPY.assessments
                              .editButton
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
                          void handleDelete(
                            assessment,
                          )
                        }
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        {isDeleting
                          ? COPY.assessments
                              .deletingButton
                          : COPY.assessments
                              .deleteButton}
                      </Button>
                    </div>
                  </div>
                </article>
              )
            },
          )}
        </div>
      </div>
    </main>
  )
}