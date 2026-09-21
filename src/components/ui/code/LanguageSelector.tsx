import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { COPY } from '@/constants/copy'
import {
  PROGRAMMING_LANGUAGES,
  type ProgrammingLanguage,
} from '@/types/programming-language'

interface LanguageSelectorProps {
  value: ProgrammingLanguage
  allowedLanguages: ProgrammingLanguage[]
  onChange: (language: ProgrammingLanguage) => void
}

export function LanguageSelector({
  value,
  allowedLanguages,
  onChange,
}: LanguageSelectorProps) {
  const availableLanguages = PROGRAMMING_LANGUAGES.filter(
    (language) => allowedLanguages.includes(language.value),
  )

  return (
    <Select
      value={value}
      onValueChange={(value) =>
        onChange(value as ProgrammingLanguage)
      }
    >
      <SelectTrigger className="w-48">
        <SelectValue placeholder={
            COPY.common.languageSelector.placeholder
          } />
      </SelectTrigger>

      <SelectContent>
        {availableLanguages.map((language) => (
          <SelectItem
            key={language.value}
            value={language.value}
          >
             {COPY.languages[language.value]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}