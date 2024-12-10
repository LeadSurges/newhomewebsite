import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Home, 
  Building2, 
  Bed, 
  Bath, 
  Construction, 
  ChevronDown,
  DollarSign,
  Filter
} from "lucide-react"
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

  // Format the bedroom/bathroom range for display
  const formatRangeDisplay = (range: number[]) => {
    if (range[0] === range[1]) return `${range[0]}`
    if (range[1] === 7) return `${range[0]}+`
    return `${range[0]}-${range[1]}`
  }

  return (
    <div className="w-full border-b bg-white sticky top-16 z-10 shadow-sm">
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-wrap gap-3">
          {/* Search Input */}
          <div className="relative flex-grow max-w-md">
            <Input
              type="text"
              placeholder="Search by location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 h-10 bg-secondary"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          {/* Price Range Dropdown */}
          <FilterDropdown
            label={priceRange[0] === 0 && priceRange[1] === 5000000 ? "Any price" : `$${priceRange[0].toLocaleString()} - $${priceRange[1].toLocaleString()}`}
            icon={DollarSign}
            className="min-w-[140px] bg-secondary hover:bg-secondary/80"
          >
            <PriceFilter
              value={priceRange}
              onChange={setPriceRange}
            />
          </FilterDropdown>

          {/* Home Type Dropdown */}
          <FilterDropdown
            label={homeType || "Home type"}
            icon={Home}
            value={homeType}
            options={["Condo", "Townhouse", "Single family home"]}
            onChange={setHomeType}
            className="min-w-[140px] bg-secondary hover:bg-secondary/80"
          />

          {/* Bedrooms Dropdown */}
          <FilterDropdown
            label={`${formatRangeDisplay(bedroomRange)} beds`}
            icon={Bed}
            value={bedroomRange.join("+")}
            options={["1+", "2+", "3+", "4+", "5+"]}
            onChange={(val) => {
              const num = parseInt(val);
              setBedroomRange([num, 7]);
            }}
            className="min-w-[120px] bg-secondary hover:bg-secondary/80"
          />

          {/* Bathrooms Dropdown */}
          <FilterDropdown
            label={`${formatRangeDisplay(bathroomRange)} baths`}
            icon={Bath}
            value={bathroomRange.join("+")}
            options={["1+", "2+", "3+", "4+"]}
            onChange={(val) => {
              const num = parseInt(val);
              setBedroomRange([num, 5]);
            }}
            className="min-w-[120px] bg-secondary hover:bg-secondary/80"
          />

          {/* Construction Status */}
          <FilterDropdown
            label={constructionStatus || "Construction"}
            icon={Construction}
            value={constructionStatus}
            options={["Preconstruction", "Construction", "Complete"]}
            onChange={setConstructionStatus}
            className="min-w-[150px] bg-secondary hover:bg-secondary/80"
          />

          {/* More Filters Button */}
          <Button
            variant="outline"
            className="min-w-[100px] flex items-center gap-2 bg-secondary hover:bg-secondary/80"
            onClick={() => console.log("More filters clicked")}
          >
            <Filter className="h-4 w-4" />
            More
          </Button>

          {/* Apply Filters Button */}
          <Button 
            type="submit"
            className="min-w-[100px] bg-primary hover:bg-primary/90"
          >
            Apply Filters
          </Button>
        </div>
      </form>
    </div>
  )
}