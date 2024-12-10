import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface PriceFilterProps {
  value: number[]
  onChange: (value: number[]) => void
}

const priceOptions = [
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
    console.log("Selected price:", price)
    onChange([price, 100000000]) // Set a very high max to effectively show all properties above the selected price
    setMin(price.toString())
    setMax("") // Clear max when selecting a minimum price
  }

  const handleCustomRange = () => {
    const minValue = parseInt(min) || 0
    const maxValue = parseInt(max) || 100000000
    onChange([minValue, maxValue])
  }

  return (
    <div className="p-4 bg-white">
      <div className="space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start font-normal text-lg hover:bg-gray-100 border-0"
          onClick={() => {
            setMin("0")
            setMax("")
            onChange([0, 100000000])
          }}
        >
          Any price
        </Button>
        {priceOptions.map((price) => (
          <Button
            key={price}
            variant="ghost"
            className="w-full justify-start font-normal text-lg hover:bg-gray-100 border-0"
            onClick={() => handlePriceSelect(price)}
          >
            {formatPrice(price)}+
          </Button>
        ))}
      </div>

      <div className="mt-6">
        <Label className="mb-2 block text-base font-medium">Custom price range</Label>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Input
              type="text"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              placeholder="Min price"
              className="w-full bg-white border-gray-300"
            />
          </div>
          <div>
            <Input
              type="text"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              placeholder="Max price"
              className="w-full bg-white border-gray-300"
            />
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full bg-white hover:bg-gray-50"
          onClick={handleCustomRange}
        >
          Apply Custom Range
        </Button>
      </div>
    </div>
  )
}