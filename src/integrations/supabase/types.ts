export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      builder_reviews: {
        Row: {
          id: string
          builder_id: string
          user_id: string
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          builder_id: string
          user_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          builder_id?: string
          user_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      builders: {
        Row: {
          id: string
          name: string
          description: string | null
          logo_url: string | null
          created_at: string
          updated_at: string
          type: string
          address: string | null
          phone: string | null
          website: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          logo_url?: string | null
          created_at?: string
          updated_at?: string
          type?: string
          address?: string | null
          phone?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          logo_url?: string | null
          created_at?: string
          updated_at?: string
          type?: string
          address?: string | null
          phone?: string | null
          website?: string | null
        }
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          property_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          property_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          property_id?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          username?: string | null
        }
      }
      properties: {
        Row: {
          bathrooms: number | null
          bedrooms: number | null
          builder_id: string | null
          completion_year: number | null
          construction_status: string | null
          created_at: string
          description: string | null
          featured: boolean | null
          floorplan_url: string | null
          garage_spaces: number | null
          home_type: string | null
          id: string
          image_url: string | null
          keywords: string[] | null
          location: string
          master_planned: boolean | null
          ownership_type: string | null
          price: number
          quick_move_in: boolean | null
          square_feet: number | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          bathrooms?: number | null
          bedrooms?: number | null
          builder_id?: string | null
          completion_year?: number | null
          construction_status?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          floorplan_url?: string | null
          garage_spaces?: number | null
          home_type?: string | null
          id?: string
          image_url?: string | null
          keywords?: string[] | null
          location: string
          master_planned?: boolean | null
          ownership_type?: string | null
          price: number
          quick_move_in?: boolean | null
          square_feet?: number | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          bathrooms?: number | null
          bedrooms?: number | null
          builder_id?: string | null
          completion_year?: number | null
          construction_status?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          floorplan_url?: string | null
          garage_spaces?: number | null
          home_type?: string | null
          id?: string
          image_url?: string | null
          keywords?: string[] | null
          location?: string
          master_planned?: boolean | null
          ownership_type?: string | null
          price?: number
          quick_move_in?: boolean | null
          square_feet?: number | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
      }
      reviews: {
        Row: {
          comment: string
          created_at: string
          id: string
          property_id: string
          rating: number
          updated_at: string
          user_id: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          property_id: string
          rating: number
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          property_id?: string
          rating?: number
          updated_at?: string
          user_id?: string
        }
      }
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
