import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export interface PropertyFilters {
  location: string;
  priceRange: [number, number];
  bedroomRange: [number, number];
  bathroomRange: [number, number];
  homeType: string | null;
  constructionStatus: string | null;
  quickMoveIn: boolean;
  masterPlanned: boolean;
  ownershipType: string[];
  squareFeet: { min: string; max: string };
  garage: string | null;
  completionYear: string | null;
  keywords: string;
}

export const usePropertyFilters = () => {
  const { location: urlLocation } = useParams();
  const [searchParams] = useSearchParams();
  
  const [filters, setFilters] = useState<PropertyFilters>({
    location: urlLocation || searchParams.get("location") || "",
    priceRange: [0, 5000000],
    bedroomRange: [1, 7],
    bathroomRange: [1, 5],
    homeType: null,
    constructionStatus: null,
    quickMoveIn: false,
    masterPlanned: false,
    ownershipType: [],
    squareFeet: { min: "", max: "" },
    garage: null,
    completionYear: null,
    keywords: "",
  });

  // Handle URL parameters and path location
  useEffect(() => {
    const locationFromUrl = urlLocation || searchParams.get("location");
    const homeType = searchParams.get("homeType");
    const quickMoveIn = searchParams.get("quickMoveIn") === "true";

    if (locationFromUrl || homeType || quickMoveIn) {
      console.log("URL params/path changed, updating filters with location:", locationFromUrl);
      setFilters(prev => ({
        ...prev,
        location: locationFromUrl || prev.location,
        homeType: homeType || prev.homeType,
        quickMoveIn: quickMoveIn
      }));
    }
  }, [urlLocation, searchParams]);

  return {
    filters,
    setFilters,
  };
};