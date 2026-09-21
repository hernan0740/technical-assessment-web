import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { COPY } from '@/constants/copy'
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
        setError(
          COPY.assessmentDetail.errors.assessmentIdRequired,
        )
        setIsLoading(false)
        return
      }

      try {
        const data = await getQuestionsByAssessment(
          assessmentId,
        )

        setQuestions(data)
      } catch {
        setError(COPY.assessmentDetail.errors.load)
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
          ← {COPY.assessmentDetail.back}
        </Link>

        <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-slate-500">
              {COPY.assessmentDetail.eyebrow}
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              {COPY.assessmentDetail.title}
            </h1>

            <p className="mt-2 text-slate-600">
              {COPY.assessmentDetail.description}
            </p>
          </div>

          {assessmentId && (
            <Button asChild className="bg-[#0043A9] text-white hover:bg-[#00388F]">
              <Link
                to={`/assessments/${assessmentId}/questions/new`}
              >
                {COPY.assessmentDetail.createQuestion}
              </Link>
            </Button>
          )}
        </div>

        {isLoading && (
          <p className="mt-8 text-slate-500">
            {COPY.assessmentDetail.loading}
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
                {COPY.assessmentDetail.empty.title}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {COPY.assessmentDetail.empty.description}
              </p>

              {assessmentId && (
                <Button
                  asChild
                  className="mt-5"
                >
                  <Link
                    to={`/assessments/${assessmentId}/questions/new`}
                  >
                    {
                      COPY.assessmentDetail
                        .createFirstQuestion
                    }
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
                        {
                          COPY.assessmentDetail.labels
                            .question
                        }{' '}
                        {index + 1}
                      </p>

                      <h2 className="mt-1 text-xl font-semibold">
                        {question.title}
                      </h2>

                      <p className="mt-2 text-slate-600">
                        {question.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                        <span>
                          {
                            COPY.assessmentDetail.labels
                              .score
                          }
                          : {question.score}
                        </span>

                        <span>
                          {
                            COPY.assessmentDetail.labels
                              .languages
                          }
                          :{' '}
                          {question.allowedLanguages
                            .map(
                              (language) =>
                                COPY.languages[
                                  language
                                ],
                            )
                            .join(', ')}
                        </span>
                      </div>
                    </div>

                    <Button asChild className="bg-[#0043A9] text-white hover:bg-[#00388F]">
                      <Link
                        to={`/assessments/${assessmentId}/questions/${question.id}`}
                      >
                        {
                          COPY.assessmentDetail
                            .solveQuestion
                        }
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