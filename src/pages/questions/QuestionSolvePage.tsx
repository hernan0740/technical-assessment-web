import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { runCode } from '@/services/execution.service'
import type { ExecutionResult } from '@/types/execution'
import type { ProgrammingLanguage } from '@/types/programming-language'
import { LanguageSelector } from '@/components/ui/code/LanguageSelector'
import { CodeEditor } from '@/components/ui/code/CodeEditor'

export function QuestionSolvePage() {
  const [language, setLanguage] =
    useState<ProgrammingLanguage>('javascript')

  const [code, setCode] = useState('')
  const [result, setResult] = useState<ExecutionResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRunCode = async () => {
    try {
      setIsRunning(true)
      setError(null)
      setResult(null)

      const executionResult = await runCode({
        language,
        sourceCode: code,
        stdin: '',
      })

      setResult(executionResult)
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to execute code'

      setError(message)
    } finally {
      setIsRunning(false)
    }
  }

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

          <div className="flex justify-end border-t p-4">
            <Button
              onClick={handleRunCode}
              disabled={isRunning || !code.trim()}
            >
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
          </div>
        </section>

        <section className="mt-6 rounded-xl border bg-slate-950 p-5 text-sm text-slate-100">
          <h2 className="mb-3 font-semibold">
            Console
          </h2>

          {!result && !error && (
            <p className="text-slate-400">
              Run your code to see the output.
            </p>
          )}

          {error && (
            <pre className="whitespace-pre-wrap text-red-400">
              {error}
            </pre>
          )}

          {result && (
            <div className="space-y-2">
              <p>
                Status: {result.status}
              </p>

              {result.stdout && (
                <pre className="whitespace-pre-wrap">
                  {result.stdout}
                </pre>
              )}

              {result.compileOutput && (
                <pre className="whitespace-pre-wrap text-amber-300">
                  {result.compileOutput}
                </pre>
              )}

              {result.stderr && (
                <pre className="whitespace-pre-wrap text-red-400">
                  {result.stderr}
                </pre>
              )}

              <p className="text-xs text-slate-400">
                Time: {result.time ?? '-'} s | Memory:{' '}
                {result.memory ?? '-'} KB
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}