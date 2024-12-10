import { useState } from "react"
import { FilterSection } from "./filters/FilterSection"
import { SearchBar } from "./filters/SearchBar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
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
          {/* Search Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <SearchBar
              type="location"
              value={location}
              onChange={setLocation}
              placeholder="Search by location..."
            />
            <SearchBar
              type="city"
              value={city}
              onChange={setCity}
              placeholder="Search by city..."
            />
          </div>

          {/* Filters Section */}
          <div className="flex flex-wrap gap-4">
            <FilterSection
              type="price"
              value={priceRange}
              onChange={setPriceRange}
            />
            <FilterSection
              type="bedrooms"
              value={bedroomRange}
              onChange={setBedroomRange}
            />
            <FilterSection
              type="bathrooms"
              value={bathroomRange}
              onChange={setBathroomRange}
            />
            <FilterSection
              type="size"
              value={squareFeetRange}
              onChange={setSquareFeetRange}
            />
            <FilterSection
              type="homeType"
              value={homeType}
              onChange={setHomeType}
            />
            <FilterSection
              type="construction"
              value={constructionStatus}
              onChange={setConstructionStatus}
            />
            <FilterSection
              type="ownership"
              value={ownershipType}
              onChange={setOwnershipType}
            />
          </div>

          {/* Quick Move-in and Apply Button */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="quick-move-in"
                checked={quickMoveIn}
                onCheckedChange={(checked) => setQuickMoveIn(checked as boolean)}
              />
              <Label htmlFor="quick-move-in">Quick Move-in</Label>
            </div>
            <Button type="submit" size="lg" className="bg-primary text-white">
              Apply Filters
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}