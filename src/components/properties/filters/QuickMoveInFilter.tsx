import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface QuickMoveInFilterProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function QuickMoveInFilter({ checked, onCheckedChange }: QuickMoveInFilterProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="quick-move-in"
        checked={checked}
        onCheckedChange={(checked) => onCheckedChange(checked as boolean)}
      />
      <Label htmlFor="quick-move-in">Quick Move-in</Label>
    </div>
  )
}