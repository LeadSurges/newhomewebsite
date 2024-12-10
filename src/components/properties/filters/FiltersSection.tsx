import { FilterSection } from "./FilterSection"

interface FiltersSectionProps {
  priceRange: number[]
  bedroomRange: number[]
  bathroomRange: number[]
  squareFeetRange: number[]
  homeType: string | null
  constructionStatus: string | null
  ownershipType: string | null
  onPriceRangeChange: (value: number[]) => void
  onBedroomRangeChange: (value: number[]) => void
  onBathroomRangeChange: (value: number[]) => void
  onSquareFeetRangeChange: (value: number[]) => void
  onHomeTypeChange: (value: string | null) => void
  onConstructionStatusChange: (value: string | null) => void
  onOwnershipTypeChange: (value: string | null) => void
}

export function FiltersSection({
  priceRange,
  bedroomRange,
  bathroomRange,
  squareFeetRange,
  homeType,
  constructionStatus,
  ownershipType,
  onPriceRangeChange,
  onBedroomRangeChange,
  onBathroomRangeChange,
  onSquareFeetRangeChange,
  onHomeTypeChange,
  onConstructionStatusChange,
  onOwnershipTypeChange,
}: FiltersSectionProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <FilterSection type="price" value={priceRange} onChange={onPriceRangeChange} />
      <FilterSection
        type="bedrooms"
        value={bedroomRange}
        onChange={onBedroomRangeChange}
      />
      <FilterSection
        type="bathrooms"
        value={bathroomRange}
        onChange={onBathroomRangeChange}
      />
      <FilterSection
        type="size"
        value={squareFeetRange}
        onChange={onSquareFeetRangeChange}
      />
      <FilterSection type="homeType" value={homeType} onChange={onHomeTypeChange} />
      <FilterSection
        type="construction"
        value={constructionStatus}
        onChange={onConstructionStatusChange}
      />
      <FilterSection
        type="ownership"
        value={ownershipType}
        onChange={onOwnershipTypeChange}
      />
    </div>
  )
}