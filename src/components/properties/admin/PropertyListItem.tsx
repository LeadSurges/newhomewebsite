import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PropertyUploadForm } from "../PropertyUploadForm";
import type { Property } from "@/types/property";

interface PropertyListItemProps {
  property: Property;
  onDelete: (property: Property) => void;
}

export const PropertyListItem = ({ property, onDelete }: PropertyListItemProps) => {
  const mainImage = property.image_url?.split(',')[0] || '/placeholder.svg';
  const orderedImages = property.image_order?.length ? 
    property.image_order[0] : 
    mainImage;

  return (
    <div className="border rounded-lg p-4 flex justify-between items-center bg-background">
      <div className="flex gap-4 items-center flex-grow">
        <img 
          src={orderedImages} 
          alt={property.title} 
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div>
          <h3 className="font-semibold">{property.title}</h3>
          <p className="text-sm text-gray-600">{property.location}</p>
          <p className="text-sm font-medium">
            ${property.price.toLocaleString()}
          </p>
          {property.maintenance_fee_per_sqft && (
            <p className="text-sm text-gray-600">
              Maintenance: ${property.maintenance_fee_per_sqft}/sqft
            </p>
          )}
          {property.total_homes && (
            <p className="text-sm text-gray-600">
              Total Homes: {property.total_homes}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Property</DialogTitle>
            </DialogHeader>
            <PropertyUploadForm initialData={property} />
          </DialogContent>
        </Dialog>

        <Button
          variant="destructive"
          onClick={() => onDelete(property)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};