import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, User, UserPlus, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const DesktopNav = () => {
  const { user, signOut } = useAuth();

  const { data: isAdmin } = useQuery({
    queryKey: ["is-admin", user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data, error } = await supabase.rpc("is_admin", {
        user_id: user.id,
      });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  return (
    <div className="hidden md:flex items-center space-x-8">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 text-sm">
          New Homes for Sale <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-background border shadow-md">
          <DropdownMenuItem asChild>
            <Link to="/properties?homeType=Single family home" className="cursor-pointer">
              Single family homes
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/properties?homeType=Townhouse" className="cursor-pointer">
              Townhomes
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/properties?homeType=Condo" className="cursor-pointer">
              Condos
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/properties?quickMoveIn=true" className="cursor-pointer">
              Quick move-in homes
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 text-sm">
          Professionals <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-background border shadow-md">
          <DropdownMenuItem asChild>
            <Link to="/contact?type=builder" className="cursor-pointer">
              Builder advertising
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/contact?type=agent" className="cursor-pointer">
              Agent advertising
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link to="/properties">
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
      </Link>

      {user && (
        <Link to="/favorites">
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
        </Link>
      )}

      {user ? (
        <>
          {isAdmin && (
            <>
              <Link to="/admin/properties" className="nav-link">
                Properties
              </Link>
              <Link to="/admin/builders" className="nav-link">
                Builders
              </Link>
            </>
          )}
          <Button onClick={() => signOut()}>Sign Out</Button>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <Link to="/signin">
            <Button variant="outline">
              <User className="h-5 w-5 mr-2" />
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button>
              <UserPlus className="h-5 w-5 mr-2" />
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};