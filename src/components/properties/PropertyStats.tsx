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
    if (min && max) {
      return `${min} - ${max}`;
    }
    if (min) {
      return `${min}+`;
    }
    if (max) {
      return `Up to ${max}`;
    }
    if (value) {
      return value.toString();
    }
    return undefined;
  };

  const formatSquareFeet = (value?: string) => {
    if (!value) return undefined;
    return parseInt(value).toLocaleString();
  };

  const bedroomsDisplay = formatRange(bedrooms, bedrooms_min, bedrooms_max);
  const bathroomsDisplay = formatRange(bathrooms, bathrooms_min, bathrooms_max);
  const squareFeetDisplay = formatRange(
    square_feet?.toString(),
    square_feet_min ? formatSquareFeet(square_feet_min) : undefined,
    square_feet_max ? formatSquareFeet(square_feet_max) : undefined
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {bedroomsDisplay && (
        <div className="flex items-center p-4 rounded-lg bg-secondary/50 transition-colors hover:bg-secondary">
          <Bed className="h-6 w-6 mr-3 text-accent" />
          <div>
            <p className="text-sm text-muted-foreground">Bedrooms</p>
            <p className="font-semibold">{bedroomsDisplay}</p>
          </div>
        </div>
      )}
      {bathroomsDisplay && (
        <div className="flex items-center p-4 rounded-lg bg-secondary/50 transition-colors hover:bg-secondary">
          <Bath className="h-6 w-6 mr-3 text-accent" />
          <div>
            <p className="text-sm text-muted-foreground">Bathrooms</p>
            <p className="font-semibold">{bathroomsDisplay}</p>
          </div>
        </div>
      )}
      {squareFeetDisplay && (
        <div className="flex items-center p-4 rounded-lg bg-secondary/50 transition-colors hover:bg-secondary">
          <Ruler className="h-6 w-6 mr-3 text-accent" />
          <div>
            <p className="text-sm text-muted-foreground">Square Feet</p>
            <p className="font-semibold">{squareFeetDisplay}</p>
          </div>
        </div>
      )}
      <div className="flex items-center p-4 rounded-lg bg-secondary/50 transition-colors hover:bg-secondary">
        <Calendar className="h-6 w-6 mr-3 text-accent" />
        <div>
          <p className="text-sm text-muted-foreground">Listed On</p>
          <p className="font-semibold">{format(new Date(created_at), 'MMM d, yyyy')}</p>
        </div>
      </div>
    </div>
  );
};