import { SearchBar } from "./SearchBar"

interface SearchSectionProps {
  location: string
  city: string
  onLocationChange: (value: string) => void
  onCityChange: (value: string) => void
}

export function SearchSection({
  location,
  city,
  onLocationChange,
  onCityChange,
}: SearchSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <SearchBar
        type="location"
        value={location}
        onChange={onLocationChange}
        placeholder="Search by location..."
      />
      <SearchBar
        type="city"
        value={city}
        onChange={onCityChange}
        placeholder="Search by city..."
      />
    </div>
  )
}