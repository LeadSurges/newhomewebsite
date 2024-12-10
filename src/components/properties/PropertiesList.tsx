import { PropertyCard } from "./PropertyCard";
import type { Database } from "@/integrations/supabase/types";

type Property = Database["public"]["Tables"]["properties"]["Row"];

interface PropertiesListProps {
  properties: Property[] | null;
  isLoading: boolean;
}

export const PropertiesList = ({ properties, isLoading }: PropertiesListProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">Loading properties...</div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No properties found matching your criteria
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};