import { DollarSign, Home, Bed, Bath, Construction } from "lucide-react"
import { FilterDropdown } from "./FilterDropdown"
import { PriceFilter } from "./price/PriceFilter"
import { LocationSearchInput } from "./common/LocationSearchInput"

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
  const handleLocationChange = (value: string) => {
    console.log("MainFilters: Location changed to:", value)
    onLocationChange(value)
  }

  const formatRangeDisplay = (range: number[]) => `${range[0]}+`

  const formatPriceDisplay = (range: number[]) => {
    if (range[0] === 0) return "Any price"
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(range[0]) + "+"
  }

  return (
    <>
      <LocationSearchInput 
        value={location} 
        onChange={handleLocationChange} 
      />

      <FilterDropdown
        label={formatPriceDisplay(priceRange)}
        icon={DollarSign}
        className="min-w-[140px]"
      >
        <PriceFilter
          value={priceRange}
          onChange={onPriceRangeChange}
        />
      </FilterDropdown>

      <FilterDropdown
        label={homeType || "Home type"}
        icon={Home}
        value={homeType}
        options={["Condo", "Townhouse", "Single family home"]}
        onChange={onHomeTypeChange}
        className="min-w-[140px]"
      />

      <FilterDropdown
        label={`${formatRangeDisplay(bedroomRange)} beds`}
        icon={Bed}
        value={bedroomRange[0].toString() + "+"}
        options={["1+", "2+", "3+", "4+", "5+"]}
        onChange={(val) => {
          const num = parseInt(val);
          onBedroomRangeChange([num, 7]);
        }}
        className="min-w-[120px]"
      />

      <FilterDropdown
        label={`${formatRangeDisplay(bathroomRange)} baths`}
        icon={Bath}
        value={bathroomRange[0].toString() + "+"}
        options={["1+", "2+", "3+", "4+"]}
        onChange={(val) => {
          const num = parseInt(val);
          onBathroomRangeChange([num, 5]);
        }}
        className="min-w-[120px]"
      />

      <FilterDropdown
        label={constructionStatus || "Construction"}
        icon={Construction}
        value={constructionStatus}
        options={["Preconstruction", "Construction", "Complete"]}
        onChange={onConstructionStatusChange}
        className="min-w-[150px]"
      />
    </>
  )
}
