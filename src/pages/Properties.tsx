import { Navigation } from "@/components/Navigation";
import { SearchFilters } from "@/components/properties/SearchFilters";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertiesMap } from "@/components/properties/PropertiesMap";
import { SEO } from "@/components/SEO";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Map, List } from "lucide-react";

const Properties = () => {
  const [filters, setFilters] = useState({
    location: "",
    priceRange: [0, 5000000],
    bedroomRange: [1, 7],
    bathroomRange: [1, 5],
    homeType: null,
    constructionStatus: null,
    quickMoveIn: false,
    masterPlanned: false,
    ownershipType: [],
    squareFeet: { min: "", max: "" },
    garage: null,
    completionYear: null,
    keywords: "",
  });

  const [showMap, setShowMap] = useState(true);

  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties", filters],
    queryFn: async () => {
      console.log("Fetching properties with filters:", filters);
      
      let query = supabase
        .from("properties")
        .select("*");

      // Apply location filter
      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }

      // Apply range filters
      if (filters.priceRange[0] > 0) {
        query = query.gte("price", filters.priceRange[0]);
      }
      if (filters.priceRange[1] < 5000000) {
        query = query.lte("price", filters.priceRange[1]);
      }

      if (filters.bedroomRange[0] > 1) {
        query = query.gte("bedrooms", filters.bedroomRange[0]);
      }

      if (filters.bathroomRange[0] > 1) {
        query = query.gte("bathrooms", filters.bathroomRange[0]);
      }

      // Apply square feet filter
      if (filters.squareFeet.min) {
        query = query.gte("square_feet", filters.squareFeet.min);
      }
      if (filters.squareFeet.max) {
        query = query.lte("square_feet", filters.squareFeet.max);
      }

      // Apply additional filters
      if (filters.homeType) {
        query = query.eq("home_type", filters.homeType);
      }
      if (filters.constructionStatus) {
        query = query.eq("construction_status", filters.constructionStatus);
      }
      if (filters.ownershipType.length > 0 && filters.ownershipType[0] !== "All") {
        query = query.eq("ownership_type", filters.ownershipType[0]);
      }
      if (filters.quickMoveIn) {
        query = query.eq("quick_move_in", true);
      }
      if (filters.masterPlanned) {
        query = query.eq("master_planned", true);
      }
      if (filters.garage) {
        query = query.eq("garage_spaces", filters.garage === "4+" ? 4 : parseInt(filters.garage));
      }
      if (filters.completionYear) {
        query = query.eq("completion_year", parseInt(filters.completionYear));
      }
      if (filters.keywords) {
        query = query.contains('keywords', [filters.keywords]);
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

  const handlePropertyClick = (propertyId: string) => {
    window.location.href = `/properties/${propertyId}`;
  };

  return (
    <div className="min-h-screen bg-secondary">
      <SEO 
        title="Properties | LuxuryHomes"
        description="Browse our collection of luxury properties and new construction homes. Find your perfect home today."
        keywords="luxury properties, new homes, real estate listings, premium real estate"
      />
      <Navigation />
      
      <div className="pt-16">
        <SearchFilters onFilterChange={handleFilterChange} />
        
        <main className="max-w-[1920px] mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">
              Properties in {filters.location || "All Locations"}
            </h1>
            <div className="flex gap-2">
              <Button
                variant={showMap ? "outline" : "default"}
                size="sm"
                onClick={() => setShowMap(false)}
                className="w-24"
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
              <Button
                variant={showMap ? "default" : "outline"}
                size="sm"
                onClick={() => setShowMap(true)}
                className="w-24"
              >
                <Map className="h-4 w-4 mr-2" />
                Map
              </Button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className={`${showMap ? 'lg:w-1/2' : 'w-full'}`}>
              {isLoading ? (
                <div className="text-center py-8">Loading properties...</div>
              ) : properties && properties.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No properties found matching your criteria
                </div>
              )}
            </div>

            {showMap && properties && (
              <div className="lg:w-1/2 h-[calc(100vh-200px)] lg:sticky lg:top-40">
                <div className="glass-card h-full">
                  <PropertiesMap 
                    properties={properties} 
                    onPropertyClick={handlePropertyClick}
                  />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Properties;