import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const MobileNav = ({ isOpen }: { isOpen: boolean }) => {
  const { user, signOut } = useAuth();

  const { data: isAdmin } = useQuery({
    queryKey: ["is-admin", user?.id],
    queryFn: async () => {
      if (!user) return false;
      console.log("MobileNav: Checking if user is admin");
      const { data, error } = await supabase.rpc("is_admin", {
        user_id: user.id,
      });
      if (error) throw error;
      console.log("MobileNav: Admin check result:", data);
      return data;
    },
    enabled: !!user,
  });

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 w-full h-full" style={{ zIndex: 9999 }}>
      <div className="fixed inset-0 w-full h-full bg-white/95 backdrop-blur-sm">
        <div className="py-6 px-6 space-y-4 h-full overflow-y-auto">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">New Homes for Sale</p>
            <Link
              to="/properties?homeType=Single family home"
              className="block py-2 text-base font-medium nav-link"
            >
              Single family homes
            </Link>
            <Link
              to="/properties?homeType=Townhouse"
              className="block py-2 text-base font-medium nav-link"
            >
              Townhomes
            </Link>
            <Link
              to="/properties?homeType=Condo"
              className="block py-2 text-base font-medium nav-link"
            >
              Condos
            </Link>
            <Link
              to="/properties?quickMoveIn=true"
              className="block py-2 text-base font-medium nav-link"
            >
              Quick move-in homes
            </Link>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Professionals</p>
            <Link
              to="/contact?type=builder"
              className="block py-2 text-base font-medium nav-link"
            >
              Builder advertising
            </Link>
            <Link
              to="/contact?type=agent"
              className="block py-2 text-base font-medium nav-link"
            >
              Agent advertising
            </Link>
          </div>

          <Separator className="my-4" />

          {user ? (
            <>
              <Link
                to="/favorites"
                className="flex items-center py-2 text-base font-medium nav-link"
              >
                <Heart className="h-5 w-5 mr-2" />
                My Favorites
              </Link>
              {isAdmin && (
                <>
                  <Link
                    to="/admin/properties"
                    className="block py-2 text-base font-medium nav-link"
                  >
                    Properties
                  </Link>
                  <Link
                    to="/admin/builders"
                    className="block py-2 text-base font-medium nav-link"
                  >
                    Builders
                  </Link>
                </>
              )}
              <Button className="w-full mt-4" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <div className="space-y-3 mt-4">
              <Link to="/signin" className="block">
                <Button className="w-full">Sign In</Button>
              </Link>
              <Link to="/signup" className="block">
                <Button className="w-full" variant="outline">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};