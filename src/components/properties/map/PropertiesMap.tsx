import { useEffect, useRef, useState } from "react";
import type { Database } from "@/integrations/supabase/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader as LoadingSpinner } from "lucide-react";
import { Loader } from "@googlemaps/js-api-loader";
import { supabase } from "@/integrations/supabase/client";

type Property = Database["public"]["Tables"]["properties"]["Row"];

interface PropertiesMapProps {
  properties: Property[];
  onPropertyClick: (propertyId: string) => void;
}

export const PropertiesMap = ({ properties, onPropertyClick }: PropertiesMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;
      
      try {
        setIsLoading(true);
        setError(null);
        console.log("Initializing map with properties:", properties);

        const { data: { secret } } = await supabase.functions.invoke('get-maps-key');
        
        if (!secret) {
          throw new Error("No Google Maps API key found");
        }

        const loader = new Loader({
          apiKey: secret,
          version: "weekly",
        });

        const google = await loader.load();
        console.log("Google Maps API loaded successfully");

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

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // Create markers for all properties
        const bounds = new google.maps.LatLngBounds();

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

            const marker = new google.maps.Marker({
              map: mapInstance,
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
              onPropertyClick(property.id);
            });

            marker.addListener("mouseover", () => {
              infoWindow.open(mapInstance, marker);
            });

            marker.addListener("mouseout", () => {
              infoWindow.close();
            });

            markersRef.current.push(marker);
            bounds.extend(results[0].geometry.location);
          } catch (error) {
            console.error(`Error creating marker for property ${property.title}:`, error);
          }
        }

        // Adjust map to fit all markers
        if (markersRef.current.length > 0) {
          mapInstance.fitBounds(bounds);
        }

        setIsLoading(false);
        console.log("Map initialized successfully with", markersRef.current.length, "markers");
      } catch (error) {
        console.error("Error initializing map:", error);
        setError('Failed to load the map. Please try again later.');
        setIsLoading(false);
      }
    };

    initMap();

    // Cleanup markers on unmount
    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, [properties, onPropertyClick]);

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