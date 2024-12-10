import { Navigation } from "@/components/Navigation";
import { SearchFilters } from "@/components/properties/SearchFilters";
import { PropertiesMap } from "@/components/properties/PropertiesMap";
import { SEO } from "@/components/SEO";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PropertiesList } from "@/components/properties/PropertiesList";
import { PropertiesHeader } from "@/components/properties/PropertiesHeader";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
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

  // Handle URL parameters
  useEffect(() => {
    const location = searchParams.get("location");
    const homeType = searchParams.get("homeType");
    const quickMoveIn = searchParams.get("quickMoveIn") === "true";

    if (location || homeType || quickMoveIn) {
      console.log("URL params changed, updating filters with location:", location);
      setFilters(prev => ({
        ...prev,
        location: location || prev.location,
        homeType: homeType || prev.homeType,
        quickMoveIn: quickMoveIn
      }));
    }
  }, [searchParams]);

  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties", filters],
    queryFn: async () => {
      console.log("Fetching properties with filters:", filters);
      
      let query = supabase
        .from("properties")
        .select("*");

      // Apply location filter with case-insensitive partial match
      if (filters.location && filters.location.trim()) {
        const locationSearch = filters.location.trim();
        console.log("Applying location filter:", locationSearch);
        query = query.ilike('location', `%${locationSearch}%`);
      }

      // Apply other filters
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

      if (filters.squareFeet.min) {
        query = query.gte("square_feet", filters.squareFeet.min);
      }
      if (filters.squareFeet.max) {
        query = query.lte("square_feet", filters.squareFeet.max);
      }

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
        title={`${filters.location || 'All'} Properties | LuxuryHomes`}
        description={`Browse our collection of luxury properties and new construction homes in ${filters.location || 'all locations'}. Find your perfect home today.`}
        keywords={`luxury properties, new homes, real estate listings, premium real estate, ${filters.location}`}
      />
      <Navigation />
      
      <div className="pt-16">
        <SearchFilters onFilterChange={handleFilterChange} initialFilters={filters} />
        
        <main className="max-w-[1920px] mx-auto px-4 py-8">
          <PropertiesHeader 
            location={filters.location}
            showMap={showMap}
            onViewChange={setShowMap}
          />

          <div className="flex flex-col lg:flex-row gap-6">
            <div className={`${showMap ? 'lg:w-1/2' : 'w-full'}`}>
              <PropertiesList 
                properties={properties}
                isLoading={isLoading}
              />
            </div>

            {showMap && properties && (
              <div className="lg:w-1/2 h-[calc(100vh-200px)] lg:sticky lg:top-40">
                <div className="glass-card h-full">
                  <PropertiesMap 
                    properties={properties} 
                    onPropertyClick={handlePropertyClick}
                    location={filters.location}
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