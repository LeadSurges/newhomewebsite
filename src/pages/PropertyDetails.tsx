import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useParams } from "react-router-dom";
import { PropertyMap } from "@/components/properties/PropertyMap";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Bed, Bath, MapPin } from "lucide-react";

const PropertyDetails = () => {
  const { id } = useParams();
  console.log("Property ID:", id);

  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      console.log("Fetched property:", data);
      return data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={`${property.title} | LuxuryHomes`}
        description={property.description}
        keywords={`${property.title}, ${property.location}, luxury property, real estate`}
        image={property.image_url}
      />
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold">{property.title}</h1>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2" />
                {property.location}
              </div>
              
              <div className="flex gap-4 text-muted-foreground">
                {property.bedrooms && (
                  <span className="flex items-center">
                    <Bed className="h-5 w-5 mr-2" />
                    {property.bedrooms} beds
                  </span>
                )}
                {property.bathrooms && (
                  <span className="flex items-center">
                    <Bath className="h-5 w-5 mr-2" />
                    {property.bathrooms} baths
                  </span>
                )}
                {property.square_feet && (
                  <span>{property.square_feet} sq ft</span>
                )}
              </div>

              <div className="text-2xl font-bold">
                ${property.price?.toLocaleString()}
              </div>

              <p className="text-gray-600">{property.description}</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <PropertyMap location={property.location} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;