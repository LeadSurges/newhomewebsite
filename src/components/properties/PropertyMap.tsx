import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader } from "lucide-react";
import { getMapLoader } from "@/utils/mapLoader";

interface PropertyMapProps {
  location: string;
  className?: string;
}

export const PropertyMap = ({ location, className = "" }: PropertyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) {
        console.error("Map reference not available");
        return;
      }

      if (!location) {
        console.error("Location not provided");
        setError("Location information is missing");
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        console.log("Initializing map for location:", location);
        
        const google = await getMapLoader();
        const geocoder = new google.maps.Geocoder();
        
        // Add ", Ontario, Canada" to the location if it's not already specified
        const fullLocation = location.toLowerCase().includes('ontario') 
          ? location 
          : `${location}, Ontario, Canada`;

        console.log("Geocoding location:", fullLocation);
        
        const geocodeResult = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
          geocoder.geocode({ address: fullLocation }, (results, status) => {
            if (status === "OK" && results && results.length > 0) {
              resolve(results);
            } else {
              reject(new Error(`Failed to geocode location: ${status}`));
            }
          });
        });

        const coordinates = geocodeResult[0].geometry.location;
        console.log("Location geocoded successfully:", coordinates.toString());

        // Create map instance if it doesn't exist
        if (!mapInstanceRef.current) {
          mapInstanceRef.current = new google.maps.Map(mapRef.current, {
            zoom: 15,
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
        }

        // Update map center
        mapInstanceRef.current.setCenter(coordinates);

        // Clear existing marker if any
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        // Create new marker
        markerRef.current = new google.maps.Marker({
          map: mapInstanceRef.current,
          position: coordinates,
          animation: google.maps.Animation.DROP,
        });

        setIsLoading(false);
      } catch (err) {
        console.error("Error initializing map:", err);
        setError('Failed to load the map. Please try again later.');
        setIsLoading(false);
      }
    };

    initMap();

    // Cleanup function
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [location]);

  if (error) {
    return (
      <Alert variant="destructive" className={className}>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-secondary/50 rounded-lg ${className}`} style={{ height: "300px" }}>
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className={`w-full h-[300px] rounded-lg ${className}`}
    />
  );
};