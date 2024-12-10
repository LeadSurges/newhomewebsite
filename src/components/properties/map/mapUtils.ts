import type { Database } from "@/integrations/supabase/types";

type Property = Database["public"]["Tables"]["properties"]["Row"];

export const createCustomMarker = (number: string) => {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: '#4A89F3',
    fillOpacity: 1,
    strokeWeight: 0,
    scale: 20,
  };
};

export const createMarkerLabel = (index: number) => {
  return {
    text: (index + 1).toString(),
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold'
  };
};

export const geocodeProperty = async (
  property: Property,
  index: number,
  map: google.maps.Map,
  onMarkerClick: (propertyId: string) => void
): Promise<google.maps.Marker | null> => {
  const geocoder = new google.maps.Geocoder();
  
  try {
    console.log(`Geocoding property: ${property.title} at ${property.location}`);
    
    const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
      geocoder.geocode({ address: property.location }, (results, status) => {
        if (status === 'OK' && results) {
          resolve(results);
        } else {
          reject(new Error(`Geocoding failed for ${property.location}: ${status}`));
        }
      });
    });

    const marker = new google.maps.Marker({
      map,
      position: results[0].geometry.location,
      title: property.title,
      icon: createCustomMarker((index + 1).toString()),
      label: createMarkerLabel(index)
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div class="p-4">
          <h3 class="font-semibold mb-2">${property.title}</h3>
          <p class="text-sm text-gray-600 mb-2">${property.location}</p>
          <p class="font-medium">$${property.price.toLocaleString()}</p>
        </div>
      `
    });

    marker.addListener('click', () => {
      onMarkerClick(property.id);
    });

    marker.addListener('mouseover', () => {
      infoWindow.open(map, marker);
    });

    marker.addListener('mouseout', () => {
      infoWindow.close();
    });

    console.log(`Created marker for property: ${property.title}`);
    return marker;
  } catch (error) {
    console.error('Error geocoding property:', error);
    return null;
  }
};