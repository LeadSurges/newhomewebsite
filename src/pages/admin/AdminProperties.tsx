import { Helmet } from "react-helmet-async";

const AdminProperties = () => {
  return (
    <div className="min-h-screen bg-secondary pt-24">
      <Helmet>
        <title>Admin Properties | LuxuryHomes</title>
      </Helmet>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Admin Properties</h1>
        {/* Admin properties content will go here */}
      </main>
    </div>
  );
};

export default AdminProperties;