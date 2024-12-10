import { createContext, useContext, useEffect } from "react";
import { AuthContextType } from "./auth/types";
import { useAuthState } from "./auth/useAuthState";
import { useAuthActions } from "./auth/authActions";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthState();
  const { signIn, signUp, signOut, signInWithGoogle } = useAuthActions();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle auth state changes
    if (!loading) {
      const currentPath = location.pathname;
      if (user && (currentPath === '/signin' || currentPath === '/signup')) {
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