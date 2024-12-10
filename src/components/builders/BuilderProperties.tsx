import { PropertyCard } from "@/components/properties/PropertyCard";
import type { Database } from "@/integrations/supabase/types";

type Property = Database["public"]["Tables"]["properties"]["Row"] & {
  builders?: {
    name: string;
    id: string;
  } | null;
};

interface BuilderPropertiesProps {
  properties: Property[] | null;
  builderName: string;
}

export const BuilderProperties = ({ properties, builderName }: BuilderPropertiesProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8">Properties by {builderName}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties?.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};