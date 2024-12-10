import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Property = Database["public"]["Tables"]["properties"]["Row"];

interface PropertiesMapProps {
  properties: Property[];
  onPropertyClick?: (propertyId: string) => void;
}

export const PropertiesMap = ({ properties, onPropertyClick }: PropertiesMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      try {
        // Get Maps API key
        const { data: { secret }, error: secretError } = await supabase.functions.invoke('get-maps-key');
        
        if (secretError || !secret) {
          console.error("Failed to get Maps API key:", secretError);
          return;
        }

        // Load Google Maps
        const loader = new google.maps.Loader({
          apiKey: secret,
          version: "weekly",
        });

        await loader.load();
        console.log("Google Maps loaded successfully");

        if (!mapRef.current) return;

        // Initialize map
        const mapOptions: google.maps.MapOptions = {
          center: { lat: 43.6532, lng: -79.3832 }, // Toronto
          zoom: 11,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
        };

        const map = new google.maps.Map(mapRef.current, mapOptions);
        mapInstanceRef.current = map;

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // Create bounds to fit all markers
        const bounds = new google.maps.LatLngBounds();

        // Add markers for properties
        for (const [index, property] of properties.entries()) {
          const geocoder = new google.maps.Geocoder();
          
          try {
            const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
              geocoder.geocode({ address: property.location }, (results, status) => {
                if (status === "OK" && results) {
                  resolve(results);
                } else {
                  reject(new Error(`Geocoding failed for ${property.location}: ${status}`));
                }
              });
            });

            const position = results[0].geometry.location;
            
            const marker = new google.maps.Marker({
              map,
              position,
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

            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div class="p-2">
                  <h3 class="font-semibold">${property.title}</h3>
                  <p class="text-sm">$${property.price.toLocaleString()}</p>
                  <p class="text-xs text-gray-600">${property.location}</p>
                </div>
              `
            });

            marker.addListener("click", () => {
              if (onPropertyClick) {
                onPropertyClick(property.id);
              }
            });

            marker.addListener("mouseover", () => {
              infoWindow.open(map, marker);
            });

            marker.addListener("mouseout", () => {
              infoWindow.close();
            });

            markersRef.current.push(marker);
            bounds.extend(position);
          } catch (error) {
            console.error(`Error creating marker for property ${property.title}:`, error);
          }
        }

        // Fit map to show all markers
        if (markersRef.current.length > 0) {
          map.fitBounds(bounds);
        }

      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initMap();

    // Cleanup
    return () => {
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
      }
    };
  }, [properties, onPropertyClick]);

  if (!properties.length) {
    return (
      <Alert>
        <AlertDescription>No properties to display on the map.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  );
};