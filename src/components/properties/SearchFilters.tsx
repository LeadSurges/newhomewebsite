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
  Filter,
  Car,
  Calendar,
  KeySquare,
  Ruler,
  Building,
  Zap,
  Info
} from "lucide-react"
import { FilterDropdown } from "./filters/FilterDropdown"
import { PriceFilter } from "./filters/PriceFilter"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

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
      location,
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
      location,
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

  // Format the bedroom/bathroom range for display
  const formatRangeDisplay = (range: number[]) => {
    return `${range[0]}+`
  }

  const garageOptions = ["1", "2", "3", "4+"]
  const currentYear = new Date().getFullYear()
  const completionYearOptions = Array.from({ length: 5 }, (_, i) => (currentYear + i).toString())

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
              className="pl-10 h-10 bg-white border-gray-300"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          {/* Price Range Dropdown */}
          <FilterDropdown
            label={priceRange[0] === 0 && priceRange[1] === 5000000 ? "Any price" : `$${priceRange[0].toLocaleString()} - $${priceRange[1].toLocaleString()}`}
            icon={DollarSign}
            className="min-w-[140px] bg-white border-gray-300 hover:bg-gray-50"
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
            className="min-w-[140px] bg-white border-gray-300 hover:bg-gray-50"
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
            className="min-w-[120px] bg-white border-gray-300 hover:bg-gray-50"
          />

          {/* Bathrooms Dropdown */}
          <FilterDropdown
            label={`${formatRangeDisplay(bathroomRange)} baths`}
            icon={Bath}
            value={bathroomRange.join("+")}
            options={["1+", "2+", "3+", "4+"]}
            onChange={(val) => {
              const num = parseInt(val);
              setBathroomRange([num, 5]);
            }}
            className="min-w-[120px] bg-white border-gray-300 hover:bg-gray-50"
          />

          {/* Construction Status */}
          <FilterDropdown
            label={constructionStatus || "Construction"}
            icon={Construction}
            value={constructionStatus}
            options={["Preconstruction", "Construction", "Complete"]}
            onChange={setConstructionStatus}
            className="min-w-[150px] bg-white border-gray-300 hover:bg-gray-50"
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
              <div className="py-6 space-y-6">
                {/* Master Planned Communities */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <Label>Master planned communities</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Communities with shared amenities and planned development</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Switch
                    checked={masterPlanned}
                    onCheckedChange={setMasterPlanned}
                  />
                </div>

                {/* Quick Move-in */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <Label>Quick move-in</Label>
                  </div>
                  <Switch
                    checked={quickMoveIn}
                    onCheckedChange={setQuickMoveIn}
                  />
                </div>

                {/* Ownership Type */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <KeySquare className="h-4 w-4" />
                    Ownership
                  </Label>
                  <RadioGroup
                    value={ownershipType[0] || ""}
                    onValueChange={(value) => setOwnershipType([value])}
                    className="space-y-2"
                  >
                    {["All", "Freehold", "Condo", "Co-op", "Condop"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <RadioGroupItem value={type} id={type.toLowerCase()} />
                        <Label htmlFor={type.toLowerCase()}>{type}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Size (SqFt) */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Ruler className="h-4 w-4" />
                    Size (SqFt)
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Min</Label>
                      <Input
                        type="number"
                        value={squareFeet.min}
                        onChange={(e) => setSquareFeet({ ...squareFeet, min: e.target.value })}
                        placeholder="Min SqFt"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Max</Label>
                      <Input
                        type="number"
                        value={squareFeet.max}
                        onChange={(e) => setSquareFeet({ ...squareFeet, max: e.target.value })}
                        placeholder="Max SqFt"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Garage */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    Garage
                  </Label>
                  <FilterDropdown
                    label={garage || "Any"}
                    options={garageOptions}
                    onChange={setGarage}
                    className="w-full"
                  />
                </div>

                {/* Completion Year */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Completion Year
                  </Label>
                  <FilterDropdown
                    label={completionYear || "Any"}
                    options={completionYearOptions}
                    onChange={setCompletionYear}
                    className="w-full"
                  />
                </div>

                {/* Keywords */}
                <div className="space-y-3">
                  <Label>Keywords</Label>
                  <Input
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g. Free upgrades, community, amenities, etc."
                    className="w-full"
                  />
                </div>
              </div>
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