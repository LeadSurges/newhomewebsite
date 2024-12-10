import { Bed, Bath, Ruler } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FloorplanCardProps {
  name: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  imageUrl: string;
}

export const FloorplanCard = ({
  name,
  price,
  bedrooms,
  bathrooms,
  squareFeet,
  imageUrl,
}: FloorplanCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
          FOR SALE
        </span>
        <img
          src={imageUrl}
          alt={`${name} Floorplan`}
          className="w-full h-[200px] object-contain bg-white"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-1">{name}</h3>
        {price && (
          <p className="text-base font-bold text-primary mb-2">
            From ${price.toLocaleString()} CAD
          </p>
        )}
        <div className="flex gap-4 text-muted-foreground text-sm">
          {bedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{bedrooms} bd</span>
            </div>
          )}
          {bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{bathrooms} ba</span>
            </div>
          )}
          {squareFeet && (
            <div className="flex items-center gap-1">
              <Ruler className="h-4 w-4" />
              <span>From {squareFeet.toLocaleString()} SqFt</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};