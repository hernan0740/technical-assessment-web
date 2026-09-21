import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { COPY } from '@/constants/copy'
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
    } catch {
      setError(COPY.createAssessment.errors.create)
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
          ← {COPY.createAssessment.back}
        </Link>

        <header className="mt-6">
          <p className="text-sm text-slate-500">
            {COPY.createAssessment.eyebrow}
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            {COPY.createAssessment.title}
          </h1>

          <p className="mt-2 text-slate-600">
            {COPY.createAssessment.description}
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
              {COPY.createAssessment.fields.name}
            </label>

            <input
              id="name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder={
                COPY.createAssessment.fields
                  .namePlaceholder
              }
              required
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              {COPY.createAssessment.fields.description}
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder={
                COPY.createAssessment.fields
                  .descriptionPlaceholder
              }
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
                {COPY.createAssessment.fields.timeLimit}
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
                {
                  COPY.createAssessment.fields
                    .questionCount
                }
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
              className="bg-[#0043A9] text-white hover:bg-[#00388F]"
              type="submit"
              disabled={
                isSubmitting ||
                !name.trim() ||
                !description.trim()
              }
            >
              {isSubmitting
                ? COPY.createAssessment.submitting
                : COPY.createAssessment.submit}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}