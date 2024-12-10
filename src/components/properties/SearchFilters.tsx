import { useState } from "react"
import { Bed, Bath, DollarSign, Ruler, Search } from "lucide-react"
import { FilterDropdown } from "./filters/FilterDropdown"
import { RangeFilter } from "./filters/RangeFilter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
}

export const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 5000000])
  const [bedroomRange, setBedroomRange] = useState([1, 7])
  const [bathroomRange, setBathroomRange] = useState([1, 5])
  const [squareFeetRange, setSquareFeetRange] = useState([500, 10000])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilterChange({
      searchQuery,
      priceRange,
      bedroomRange,
      bathroomRange,
      squareFeetRange,
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
    <div className="w-full border-b bg-white">
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by location, development name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
          </div>

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

          <Button 
            type="submit" 
            className="w-full md:w-auto"
          >
            Apply Filters
          </Button>
        </div>
      </form>
    </div>
  )
}