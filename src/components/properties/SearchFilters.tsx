import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MainFilters } from "./filters/MainFilters"
import { MoreFiltersContent } from "./filters/MoreFiltersContent"

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
  const [masterPlanned, setMasterPlanned] = useState(false)
  const [ownershipType, setOwnershipType] = useState<string[]>([])
  const [squareFeet, setSquareFeet] = useState({ min: "", max: "" })
  const [garage, setGarage] = useState<string | null>(null)
  const [completionYear, setCompletionYear] = useState<string | null>(null)
  const [keywords, setKeywords] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting filters:", {
      location: location.trim(), // Ensure we trim whitespace
      priceRange,
      bedroomRange,
      bathroomRange,
      homeType,
      constructionStatus,
      quickMoveIn,
      masterPlanned,
      ownershipType,
      squareFeet,
      garage,
      completionYear,
      keywords,
    })
    onFilterChange({
      location: location.trim(), // Ensure we trim whitespace
      priceRange,
      bedroomRange,
      bathroomRange,
      homeType,
      constructionStatus,
      quickMoveIn,
      masterPlanned,
      ownershipType,
      squareFeet,
      garage,
      completionYear,
      keywords,
    })
  }

  const handleMoreFiltersApply = () => {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent)
  }

  return (
    <div className="w-full border-b bg-white sticky top-16 z-10 shadow-sm">
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-wrap gap-3">
          <MainFilters
            location={location}
            priceRange={priceRange}
            homeType={homeType}
            bedroomRange={bedroomRange}
            bathroomRange={bathroomRange}
            constructionStatus={constructionStatus}
            onLocationChange={setLocation}
            onPriceRangeChange={setPriceRange}
            onHomeTypeChange={setHomeType}
            onBedroomRangeChange={setBedroomRange}
            onBathroomRangeChange={setBathroomRange}
            onConstructionStatusChange={setConstructionStatus}
          />

          {/* More Filters Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[100px] flex items-center gap-2 bg-white border-gray-300 hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                More
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>More Filters</SheetTitle>
              </SheetHeader>
              <MoreFiltersContent
                masterPlanned={masterPlanned}
                quickMoveIn={quickMoveIn}
                ownershipType={ownershipType}
                squareFeet={squareFeet}
                garage={garage}
                completionYear={completionYear}
                keywords={keywords}
                onMasterPlannedChange={setMasterPlanned}
                onQuickMoveInChange={setQuickMoveIn}
                onOwnershipTypeChange={setOwnershipType}
                onSquareFeetChange={setSquareFeet}
                onGarageChange={setGarage}
                onCompletionYearChange={setCompletionYear}
                onKeywordsChange={setKeywords}
                onApply={handleMoreFiltersApply}
              />
            </SheetContent>
          </Sheet>

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