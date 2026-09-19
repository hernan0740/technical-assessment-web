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
  onChange: (language: ProgrammingLanguage) => void
}

export function LanguageSelector({
  value,
  onChange,
}: LanguageSelectorProps) {
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
        {PROGRAMMING_LANGUAGES.map((language) => (
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