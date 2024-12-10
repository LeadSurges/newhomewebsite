import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import type { Database } from "@/integrations/supabase/types";
import { geocodeProperty } from "./mapUtils";

type Property = Database["public"]["Tables"]["properties"]["Row"];

interface PropertiesMapProps {
  properties: Property[];
  onPropertyClick: (propertyId: string) => void;
}

export const PropertiesMap = ({ properties, onPropertyClick }: PropertiesMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<(google.maps.Marker | null)[]>([]);

  useEffect(() => {
    const loadMap = async () => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: "weekly",
      });

      try {
        const google = await loader.load();
        console.log("Google Maps API loaded");

        if (!mapRef.current) return;

        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: 37.7749, lng: -122.4194 },
          zoom: 12,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        setMap(mapInstance);
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    loadMap();

    return () => {
      // Cleanup markers on unmount
      markersRef.current.forEach(marker => marker?.setMap(null));
      markersRef.current = [];
    };
  }, []);

  useEffect(() => {
    const createMarkers = async () => {
      if (!map) return;

      // Clear existing markers
      markersRef.current.forEach(marker => marker?.setMap(null));
      markersRef.current = [];

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
    };

    createMarkers();
  }, [map, properties, onPropertyClick]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg"
      style={{ minHeight: "400px" }}
    />
  );
};