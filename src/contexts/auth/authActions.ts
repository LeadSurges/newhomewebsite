import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useAuthActions = () => {
  const { toast } = useToast();

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
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
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
    } catch (error: any) {
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
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      
      if (error) {
        console.error("AuthActions: Google sign in error:", error);
        toast({
          variant: "destructive",
          title: "Error signing in with Google",
          description: error.message,
        });
        throw error;
      }
      
      if (!data.url) {
        console.error("AuthActions: No redirect URL received from Supabase");
        toast({
          variant: "destructive",
          title: "Error signing in with Google",
          description: "Failed to initiate Google sign in. Please try again.",
        });
        return;
      }
      
      console.log("AuthActions: Redirecting to Google sign in with URL:", data.url);
      window.location.href = data.url;
    } catch (error: any) {
      console.error("AuthActions: Google sign in error:", error);
      toast({
        variant: "destructive",
        title: "Error signing in with Google",
        description: error.message || "An unexpected error occurred",
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