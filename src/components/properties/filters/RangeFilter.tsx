import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { LucideIcon } from "lucide-react"

interface RangeFilterProps {
  icon: LucideIcon
  label: string
  value: number[]
  onChange: (value: number[]) => void
  min: number
  max: number
  step: number
  formatValue: (value: number) => string
}

export function RangeFilter({
  icon: Icon,
  label,
  value,
  onChange,
  min,
  max,
  step,
  formatValue,
}: RangeFilterProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        <Label className="text-base font-medium">
          {label}: {formatValue(value[0])} - {formatValue(value[1])}
        </Label>
      </div>
      <Slider
        defaultValue={value}
        max={max}
        min={min}
        step={step}
        value={value}
        onValueChange={onChange}
        className="my-4"
      />
    </div>
  )
}