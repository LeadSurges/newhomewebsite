import type { Database } from "@/integrations/supabase/types";

export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type ReviewInsert = Database["public"]["Tables"]["reviews"]["Insert"];
export type ReviewUpdate = Database["public"]["Tables"]["reviews"]["Update"];

export type BuilderReview = Database["public"]["Tables"]["builder_reviews"]["Row"];
export type BuilderReviewInsert = Database["public"]["Tables"]["builder_reviews"]["Insert"];
export type BuilderReviewUpdate = Database["public"]["Tables"]["builder_reviews"]["Update"];