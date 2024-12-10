import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import { useGoogleMaps } from "./hooks/useGoogleMaps";
import { createPropertyMarker } from "./components/MapMarker";
import { geocodeLocation, fitMapToBounds } from "./utils/mapUtils";

type Property = Database["public"]["Tables"]["properties"]["Row"];

interface PropertiesMapProps {
  properties: Property[];
  onPropertyClick?: (propertyId: string) => void;
}

export const PropertiesMap = ({ properties, onPropertyClick }: PropertiesMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const { googleMaps, error: mapsError, isLoading: isMapsLoading } = useGoogleMaps();

  useEffect(() => {
    const initMap = async () => {
      if (!googleMaps || !mapRef.current) return;

      try {
        console.log("Initializing map with properties:", properties);

        // Default to Toronto coordinates
        const mapCenter = { lat: 43.6532, lng: -79.3832 };
        
        const mapInstance = new googleMaps.Map(mapRef.current, {
          center: mapCenter,
          zoom: 11,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        setMap(mapInstance);

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        if (properties.length === 0) {
          console.log("No properties to display on map");
          return;
        }

        const geocoder = new googleMaps.Geocoder();

        // Create markers for all properties
        for (const [index, property] of properties.entries()) {
          try {
            const position = await geocodeLocation(geocoder, property.location);
            const marker = createPropertyMarker(
              mapInstance,
              property,
              index,
              position,
              onPropertyClick
            );
            markersRef.current.push(marker);
          } catch (error) {
            console.error(`Error creating marker for property ${property.title}:`, error);
          }
        }

        // Fit map to show all markers
        fitMapToBounds(mapInstance, markersRef.current);

      } catch (err) {
        console.error("Error initializing map:", err);
      }
    };

    initMap();

    // Cleanup markers on unmount
    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, [properties, onPropertyClick, googleMaps]);

  if (mapsError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{mapsError}</AlertDescription>
      </Alert>
    );
  }

  if (isMapsLoading) {
    return (
      <div className="flex items-center justify-center bg-secondary/50 rounded-lg h-full min-h-[300px]">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="w-full h-full min-h-[calc(100vh-64px)] rounded-lg"
    />
  );
};