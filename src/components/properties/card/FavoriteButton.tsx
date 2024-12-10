import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export const FavoriteButton = ({ isFavorite, onClick }: FavoriteButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
      onClick={onClick}
    >
      <Heart
        className={cn(
          "h-5 w-5",
          isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
        )}
      />
    </Button>
  );
};