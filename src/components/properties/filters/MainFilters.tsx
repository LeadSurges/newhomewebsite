import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, DollarSign, Home, Bed, Bath, Construction } from "lucide-react"
import { FilterDropdown } from "./FilterDropdown"
import { PriceFilter } from "./PriceFilter"

interface MainFiltersProps {
  location: string
  priceRange: number[]
  homeType: string | null
  bedroomRange: number[]
  bathroomRange: number[]
  constructionStatus: string | null
  onLocationChange: (value: string) => void
  onPriceRangeChange: (value: number[]) => void
  onHomeTypeChange: (value: string | null) => void
  onBedroomRangeChange: (value: number[]) => void
  onBathroomRangeChange: (value: number[]) => void
  onConstructionStatusChange: (value: string | null) => void
}

export function MainFilters({
  location,
  priceRange,
  homeType,
  bedroomRange,
  bathroomRange,
  constructionStatus,
  onLocationChange,
  onPriceRangeChange,
  onHomeTypeChange,
  onBedroomRangeChange,
  onBathroomRangeChange,
  onConstructionStatusChange,
}: MainFiltersProps) {
  const formatRangeDisplay = (range: number[]) => {
    return `${range[0]}+`
  }

  return (
    <>
      {/* Search Input */}
      <div className="relative flex-grow max-w-md">
        <Input
          type="text"
          placeholder="Search by location..."
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
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
          onChange={onPriceRangeChange}
        />
      </FilterDropdown>

      {/* Home Type Dropdown */}
      <FilterDropdown
        label={homeType || "Home type"}
        icon={Home}
        value={homeType}
        options={["Condo", "Townhouse", "Single family home"]}
        onChange={onHomeTypeChange}
        className="min-w-[140px] bg-white border-gray-300 hover:bg-gray-50"
      />

      {/* Bedrooms Dropdown */}
      <FilterDropdown
        label={`${formatRangeDisplay(bedroomRange)} beds`}
        icon={Bed}
        value={bedroomRange[0].toString() + "+"}
        options={["1+", "2+", "3+", "4+", "5+"]}
        onChange={(val) => {
          const num = parseInt(val);
          onBedroomRangeChange([num, 7]);
        }}
        className="min-w-[120px] bg-white border-gray-300 hover:bg-gray-50"
      />

      {/* Bathrooms Dropdown */}
      <FilterDropdown
        label={`${formatRangeDisplay(bathroomRange)} baths`}
        icon={Bath}
        value={bathroomRange[0].toString() + "+"}
        options={["1+", "2+", "3+", "4+"]}
        onChange={(val) => {
          const num = parseInt(val);
          onBathroomRangeChange([num, 5]);
        }}
        className="min-w-[120px] bg-white border-gray-300 hover:bg-gray-50"
      />

      {/* Construction Status */}
      <FilterDropdown
        label={constructionStatus || "Construction"}
        icon={Construction}
        value={constructionStatus}
        options={["Preconstruction", "Construction", "Complete"]}
        onChange={onConstructionStatusChange}
        className="min-w-[150px] bg-white border-gray-300 hover:bg-gray-50"
      />
    </>
  )
}