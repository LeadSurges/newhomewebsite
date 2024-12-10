import { Bed, Bath, Ruler } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

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
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in">
      <div className="relative">
        <span 
          className={`absolute top-2 left-2 ${statusColor} text-white px-3 py-1 
                     rounded-full text-xs font-medium z-10`}
        >
          {status}
        </span>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <img
              src={imageUrl}
              alt={`${name} Floorplan`}
              className="w-full h-[200px] object-contain bg-white cursor-pointer 
                       hover:opacity-90 transition-opacity"
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
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-2">{name}</h3>
        {price && (
          <p className="text-lg font-bold text-primary mb-4">
            From ${price.toLocaleString()} CAD
          </p>
        )}
        <div className="grid grid-cols-3 gap-4 text-muted-foreground text-sm">
          {bedrooms && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
              <Bed className="h-4 w-4 text-accent" />
              <span>{bedrooms} bd</span>
            </div>
          )}
          {bathrooms && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
              <Bath className="h-4 w-4 text-accent" />
              <span>{bathrooms} ba</span>
            </div>
          )}
          {squareFeet && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
              <Ruler className="h-4 w-4 text-accent" />
              <span>{squareFeet.toLocaleString()} ft²</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};