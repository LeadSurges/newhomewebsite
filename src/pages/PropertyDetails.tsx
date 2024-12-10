import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PropertyHero } from "@/components/properties/PropertyHero";
import { PropertyMainInfo } from "@/components/properties/PropertyMainInfo";
import { PropertyMap } from "@/components/properties/PropertyMap";
import { PropertyContactForm } from "@/components/properties/PropertyContactForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Building2, MapPin, Calendar, Home } from "lucide-react";
import { DepositStructure, Incentives } from "@/components/properties/types";

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

  const propertyDetails = [
    {
      icon: Building2,
      label: "Builder",
      value: property.builders?.name || "N/A",
    },
    {
      icon: MapPin,
      label: "Location",
      value: property.location,
    },
    {
      icon: Calendar,
      label: "Completion",
      value: property.completion_year ? `${property.completion_year}` : "TBA",
    },
    {
      icon: Home,
      label: "Type",
      value: property.home_type || "N/A",
    },
  ];

  // Type cast the deposit_structure and incentives to their respective types
  const propertyMainInfo = {
    ...property,
    builder: property.builders,
    deposit_structure: property.deposit_structure as DepositStructure | undefined,
    incentives: property.incentives as Incentives | undefined
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

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <PropertyMap location={property.location} className="w-full h-[300px]" />
            </Card>
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