import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader } from "lucide-react";
import { getMapLoader } from "@/utils/mapLoader";
import type { Database } from "@/integrations/supabase/types";

type Property = Database["public"]["Tables"]["properties"]["Row"];

interface PropertiesMapProps {
  properties: Property[];
  onPropertyClick?: (propertyId: string) => void;
}

export const PropertiesMap = ({ properties, onPropertyClick }: PropertiesMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log("Initializing map with properties:", properties);

        const google = await getMapLoader();
        
        if (!mapRef.current) return;

        // Default to Toronto coordinates
        let mapCenter = { lat: 43.6532, lng: -79.3832 };
        let zoomLevel = 11;

        // If we have properties, try to center the map on their general location
        if (properties.length > 0) {
          const geocoder = new google.maps.Geocoder();
          try {
            // Use the first property's location to center the map
            const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
              geocoder.geocode({ address: properties[0].location }, (results, status) => {
                if (status === "OK" && results) {
                  resolve(results);
                } else {
                  reject(new Error(`Failed to geocode location: ${status}`));
                }
              });
            });
            
            if (results[0]?.geometry?.location) {
              mapCenter = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              };
            }
          } catch (error) {
            console.error("Error geocoding center location:", error);
          }
        }

        const mapInstance = new google.maps.Map(mapRef.current, {
          center: mapCenter,
          zoom: zoomLevel,
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

        // Create bounds to fit all markers
        const bounds = new google.maps.LatLngBounds();

        // Create markers for all properties
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
            bounds.extend(position);

            const marker = new google.maps.Marker({
              map: mapInstance,
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
              infoWindow.open(mapInstance, marker);
            });

            marker.addListener("mouseout", () => {
              infoWindow.close();
            });

            markersRef.current.push(marker);
          } catch (error) {
            console.error(`Error creating marker for property ${property.title}:`, error);
          }
        }

        // Fit map to show all markers if we have any
        if (markersRef.current.length > 0) {
          mapInstance.fitBounds(bounds);
          // Don't zoom in too far
          const listener = google.maps.event.addListener(mapInstance, 'idle', function() {
            if (mapInstance.getZoom()! > 15) {
              mapInstance.setZoom(15);
            }
            google.maps.event.removeListener(listener);
          });
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error initializing map:", err);
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
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
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