import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary animate-fade-up">
          Find Your Dream Home
        </h1>
        <p
          className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Discover new construction homes and luxury condos in prime locations
        </p>

        <div
          className="mt-8 max-w-3xl mx-auto animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          <form
            onSubmit={handleSearch}
            className="glass-card p-4 flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-1 flex items-center gap-2 bg-white rounded-lg px-4 py-2 border">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by location, development name..."
                className="flex-1 outline-none bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="shrink-0">
              Search Properties
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};