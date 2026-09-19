import Editor from '@monaco-editor/react'
import type { ProgrammingLanguage } from '@/types/programming-language'

interface CodeEditorProps {
  language: ProgrammingLanguage
  value: string
  onChange: (value: string) => void
}

export function CodeEditor({
  language,
  value,
  onChange,
}: CodeEditorProps) {
  return (
    <Editor
      height="500px"
      language={language}
      value={value}
      theme="vs-dark"
      onChange={(value) => onChange(value ?? '')}
      options={{
        minimap: {
          enabled: false,
        },
        fontSize: 14,
        automaticLayout: true,
        scrollBeyondLastLine: false,
      }}
    />
  )
}