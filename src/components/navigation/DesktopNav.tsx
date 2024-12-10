import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, User, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const DesktopNav = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link to="/properties" className="nav-link">
        Properties
      </Link>
      <Link to="/developers" className="nav-link">
        Developers
      </Link>
      <Link to="/about" className="nav-link">
        About
      </Link>
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