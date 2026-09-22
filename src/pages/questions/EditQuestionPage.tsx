import { useEffect, useState, type FormEvent } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { COPY } from '@/constants/copy'

import { getQuestion, updateQuestion } from '@/services/question.service'

import {
  PROGRAMMING_LANGUAGES,
  type ProgrammingLanguage,
} from '@/types/programming-language'

export function EditQuestionPage() {
  const navigate = useNavigate()

  const { assessmentId, questionId } = useParams<{
    assessmentId: string
    questionId: string
  }>()

  const [title, setTitle] = useState('')

  const [description, setDescription] = useState('')

  const [score, setScore] = useState(20)

  const [allowedLanguages, setAllowedLanguages] = useState<ProgrammingLanguage[]>([])

  const [isLoading, setIsLoading] = useState(true)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadQuestion = async () => {
      if (!assessmentId || !questionId) {
        setError(COPY.editQuestion.errors.missingIds)

        setIsLoading(false)
        return
      }

      try {
        const question = await getQuestion(questionId)

        setTitle(question.title)

        setDescription(question.description)

        setScore(question.score)

        setAllowedLanguages(question.allowedLanguages)
      } catch {
        setError(COPY.editQuestion.errors.load)
      } finally {
        setIsLoading(false)
      }
    }

    void loadQuestion()
  }, [assessmentId, questionId])

  const toggleLanguage = (language: ProgrammingLanguage) => {
    setAllowedLanguages((currentLanguages) => {
      if (currentLanguages.includes(language)) {
        return currentLanguages.filter((currentLanguage) => currentLanguage !== language)
      }

      return [...currentLanguages, language]
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!assessmentId || !questionId) {
      return
    }

    if (allowedLanguages.length === 0) {
      setError(COPY.editQuestion.errors.languageRequired)

      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      await updateQuestion(questionId, {
        title,
        description,
        allowedLanguages,
        score,
      })

      navigate(`/assessments/${assessmentId}`)
    } catch {
      setError(COPY.editQuestion.errors.update)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <main className="px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-slate-500">{COPY.editQuestion.loading}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          to={assessmentId ? `/assessments/${assessmentId}` : '/assessments'}
          className="text-sm text-slate-500 hover:text-slate-900"
        >
          ← {COPY.editQuestion.back}
        </Link>

        <header className="mt-6">
          <p className="text-sm text-slate-500">{COPY.editQuestion.eyebrow}</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            {COPY.editQuestion.title}
          </h1>

          <p className="mt-2 text-slate-600">{COPY.editQuestion.description}</p>
        </header>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <section className="space-y-6 rounded-xl border bg-white p-6 shadow-sm">
            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-medium">
                {COPY.editQuestion.fields.title}
              </label>

              <input
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder={COPY.editQuestion.fields.titlePlaceholder}
                required
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
              />
            </div>

            <div>
              <label htmlFor="description" className="mb-2 block text-sm font-medium">
                {COPY.editQuestion.fields.description}
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder={COPY.editQuestion.fields.descriptionPlaceholder}
                required
                rows={5}
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
              />
            </div>

            <div>
              <label htmlFor="score" className="mb-2 block text-sm font-medium">
                {COPY.editQuestion.fields.score}
              </label>

              <input
                id="score"
                type="number"
                min="1"
                value={score}
                onChange={(event) => setScore(Number(event.target.value))}
                required
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 sm:w-40"
              />
            </div>
          </section>

          <section className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{COPY.editQuestion.languages.title}</h2>

            <p className="mt-1 text-sm text-slate-500">
              {COPY.editQuestion.languages.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-4">
              {PROGRAMMING_LANGUAGES.map((language) => (
                <label
                  key={language.value}
                  className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={allowedLanguages.includes(language.value)}
                    onChange={() => toggleLanguage(language.value)}
                  />

                  {COPY.languages[language.value]}
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="font-semibold text-amber-900">
              {COPY.editQuestion.testCasesNotice.title}
            </h2>

            <p className="mt-2 text-sm text-amber-800">
              {COPY.editQuestion.testCasesNotice.description}
            </p>
          </section>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !title.trim() ||
                !description.trim() ||
                allowedLanguages.length === 0
              }
              className="bg-[#0043A9] text-white hover:bg-[#00388F]"
            >
              {isSubmitting ? COPY.editQuestion.submitting : COPY.editQuestion.submit}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
