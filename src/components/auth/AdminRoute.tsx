import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["is-admin", user?.id],
    queryFn: async () => {
      if (!user) return false;
      console.log("AdminRoute: Checking if user is admin");
      const { data, error } = await supabase.rpc("is_admin", {
        user_id: user.id,
      });
      if (error) {
        console.error("AdminRoute: Error checking admin status:", error);
        throw error;
      }
      console.log("AdminRoute: Admin check result:", data);
      return data;
    },
    enabled: !!user,
  });

  if (!user) {
    console.log("AdminRoute: No user, redirecting to signin");
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    console.log("AdminRoute: User is not admin, redirecting to home");
    return <Navigate to="/" replace />;
  }

  console.log("AdminRoute: User is admin, rendering admin content");
  return <>{children}</>;
};