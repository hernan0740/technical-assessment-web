import { useEffect, useState, type FormEvent } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { COPY } from '@/constants/copy'

import { getAssessmentById, updateAssessment } from '@/services/assessment.service'

export function EditAssessmentPage() {
  const { assessmentId } = useParams<{
    assessmentId: string
  }>()

  const navigate = useNavigate()

  const [name, setName] = useState('')

  const [description, setDescription] = useState('')

  const [timeLimitMinutes, setTimeLimitMinutes] = useState(60)

  const [isLoading, setIsLoading] = useState(true)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAssessment = async () => {
      if (!assessmentId) {
        setError(COPY.editAssessment.errors.assessmentIdRequired)

        setIsLoading(false)
        return
      }

      try {
        const assessment = await getAssessmentById(assessmentId)

        setName(assessment.name)

        setDescription(assessment.description)

        setTimeLimitMinutes(assessment.timeLimitMinutes)
      } catch {
        setError(COPY.editAssessment.errors.load)
      } finally {
        setIsLoading(false)
      }
    }

    void loadAssessment()
  }, [assessmentId])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!assessmentId) {
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      await updateAssessment(assessmentId, {
        name,
        description,
        timeLimitMinutes,
      })

      navigate(`/assessments/${assessmentId}`)
    } catch {
      setError(COPY.editAssessment.errors.update)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <main className="px-6 py-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-slate-500">{COPY.editAssessment.loading}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <Link
          to={assessmentId ? `/assessments/${assessmentId}` : '/assessments'}
          className="text-sm text-slate-500 hover:text-slate-900"
        >
          ← {COPY.editAssessment.back}
        </Link>

        <header className="mt-6">
          <p className="text-sm text-slate-500">{COPY.editAssessment.eyebrow}</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            {COPY.editAssessment.title}
          </h1>

          <p className="mt-2 text-slate-600">{COPY.editAssessment.description}</p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-xl border bg-white p-6 shadow-sm"
        >
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              {COPY.editAssessment.fields.name}
            </label>

            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={COPY.editAssessment.fields.namePlaceholder}
              required
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-medium">
              {COPY.editAssessment.fields.description}
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder={COPY.editAssessment.fields.descriptionPlaceholder}
              required
              rows={4}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
            />
          </div>

          <div>
            <label htmlFor="timeLimitMinutes" className="mb-2 block text-sm font-medium">
              {COPY.editAssessment.fields.timeLimit}
            </label>

            <input
              id="timeLimitMinutes"
              type="number"
              min="1"
              value={timeLimitMinutes}
              onChange={(event) => setTimeLimitMinutes(Number(event.target.value))}
              required
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 sm:w-48"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || !name.trim() || !description.trim()}
              className="bg-[#0043A9] text-white hover:bg-[#00388F]"
            >
              {isSubmitting ? COPY.editAssessment.submitting : COPY.editAssessment.submit}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
