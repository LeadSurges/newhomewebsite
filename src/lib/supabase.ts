import { createClient } from '@supabase/supabase-js';

// Add console logs to help debug environment variables
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Anon Key:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '[PRESENT]' : '[MISSING]');

if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error(
    'Missing VITE_SUPABASE_URL environment variable. Please check your .env file.'
  );
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error(
    'Missing VITE_SUPABASE_ANON_KEY environment variable. Please check your .env file.'
  );
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export type Builder = {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  website: string | null;
  created_at: string;
};

export type Property = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  location: string;
  bedrooms: number | null;
  bathrooms: number | null;
  sqft: number | null;
  status: string;
  featured: boolean;
  virtual_tour: boolean;
  image_url: string | null;
  builder_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Favorite = {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
};