export type ProgrammingLanguage =
  | 'java'
  | 'javascript'
  | 'python'

export interface ProgrammingLanguageOption {
  value: ProgrammingLanguage
  label: string
  monacoLanguage: string
}

export const PROGRAMMING_LANGUAGES: ProgrammingLanguageOption[] = [
  {
    value: 'java',
    label: 'Java',
    monacoLanguage: 'java',
  },
  {
    value: 'javascript',
    label: 'JavaScript',
    monacoLanguage: 'javascript',
  },
  {
    value: 'python',
    label: 'Python',
    monacoLanguage: 'python',
  },
]