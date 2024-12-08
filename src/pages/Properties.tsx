import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

const Properties = () => {
  const [searchParams, setSearchParams] = useState({
    location: "",
    priceRange: "",
    propertyType: "",
    bedrooms: "",
  });

  // Temporary mock data for demonstration
  const properties = [
    {
      id: 1,
      title: "Modern Downtown Condo",
      price: "$750,000",
      location: "Downtown Area",
      bedrooms: 2,
      bathrooms: 2,
      sqft: "1,200",
      image: "https://source.unsplash.com/random/800x600?modern,condo&1",
    },
    {
      id: 2,
      title: "Luxury Waterfront Home",
      price: "$1,250,000",
      location: "Waterfront District",
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: "2,500",
      image: "https://source.unsplash.com/random/800x600?luxury,home&2",
    },
    // Add more mock properties as needed
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Search Section */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <Input
                placeholder="Location"
                value={searchParams.location}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, location: e.target.value })
                }
                className="w-full"
              />
              <Select
                value={searchParams.priceRange}
                onValueChange={(value) =>
                  setSearchParams({ ...searchParams, priceRange: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-500000">Under $500,000</SelectItem>
                  <SelectItem value="500000-1000000">$500,000 - $1M</SelectItem>
                  <SelectItem value="1000000-plus">$1M+</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={searchParams.propertyType}
                onValueChange={(value) =>
                  setSearchParams({ ...searchParams, propertyType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tags */}
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto flex gap-4 flex-wrap">
          <div className="filter-chip">2+ Beds</div>
          <div className="filter-chip">2+ Baths</div>
          <div className="filter-chip">New Construction</div>
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Results Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Link
                to={`/properties/${property.id}`}
                key={property.id}
                className="property-card rounded-lg"
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="property-image rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                      New
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <p className="text-2xl font-bold text-accent mb-4">
                    {property.price}
                  </p>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{property.bedrooms} beds</span>
                    <span>{property.bathrooms} baths</span>
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Properties;