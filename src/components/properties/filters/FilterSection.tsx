import { FilterDropdown } from "./FilterDropdown"
import { RangeFilter } from "./RangeFilter"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Bed, Bath, DollarSign, Ruler, Home, Construction, Key } from "lucide-react"

interface FilterSectionProps {
  type: string
  value: any
  onChange: (value: any) => void
}

export function FilterSection({ type, value, onChange }: FilterSectionProps) {
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

  const renderContent = () => {
    switch (type) {
      case "price":
        return (
          <RangeFilter
            icon={DollarSign}
            label="Price Range"
            value={value}
            onChange={onChange}
            min={0}
            max={10000000}
            step={50000}
            formatValue={formatPrice}
          />
        )
      case "bedrooms":
        return (
          <RangeFilter
            icon={Bed}
            label="Bedrooms"
            value={value}
            onChange={onChange}
            min={1}
            max={10}
            step={1}
            formatValue={String}
          />
        )
      case "bathrooms":
        return (
          <RangeFilter
            icon={Bath}
            label="Bathrooms"
            value={value}
            onChange={onChange}
            min={1}
            max={7}
            step={0.5}
            formatValue={String}
          />
        )
      case "size":
        return (
          <RangeFilter
            icon={Ruler}
            label="Square Feet"
            value={value}
            onChange={onChange}
            min={500}
            max={20000}
            step={100}
            formatValue={formatNumber}
          />
        )
      case "homeType":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              <Label className="text-base font-medium">Home Type</Label>
            </div>
            <RadioGroup value={value || ""} onValueChange={onChange}>
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
        )
      case "construction":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Construction className="h-5 w-5 text-primary" />
              <Label className="text-base font-medium">Construction Status</Label>
            </div>
            <RadioGroup value={value || ""} onValueChange={onChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="preconstruction" id="preconstruction" />
                <Label htmlFor="preconstruction">Preconstruction</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="under_construction" id="construction" />
                <Label htmlFor="construction">Under Construction</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="complete" id="complete" />
                <Label htmlFor="complete">Complete</Label>
              </div>
            </RadioGroup>
          </div>
        )
      case "ownership":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              <Label className="text-base font-medium">Ownership Type</Label>
            </div>
            <RadioGroup value={value || ""} onValueChange={onChange}>
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
        )
      default:
        return null
    }
  }

  return (
    <FilterDropdown label={type.charAt(0).toUpperCase() + type.slice(1)}>
      {renderContent()}
    </FilterDropdown>
  )
}