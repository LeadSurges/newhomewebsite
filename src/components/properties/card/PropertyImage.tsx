import { FavoriteButton } from "./FavoriteButton";

interface PropertyImageProps {
  imageUrl?: string;
  title: string;
  size?: "default" | "small";
  showFavorite?: boolean;
  isFavorite?: boolean;
  onFavoriteClick?: (e: React.MouseEvent) => void;
}

export const PropertyImage = ({
  imageUrl,
  title,
  size = "default",
  showFavorite = false,
  isFavorite = false,
  onFavoriteClick
}: PropertyImageProps) => {
  return (
    <div className={`relative overflow-hidden ${
      size === "small" ? "aspect-[4/3]" : "aspect-[16/9]"
    }`}>
      <img
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        className="object-cover w-full h-full"
      />
      {showFavorite && onFavoriteClick && (
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={onFavoriteClick}
        />
      )}
    </div>
  );
};