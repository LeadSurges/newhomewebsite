import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (propertyId: string) => Promise<void>;
  removeFavorite: (propertyId: string) => Promise<void>;
  isFavorite: (propertyId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log("FavoritesContext: Loading favorites for user", user.id);
      loadFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const loadFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select("property_id")
        .eq("user_id", user?.id);

      if (error) throw error;

      const favoriteIds = data.map((fav) => fav.property_id);
      console.log("FavoritesContext: Loaded favorites", favoriteIds);
      setFavorites(favoriteIds);
    } catch (error) {
      console.error("Error loading favorites:", error);
      toast.error("Failed to load favorites");
    }
  };

  const addFavorite = async (propertyId: string) => {
    if (!user) {
      toast.error("Please sign in to add favorites");
      return;
    }

    try {
      const { error } = await supabase
        .from("favorites")
        .insert([{ user_id: user.id, property_id: propertyId }]);

      if (error) throw error;

      setFavorites((prev) => [...prev, propertyId]);
      toast.success("Property added to favorites");
    } catch (error) {
      console.error("Error adding favorite:", error);
      toast.error("Failed to add favorite");
    }
  };

  const removeFavorite = async (propertyId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("property_id", propertyId);

      if (error) throw error;

      setFavorites((prev) => prev.filter((id) => id !== propertyId));
      toast.success("Property removed from favorites");
    } catch (error) {
      console.error("Error removing favorite:", error);
      toast.error("Failed to remove favorite");
    }
  };

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};