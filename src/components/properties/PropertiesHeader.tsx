import { Button } from "@/components/ui/button";
import { Map, List } from "lucide-react";

interface PropertiesHeaderProps {
  location: string;
  showMap: boolean;
  onViewChange: (showMap: boolean) => void;
}

export const PropertiesHeader = ({ 
  location, 
  showMap, 
  onViewChange 
}: PropertiesHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">
        Properties {location ? `in ${location}` : "in All Locations"}
      </h1>
      <div className="flex gap-2">
        <Button
          variant={showMap ? "outline" : "default"}
          size="sm"
          onClick={() => onViewChange(false)}
          className="w-24"
        >
          <List className="h-4 w-4 mr-2" />
          List
        </Button>
        <Button
          variant={showMap ? "default" : "outline"}
          size="sm"
          onClick={() => onViewChange(true)}
          className="w-24"
        >
          <Map className="h-4 w-4 mr-2" />
          Map
        </Button>
      </div>
    </div>
  );
};