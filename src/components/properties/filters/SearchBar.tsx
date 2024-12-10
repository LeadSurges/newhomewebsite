import { Input } from "@/components/ui/input"
import { MapPin, Search } from "lucide-react"

interface SearchBarProps {
  type: "location" | "city"
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export function SearchBar({ type, value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        {type === "location" ? (
          <Search className="h-5 w-5 text-muted-foreground" />
        ) : (
          <MapPin className="h-5 w-5 text-muted-foreground" />
        )}
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-12 w-full bg-secondary border-muted"
      />
    </div>
  )
}