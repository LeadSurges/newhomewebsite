import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PropertyHero } from "@/components/properties/PropertyHero";
import { PropertyMainInfo } from "@/components/properties/PropertyMainInfo";
import { PropertyContactForm } from "@/components/properties/PropertyContactForm";
import { FloorplanCard } from "@/components/properties/FloorplanCard";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*, builders(name, id)")
        .eq("id", id)
        .single();

      if (error) throw error;
      console.log("Fetched property:", data);
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>
      </div>
    );
  }

  if (!property) return null;

  const propertyMainInfo = {
    ...property,
    builder: property.builders,
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <PropertyHero 
          imageUrl={property.image_url || ''} 
          title={property.title}
          featured={property.featured || false}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PropertyMainInfo {...propertyMainInfo} />

            {property.floorplan_url && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Floor Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <FloorplanCard
                    name={property.title}
                    price={property.price}
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                    squareFeet={property.square_feet}
                    imageUrl={property.floorplan_url}
                  />
                </div>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <PropertyContactForm propertyTitle={property.title} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;