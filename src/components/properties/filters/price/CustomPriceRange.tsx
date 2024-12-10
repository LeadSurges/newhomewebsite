import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface CustomPriceRangeProps {
  min: string
  max: string
  onMinChange: (value: string) => void
  onMaxChange: (value: string) => void
  onApply: () => void
}

export function CustomPriceRange({
  min,
  max,
  onMinChange,
  onMaxChange,
  onApply,
}: CustomPriceRangeProps) {
  return (
    <div className="mt-6">
      <Label className="mb-2 block text-base font-medium">Custom price range</Label>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Input
            type="text"
            value={min}
            onChange={(e) => onMinChange(e.target.value)}
            placeholder="Min price"
            className="w-full"
          />
        </div>
        <div>
          <Input
            type="text"
            value={max}
            onChange={(e) => onMaxChange(e.target.value)}
            placeholder="Max price"
            className="w-full"
          />
        </div>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={onApply}
      >
        Apply Custom Range
      </Button>
    </div>
  )
}