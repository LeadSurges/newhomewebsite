import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SearchFilters } from "@/components/properties/SearchFilters";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { SEO } from "@/components/SEO";

// Temporary mock data until we connect to Supabase
const properties = [
  {
    id: 1,
    title: "Luxury Condo",
    price: "$1,250,000",
    location: "Downtown Area",
    bedrooms: "2",
    bathrooms: 2,
    sqft: "1200",
    developer: "Luxury Developers",
    status: "For Sale",
    featured: true,
    virtualTour: true,
    image: "https://source.unsplash.com/random/800x600?luxury,condo"
  },
  {
    id: 2,
    title: "Modern House",
    price: "$1,800,000",
    location: "Uptown Area",
    bedrooms: "4",
    bathrooms: 3,
    sqft: "2500",
    developer: "Modern Homes Inc.",
    status: "For Sale",
    featured: false,
    virtualTour: false,
    image: "https://source.unsplash.com/random/800x600?modern,house"
  },
  {
    id: 3,
    title: "Stylish Apartment",
    price: "$950,000",
    location: "City Center",
    bedrooms: "1",
    bathrooms: 1,
    sqft: "800",
    developer: "City Living",
    status: "For Sale",
    featured: true,
    virtualTour: true,
    image: "https://source.unsplash.com/random/800x600?stylish,apartment"
  },
];

const Properties = () => {
  const handleSearch = (filters: any) => {
    console.log("Searching with filters:", filters);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Properties | LuxuryHomes"
        description="Browse our collection of luxury properties and new construction homes. Find your perfect home today."
        keywords="luxury properties, new homes, real estate listings, premium real estate"
      />
      <Navigation />
      <SearchFilters onSearch={handleSearch} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Properties;
