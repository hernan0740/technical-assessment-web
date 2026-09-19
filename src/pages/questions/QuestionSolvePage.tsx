import { useState } from 'react'

import type { ProgrammingLanguage } from '@/types/programming-language'
import { LanguageSelector } from '@/components/ui/code/LanguageSelector'
import { CodeEditor } from '@/components/ui/code/CodeEditor'

export function QuestionSolvePage() {
  const [language, setLanguage] =
    useState<ProgrammingLanguage>('javascript')

  const [code, setCode] = useState('')

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <header>
          <p className="text-sm text-slate-500">
            Programming question
          </p>

          <h1 className="mt-1 text-2xl font-bold">
            Find the maximum value
          </h1>

          <p className="mt-3 max-w-3xl text-slate-600">
            Given an array of numbers, return the maximum value.
          </p>
        </header>

        <section className="mt-8 overflow-hidden rounded-xl border bg-white">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-semibold">
              Code
            </h2>

            <LanguageSelector
              value={language}
              onChange={setLanguage}
            />
          </div>

          <CodeEditor
            language={language}
            value={code}
            onChange={setCode}
          />
        </section>
      </div>
    </main>
  )
}