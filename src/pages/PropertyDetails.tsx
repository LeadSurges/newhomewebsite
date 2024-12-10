import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();
  
  // This will be replaced with actual data fetching once we connect to Supabase
  const property = {
    title: "Luxury Property",
    description: "Beautiful luxury property in prime location",
    price: "$1,200,000",
    location: "Downtown Area",
    image: "https://source.unsplash.com/random/1200x800?luxury,home"
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={`${property.title} | LuxuryHomes`}
        description={property.description}
        keywords={`${property.title}, ${property.location}, luxury property, real estate`}
        image={property.image}
      />
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
        <p className="text-xl font-semibold mb-2">{property.price}</p>
        <p className="text-gray-600">{property.location}</p>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;