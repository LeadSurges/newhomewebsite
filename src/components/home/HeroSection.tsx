import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
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

    setIsSearching(true);
    try {
      // Simulate a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate(`/properties/${encodeURIComponent(searchQuery.trim().toLowerCase())}`);
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    console.log("Clearing search query");
    setSearchQuery("");
  };

  const handleFilterClick = (homeType: string) => {
    console.log("Filtering by home type:", homeType);
    navigate(`/properties?homeType=${encodeURIComponent(homeType)}`);
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-secondary/20">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary animate-fade-up tracking-tight">
          Find Your Dream Home
        </h1>
        <p
          className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Discover your perfect new construction home in prime locations
        </p>

        <div
          className="mt-10 max-w-4xl mx-auto animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          <form
            onSubmit={handleSearch}
            className="glass-card p-8 flex flex-col sm:flex-row gap-4 shadow-lg"
          >
            <div className="flex-1 flex items-center gap-2 bg-white rounded-lg px-6 py-5 border shadow-sm relative transition-all duration-200 hover:shadow-md focus-within:shadow-md focus-within:border-accent">
              <Search className="h-6 w-6 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by City..."
                className="flex-1 outline-none bg-transparent text-xl placeholder:text-muted-foreground/70"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-secondary/80 transition-colors"
                >
                  ×
                </button>
              )}
            </div>
            <Button 
              type="submit" 
              size="lg" 
              disabled={isSearching}
              className="shrink-0 text-lg px-8 bg-accent hover:bg-accent/90 text-white h-[3.75rem] transition-all duration-200 hover:shadow-lg disabled:opacity-70"
            >
              {isSearching ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <Search className="h-5 w-5 mr-2" />
              )}
              Search Properties
            </Button>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              variant="outline"
              onClick={() => handleFilterClick("Single family home")}
              className="text-sm hover:bg-accent hover:text-white transition-colors"
            >
              Single Family Homes
            </Button>
            <Button
              variant="outline"
              onClick={() => handleFilterClick("Townhouse")}
              className="text-sm hover:bg-accent hover:text-white transition-colors"
            >
              Townhomes
            </Button>
            <Button
              variant="outline"
              onClick={() => handleFilterClick("Condo")}
              className="text-sm hover:bg-accent hover:text-white transition-colors"
            >
              Condos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};