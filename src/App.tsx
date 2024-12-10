import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { Navigation } from "@/components/Navigation";
import { AppRoutes } from "./AppRoutes";

const queryClient = new QueryClient();

const App = () => {
  console.log("App: Initializing application");
  
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <FavoritesProvider>
              <TooltipProvider>
                <div className="flex flex-col min-h-screen">
                  <Navigation />
                  <main className="flex-grow">
                    <AppRoutes />
                  </main>
                  <Toaster />
                  <Sonner />
                </div>
              </TooltipProvider>
            </FavoritesProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;