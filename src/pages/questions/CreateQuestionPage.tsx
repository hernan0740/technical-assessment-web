import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { COPY } from '@/constants/copy'
import { createQuestion } from '@/services/question.service'
import {
  PROGRAMMING_LANGUAGES,
  type ProgrammingLanguage,
} from '@/types/programming-language'
import type { CreateTestCaseRequest } from '@/types/question'

const EMPTY_TEST_CASE: CreateTestCaseRequest = {
  input: '',
  expectedOutput: '',
  isPrivate: false,
}

export function CreateQuestionPage() {
  const navigate = useNavigate()

  const { assessmentId } = useParams<{
    assessmentId: string
  }>()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [score, setScore] = useState(20)

  const [allowedLanguages, setAllowedLanguages] = useState<ProgrammingLanguage[]>([
    'java',
    'javascript',
    'python',
  ])

  const [testCases, setTestCases] = useState<CreateTestCaseRequest[]>([
    { ...EMPTY_TEST_CASE },
  ])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleLanguage = (language: ProgrammingLanguage) => {
    setAllowedLanguages((current) => {
      if (current.includes(language)) {
        return current.filter((currentLanguage) => currentLanguage !== language)
      }

      return [...current, language]
    })
  }

  const updateTestCase = (
    index: number,
    field: keyof CreateTestCaseRequest,
    value: string | boolean,
  ) => {
    setTestCases((current) =>
      current.map((testCase, currentIndex) =>
        currentIndex === index
          ? {
              ...testCase,
              [field]: value,
            }
          : testCase,
      ),
    )
  }

  const addTestCase = () => {
    setTestCases((current) => [...current, { ...EMPTY_TEST_CASE }])
  }

  const removeTestCase = (index: number) => {
    setTestCases((current) => current.filter((_, currentIndex) => currentIndex !== index))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!assessmentId) {
      setError(COPY.createQuestion.errors.assessmentIdRequired)
      return
    }

    if (allowedLanguages.length === 0) {
      setError(COPY.createQuestion.errors.languageRequired)
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      await createQuestion(assessmentId, {
        title,
        description,
        allowedLanguages,
        score,
        testCases,
      })

      navigate(`/assessments/${assessmentId}`)
    } catch {
      setError(COPY.createQuestion.errors.create)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          to={`/assessments/${assessmentId}`}
          className="text-sm text-slate-500 hover:text-slate-900"
        >
          ← {COPY.createQuestion.back}
        </Link>

        <header className="mt-6">
          <p className="text-sm text-slate-500">{COPY.createQuestion.eyebrow}</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            {COPY.createQuestion.title}
          </h1>

          <p className="mt-2 text-slate-600">{COPY.createQuestion.description}</p>
        </header>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <section className="space-y-6 rounded-xl border bg-white p-6 shadow-sm">
            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-medium">
                {COPY.createQuestion.fields.title}
              </label>

              <input
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder={COPY.createQuestion.fields.titlePlaceholder}
                required
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
              />
            </div>

            <div>
              <label htmlFor="description" className="mb-2 block text-sm font-medium">
                {COPY.createQuestion.fields.description}
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder={COPY.createQuestion.fields.descriptionPlaceholder}
                required
                rows={5}
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
              />
            </div>

            <div>
              <label htmlFor="score" className="mb-2 block text-sm font-medium">
                {COPY.createQuestion.fields.score}
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
            <h2 className="text-lg font-semibold">
              {COPY.createQuestion.languages.title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {COPY.createQuestion.languages.description}
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

          <section className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  {COPY.createQuestion.testCases.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {COPY.createQuestion.testCases.description}
                </p>
              </div>

              <Button
                className="bg-[#0043A9] text-white hover:bg-[#00388F]"
                type="button"
                variant="outline"
                onClick={addTestCase}
              >
                {COPY.createQuestion.testCases.add}
              </Button>
            </div>

            <div className="mt-6 space-y-6">
              {testCases.map((testCase, index) => (
                <div key={index} className="rounded-lg border p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">
                      {COPY.createQuestion.testCases.testCase} {index + 1}
                    </h3>

                    {testCases.length > 1 && (
                      <Button
                        className="bg-[#0043A9] text-white hover:bg-[#00388F]"
                        type="button"
                        variant="outline"
                        onClick={() => removeTestCase(index)}
                      >
                        {COPY.createQuestion.testCases.remove}
                      </Button>
                    )}
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor={`input-${index}`}
                        className="mb-2 block text-sm font-medium"
                      >
                        {COPY.createQuestion.testCases.input}
                      </label>

                      <textarea
                        id={`input-${index}`}
                        value={testCase.input}
                        onChange={(event) =>
                          updateTestCase(index, 'input', event.target.value)
                        }
                        placeholder={COPY.createQuestion.testCases.inputPlaceholder}
                        required
                        rows={3}
                        className="w-full rounded-md border px-3 py-2 font-mono text-sm outline-none focus:ring-2"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`output-${index}`}
                        className="mb-2 block text-sm font-medium"
                      >
                        {COPY.createQuestion.testCases.expectedOutput}
                      </label>

                      <textarea
                        id={`output-${index}`}
                        value={testCase.expectedOutput}
                        onChange={(event) =>
                          updateTestCase(index, 'expectedOutput', event.target.value)
                        }
                        placeholder={
                          COPY.createQuestion.testCases.expectedOutputPlaceholder
                        }
                        required
                        rows={3}
                        className="w-full rounded-md border px-3 py-2 font-mono text-sm outline-none focus:ring-2"
                      />
                    </div>
                  </div>

                  <label className="mt-4 flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={testCase.isPrivate}
                      onChange={(event) =>
                        updateTestCase(index, 'isPrivate', event.target.checked)
                      }
                    />

                    {COPY.createQuestion.testCases.private}
                  </label>
                </div>
              ))}
            </div>
          </section>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end">
            <Button
              className="bg-[#0043A9] text-white hover:bg-[#00388F]"
              type="submit"
              disabled={
                isSubmitting ||
                !title.trim() ||
                !description.trim() ||
                allowedLanguages.length === 0 ||
                testCases.length === 0
              }
            >
              {isSubmitting ? COPY.createQuestion.submitting : COPY.createQuestion.submit}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
