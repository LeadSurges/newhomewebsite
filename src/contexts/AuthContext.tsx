import { createContext, useContext } from "react";
import { AuthContextType } from "./auth/types";
import { useAuthState } from "./auth/useAuthState";
import { useAuthActions } from "./auth/authActions";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthState();
  const { signIn, signUp, signOut, signInWithGithub } = useAuthActions();

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut, signInWithGithub }}
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