import { PropertyListItem } from "./PropertyListItem";
import type { Property } from "@/types/property";

interface PropertyListProps {
  properties: Property[];
  onDelete: (property: Property) => void;
}

export const PropertyList = ({ properties, onDelete }: PropertyListProps) => {
  return (
    <div className="grid gap-4">
      {properties?.map((property) => (
        <PropertyListItem
          key={property.id}
          property={property}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};