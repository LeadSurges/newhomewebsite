import type { Database } from "@/integrations/supabase/types";

export type BaseProperty = Database["public"]["Tables"]["properties"]["Row"];

export type Property = BaseProperty & {
  builders?: {
    name: string;
    id: string;
  } | null;
};

export type PropertyInsert = Database["public"]["Tables"]["properties"]["Insert"];
export type PropertyUpdate = Database["public"]["Tables"]["properties"]["Update"];