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
    <div className="md:hidden">
      <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-sm overflow-y-auto">
        <div className="py-4 space-y-2 px-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground px-2">New Homes for Sale</p>
            <Link
              to="/properties?homeType=Single family home"
              className="block px-2 py-1.5 rounded-md text-sm font-medium nav-link"
            >
              Single family homes
            </Link>
            <Link
              to="/properties?homeType=Townhouse"
              className="block px-2 py-1.5 rounded-md text-sm font-medium nav-link"
            >
              Townhomes
            </Link>
            <Link
              to="/properties?homeType=Condo"
              className="block px-2 py-1.5 rounded-md text-sm font-medium nav-link"
            >
              Condos
            </Link>
            <Link
              to="/properties?quickMoveIn=true"
              className="block px-2 py-1.5 rounded-md text-sm font-medium nav-link"
            >
              Quick move-in homes
            </Link>
          </div>

          <Separator className="my-2" />

          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground px-2">Professionals</p>
            <Link
              to="/contact?type=builder"
              className="block px-2 py-1.5 rounded-md text-sm font-medium nav-link"
            >
              Builder advertising
            </Link>
            <Link
              to="/contact?type=agent"
              className="block px-2 py-1.5 rounded-md text-sm font-medium nav-link"
            >
              Agent advertising
            </Link>
          </div>

          <Separator className="my-2" />

          {user ? (
            <>
              <Link
                to="/favorites"
                className="flex items-center px-2 py-1.5 rounded-md text-sm font-medium nav-link"
              >
                <Heart className="h-4 w-4 mr-2" />
                My Favorites
              </Link>
              {isAdmin && (
                <>
                  <Link
                    to="/admin/properties"
                    className="block px-2 py-1.5 rounded-md text-sm font-medium nav-link"
                  >
                    Properties
                  </Link>
                  <Link
                    to="/admin/builders"
                    className="block px-2 py-1.5 rounded-md text-sm font-medium nav-link"
                  >
                    Builders
                  </Link>
                </>
              )}
              <Button className="w-full mt-3" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <div className="space-y-2 mt-3">
              <Link to="/signin" className="block">
                <Button className="w-full">Sign In</Button>
              </Link>
              <Link to="/signup" className="block">
                <Button className="w-full" variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
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