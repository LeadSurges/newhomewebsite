import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Building2, Home } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary animate-fade-up">
            Find Your Dream Home
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Discover new construction homes and luxury condos in prime locations
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="glass-card p-4 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex items-center gap-2 bg-white rounded-lg px-4 py-2 border">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by location..."
                  className="flex-1 outline-none bg-transparent"
                />
              </div>
              <Button size="lg" className="shrink-0">
                Search Properties
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Prime Locations",
                description: "Find properties in the most sought-after neighborhoods",
              },
              {
                icon: Building2,
                title: "New Developments",
                description: "Explore the latest construction projects and pre-sales",
              },
              {
                icon: Home,
                title: "Luxury Living",
                description: "Discover homes with premium finishes and amenities",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card p-6 text-center animate-fade-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <feature.icon className="h-8 w-8 mx-auto text-accent" />
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Properties</h2>
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
    </div>
  );
};

export default Index;