import { Bed, Bath, Ruler } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface FloorplanCardProps {
  name: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  imageUrl: string;
  status?: string;
}

export const FloorplanCard = ({
  name,
  price,
  bedrooms,
  bathrooms,
  squareFeet,
  imageUrl,
  status = "For Sale",
}: FloorplanCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const statusColor = status === "For Sale" ? "bg-green-600" : "bg-red-600";

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <span className={`absolute top-2 left-2 ${statusColor} text-white px-2 py-0.5 rounded-full text-xs font-medium`}>
          {status}
        </span>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <img
              src={imageUrl}
              alt={`${name} Floorplan`}
              className="w-full h-[200px] object-contain bg-white cursor-pointer hover:opacity-90 transition-opacity"
            />
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-full">
            <img
              src={imageUrl}
              alt={`${name} Floorplan`}
              className="w-full h-full object-contain"
            />
          </DialogContent>
        </Dialog>
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