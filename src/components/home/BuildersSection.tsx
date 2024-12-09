import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Temporary mock data until we connect to Supabase
const builders = [
  {
    id: 1,
    name: "Pinnacle International",
    logo: "/lovable-uploads/a8d3215b-f655-49f0-8ed4-9285771b73a0.png",
    rating: 4.5,
    reviews: 27,
  },
  {
    id: 2,
    name: "Kingdom",
    logo: "https://source.unsplash.com/random/400x400?logo",
    rating: 4.5,
    reviews: 8,
  },
  {
    id: 3,
    name: "Marlin Spring Developments",
    logo: "https://source.unsplash.com/random/400x400?company",
    rating: 4.5,
    reviews: 4,
  },
  {
    id: 4,
    name: "Menkes Developments Ltd.",
    logo: "https://source.unsplash.com/random/400x400?development",
    rating: 4.5,
    reviews: 8,
  },
];

export const BuildersSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Builders</h2>
            <p className="text-lg text-muted-foreground mt-2">
              Top new construction builders
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {builders.map((builder) => (
            <Link
              key={builder.id}
              to={`/builders/${builder.id}`}
              className="group p-6 bg-card rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={builder.logo}
                  alt={builder.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold group-hover:text-accent">
                {builder.name}
              </h3>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(builder.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-muted-foreground ml-2">
                  {builder.reviews}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};