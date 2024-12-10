import type { Property } from "@/types/property";

export const geocodeLocation = async (
  geocoder: google.maps.Geocoder,
  location: string
): Promise<google.maps.LatLng> => {
  console.log(`Geocoding location: ${location}`);
  
  try {
    const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          resolve(results);
        } else {
          reject(new Error(`Geocoding failed for ${location}: ${status}`));
        }
      });
    });

    return results[0].geometry.location;
  } catch (error) {
    console.error(`Error geocoding location ${location}:`, error);
    throw error;
  }
};

export const fitMapToBounds = (
  map: google.maps.Map,
  markers: google.maps.Marker[]
) => {
  if (markers.length === 0) return;

  const bounds = new google.maps.LatLngBounds();
  markers.forEach(marker => {
    bounds.extend(marker.getPosition()!);
  });

  map.fitBounds(bounds);

  // Don't zoom in too far
  google.maps.event.addListenerOnce(map, 'idle', () => {
    if (map.getZoom()! > 15) {
      map.setZoom(15);
    }
  });
};