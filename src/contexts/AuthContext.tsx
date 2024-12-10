import { createContext, useContext, useEffect } from "react";
import { AuthContextType } from "./auth/types";
import { useAuthState } from "./auth/useAuthState";
import { useAuthActions } from "./auth/authActions";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthState();
  const { signIn, signUp, signOut, signInWithGoogle } = useAuthActions();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle initial auth state and URL fragments
    const handleAuthState = async () => {
      try {
        // Check if we have a hash in the URL (from OAuth redirect)
        if (window.location.hash) {
          console.log("AuthContext: Detected URL hash, attempting to parse session");
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error("AuthContext: Error getting session:", error);
            throw error;
          }

          if (session) {
            console.log("AuthContext: Valid session found, redirecting to properties");
            // Clear the URL hash and redirect
            window.location.hash = '';
            navigate('/properties');
          }
        }
      } catch (error) {
        console.error("AuthContext: Error handling auth state:", error);
      }
    };

    handleAuthState();
  }, [navigate]);

  useEffect(() => {
    // Handle auth state changes
    if (!loading) {
      const currentPath = location.pathname;
      if (user && (currentPath === '/signin' || currentPath === '/signup')) {
        console.log("AuthContext: User is authenticated, redirecting from auth pages");
        navigate('/properties');
      }
    }
  }, [user, loading, navigate, location]);

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut, signInWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};