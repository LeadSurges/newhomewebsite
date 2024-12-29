import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FavoriteButton } from "./FavoriteButton";
import { generatePropertyUrl } from "@/utils/formatters";

interface PropertyImageProps {
  id: string;
  imageUrl: string;
  title: string;
  featured?: boolean;
}

export const PropertyImage = ({ id, imageUrl, title, featured }: PropertyImageProps) => {
  const propertyUrl = generatePropertyUrl(id, title);

  return (
    <div className="relative">
      <Link to={propertyUrl}>
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            className="object-cover w-full h-full rounded-t-lg"
          />
        </AspectRatio>
      </Link>
      {featured && (
        <div className="absolute top-2 left-2">
          <span className="bg-primary text-white text-xs px-2 py-1 rounded">
            Featured
          </span>
        </div>
      )}
      <div className="absolute top-2 right-2">
        <FavoriteButton propertyId={id} />
      </div>
    </div>
  );
};