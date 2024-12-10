import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export const useAuthActions = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    try {
      console.log("AuthActions: Starting email sign in...");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("AuthActions: Email sign in error:", error);
        throw error;
      }

      if (data.user) {
        console.log("AuthActions: Email sign in successful for user:", data.user.id);
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        navigate("/properties");
      }
    } catch (error: any) {
      console.error("AuthActions: Email sign in error:", error);
      toast({
        variant: "destructive",
        title: "Error signing in",
        description: error.message,
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      console.log("AuthActions: Starting sign up process...");
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        console.error("AuthActions: Sign up error:", error);
        throw error;
      }

      if (data.user) {
        console.log("AuthActions: Sign up successful for user:", data.user.id);
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      console.error("AuthActions: Sign up error:", error);
      toast({
        variant: "destructive",
        title: "Error signing up",
        description: error.message,
      });
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log("AuthActions: Starting Google sign in process...");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/properties`,
        },
      });
      
      if (error) {
        console.error("AuthActions: Google sign in error:", error);
        throw error;
      }

      console.log("AuthActions: Google sign in initiated successfully");
    } catch (error: any) {
      console.error("AuthActions: Google sign in error:", error);
      toast({
        variant: "destructive",
        title: "Error signing in with Google",
        description: error.message,
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log("AuthActions: Starting sign out process...");
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      console.log("AuthActions: Sign out successful");
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate("/signin");
    } catch (error: any) {
      console.error("AuthActions: Sign out error:", error);
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    }
  };

  return { signIn, signUp, signOut, signInWithGoogle };
};