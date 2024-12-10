import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface BuilderReviewProps {
  builderId: string;
}

export const BuilderReview = ({ builderId }: BuilderReviewProps) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be signed in to leave a review.",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("builder_reviews")
        .insert({
          builder_id: builderId,
          user_id: user.id,
          rating,
          comment,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your review has been submitted successfully.",
      });

      // Reset form
      setRating(5);
      setComment("");

      // Invalidate builder reviews query
      queryClient.invalidateQueries({ queryKey: ["builder-reviews", builderId] });

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            className="focus:outline-none"
            onMouseEnter={() => setHoveredRating(value)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setRating(value)}
          >
            <Star
              className={`h-6 w-6 ${
                value <= (hoveredRating || rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      <Textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Button type="submit" disabled={!user}>
        Submit Review
      </Button>
    </form>
  );
};