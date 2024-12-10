import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType } from "./auth/types";
import { useAuthState } from "./auth/useAuthState";
import { useAuthActions } from "./auth/authActions";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading, setUser } = useAuthState();
  const { signIn, signUp, signOut } = useAuthActions();
  const navigate = useNavigate();
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log("AuthContext: Initializing auth state");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("AuthContext: Error getting initial session:", error);
          throw error;
        }

        if (session?.user) {
          console.log("AuthContext: Found existing session");
          setUser(session.user);
        }

        setIsInitialized(true);
      } catch (error) {
        console.error("AuthContext: Error during initialization:", error);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [setUser]);

  useEffect(() => {
    if (!isInitialized) return;

    console.log("AuthContext: Setting up auth state change listener");
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("AuthContext: Auth state changed:", event, session?.user?.id);
      
      if (session?.user) {
        setUser(session.user);
        if (location.pathname === '/signin' || location.pathname === '/signup') {
          console.log("AuthContext: Redirecting authenticated user to properties");
          navigate('/properties');
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      console.log("AuthContext: Cleaning up auth state change listener");
      subscription.unsubscribe();
    };
  }, [isInitialized, navigate, location.pathname, setUser]);

  if (!isInitialized) {
    console.log("AuthContext: Still initializing...");
    return null;
  }

  console.log("AuthContext: Rendering with user:", user?.id);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
      }}
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