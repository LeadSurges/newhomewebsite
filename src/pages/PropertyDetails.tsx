import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PropertyMainInfo } from "@/components/properties/PropertyMainInfo";
import { PropertiesHeader } from "@/components/properties/PropertiesHeader";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { data: propertyData, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*, builders(name)")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (propertyData) {
      setProperty(propertyData);
      setLoading(false);
    }
  }, [propertyData]);

  if (isLoading || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <PropertiesHeader
        location={property.location}
        showMap={false}
        onViewChange={() => {}}
      />
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
      <Footer />
    </div>
  );
};

export default PropertyDetails;
