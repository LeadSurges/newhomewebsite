import { formatPrice } from "@/utils/formatters";

interface PriceDisplayProps {
  price: number;
  size?: "default" | "small";
}

export const PriceDisplay = ({ price, size = "default" }: PriceDisplayProps) => {
  return (
    <p className={`font-bold text-primary ${size === "small" ? "text-lg" : "text-xl"}`}>
      {formatPrice(price)}
    </p>
  );
};