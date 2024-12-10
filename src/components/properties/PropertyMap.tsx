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

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current || !location) {
        console.error("Map reference or location not available");
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
        
        const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
          geocoder.geocode({ address: fullLocation }, (results, status) => {
            if (status === "OK" && results && results.length > 0) {
              resolve(results);
            } else {
              reject(new Error(`Failed to geocode location: ${status}`));
            }
          });
        });

        console.log("Location geocoded successfully:", results[0].geometry.location.toString());

        // Clear existing marker if any
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        const map = new google.maps.Map(mapRef.current, {
          center: results[0].geometry.location,
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

        // Create and store the marker reference
        markerRef.current = new google.maps.Marker({
          map,
          position: results[0].geometry.location,
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