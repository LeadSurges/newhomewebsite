import { Navigation } from "@/components/Navigation";
import { SearchFilters } from "@/components/properties/SearchFilters";
import { PropertiesMap } from "@/components/properties/PropertiesMap";
import { useState } from "react";
import { PropertiesList } from "@/components/properties/PropertiesList";
import { PropertiesHeader } from "@/components/properties/PropertiesHeader";
import { PropertySEO } from "@/components/properties/PropertySEO";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import { usePropertyData } from "@/hooks/usePropertyData";

const Properties = () => {
  const { filters, setFilters } = usePropertyFilters();
  const { data: properties, isLoading } = usePropertyData(filters);
  const [showMap, setShowMap] = useState(true);

  const handleFilterChange = (newFilters: any) => {
    console.log("Applying new filters:", newFilters);
    setFilters(newFilters);
  };

  const handlePropertyClick = (propertyId: string) => {
    window.location.href = `/properties/details/${propertyId}`;
  };

  return (
    <div className="min-h-screen bg-secondary">
      <PropertySEO location={filters.location} />
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