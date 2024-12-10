import { Bed, Bath, Ruler, Calendar } from "lucide-react";
import { format } from "date-fns";

interface PropertyStatsProps {
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  created_at: string;
}

export const PropertyStats = ({
  bedrooms,
  bathrooms,
  square_feet,
  created_at,
}: PropertyStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {bedrooms && (
        <div className="flex items-center">
          <Bed className="h-5 w-5 mr-2 text-muted-foreground" />
          <span>{bedrooms} beds</span>
        </div>
      )}
      {bathrooms && (
        <div className="flex items-center">
          <Bath className="h-5 w-5 mr-2 text-muted-foreground" />
          <span>{bathrooms} baths</span>
        </div>
      )}
      {square_feet && (
        <div className="flex items-center">
          <Ruler className="h-5 w-5 mr-2 text-muted-foreground" />
          <span>{square_feet.toLocaleString()} sq ft</span>
        </div>
      )}
      <div className="flex items-center">
        <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
        <span>{format(new Date(created_at), 'MMM d, yyyy')}</span>
      </div>
    </div>
  );
};