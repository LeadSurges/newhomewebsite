import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Building, Zap, KeySquare, Ruler, Car, Calendar, Info } from "lucide-react"
import { FilterDropdown } from "./FilterDropdown"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface MoreFiltersContentProps {
  masterPlanned: boolean
  quickMoveIn: boolean
  ownershipType: string[]
  squareFeet: { min: string; max: string }
  garage: string | null
  completionYear: string | null
  keywords: string
  onMasterPlannedChange: (value: boolean) => void
  onQuickMoveInChange: (value: boolean) => void
  onOwnershipTypeChange: (value: string[]) => void
  onSquareFeetChange: (value: { min: string; max: string }) => void
  onGarageChange: (value: string | null) => void
  onCompletionYearChange: (value: string | null) => void
  onKeywordsChange: (value: string) => void
  onApply: () => void
}

export function MoreFiltersContent({
  masterPlanned,
  quickMoveIn,
  ownershipType,
  squareFeet,
  garage,
  completionYear,
  keywords,
  onMasterPlannedChange,
  onQuickMoveInChange,
  onOwnershipTypeChange,
  onSquareFeetChange,
  onGarageChange,
  onCompletionYearChange,
  onKeywordsChange,
  onApply,
}: MoreFiltersContentProps) {
  const garageOptions = ["1", "2", "3", "4+"]
  const currentYear = new Date().getFullYear()
  const completionYearOptions = Array.from({ length: 5 }, (_, i) => (currentYear + i).toString())

  return (
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
          onCheckedChange={onMasterPlannedChange}
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
          onCheckedChange={onQuickMoveInChange}
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
          onValueChange={(value) => onOwnershipTypeChange([value])}
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
              onChange={(e) => onSquareFeetChange({ ...squareFeet, min: e.target.value })}
              placeholder="Min SqFt"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Max</Label>
            <Input
              type="number"
              value={squareFeet.max}
              onChange={(e) => onSquareFeetChange({ ...squareFeet, max: e.target.value })}
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
          onChange={onGarageChange}
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
          onChange={onCompletionYearChange}
          className="w-full"
        />
      </div>

      {/* Keywords */}
      <div className="space-y-3">
        <Label>Keywords</Label>
        <Input
          value={keywords}
          onChange={(e) => onKeywordsChange(e.target.value)}
          placeholder="e.g. Free upgrades, community, amenities, etc."
          className="w-full"
        />
      </div>

      {/* Apply Button */}
      <Button 
        onClick={onApply}
        className="w-full mt-6"
      >
        Apply Filters
      </Button>
    </div>
  )
}