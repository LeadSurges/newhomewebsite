import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"

interface LocationSearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function LocationSearchInput({ value, onChange }: LocationSearchInputProps) {
  const [inputValue, setInputValue] = useState(value)

  // Update local state when prop value changes
  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting location search:", inputValue)
    onChange(inputValue)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleBlur = () => {
    console.log("Location input blur, value:", inputValue)
    onChange(inputValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      console.log("Enter key pressed, submitting location:", inputValue)
      onChange(inputValue)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex-grow max-w-md">
      <Input
        type="text"
        placeholder="Search by location..."
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="pl-10 h-10"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </form>
  )
}