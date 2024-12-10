import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface LocationFilterProps {
  value: string
  onChange: (value: string) => void
}

export function LocationFilter({ value, onChange }: LocationFilterProps) {
  return (
    <div className="flex-1 relative min-w-[200px]">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search by location..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 w-full"
      />
    </div>
  )
}