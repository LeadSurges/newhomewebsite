import { Navigation } from "@/components/Navigation";
import { useParams } from "react-router-dom";
import { PropertyCard } from "@/components/properties/PropertyCard";

const BuilderProfile = () => {
  const { id } = useParams();
  
  // Temporary mock data until we connect to Supabase
  const builder = {
    id: 1,
    name: "Pinnacle International",
    description: "Leading developer of luxury residential and commercial properties.",
    rating: 4.5,
    reviews: 27,
    properties: [
      {
        id: "1",
        title: "The Pinnacle at One Yonge",
        price: 800000,
        location: "1 Yonge Street",
        bedrooms: 2,
        bathrooms: 2,
        square_feet: 1200,
        featured: true,
        image_url: "https://source.unsplash.com/random/800x600?condo",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20">
        {/* Builder Header */}
        <div className="bg-secondary py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">{builder.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">
              {builder.description}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold">
                Rating: {builder.rating}/5
              </span>
              <span className="text-muted-foreground">
                ({builder.reviews} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Properties by {builder.name}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {builder.properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderProfile;