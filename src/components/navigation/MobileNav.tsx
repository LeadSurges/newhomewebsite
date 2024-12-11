import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus, Heart, Search, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const MobileNav = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
    <div className="md:hidden fixed inset-0 w-full h-[100dvh] bg-white z-50">
      <div className="flex flex-col h-full">
        {/* Close Button */}
        <div className="p-4 flex justify-end border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Main Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Search */}
            <Link 
              to="/properties" 
              className="flex items-center py-3 text-base font-medium hover:text-accent"
              onClick={onClose}
            >
              <Search className="h-5 w-5 mr-3" />
              Search Properties
            </Link>

            <Separator />

            {/* New Homes for Sale Section */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-muted-foreground">New Homes for Sale</p>
              <div className="space-y-2">
                <Link
                  to="/properties?homeType=Single family home"
                  className="block py-2 text-base hover:text-accent"
                  onClick={onClose}
                >
                  Single family homes
                </Link>
                <Link
                  to="/properties?homeType=Townhouse"
                  className="block py-2 text-base hover:text-accent"
                  onClick={onClose}
                >
                  Townhomes
                </Link>
                <Link
                  to="/properties?homeType=Condo"
                  className="block py-2 text-base hover:text-accent"
                  onClick={onClose}
                >
                  Condos
                </Link>
                <Link
                  to="/properties?quickMoveIn=true"
                  className="block py-2 text-base hover:text-accent"
                  onClick={onClose}
                >
                  Quick move-in homes
                </Link>
              </div>
            </div>

            <Separator />

            {/* Professionals Section */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-muted-foreground">Professionals</p>
              <div className="space-y-2">
                <Link
                  to="/contact?type=builder"
                  className="block py-2 text-base hover:text-accent"
                  onClick={onClose}
                >
                  Builder advertising
                </Link>
                <Link
                  to="/contact?type=agent"
                  className="block py-2 text-base hover:text-accent"
                  onClick={onClose}
                >
                  Agent advertising
                </Link>
              </div>
            </div>

            {user && (
              <>
                <Separator />
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground">My Account</p>
                  <div className="space-y-2">
                    <Link
                      to="/favorites"
                      className="flex items-center py-2 text-base hover:text-accent"
                      onClick={onClose}
                    >
                      <Heart className="h-5 w-5 mr-3" />
                      My Favorites
                    </Link>
                    {isAdmin && (
                      <>
                        <Link
                          to="/admin/properties"
                          className="block py-2 text-base hover:text-accent"
                          onClick={onClose}
                        >
                          Properties
                        </Link>
                        <Link
                          to="/admin/builders"
                          className="block py-2 text-base hover:text-accent"
                          onClick={onClose}
                        >
                          Builders
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* User Actions - Fixed at Bottom */}
        <div className="p-6 border-t bg-gray-50">
          {user ? (
            <Button 
              className="w-full" 
              variant="default"
              onClick={() => {
                signOut();
                onClose();
              }}
            >
              Sign Out
            </Button>
          ) : (
            <div className="space-y-3">
              <Link to="/signin" className="block" onClick={onClose}>
                <Button className="w-full" variant="default">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" className="block" onClick={onClose}>
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