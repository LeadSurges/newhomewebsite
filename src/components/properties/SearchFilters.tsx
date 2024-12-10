import { useState, useEffect } from "react"
import { Filter } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MainFilters } from "./filters/MainFilters"
import { MoreFiltersContent } from "./filters/MoreFiltersContent"
import { FilterButton } from "./filters/common/FilterButton"

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void
  initialFilters?: {
    location: string
    priceRange: number[]
    bedroomRange: number[]
    bathroomRange: number[]
    homeType: string | null
    constructionStatus: string | null
    quickMoveIn: boolean
    masterPlanned: boolean
    ownershipType: string[]
    squareFeet: { min: string; max: string }
    garage: string | null
    completionYear: string | null
    keywords: string
  }
}

export function SearchFilters({ onFilterChange, initialFilters }: SearchFiltersProps) {
  const [location, setLocation] = useState(initialFilters?.location || "")
  const [priceRange, setPriceRange] = useState(initialFilters?.priceRange || [0, 5000000])
  const [bedroomRange, setBedroomRange] = useState(initialFilters?.bedroomRange || [1, 7])
  const [bathroomRange, setBathroomRange] = useState(initialFilters?.bathroomRange || [1, 5])
  const [homeType, setHomeType] = useState<string | null>(initialFilters?.homeType || null)
  const [constructionStatus, setConstructionStatus] = useState<string | null>(initialFilters?.constructionStatus || null)
  const [quickMoveIn, setQuickMoveIn] = useState(initialFilters?.quickMoveIn || false)
  const [masterPlanned, setMasterPlanned] = useState(initialFilters?.masterPlanned || false)
  const [ownershipType, setOwnershipType] = useState<string[]>(initialFilters?.ownershipType || [])
  const [squareFeet, setSquareFeet] = useState(initialFilters?.squareFeet || { min: "", max: "" })
  const [garage, setGarage] = useState<string | null>(initialFilters?.garage || null)
  const [completionYear, setCompletionYear] = useState<string | null>(initialFilters?.completionYear || null)
  const [keywords, setKeywords] = useState(initialFilters?.keywords || "")

  // Update filters when initialFilters change
  useEffect(() => {
    if (initialFilters) {
      console.log("Updating SearchFilters with new initialFilters:", initialFilters);
      setLocation(initialFilters.location)
      setPriceRange(initialFilters.priceRange)
      setBedroomRange(initialFilters.bedroomRange)
      setBathroomRange(initialFilters.bathroomRange)
      setHomeType(initialFilters.homeType)
      setConstructionStatus(initialFilters.constructionStatus)
      setQuickMoveIn(initialFilters.quickMoveIn)
      setMasterPlanned(initialFilters.masterPlanned)
      setOwnershipType(initialFilters.ownershipType)
      setSquareFeet(initialFilters.squareFeet)
      setGarage(initialFilters.garage)
      setCompletionYear(initialFilters.completionYear)
      setKeywords(initialFilters.keywords)
    }
  }, [initialFilters])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const filters = {
      location: location.trim(),
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
    }
    console.log("Submitting filters from SearchFilters:", filters)
    onFilterChange(filters)
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
            onLocationChange={(value) => {
              console.log("Location changed in MainFilters:", value);
              setLocation(value);
              handleSubmit({ preventDefault: () => {} } as React.FormEvent);
            }}
            onPriceRangeChange={setPriceRange}
            onHomeTypeChange={setHomeType}
            onBedroomRangeChange={setBedroomRange}
            onBathroomRangeChange={setBathroomRange}
            onConstructionStatusChange={setConstructionStatus}
          />

          <Sheet>
            <SheetTrigger asChild>
              <FilterButton icon={Filter} label="More" />
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

          <FilterButton 
            label="Apply Filters"
            variant="default"
            className="bg-primary hover:bg-primary/90"
            onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
          />
        </div>
      </form>
    </div>
  )
}