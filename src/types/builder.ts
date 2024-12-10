import type { Database } from "@/integrations/supabase/types";

export type Builder = Database["public"]["Tables"]["builders"]["Row"];
export type BuilderInsert = Database["public"]["Tables"]["builders"]["Insert"];
export type BuilderUpdate = Database["public"]["Tables"]["builders"]["Update"];