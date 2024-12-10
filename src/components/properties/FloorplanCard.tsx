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
        <span className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          FOR SALE
        </span>
        <img
          src={imageUrl}
          alt={`${name} Floorplan`}
          className="w-full h-[300px] object-contain bg-white"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        {price && (
          <p className="text-xl font-bold text-primary mb-4">
            From ${price.toLocaleString()} CAD
          </p>
        )}
        <div className="flex gap-6 text-muted-foreground">
          {bedrooms && (
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5" />
              <span>{bedrooms} bd</span>
            </div>
          )}
          {bathrooms && (
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5" />
              <span>{bathrooms} ba</span>
            </div>
          )}
          {squareFeet && (
            <div className="flex items-center gap-2">
              <Ruler className="h-5 w-5" />
              <span>From {squareFeet.toLocaleString()} SqFt</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};