import { PropertyCard } from "./PropertyCard";
import type { Database } from "@/integrations/supabase/types";

type Property = Database["public"]["Tables"]["properties"]["Row"] & {
  builders?: {
    name: string;
    id: string;
  } | null;
};

interface PropertiesListProps {
  properties: Property[] | null;
  isLoading: boolean;
  size?: "default" | "small";
}

export const PropertiesList = ({ properties, isLoading, size = "default" }: PropertiesListProps) => {
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
    <div className={`grid gap-6 ${size === "small" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} size={size} />
      ))}
    </div>
  );
};