import { Star } from "lucide-react";
import { BuilderReview as BuilderReviewForm } from "./BuilderReview";
import type { Profile } from "@/types/profile";

interface ReviewWithProfile {
  id: string;
  builder_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  profiles: Profile | null;
}

interface BuilderReviewsProps {
  builderId: string;
  reviews: ReviewWithProfile[] | undefined;
}

export const BuilderReviews = ({ builderId, reviews }: BuilderReviewsProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8">Reviews</h2>
      <div className="space-y-8">
        <BuilderReviewForm builderId={builderId} />
        
        <div className="space-y-4">
          {reviews?.map((review) => (
            <div key={review.id} className="bg-secondary rounded-lg p-6">
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`h-4 w-4 ${
                      value <= review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                By {review.profiles?.username || "Anonymous"}
              </p>
              {review.comment && (
                <p className="text-muted-foreground">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};