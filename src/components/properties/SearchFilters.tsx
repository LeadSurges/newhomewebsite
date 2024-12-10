import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Home, Building2, Bed, Bath, Maximize, Construction, Key } from "lucide-react"
import { FilterDropdown } from "./filters/FilterDropdown"
import { FiltersSection } from "./filters/FiltersSection"
import { QuickMoveInFilter } from "./filters/QuickMoveInFilter"

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void
}

export const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState([0, 5000000])
  const [bedroomRange, setBedroomRange] = useState([1, 7])
  const [bathroomRange, setBathroomRange] = useState([1, 5])
  const [squareFeetRange, setSquareFeetRange] = useState([500, 10000])
  const [homeType, setHomeType] = useState<string | null>(null)
  const [constructionStatus, setConstructionStatus] = useState<string | null>(null)
  const [ownershipType, setOwnershipType] = useState<string | null>(null)
  const [quickMoveIn, setQuickMoveIn] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting filters:", {
      location,
      priceRange,
      bedroomRange,
      bathroomRange,
      squareFeetRange,
      homeType,
      constructionStatus,
      ownershipType,
      quickMoveIn,
    })
    onFilterChange({
      location,
      priceRange,
      bedroomRange,
      bathroomRange,
      squareFeetRange,
      homeType,
      constructionStatus,
      ownershipType,
      quickMoveIn,
    })
  }

  return (
    <div className="w-full border-b bg-white sticky top-16 z-10">
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {/* Search and Price Range Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Price range (e.g., 500k-1M)"
                className="pl-10 h-12"
                value={`${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}`}
                readOnly
                onClick={() => document.getElementById("price-filter")?.click()}
              />
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-2">
            <FilterDropdown
              label="HomeType"
              icon={Home}
              value={homeType}
              options={["Condo", "Townhouse", "Single family home"]}
              onChange={setHomeType}
            />
            <FilterDropdown
              label="Property Type"
              icon={Building2}
              value={homeType}
              options={["Condo", "Townhouse", "Single family home"]}
              onChange={setHomeType}
            />
            <FilterDropdown
              label="Bedrooms"
              icon={Bed}
              value={bedroomRange.join("-")}
              options={["1", "2", "3", "4+"]}
              onChange={(val) => setBedroomRange([parseInt(val), 7])}
            />
            <FilterDropdown
              label="Bathrooms"
              icon={Bath}
              value={bathroomRange.join("-")}
              options={["1", "2", "3", "4+"]}
              onChange={(val) => setBathroomRange([parseInt(val), 5])}
            />
            <FilterDropdown
              label="Size"
              icon={Maximize}
              value={squareFeetRange.join("-")}
              options={["500-1000", "1000-2000", "2000-3000", "3000+"]}
              onChange={(val) => {
                const [min, max] = val.split("-").map(Number)
                setSquareFeetRange([min, max || 10000])
              }}
            />
            <FilterDropdown
              label="Construction"
              icon={Construction}
              value={constructionStatus}
              options={["Preconstruction", "Construction", "Complete"]}
              onChange={setConstructionStatus}
            />
            <FilterDropdown
              label="Ownership"
              icon={Key}
              value={ownershipType}
              options={["Freehold", "Condo", "Co-op", "Condop"]}
              onChange={setOwnershipType}
            />
          </div>

          {/* Quick Move-in and Apply Filters */}
          <div className="flex justify-between items-center">
            <QuickMoveInFilter
              checked={quickMoveIn}
              onCheckedChange={setQuickMoveIn}
            />
            <Button type="submit" className="bg-primary text-white px-8">
              Apply Filters
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}