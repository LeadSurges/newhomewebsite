export interface FormData {
  title: string;
  description: string;
  price: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  square_feet: string;
  featured: boolean;
  builder_id?: string;
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