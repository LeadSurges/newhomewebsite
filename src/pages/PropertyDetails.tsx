import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PropertyMainInfo } from "@/components/properties/PropertyMainInfo";
import { PropertyContactForm } from "@/components/properties/PropertyContactForm";
import { FloorplanCard } from "@/components/properties/FloorplanCard";
import { ImageGallery } from "@/components/properties/ImageGallery";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

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

  const images = property.image_url ? property.image_url.split(',') : ['/placeholder.svg'];

  const propertyMainInfo = {
    ...property,
    builder: property.builders,
  };

  return (
    <div className="min-h-screen bg-secondary">
      <SEO
        title={`${property.title} | LuxuryHomes`}
        description={`${property.title} - ${property.bedrooms} bed, ${property.bathrooms} bath, ${property.square_feet} sq ft luxury home in ${property.location}. ${property.description?.slice(0, 150)}...`}
        keywords={`${property.location} homes, ${property.bedrooms} bedroom house, luxury properties, new construction, ${property.home_type}, ${property.construction_status}`}
        image={images[0]}
        type="property"
        propertyData={{
          price: property.price,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          squareFeet: property.square_feet,
          location: property.location,
        }}
      />
      
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <nav className="bg-white shadow-md rounded-lg px-6 py-4 mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/">
                  <BreadcrumbLink>Home</BreadcrumbLink>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link to="/properties">
                  <BreadcrumbLink>Properties</BreadcrumbLink>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium">{property.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        <div className="space-y-8">
          <ImageGallery images={images} title={property.title} />

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
                      status={property.floorplan_status}
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;