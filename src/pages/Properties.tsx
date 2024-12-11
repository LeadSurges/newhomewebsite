import { Navigation } from "@/components/Navigation";
import { SearchFilters } from "@/components/properties/SearchFilters";
import { PropertiesMap } from "@/components/properties/PropertiesMap";
import { SEO } from "@/components/SEO";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { PropertiesList } from "@/components/properties/PropertiesList";
import { PropertiesHeader } from "@/components/properties/PropertiesHeader";

const Properties = () => {
  const { location: urlLocation } = useParams();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    location: urlLocation || searchParams.get("location") || "",
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

  // Handle URL parameters and path location
  useEffect(() => {
    const locationFromUrl = urlLocation || searchParams.get("location");
    const homeType = searchParams.get("homeType");
    const quickMoveIn = searchParams.get("quickMoveIn") === "true";

    if (locationFromUrl || homeType || quickMoveIn) {
      console.log("URL params/path changed, updating filters with location:", locationFromUrl);
      setFilters(prev => ({
        ...prev,
        location: locationFromUrl || prev.location,
        homeType: homeType || prev.homeType,
        quickMoveIn: quickMoveIn
      }));
    }
  }, [urlLocation, searchParams]);

  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties", filters],
    queryFn: async () => {
      console.log("Fetching properties with filters:", filters);
      
      let query = supabase
        .from("properties")
        .select("*");

      // Apply location filter with case-insensitive partial match
      if (filters.location && filters.location.trim()) {
        const locationSearch = filters.location.trim().toLowerCase();
        console.log("Applying location filter:", locationSearch);
        query = query.ilike('location', `%${locationSearch}%`);
      }

      // Apply price range filter
      if (filters.priceRange[0] > 0) {
        query = query.gte("price", filters.priceRange[0]);
      }
      if (filters.priceRange[1] < 5000000) {
        query = query.lte("price", filters.priceRange[1]);
      }

      // Apply bedroom filter
      if (filters.bedroomRange[0] > 1) {
        query = query.gte("bedrooms", filters.bedroomRange[0]);
      }

      // Apply bathroom filter
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

      // Apply home type filter
      if (filters.homeType) {
        query = query.eq("home_type", filters.homeType);
      }

      // Apply construction status filter
      if (filters.constructionStatus) {
        query = query.eq("construction_status", filters.constructionStatus);
      }

      // Apply ownership type filter
      if (filters.ownershipType.length > 0 && filters.ownershipType[0] !== "All") {
        query = query.eq("ownership_type", filters.ownershipType[0]);
      }

      // Apply quick move in filter
      if (filters.quickMoveIn) {
        query = query.eq("quick_move_in", true);
      }

      // Apply master planned filter
      if (filters.masterPlanned) {
        query = query.eq("master_planned", true);
      }

      // Apply garage filter
      if (filters.garage) {
        query = query.eq("garage_spaces", filters.garage === "4+" ? 4 : parseInt(filters.garage));
      }

      // Apply completion year filter
      if (filters.completionYear) {
        query = query.eq("completion_year", parseInt(filters.completionYear));
      }

      // Apply keywords filter
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
    window.location.href = `/properties/details/${propertyId}`;
  };

  // Generate breadcrumbs for SEO
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Properties", item: "/properties" },
  ];

  if (filters.location) {
    breadcrumbs.push({
      name: `New Homes in ${filters.location}`,
      item: `/properties/${filters.location.toLowerCase()}`
    });
  }

  return (
    <div className="min-h-screen bg-secondary">
      <SEO 
        title={`${filters.location ? `New Homes in ${filters.location}` : 'All Properties'} | LuxuryHomes`}
        description={`Browse our collection of luxury properties and new construction homes in ${filters.location || 'all locations'}. Find your perfect home today.`}
        keywords={`luxury properties, new homes, real estate listings, premium real estate, ${filters.location}`}
        breadcrumbs={breadcrumbs}
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