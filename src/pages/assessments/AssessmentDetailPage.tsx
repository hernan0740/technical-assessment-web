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

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <p>Loading questions...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <p className="text-red-600">{error}</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/assessments"
          className="text-sm text-slate-500 hover:text-slate-900"
        >
          ← Back to assessments
        </Link>

        <header className="mt-6">
          <p className="text-sm text-slate-500">
            Technical Assessment
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Questions
          </h1>

          <p className="mt-2 text-slate-600">
            Select a programming question to start solving.
          </p>
        </header>

        {questions.length === 0 && (
          <p className="mt-8 text-slate-500">
            No questions available for this assessment.
          </p>
        )}

        <div className="mt-8 grid gap-4">
          {questions.map((question, index) => (
            <article
              key={question.id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
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
                      {question.score} points
                    </span>

                    <span>
                      {question.allowedLanguages.join(', ')}
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
      </div>
    </main>
  )
}