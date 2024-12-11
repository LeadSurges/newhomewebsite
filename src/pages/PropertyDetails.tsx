import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PropertyMainInfo } from "@/components/properties/PropertyMainInfo";
import { PropertyContactForm } from "@/components/properties/PropertyContactForm";
import { FloorplanCard } from "@/components/properties/FloorplanCard";
import { ImageGallery } from "@/components/properties/ImageGallery";
import { SimilarProperties } from "@/components/properties/SimilarProperties";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { toast } from "sonner";
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
  const { id, slug } = useParams<{ id: string; slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*, builders(name, id)")
        .eq("id", id)
        .single();

      if (error) throw error;
      
      // Create URL-friendly slug from property title
      const propertySlug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // If we're on the old URL format, redirect to the new one with the slug
      if (!slug) {
        navigate(`/properties/details/${id}/${propertySlug}`, { replace: true });
      }
      // If we have a slug but it's wrong, redirect to the correct one
      else if (slug !== propertySlug) {
        navigate(`/properties/details/${id}/${propertySlug}`, { replace: true });
      }

      console.log("Fetched property:", data);
      return data;
    },
    enabled: !!id,
  });

  const handleFavoriteClick = async () => {
    if (!user) {
      toast.error("Please sign in to save favorites", {
        action: {
          label: "Sign up",
          onClick: () => navigate("/signup")
        }
      });
      return;
    }

    try {
      if (isFavorite(property.id)) {
        await removeFavorite(property.id);
        toast.success("Removed from favorites");
      } else {
        await addFavorite(property.id);
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites");
    }
  };

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

  const isPropertyFavorite = isFavorite(property.id);

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
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Properties", item: "/properties" },
          { name: property.title, item: `/properties/details/${id}/${slug}` }
        ]}
      />
      
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <nav className="bg-white shadow-md rounded-lg px-6 py-4 mb-8">
          <div className="flex justify-between items-center">
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
            <Button
              variant="ghost"
              size="icon"
              className="bg-white hover:bg-gray-50"
              onClick={handleFavoriteClick}
            >
              <Heart
                className={`h-6 w-6 ${
                  isPropertyFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
                }`}
              />
            </Button>
          </div>
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

          <SimilarProperties 
            currentPropertyId={property.id} 
            location={property.location}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;