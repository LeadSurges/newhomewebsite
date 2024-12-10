import { useState } from "react"
import { PriceOption } from "./PriceOption"
import { CustomPriceRange } from "./CustomPriceRange"

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

  const handlePriceSelect = (price: number | null) => {
    console.log("Selected price:", price)
    if (price === null) {
      onChange([0, 100000000])
      setMin("0")
      setMax("")
    } else {
      onChange([price, 100000000])
      setMin(price.toString())
      setMax("")
    }
  }

  const handleCustomRange = () => {
    const minValue = parseInt(min) || 0
    const maxValue = parseInt(max) || 100000000
    onChange([minValue, maxValue])
  }

  return (
    <div className="p-4 bg-background border-none">
      <div className="space-y-2">
        <PriceOption
          price={null}
          onSelect={handlePriceSelect}
          formatPrice={formatPrice}
        />
        {priceOptions.map((price) => (
          <PriceOption
            key={price}
            price={price}
            onSelect={handlePriceSelect}
            formatPrice={formatPrice}
          />
        ))}
      </div>

      <CustomPriceRange
        min={min}
        max={max}
        onMinChange={setMin}
        onMaxChange={setMax}
        onApply={handleCustomRange}
      />
    </div>
  )
}