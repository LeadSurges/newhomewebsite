import type { Json } from "@/integrations/supabase/types";

export interface PropertyMainInfoProps {
  title: string;
  location: string;
  price: number;
  price_range_min?: number;
  price_range_max?: number;
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  created_at: string;
  builder?: {
    name: string;
    id: string;
  } | null;
  maintenance_fee_per_sqft?: number;
  parking_cost?: number;
  storage_cost?: number;
  deposit_structure?: Json;
  incentives?: Json;
  bedrooms_min?: string;
  bedrooms_max?: string;
  bathrooms_min?: string;
  bathrooms_max?: string;
  square_feet_min?: string;
  square_feet_max?: string;
  home_type?: string[];
  amenities?: string[];
  features_and_finishes?: string;
  total_homes?: string;
  "Sales Center Hours"?: string;
  Ceilings?: string;
  Architect?: string;
  "Interior designer"?: string;
  "Price Per Sq Ft"?: string;
  "construction started"?: string;
}

export interface FormData {
  title: string;
  description: string;
  price: string;
  location: string;
  bedrooms_min: string;
  bedrooms_max: string;
  bathrooms_min: string;
  bathrooms_max: string;
  square_feet_min: string;
  square_feet_max: string;
  featured: boolean;
  builder_id?: string;
  home_type: string[];
  construction_status: "preconstruction" | "under_construction" | "complete";
  ownership_type: string;
  quick_move_in: boolean;
  master_planned: boolean;
  garage_spaces: string;
  completion_year: string;
  keywords: string[];
  deposit_structure: string;
  incentives: string;
  amenities: string[];
  features_and_finishes: string;
  floorplan_status?: string;
  maintenance_fee_per_sqft?: string;
  parking_cost?: string;
  storage_cost?: string;
  price_range_min?: string;
  price_range_max?: string;
  total_homes?: string;
  sales_center_hours?: string;
  ceilings?: string;
  architect?: string;
  interior_designer?: string;
  price_per_sqft?: string;
  construction_started?: string;
}