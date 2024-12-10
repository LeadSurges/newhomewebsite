import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PriceFilterProps {
  value: number[]
  onChange: (value: number[]) => void
}

const priceOptions = [
  0,
  200000,
  300000,
  400000,
  500000,
  600000,
  800000,
  1000000,
  1500000,
]

export function PriceFilter({ value, onChange }: PriceFilterProps) {
  const [min, setMin] = useState(value[0].toString())
  const [max, setMax] = useState(value[1].toString())

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handlePriceSelect = (price: number) => {
    setMin(price.toString())
    onChange([price, 5000000]) // Set max to 5M when selecting a minimum price
  }

  const handleCustomRange = () => {
    const minValue = parseInt(min) || 0
    const maxValue = parseInt(max) || 5000000
    onChange([minValue, maxValue])
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label>Min</Label>
          <Input
            type="text"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            placeholder="Min price"
            className="mt-1"
          />
        </div>
        <div>
          <Label>Max</Label>
          <Input
            type="text"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            placeholder="Max price"
            className="mt-1"
          />
        </div>
      </div>

      <Button 
        variant="outline" 
        className="w-full mb-4"
        onClick={handleCustomRange}
      >
        Apply Custom Range
      </Button>

      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start font-normal"
            onClick={() => {
              setMin("0")
              setMax("5000000")
              onChange([0, 5000000])
            }}
          >
            Any price
          </Button>
          {priceOptions.map((price) => (
            <Button
              key={price}
              variant="ghost"
              className="w-full justify-start font-normal"
              onClick={() => handlePriceSelect(price)}
            >
              {formatPrice(price)}+
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}