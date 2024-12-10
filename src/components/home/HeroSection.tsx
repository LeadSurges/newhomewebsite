import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for location:", searchQuery);

    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a location",
        description: "Enter a city, neighborhood, or address to search properties",
        variant: "destructive",
      });
      return;
    }

    navigate(`/properties?location=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleClear = () => {
    console.log("Clearing search query");
    setSearchQuery("");
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
          Discover your new construction home
        </p>

        <div
          className="mt-8 max-w-3xl mx-auto animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          <form
            onSubmit={handleSearch}
            className="glass-card p-6 flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-1 flex items-center gap-2 bg-white rounded-lg px-6 py-3 border shadow-sm relative">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by city, neighborhood, or address..."
                className="flex-1 outline-none bg-transparent text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              )}
            </div>
            <Button type="submit" size="lg" className="shrink-0 text-lg px-8">
              Search Properties
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};