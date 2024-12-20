import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Property = Database["public"]["Tables"]["properties"]["Row"];

interface PropertiesMapProps {
  properties: Property[];
  onPropertyClick?: (propertyId: string) => void;
  location?: string;
}

export const PropertiesMap = ({ properties, onPropertyClick, location }: PropertiesMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    const initMap = async () => {
      try {
        console.log("Initializing properties map");
        const { data: { secret } } = await supabase.functions.invoke('get-maps-key');
        
        if (!secret) {
          console.error("No Google Maps API key found");
          return;
        }

        const loader = new Loader({
          apiKey: secret,
          version: "weekly",
        });

        const google = await loader.load();
        
        if (!mapRef.current) return;

        // Default to Toronto coordinates
        const defaultCenter = { lat: 43.6532, lng: -79.3832 };
        
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: defaultCenter,
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
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    if (mapRef.current) {
      initMap();
    }

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, []);

  // Handle location changes
  useEffect(() => {
    if (!map || !location) return;

    const geocoder = new google.maps.Geocoder();
    console.log("Geocoding location:", location);

    geocoder.geocode({ address: location }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        console.log("Found location coordinates:", results[0].geometry.location.toString());
        map.setCenter(results[0].geometry.location);
        map.setZoom(11);
      } else {
        console.error("Geocoding failed for location:", location, status);
      }
    });
  }, [map, location]);

  // Update markers when properties change
  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Create markers for all properties
    properties.forEach((property, index) => {
      const geocoder = new google.maps.Geocoder();
      
      geocoder.geocode({ address: property.location }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const marker = new google.maps.Marker({
            map,
            position: results[0].geometry.location,
            title: property.title,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: '#4A89F3',
              fillOpacity: 1,
              strokeWeight: 0,
              scale: 20,
            },
            label: {
              text: (index + 1).toString(),
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold'
            }
          });

          // Create info window with property details
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div class="p-2">
                <h3 class="font-semibold">${property.title}</h3>
                <p class="text-sm">$${property.price.toLocaleString()}</p>
                <p class="text-xs text-gray-600">${property.location}</p>
              </div>
            `,
          });

          marker.addListener("click", () => {
            infoWindow.open(map, marker);
            onPropertyClick?.(property.id);
          });

          markersRef.current.push(marker);
        }
      });
    });
  }, [properties, map, onPropertyClick]);

  return (
    <div ref={mapRef} className="w-full h-full min-h-[calc(100vh-64px)] rounded-lg" />
  );
};