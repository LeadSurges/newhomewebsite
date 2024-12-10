import { useState } from "react"
import { Bed, Bath, DollarSign, Ruler, Home, Construction, Key } from "lucide-react"
import { FilterDropdown } from "./filters/FilterDropdown"
import { RangeFilter } from "./filters/RangeFilter"
import { LocationFilter } from "./filters/LocationFilter"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CitySearch } from "./filters/CitySearch"

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <div className="w-full border-b bg-white sticky top-0 z-10">
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-wrap">
          <LocationFilter value={location} onChange={setLocation} />
          <CitySearch value={city} onChange={setCity} />

          <FilterDropdown label="Price">
            <RangeFilter
              icon={DollarSign}
              label="Price Range"
              value={priceRange}
              onChange={setPriceRange}
              min={0}
              max={10000000}
              step={50000}
              formatValue={formatPrice}
            />
          </FilterDropdown>

          <FilterDropdown label="Beds">
            <RangeFilter
              icon={Bed}
              label="Bedrooms"
              value={bedroomRange}
              onChange={setBedroomRange}
              min={1}
              max={10}
              step={1}
              formatValue={String}
            />
          </FilterDropdown>

          <FilterDropdown label="Baths">
            <RangeFilter
              icon={Bath}
              label="Bathrooms"
              value={bathroomRange}
              onChange={setBathroomRange}
              min={1}
              max={7}
              step={0.5}
              formatValue={String}
            />
          </FilterDropdown>

          <FilterDropdown label="Size">
            <RangeFilter
              icon={Ruler}
              label="Square Feet"
              value={squareFeetRange}
              onChange={setSquareFeetRange}
              min={500}
              max={20000}
              step={100}
              formatValue={formatNumber}
            />
          </FilterDropdown>

          <FilterDropdown label="Home Type">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                <Label className="text-base font-medium">Home Type</Label>
              </div>
              <RadioGroup value={homeType || ""} onValueChange={setHomeType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Condo" id="condo" />
                  <Label htmlFor="condo">Condo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Townhouse" id="townhouse" />
                  <Label htmlFor="townhouse">Townhouse</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Single family home" id="single-family" />
                  <Label htmlFor="single-family">Single Family Home</Label>
                </div>
              </RadioGroup>
            </div>
          </FilterDropdown>

          <FilterDropdown label="Construction">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Construction className="h-5 w-5 text-primary" />
                <Label className="text-base font-medium">Construction Status</Label>
              </div>
              <RadioGroup value={constructionStatus || ""} onValueChange={setConstructionStatus}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Preconstruction" id="preconstruction" />
                  <Label htmlFor="preconstruction">Preconstruction</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Construction" id="construction" />
                  <Label htmlFor="construction">Under Construction</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Complete" id="complete" />
                  <Label htmlFor="complete">Complete</Label>
                </div>
              </RadioGroup>
            </div>
          </FilterDropdown>

          <FilterDropdown label="Ownership">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                <Label className="text-base font-medium">Ownership Type</Label>
              </div>
              <RadioGroup value={ownershipType || ""} onValueChange={setOwnershipType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Freehold" id="freehold" />
                  <Label htmlFor="freehold">Freehold</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Condo" id="condo-ownership" />
                  <Label htmlFor="condo-ownership">Condo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Co-op" id="co-op" />
                  <Label htmlFor="co-op">Co-op</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Condop" id="condop" />
                  <Label htmlFor="condop">Condop</Label>
                </div>
              </RadioGroup>
            </div>
          </FilterDropdown>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="quick-move-in"
              checked={quickMoveIn}
              onCheckedChange={(checked) => setQuickMoveIn(checked as boolean)}
            />
            <Label htmlFor="quick-move-in">Quick Move-in</Label>
          </div>

          <Button type="submit" className="w-full md:w-auto">
            Apply Filters
          </Button>
        </div>
      </form>
    </div>
  )
}