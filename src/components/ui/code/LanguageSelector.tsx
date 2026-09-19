import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
        <SelectValue placeholder="Select language" />
      </SelectTrigger>

      <SelectContent>
        {availableLanguages.map((language) => (
          <SelectItem
            key={language.value}
            value={language.value}
          >
            {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}