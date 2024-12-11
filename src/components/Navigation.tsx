import { useState } from "react";
import { Link } from "react-router-dom";
import { DesktopNav } from "./navigation/DesktopNav";
import { MobileNav } from "./navigation/MobileNav";
import { MobileMenuButton } from "./navigation/MobileMenuButton";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-lg z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/a8d3215b-f655-49f0-8ed4-9285771b73a0.png" 
                alt="The New Home Source" 
                className="h-12 md:h-14" // Increased height, with responsive sizing
              />
            </Link>
          </div>

          <DesktopNav />

          <div className="md:hidden flex items-center">
            <MobileMenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </div>
        </div>
      </div>

      <MobileNav isOpen={isOpen} onClose={handleClose} />
    </nav>
  );
};