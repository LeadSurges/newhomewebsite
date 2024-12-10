import { Bed, Bath, Ruler, Calendar } from "lucide-react";
import { format } from "date-fns";

interface PropertyStatsProps {
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  created_at: string;
  bedrooms_min?: string;
  bedrooms_max?: string;
  bathrooms_min?: string;
  bathrooms_max?: string;
  square_feet_min?: string;
  square_feet_max?: string;
}

export const PropertyStats = ({
  bedrooms,
  bathrooms,
  square_feet,
  created_at,
  bedrooms_min,
  bedrooms_max,
  bathrooms_min,
  bathrooms_max,
  square_feet_min,
  square_feet_max,
}: PropertyStatsProps) => {
  const formatRange = (value?: number | string, min?: string, max?: string) => {
    if (value) return `${value}`;
    if (min && max) return `${min} - ${max}`;
    return undefined;
  };

  const bedroomsDisplay = formatRange(bedrooms, bedrooms_min, bedrooms_max);
  const bathroomsDisplay = formatRange(bathrooms, bathrooms_min, bathrooms_max);
  const squareFeetDisplay = formatRange(square_feet, square_feet_min, square_feet_max);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {bedroomsDisplay && (
        <div className="flex items-center">
          <Bed className="h-5 w-5 mr-2 text-muted-foreground" />
          <span>{bedroomsDisplay} beds</span>
        </div>
      )}
      {bathroomsDisplay && (
        <div className="flex items-center">
          <Bath className="h-5 w-5 mr-2 text-muted-foreground" />
          <span>{bathroomsDisplay} baths</span>
        </div>
      )}
      {squareFeetDisplay && (
        <div className="flex items-center">
          <Ruler className="h-5 w-5 mr-2 text-muted-foreground" />
          <span>{squareFeetDisplay} sq ft</span>
        </div>
      )}
      <div className="flex items-center">
        <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
        <span>{format(new Date(created_at), 'MMM d, yyyy')}</span>
      </div>
    </div>
  );
};