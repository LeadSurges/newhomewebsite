import { Card, CardContent } from "@/components/ui/card";

interface PropertyFloorplanProps {
  floorplanUrl: string;
}

export const PropertyFloorplan = ({ floorplanUrl }: PropertyFloorplanProps) => {
  if (!floorplanUrl) return null;
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Floor Plan</h2>
        <img
          src={floorplanUrl}
          alt="Floor Plan"
          className="w-full rounded-lg"
        />
      </CardContent>
    </Card>
  );
};