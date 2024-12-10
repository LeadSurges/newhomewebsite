import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PropertyFloorplanProps {
  floorplanUrl: string;
}

export const PropertyFloorplan = ({ floorplanUrl }: PropertyFloorplanProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  if (!floorplanUrl) return null;
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Floor Plan</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <img
              src={floorplanUrl}
              alt="Floor Plan"
              className="w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            />
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-full">
            <img
              src={floorplanUrl}
              alt="Floor Plan"
              className="w-full h-full object-contain"
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};