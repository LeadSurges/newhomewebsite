import { Badge } from "@/components/ui/badge";

interface PropertyHeroProps {
  imageUrl: string;
  title: string;
  featured: boolean;
}

export const PropertyHero = ({ imageUrl, title, featured }: PropertyHeroProps) => {
  return (
    <div className="relative h-[500px] rounded-xl overflow-hidden">
      <img
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        className="w-full h-full object-cover"
      />
      {featured && (
        <div className="absolute top-4 left-4">
          <Badge variant="default" className="bg-primary hover:bg-primary">
            FEATURED
          </Badge>
        </div>
      )}
    </div>
  );
};