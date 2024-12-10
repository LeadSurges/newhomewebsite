import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SearchSection } from "./filters/SearchSection"
import { FiltersSection } from "./filters/FiltersSection"
import { QuickMoveInFilter } from "./filters/QuickMoveInFilter"

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void
}

export const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [location, setLocation] = useState("")
  const [city, setCity] = useState("")
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
      city,
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
      city,
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
    <div className="w-full border-b bg-white sticky top-0 z-10">
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col space-y-4">
          <SearchSection
            location={location}
            city={city}
            onLocationChange={setLocation}
            onCityChange={setCity}
          />

          <FiltersSection
            priceRange={priceRange}
            bedroomRange={bedroomRange}
            bathroomRange={bathroomRange}
            squareFeetRange={squareFeetRange}
            homeType={homeType}
            constructionStatus={constructionStatus}
            ownershipType={ownershipType}
            onPriceRangeChange={setPriceRange}
            onBedroomRangeChange={setBedroomRange}
            onBathroomRangeChange={setBathroomRange}
            onSquareFeetRangeChange={setSquareFeetRange}
            onHomeTypeChange={setHomeType}
            onConstructionStatusChange={setConstructionStatus}
            onOwnershipTypeChange={setOwnershipType}
          />

          <div className="flex items-center justify-between mt-4">
            <QuickMoveInFilter
              checked={quickMoveIn}
              onCheckedChange={setQuickMoveIn}
            />
            <Button type="submit" size="lg" className="bg-primary text-white">
              Apply Filters
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}