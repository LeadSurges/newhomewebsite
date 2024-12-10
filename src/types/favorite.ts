import type { Database } from "@/integrations/supabase/types";

export type Favorite = Database["public"]["Tables"]["favorites"]["Row"];
export type FavoriteInsert = Database["public"]["Tables"]["favorites"]["Insert"];
export type FavoriteUpdate = Database["public"]["Tables"]["favorites"]["Update"];