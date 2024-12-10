import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const MobileNav = ({ isOpen }: { isOpen: boolean }) => {
  const { user, signOut } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="pt-2 pb-3 space-y-1 px-4">
        <Link
          to="/properties"
          className="block px-3 py-2 rounded-md text-base font-medium nav-link"
        >
          Properties
        </Link>
        <Link
          to="/developers"
          className="block px-3 py-2 rounded-md text-base font-medium nav-link"
        >
          Developers
        </Link>
        <Link
          to="/about"
          className="block px-3 py-2 rounded-md text-base font-medium nav-link"
        >
          About
        </Link>
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