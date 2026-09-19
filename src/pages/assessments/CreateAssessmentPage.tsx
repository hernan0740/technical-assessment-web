import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { createAssessment } from '@/services/assessment.service'

export function CreateAssessmentPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(60)
  const [questionCount, setQuestionCount] = useState(1)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      setError(null)

      const assessment = await createAssessment({
        name,
        description,
        timeLimitMinutes,
        questionCount,
      })

      navigate(`/assessments/${assessment.id}`)
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to create assessment'

      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-2xl">
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
            Create assessment
          </h1>

          <p className="mt-2 text-slate-600">
            Define the basic information for the technical assessment.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-xl border bg-white p-6 shadow-sm"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium"
            >
              Name
            </label>

            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Assessment Full Stack"
              required
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Description
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Describe the assessment..."
              required
              rows={4}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="timeLimitMinutes"
                className="mb-2 block text-sm font-medium"
              >
                Time limit
              </label>

              <input
                id="timeLimitMinutes"
                type="number"
                min="1"
                value={timeLimitMinutes}
                onChange={(event) =>
                  setTimeLimitMinutes(
                    Number(event.target.value),
                  )
                }
                required
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
              />
            </div>

            <div>
              <label
                htmlFor="questionCount"
                className="mb-2 block text-sm font-medium"
              >
                Question count
              </label>

              <input
                id="questionCount"
                type="number"
                min="0"
                value={questionCount}
                onChange={(event) =>
                  setQuestionCount(
                    Number(event.target.value),
                  )
                }
                required
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !name.trim() ||
                !description.trim()
              }
            >
              {isSubmitting
                ? 'Creating...'
                : 'Create assessment'}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}