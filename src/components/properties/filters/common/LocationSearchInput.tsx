import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface LocationSearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function LocationSearchInput({ value, onChange }: LocationSearchInputProps) {
  return (
    <div className="relative flex-grow max-w-md">
      <Input
        type="text"
        placeholder="Search by location..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-10 bg-white border-gray-300"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  )
}