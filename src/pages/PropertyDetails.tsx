import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useParams } from "react-router-dom";
import { PropertyMap } from "@/components/properties/PropertyMap";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Bed, Bath, MapPin, Home, Ruler, DollarSign, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

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
          {/* Hero Section */}
          <div className="relative h-[500px] rounded-xl overflow-hidden">
            <img
              src={property.image_url || "/placeholder.svg"}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            {property.featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                  FEATURED
                </span>
              </div>
            )}
          </div>

          {/* Property Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    {property.location}
                  </div>
                  
                  <div className="text-2xl font-bold text-primary mb-6">
                    <div className="flex items-center">
                      <DollarSign className="h-6 w-6 mr-1" />
                      {property.price?.toLocaleString()}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {property.bedrooms && (
                      <div className="flex items-center">
                        <Bed className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>{property.bedrooms} beds</span>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center">
                        <Bath className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>{property.bathrooms} baths</span>
                      </div>
                    )}
                    {property.square_feet && (
                      <div className="flex items-center">
                        <Ruler className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>{property.square_feet.toLocaleString()} sq ft</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{format(new Date(property.created_at), 'MMM d, yyyy')}</span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Description</h2>
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {property.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Floorplan Section */}
              {property.floorplan_url && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Floor Plan</h2>
                    <img
                      src={property.floorplan_url}
                      alt="Floor Plan"
                      className="w-full rounded-lg"
                    />
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Map Section */}
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