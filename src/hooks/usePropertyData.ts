import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { PropertyFilters } from "./usePropertyFilters";

export const usePropertyData = (filters: PropertyFilters) => {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: async () => {
      console.log("Fetching properties with filters:", filters);
      
      let query = supabase
        .from("properties")
        .select("*");

      // Apply location filter with case-insensitive partial match
      if (filters.location && filters.location.trim()) {
        const locationSearch = filters.location.trim().toLowerCase();
        console.log("Applying location filter:", locationSearch);
        query = query.ilike('location', `%${locationSearch}%`);
      }

      // Apply price range filter
      if (filters.priceRange[0] > 0) {
        query = query.gte("price", filters.priceRange[0]);
      }
      if (filters.priceRange[1] < 5000000) {
        query = query.lte("price", filters.priceRange[1]);
      }

      // Apply bedroom filter
      if (filters.bedroomRange[0] > 1) {
        query = query.gte("bedrooms", filters.bedroomRange[0]);
      }

      // Apply bathroom filter
      if (filters.bathroomRange[0] > 1) {
        query = query.gte("bathrooms", filters.bathroomRange[0]);
      }

      // Apply square feet filter
      if (filters.squareFeet.min) {
        query = query.gte("square_feet", filters.squareFeet.min);
      }
      if (filters.squareFeet.max) {
        query = query.lte("square_feet", filters.squareFeet.max);
      }

      // Apply home type filter
      if (filters.homeType) {
        query = query.eq("home_type", filters.homeType);
      }

      // Apply construction status filter
      if (filters.constructionStatus) {
        query = query.eq("construction_status", filters.constructionStatus);
      }

      // Apply ownership type filter
      if (filters.ownershipType.length > 0 && filters.ownershipType[0] !== "All") {
        query = query.eq("ownership_type", filters.ownershipType[0]);
      }

      // Apply quick move in filter
      if (filters.quickMoveIn) {
        query = query.eq("quick_move_in", true);
      }

      // Apply master planned filter
      if (filters.masterPlanned) {
        query = query.eq("master_planned", true);
      }

      // Apply garage filter
      if (filters.garage) {
        query = query.eq("garage_spaces", filters.garage === "4+" ? 4 : parseInt(filters.garage));
      }

      // Apply completion year filter
      if (filters.completionYear) {
        query = query.eq("completion_year", parseInt(filters.completionYear));
      }

      // Apply keywords filter
      if (filters.keywords) {
        query = query.contains('keywords', [filters.keywords]);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching properties:", error);
        throw error;
      }

      console.log("Fetched properties:", data);
      return data;
    },
  });
};