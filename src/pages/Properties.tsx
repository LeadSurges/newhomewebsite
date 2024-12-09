import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { SearchFilters } from "@/components/properties/SearchFilters";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { useSearchParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchState, setSearchState] = useState({
    location: searchParams.get("city") || "",
    priceRange: "",
    propertyType: "",
    bedrooms: "",
  });

  // Temporary mock data for demonstration
  const properties = [
    {
      id: 1,
      title: "Mirabella Luxury Condominiums - West Tower",
      price: "From $600,000",
      location: "1926 Lake Shore Boulevard West, Toronto, ON",
      bedrooms: "1.5 - 2.5",
      bathrooms: 2,
      sqft: "550 - 978",
      developer: "Mirabella Development Corporation",
      status: "MOVE IN NOW",
      featured: true,
      virtualTour: true,
      image: "https://source.unsplash.com/random/800x600?modern,condo&1",
    },
    {
      id: 2,
      title: "Luxury Waterfront Residences",
      price: "From $750,000",
      location: searchState.location || "Waterfront District",
      bedrooms: "2 - 3",
      bathrooms: 2.5,
      sqft: "800 - 1,200",
      developer: "Premium Developments",
      status: "MOVE IN 2026",
      featured: false,
      virtualTour: true,
      image: "https://source.unsplash.com/random/800x600?luxury,home&2",
    },
  ];

  const handleSearch = (filters: any) => {
    console.log("Searching with filters:", filters);
    const newSearchParams = new URLSearchParams();
    if (filters.location) newSearchParams.set("city", filters.location);
    if (filters.priceRange) newSearchParams.set("price", filters.priceRange);
    if (filters.propertyType) newSearchParams.set("type", filters.propertyType);
    setSearchParams(newSearchParams);
  };

  // Update search input when URL parameter changes
  useEffect(() => {
    console.log("URL city parameter changed:", searchParams.get("city"));
    setSearchState(prev => ({
      ...prev,
      location: searchParams.get("city") || ""
    }));
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 pt-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/ontario">Ontario</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{searchState.location || "All Locations"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Search Filters */}
      <SearchFilters onSearch={handleSearch} initialLocation={searchState.location} />

      {/* Results Count and Sort */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          {properties.length} Communities
        </h1>
        <Select defaultValue="featured">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Properties;
