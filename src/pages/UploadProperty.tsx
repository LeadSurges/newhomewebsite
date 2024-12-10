import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { PropertyUploadForm } from "@/components/properties/PropertyUploadForm";

const UploadProperty = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Upload Property | LuxuryHomes"
        description="Upload a new property listing"
        keywords="upload property, new listing, real estate"
      />
      <Navigation />
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Upload New Property</h1>
        <PropertyUploadForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default UploadProperty;