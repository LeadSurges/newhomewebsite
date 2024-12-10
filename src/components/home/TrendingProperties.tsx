import { Button } from "@/components/ui/button";

export const TrendingProperties = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Trending Properties
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="property-card animate-fade-up"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={`https://source.unsplash.com/random/800x600?luxury,home&${index}`}
                  alt="Property"
                  className="property-image"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Luxury Condo</h3>
                <p className="text-muted-foreground mb-4">Downtown Area</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">$1,250,000</span>
                  <Button variant="outline">View Details</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};