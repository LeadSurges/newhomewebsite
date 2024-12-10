import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PropertyHero } from "@/components/properties/PropertyHero";
import { PropertyMainInfo } from "@/components/properties/PropertyMainInfo";
import { PropertyMap } from "@/components/properties/PropertyMap";
import { PropertyContactForm } from "@/components/properties/PropertyContactForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Building2, MapPin, Calendar, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

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

  return (
    <div className="min-h-screen bg-secondary">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <div className="flex gap-2">
              {property.featured && (
                <Badge variant="secondary">Featured</Badge>
              )}
              {property.quick_move_in && (
                <Badge variant="secondary">Quick Move-in</Badge>
              )}
            </div>
          </div>
          
          <div className="text-2xl font-bold text-primary">
            ${property.price?.toLocaleString()}
          </div>
        </div>

        <PropertyHero 
          imageUrl={property.image_url?.split(',')[0] || ''} 
          title={property.title}
          featured={property.featured || false}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {propertyDetails.map((detail) => (
                  <div key={detail.label} className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <detail.icon className="h-4 w-4" />
                      <span className="text-sm">{detail.label}</span>
                    </div>
                    <div className="font-medium">{detail.value}</div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="font-medium">Description</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {property.description}
                </p>
              </div>
            </Card>

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