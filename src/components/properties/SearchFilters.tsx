import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Home, Building2, Bed, Bath, Construction, ChevronDown } from "lucide-react"
import { FilterDropdown } from "./filters/FilterDropdown"
import { PriceFilter } from "./filters/PriceFilter"

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void
}

export const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState([0, 5000000])
  const [bedroomRange, setBedroomRange] = useState([1, 7])
  const [bathroomRange, setBathroomRange] = useState([1, 5])
  const [homeType, setHomeType] = useState<string | null>(null)
  const [constructionStatus, setConstructionStatus] = useState<string | null>(null)
  const [quickMoveIn, setQuickMoveIn] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting filters:", {
      location,
      priceRange,
      bedroomRange,
      bathroomRange,
      homeType,
      constructionStatus,
      quickMoveIn,
    })
    onFilterChange({
      location,
      priceRange,
      bedroomRange,
      bathroomRange,
      homeType,
      constructionStatus,
      quickMoveIn,
    })
  }

  return (
    <div className="w-full border-b bg-white sticky top-16 z-10">
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-wrap gap-2">
          {/* For Sale Dropdown */}
          <FilterDropdown
            label="For sale"
            icon={Home}
            className="min-w-[120px]"
          />

          {/* Home Type Dropdown */}
          <FilterDropdown
            label="Home type"
            icon={Building2}
            value={homeType}
            options={["Condo", "Townhouse", "Single family home"]}
            onChange={setHomeType}
            className="min-w-[120px]"
          />

          {/* Price Range Dropdown */}
          <FilterDropdown
            label="Any price"
            icon={Building2}
            className="min-w-[120px]"
          >
            <PriceFilter
              value={priceRange}
              onChange={setPriceRange}
            />
          </FilterDropdown>

          {/* Bedrooms Dropdown */}
          <FilterDropdown
            label="0+ beds"
            icon={Bed}
            value={bedroomRange.join("+")}
            options={["0+", "1+", "2+", "3+", "4+"]}
            onChange={(val) => setBedroomRange([parseInt(val), 7])}
            className="min-w-[120px]"
          />

          {/* Construction Status */}
          <FilterDropdown
            label="Construction status"
            icon={Construction}
            value={constructionStatus}
            options={["Preconstruction", "Construction", "Complete"]}
            onChange={setConstructionStatus}
            className="min-w-[150px]"
          />

          {/* More Filters Button */}
          <Button
            variant="outline"
            className="min-w-[100px] flex items-center gap-2"
          >
            More
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}