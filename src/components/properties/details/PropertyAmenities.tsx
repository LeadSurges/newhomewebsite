import { Check } from "lucide-react";

interface PropertyAmenitiesProps {
  amenities?: string[];
}

export const PropertyAmenities = ({ amenities }: PropertyAmenitiesProps) => {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Amenities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((amenity) => (
          <div key={amenity} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};