import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PropertyNavigationProps {
  title: string;
  isPropertyFavorite: boolean;
  onFavoriteClick: () => void;
}

export const PropertyNavigation = ({
  title,
  isPropertyFavorite,
  onFavoriteClick,
}: PropertyNavigationProps) => {
  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-md rounded-lg px-6 py-4 mt-20">
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
              <BreadcrumbPage className="font-medium">{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button
          variant="ghost"
          size="icon"
          className="bg-white hover:bg-gray-50"
          onClick={onFavoriteClick}
        >
          <Heart
            className={`h-6 w-6 ${
              isPropertyFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
            }`}
          />
        </Button>
      </div>
    </nav>
  );
};