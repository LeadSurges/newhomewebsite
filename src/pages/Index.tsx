import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BuildersSection } from "@/components/home/BuildersSection";
import { HeroSection } from "@/components/home/HeroSection";
import { TrendingProperties } from "@/components/home/TrendingProperties";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO />
      <Navigation />
      <HeroSection />
      <TrendingProperties />
      <BuildersSection />
      <Footer />
    </div>
  );
};

export default Index;