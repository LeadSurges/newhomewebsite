import { MapPin } from "lucide-react"
import { FilterDropdown } from "./FilterDropdown"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CitySearchProps {
  value: string
  onChange: (value: string) => void
}

export function CitySearch({ value, onChange }: CitySearchProps) {
  return (
    <FilterDropdown label="City">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <Label className="text-base font-medium">City</Label>
        </div>
        <Input
          type="text"
          placeholder="Enter city name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full"
        />
      </div>
    </FilterDropdown>
  )
}