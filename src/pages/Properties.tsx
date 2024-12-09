import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, Heart, MapPin, Bed, Bath } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchState, setSearchState] = useState({
    location: searchParams.get("city") || "",
    priceRange: "",
    propertyType: "",
    bedrooms: "",
  });

  // Update search input when URL parameter changes
  useEffect(() => {
    console.log("URL city parameter changed:", searchParams.get("city"));
    setSearchState(prev => ({
      ...prev,
      location: searchParams.get("city") || ""
    }));
  }, [searchParams]);

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

  const handleSearch = () => {
    const newSearchParams = new URLSearchParams();
    if (searchState.location) newSearchParams.set("city", searchState.location);
    if (searchState.priceRange) newSearchParams.set("price", searchState.priceRange);
    if (searchState.propertyType) newSearchParams.set("type", searchState.propertyType);
    setSearchParams(newSearchParams);
  };

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
      
      {/* Filter Bar */}
      <section className="sticky top-16 z-10 bg-white border-b py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Select
              value={searchState.propertyType}
              onValueChange={(value) =>
                setSearchState({ ...searchState, propertyType: value })
              }
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Home type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={searchState.priceRange}
              onValueChange={(value) =>
                setSearchState({ ...searchState, priceRange: value })
              }
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Any price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-500000">Under $500,000</SelectItem>
                <SelectItem value="500000-1000000">$500,000 - $1M</SelectItem>
                <SelectItem value="1000000-plus">$1M+</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={searchState.bedrooms}
              onValueChange={(value) =>
                setSearchState({ ...searchState, bedrooms: value })
              }
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="0+ beds" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+ bed</SelectItem>
                <SelectItem value="2">2+ beds</SelectItem>
                <SelectItem value="3">3+ beds</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="whitespace-nowrap">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              More filters
            </Button>

            <Button variant="outline" className="ml-auto whitespace-nowrap">
              Save search
            </Button>
          </div>
        </div>
      </section>

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
            <Link
              to={`/properties/${property.id}`}
              key={property.id}
              className="property-card rounded-lg group"
            >
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="property-image rounded-t-lg"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.virtualTour && (
                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                      VIRTUAL TOUR
                    </span>
                  )}
                  {property.status && (
                    <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                      {property.status}
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                {property.featured && (
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      FEATURED
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                  {property.title}
                </h3>
                <p className="text-lg font-bold text-primary mb-4">
                  {property.price}
                </p>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  {property.location}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {property.developer}
                </p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    {property.bedrooms} beds
                  </span>
                  <span className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    {property.bathrooms} baths
                  </span>
                  <span>{property.sqft} SqFt</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Properties;