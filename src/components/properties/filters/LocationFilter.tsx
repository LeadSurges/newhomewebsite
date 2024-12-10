import { MapPin } from "lucide-react"
import { FilterDropdown } from "./FilterDropdown"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LocationFilterProps {
  value: string
  onChange: (value: string) => void
}

export function LocationFilter({ value, onChange }: LocationFilterProps) {
  return (
    <FilterDropdown label="Location">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <Label className="text-base font-medium">Location</Label>
        </div>
        <Input
          type="text"
          placeholder="Enter location..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full"
        />
      </div>
    </FilterDropdown>
  )
}