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
                src="/lovable-uploads/6d174b2c-dbd9-4490-ad0a-1b27333022c0.png" 
                alt="The New Home Source" 
                className="h-8"
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