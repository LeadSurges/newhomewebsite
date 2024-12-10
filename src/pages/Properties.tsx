import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SearchFilters } from "@/components/properties/SearchFilters";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { SEO } from "@/components/SEO";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const Properties = () => {
  const [filters, setFilters] = useState({
    searchQuery: "",
    priceRange: [0, 5000000],
    bedroomRange: [1, 7],
    bathroomRange: [1, 5],
    squareFeetRange: [500, 10000],
  });

  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties", filters],
    queryFn: async () => {
      console.log("Fetching properties with filters:", filters);
      
      let query = supabase
        .from("properties")
        .select("*");

      // Apply search filter
      if (filters.searchQuery) {
        query = query.or(`title.ilike.%${filters.searchQuery}%,location.ilike.%${filters.searchQuery}%`);
      }

      // Apply range filters
      query = query
        .gte("price", filters.priceRange[0])
        .lte("price", filters.priceRange[1]);

      if (filters.bedroomRange) {
        query = query
          .gte("bedrooms", filters.bedroomRange[0])
          .lte("bedrooms", filters.bedroomRange[1]);
      }

      if (filters.bathroomRange) {
        query = query
          .gte("bathrooms", filters.bathroomRange[0])
          .lte("bathrooms", filters.bathroomRange[1]);
      }

      if (filters.squareFeetRange) {
        query = query
          .gte("square_feet", filters.squareFeetRange[0])
          .lte("square_feet", filters.squareFeetRange[1]);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching properties:", error);
        throw error;
      }

      console.log("Fetched properties:", data);
      return data;
    },
  });

  const handleFilterChange = (newFilters: any) => {
    console.log("Applying new filters:", newFilters);
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <SEO 
        title="Properties | LuxuryHomes"
        description="Browse our collection of luxury properties and new construction homes. Find your perfect home today."
        keywords="luxury properties, new homes, real estate listings, premium real estate"
      />
      <Navigation />
      <SearchFilters onFilterChange={handleFilterChange} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-8">Loading properties...</div>
        ) : properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No properties found matching your criteria
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Properties;