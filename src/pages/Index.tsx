import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BuildersSection } from "@/components/home/BuildersSection";
import { HeroSection } from "@/components/home/HeroSection";
import { TrendingProperties } from "@/components/home/TrendingProperties";
import { OntarioLocations } from "@/components/home/OntarioLocations";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="LuxuryHomes | Premium New Construction Homes in Ontario"
        description="Discover exclusive new construction homes and luxury properties across Ontario. Browse our curated selection of premium real estate in Toronto, Ottawa, Mississauga and more. Find your dream home today."
        keywords="luxury homes, new construction, premium properties, Ontario real estate, Toronto homes, Ottawa properties, Mississauga real estate, high-end condos, luxury real estate, new developments"
        type="website"
      />
      <Navigation />
      <HeroSection />
      <TrendingProperties />
      <BuildersSection />
      <OntarioLocations />
      <Footer />
    </div>
  );
};

export default Index;