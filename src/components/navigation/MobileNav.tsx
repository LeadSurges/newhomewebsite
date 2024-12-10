import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";

export const MobileNav = ({ isOpen }: { isOpen: boolean }) => {
  const { user, signOut } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="pt-2 pb-3 space-y-1 px-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground px-3">New Homes for Sale</p>
          <Link
            to="/properties?homeType=Single family home"
            className="block px-3 py-2 rounded-md text-base font-medium nav-link"
          >
            Single family homes
          </Link>
          <Link
            to="/properties?homeType=Townhouse"
            className="block px-3 py-2 rounded-md text-base font-medium nav-link"
          >
            Townhomes
          </Link>
          <Link
            to="/properties?homeType=Condo"
            className="block px-3 py-2 rounded-md text-base font-medium nav-link"
          >
            Condos
          </Link>
          <Link
            to="/properties?quickMoveIn=true"
            className="block px-3 py-2 rounded-md text-base font-medium nav-link"
          >
            Quick move-in homes
          </Link>
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground px-3">Professionals</p>
          <Link
            to="/contact?type=builder"
            className="block px-3 py-2 rounded-md text-base font-medium nav-link"
          >
            Builder advertising
          </Link>
          <Link
            to="/contact?type=agent"
            className="block px-3 py-2 rounded-md text-base font-medium nav-link"
          >
            Agent advertising
          </Link>
        </div>

        <Separator className="my-4" />

        {user ? (
          <>
            <Link
              to="/admin/properties"
              className="block px-3 py-2 rounded-md text-base font-medium nav-link"
            >
              Admin
            </Link>
            <Button className="w-full mt-4" onClick={() => signOut()}>
              Sign Out
            </Button>
          </>
        ) : (
          <div className="space-y-2 mt-4">
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
  );
};