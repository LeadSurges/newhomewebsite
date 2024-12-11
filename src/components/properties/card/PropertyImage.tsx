interface PropertyImageProps {
  imageUrl?: string;
  title: string;
  size?: "default" | "small";
  featured?: boolean;
  showFavorite?: boolean;
  isFavorite?: boolean;
  onFavoriteClick?: (e: React.MouseEvent) => void;
}

export const PropertyImage = ({
  imageUrl,
  title,
  size = "default",
  featured = false,
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
      {featured && (
        <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-sm">
          Featured
        </div>
      )}
      {showFavorite && onFavoriteClick && (
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={onFavoriteClick}
        />
      )}
    </div>
  );
};