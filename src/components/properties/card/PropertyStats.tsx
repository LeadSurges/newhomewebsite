import { Bed, Bath, Ruler } from "lucide-react";

interface PropertyStatsProps {
  bedroomsDisplay?: string;
  bathroomsDisplay?: string;
  squareFeetDisplay?: string;
}

export const PropertyStats = ({
  bedroomsDisplay,
  bathroomsDisplay,
  squareFeetDisplay,
}: PropertyStatsProps) => {
  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      {bedroomsDisplay && (
        <div className="flex items-center gap-1">
          <Bed className="h-4 w-4" />
          <span>{bedroomsDisplay} {parseInt(bedroomsDisplay) === 1 ? 'bed' : 'beds'}</span>
        </div>
      )}
      {bathroomsDisplay && (
        <div className="flex items-center gap-1">
          <Bath className="h-4 w-4" />
          <span>{bathroomsDisplay} {parseInt(bathroomsDisplay) === 1 ? 'bath' : 'baths'}</span>
        </div>
      )}
      {squareFeetDisplay && (
        <div className="flex items-center gap-1">
          <Ruler className="h-4 w-4" />
          <span>{squareFeetDisplay} sq ft</span>
        </div>
      )}
    </div>
  );
};