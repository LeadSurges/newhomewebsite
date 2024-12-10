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
    console.log("LocationSearchInput received new value:", value)
    setInputValue(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    console.log("Location input changed:", newValue)
    setInputValue(newValue)
    onChange(newValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      console.log("Enter key pressed, submitting location:", inputValue)
      onChange(inputValue)
    }
  }

  const handleClear = () => {
    console.log("Clearing location input")
    setInputValue("")
    onChange("")  // This is crucial - we need to propagate the empty value up
  }

  return (
    <div className="relative flex-grow max-w-md">
      <Input
        type="text"
        placeholder="Search by location..."
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="pl-10 h-10 pr-8"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          ×
        </button>
      )}
    </div>
  )
}