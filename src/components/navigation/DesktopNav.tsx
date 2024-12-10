import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, User, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export const DesktopNav = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="hidden md:flex items-center space-x-8">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 text-sm">
          New Homes for Sale <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
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
        <DropdownMenuContent>
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

      <Button variant="ghost" size="icon">
        <Search className="h-5 w-5" />
      </Button>

      {user ? (
        <>
          <Link to="/admin/properties" className="nav-link">
            Admin
          </Link>
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