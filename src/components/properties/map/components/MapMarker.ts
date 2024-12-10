import type { Property } from "@/types/property";

export const createPropertyMarker = (
  map: google.maps.Map,
  property: Property,
  index: number,
  position: google.maps.LatLng,
  onPropertyClick?: (propertyId: string) => void
) => {
  console.log(`Creating marker for property: ${property.title} at position:`, position.toString());
  
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

  return marker;
};