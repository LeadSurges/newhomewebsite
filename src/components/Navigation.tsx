import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User } from "lucide-react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-lg z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              LuxuryHomes
            </Link>
          </div>

          {/* Desktop Navigation */}
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
            <Button>
              <User className="h-5 w-5 mr-2" />
              Sign In
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
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
            <Button className="w-full mt-4">Sign In</Button>
          </div>
        </div>
      )}
    </nav>
  );
};