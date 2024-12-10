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
  home_type: string | null;
  construction_status: string | null;
  ownership_type: string | null;
  quick_move_in: boolean;
  master_planned: boolean;
  garage_spaces: string | null;
  completion_year: string | null;
  keywords: string[];
}

export interface Builder {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface BuilderReview {
  id: string;
  builder_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
}