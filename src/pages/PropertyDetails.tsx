import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useParams } from "react-router-dom";
import { PropertyMap } from "@/components/properties/PropertyMap";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { PropertyHero } from "@/components/properties/PropertyHero";
import { PropertyMainInfo } from "@/components/properties/PropertyMainInfo";
import { PropertyFloorplan } from "@/components/properties/PropertyFloorplan";

const PropertyDetails = () => {
  const { id } = useParams();
  console.log("Property ID:", id);

  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      if (!id?.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        throw new Error('Invalid property ID format');
      }

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      console.log("Fetched property:", data);
      return data;
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={`${property.title} | LuxuryHomes`}
        description={property.description || ''}
        keywords={`${property.title}, ${property.location}, luxury property, real estate`}
      />
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <PropertyHero
            imageUrl={property.image_url}
            title={property.title}
            featured={property.featured}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <PropertyMainInfo
                title={property.title}
                location={property.location}
                price={property.price}
                description={property.description}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                square_feet={property.square_feet}
                created_at={property.created_at}
              />

              <PropertyFloorplan floorplanUrl={property.floorplan_url} />
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Location</h2>
                  <div className="h-[400px]">
                    <PropertyMap location={property.location} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;