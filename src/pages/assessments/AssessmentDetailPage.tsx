import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { getQuestionsByAssessment } from '@/services/question.service'
import type { Question } from '@/types/question'

export function AssessmentDetailPage() {
  const { assessmentId } = useParams<{
    assessmentId: string
  }>()

  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadQuestions = async () => {
      if (!assessmentId) {
        setError('Assessment id is required')
        setIsLoading(false)
        return
      }

      try {
        const data = await getQuestionsByAssessment(
          assessmentId,
        )

        setQuestions(data)
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Unable to load questions'

        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    void loadQuestions()
  }, [assessmentId])

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/assessments"
          className="text-sm text-slate-500 hover:text-slate-900"
        >
          ← Back to assessments
        </Link>

        <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-slate-500">
              Technical Assessment
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Assessment questions
            </h1>

            <p className="mt-2 text-slate-600">
              Review the programming questions available for
              this assessment.
            </p>
          </div>

          {assessmentId && (
            <Button asChild>
              <Link
                to={`/assessments/${assessmentId}/questions/new`}
              >
                Create question
              </Link>
            </Button>
          )}
        </div>

        {isLoading && (
          <p className="mt-8 text-slate-500">
            Loading questions...
          </p>
        )}

        {error && (
          <p className="mt-8 text-red-600">
            {error}
          </p>
        )}

        {!isLoading &&
          !error &&
          questions.length === 0 && (
            <div className="mt-8 rounded-xl border bg-white p-8 text-center shadow-sm">
              <h2 className="text-lg font-semibold">
                No questions available
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                This assessment does not have programming
                questions yet.
              </p>

              {assessmentId && (
                <Button
                  asChild
                  className="mt-5"
                >
                  <Link
                    to={`/assessments/${assessmentId}/questions/new`}
                  >
                    Create first question
                  </Link>
                </Button>
              )}
            </div>
          )}

        {!isLoading &&
          !error &&
          questions.length > 0 && (
            <div className="mt-8 space-y-4">
              {questions.map((question, index) => (
                <article
                  key={question.id}
                  className="rounded-xl border bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-sm text-slate-500">
                        Question {index + 1}
                      </p>

                      <h2 className="mt-1 text-xl font-semibold">
                        {question.title}
                      </h2>

                      <p className="mt-2 text-slate-600">
                        {question.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                        <span>
                          Score: {question.score}
                        </span>

                        <span>
                          Languages:{' '}
                          {question.allowedLanguages.join(
                            ', ',
                          )}
                        </span>
                      </div>
                    </div>

                    <Button asChild>
                      <Link
                        to={`/assessments/${assessmentId}/questions/${question.id}`}
                      >
                        Solve question
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
      </div>
    </main>
  )
}