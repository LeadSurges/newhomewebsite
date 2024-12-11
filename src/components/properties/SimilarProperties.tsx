import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PropertyCard } from "./PropertyCard";

interface SimilarPropertiesProps {
  currentPropertyId: string;
  location: string;
}

export const SimilarProperties = ({ currentPropertyId, location }: SimilarPropertiesProps) => {
  const { data: properties, isLoading } = useQuery({
    queryKey: ["similar-properties", location, currentPropertyId],
    queryFn: async () => {
      console.log("Fetching similar properties for location:", location);
      const { data, error } = await supabase
        .from("properties")
        .select("*, builders(id, name)")
        .neq("id", currentPropertyId)
        .ilike("location", `%${location.split(',')[0]}%`) // Match by city
        .limit(3);

      if (error) {
        console.error("Error fetching similar properties:", error);
        throw error;
      }
      
      console.log("Found similar properties:", data);
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading similar properties...</div>;
  }

  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold mb-8">Properties You May Like</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard 
            key={property.id} 
            property={property} 
            size="small"
          />
        ))}
      </div>
    </section>
  );
};