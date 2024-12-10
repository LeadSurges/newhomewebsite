import { Button } from "@/components/ui/button"

interface PriceOptionProps {
  price: number | null
  onSelect: (price: number | null) => void
  formatPrice: (price: number) => string
}

export function PriceOption({ price, onSelect, formatPrice }: PriceOptionProps) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start font-normal text-lg hover:bg-accent hover:text-accent-foreground border-0"
      onClick={() => onSelect(price)}
    >
      {price === null ? "Any price" : `${formatPrice(price)}+`}
    </Button>
  )
}