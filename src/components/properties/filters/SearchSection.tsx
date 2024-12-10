import { SearchBar } from "./SearchBar"

interface SearchSectionProps {
  location: string
  onLocationChange: (value: string) => void
}

export function SearchSection({
  location,
  onLocationChange,
}: SearchSectionProps) {
  return (
    <div>
      <SearchBar
        type="location"
        value={location}
        onChange={onLocationChange}
        placeholder="Search by location or city..."
      />
    </div>
  )
}