import { Navigation } from "@/components/Navigation";
import { BuilderForm } from "@/components/builders/BuilderForm";
import { BuilderList } from "@/components/builders/BuilderList";
import { SEO } from "@/components/SEO";

const AdminBuilders = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Manage Builders | Admin"
        description="Admin interface for managing builders"
      />
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Manage Builders</h1>
        <div className="space-y-8">
          <BuilderForm />
          <BuilderList />
        </div>
      </main>
    </div>
  );
};

export default AdminBuilders;