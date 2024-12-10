import { Heart, MapPin, Bed, Bath, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: number;
    location: string;
    bedrooms: number | null;
    bathrooms: number | null;
    square_feet: number | null;
    featured: boolean;
    image_url: string | null;
  };
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Check if user is admin
  const { data: isAdmin } = useQuery({
    queryKey: ["is-admin", user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data, error } = await supabase.rpc("is_admin", {
        user_id: user.id,
      });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const toggleFeatured = async () => {
    try {
      const { error } = await supabase
        .from("properties")
        .update({ featured: !property.featured })
        .eq("id", property.id);

      if (error) throw error;

      toast({
        title: property.featured ? "Property unfeatured" : "Property featured",
        description: `${property.title} has been ${
          property.featured ? "removed from" : "added to"
        } featured properties.`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating property",
        description: error.message,
      });
    }
  };

  return (
    <Link
      to={`/properties/${property.id}`}
      className="property-card rounded-lg group"
    >
      <div className="relative">
        <img
          src={property.image_url || "/placeholder.svg"}
          alt={property.title}
          className="property-image rounded-t-lg w-full h-[300px] object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {property.featured && (
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              FEATURED
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/80 hover:bg-white"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
          {property.title}
        </h3>
        <p className="text-lg font-bold text-primary mb-4">
          ${property.price.toLocaleString()}
        </p>
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          {property.location}
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          {property.bedrooms && (
            <span className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {property.bedrooms} beds
            </span>
          )}
          {property.bathrooms && (
            <span className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {property.bathrooms} baths
            </span>
          )}
          {property.square_feet && (
            <span>{property.square_feet.toLocaleString()} SqFt</span>
          )}
        </div>
        {isAdmin && (
          <div className="mt-4 border-t pt-4">
            <Button
              onClick={(e) => {
                e.preventDefault();
                toggleFeatured();
              }}
              variant={property.featured ? "destructive" : "default"}
              className="w-full"
            >
              <Star className="mr-2 h-4 w-4" />
              {property.featured ? "Remove from Featured" : "Add to Featured"}
            </Button>
          </div>
        )}
      </div>
    </Link>
  );
};