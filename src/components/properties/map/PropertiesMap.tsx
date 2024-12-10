import { useEffect, useRef, useState } from "react";
import type { Database } from "@/integrations/supabase/types";
import { geocodeProperty } from "./mapUtils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader as LoadingSpinner } from "lucide-react";
import { getMapLoader } from "@/utils/mapLoader";

type Property = Database["public"]["Tables"]["properties"]["Row"];

interface PropertiesMapProps {
  properties: Property[];
  onPropertyClick: (propertyId: string) => void;
}

export const PropertiesMap = ({ properties, onPropertyClick }: PropertiesMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<(google.maps.Marker | null)[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize map
  useEffect(() => {
    const loadMap = async () => {
      if (!mapRef.current) return;
      
      try {
        setIsLoading(true);
        setError(null);
        console.log("Initializing map...");

        const google = await getMapLoader();
        console.log("Google Maps API loaded successfully");

        // Default to Toronto coordinates
        const defaultCenter = { lat: 43.6532, lng: -79.3832 };

        const mapInstance = new google.maps.Map(mapRef.current, {
          center: defaultCenter,
          zoom: 12,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          gestureHandling: "cooperative",
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        setMap(mapInstance);
        setIsLoading(false);
        console.log("Map initialized successfully");
      } catch (err) {
        console.error("Error loading Google Maps:", err);
        setError('Failed to load Google Maps. Please try again later.');
        setIsLoading(false);
      }
    };

    loadMap();

    return () => {
      // Cleanup markers on unmount
      markersRef.current.forEach(marker => marker?.setMap(null));
      markersRef.current = [];
    };
  }, []);

  // Handle properties updates
  useEffect(() => {
    const createMarkers = async () => {
      if (!map || !properties.length) return;

      console.log("Creating markers for properties:", properties);

      // Clear existing markers
      markersRef.current.forEach(marker => marker?.setMap(null));
      markersRef.current = [];

      try {
        // Create new markers
        const markers = await Promise.all(
          properties.map((property, index) => 
            geocodeProperty(property, index, map, onPropertyClick)
          )
        );

        markersRef.current = markers;

        // Adjust map bounds to fit all markers
        if (markers.length > 0) {
          const bounds = new google.maps.LatLngBounds();
          markers.forEach(marker => {
            if (marker) bounds.extend(marker.getPosition()!);
          });
          map.fitBounds(bounds);
        }

        console.log("Markers created successfully");
      } catch (err) {
        console.error("Error creating markers:", err);
        setError('Failed to display property locations on the map.');
      }
    };

    createMarkers();
  }, [map, properties, onPropertyClick]);

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-secondary/50 rounded-lg">
        <LoadingSpinner className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg"
      style={{ minHeight: "400px" }}
    />
  );
};