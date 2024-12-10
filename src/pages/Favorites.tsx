import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PropertiesList } from "@/components/properties/PropertiesList";
import { useAuth } from "@/contexts/AuthContext";

const Favorites = () => {
  const { user } = useAuth();

  const { data: favorites, isLoading } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      console.log("Fetching favorites for user:", user.id);
      const { data: favoriteProperties, error } = await supabase
        .from("favorites")
        .select(`
          property_id,
          properties (
            id,
            title,
            price,
            location,
            bedrooms,
            bathrooms,
            square_feet,
            image_url,
            builders (
              id,
              name
            )
          )
        `)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching favorites:", error);
        throw error;
      }

      console.log("Fetched favorites:", favoriteProperties);
      return favoriteProperties.map(f => f.properties);
    },
    enabled: !!user,
  });

  return (
    <div className="min-h-screen bg-secondary pt-24">
      <Helmet>
        <title>My Favorites | LuxuryHomes</title>
        <meta name="description" content="View your favorite properties" />
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
        <PropertiesList 
          properties={favorites} 
          isLoading={isLoading} 
        />
      </main>
    </div>
  );
};

export default Favorites;