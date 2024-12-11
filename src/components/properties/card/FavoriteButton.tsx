import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/contexts/FavoritesContext";

interface FavoriteButtonProps {
  propertyId: string;
}

export const FavoriteButton = ({ propertyId }: FavoriteButtonProps) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isPropertyFavorite = isFavorite(propertyId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isPropertyFavorite) {
      removeFavorite(propertyId);
    } else {
      addFavorite(propertyId);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
      onClick={handleClick}
    >
      <Heart
        className={cn(
          "h-5 w-5",
          isPropertyFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
        )}
      />
    </Button>
  );
};