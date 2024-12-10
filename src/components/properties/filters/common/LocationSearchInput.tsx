import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface LocationSearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function LocationSearchInput({ value, onChange }: LocationSearchInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Trigger the search by calling onChange with current value
    onChange(value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex-grow max-w-md">
      <Input
        type="text"
        placeholder="Search by location..."
        value={value}
        onChange={handleChange}
        className="pl-10 h-10"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </form>
  )
}