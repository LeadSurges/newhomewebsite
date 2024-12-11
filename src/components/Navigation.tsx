import { useState } from "react";
import { Link } from "react-router-dom";
import { DesktopNav } from "./navigation/DesktopNav";
import { MobileNav } from "./navigation/MobileNav";
import { MobileMenuButton } from "./navigation/MobileMenuButton";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  console.log("Navigation: Initializing with BASE_URL:", import.meta.env.BASE_URL);

  const handleClose = () => setIsOpen(false);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    console.log("Navigation: Logo loaded successfully", {
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      src: img.src,
      complete: img.complete,
      currentSrc: img.currentSrc
    });
    setLogoError(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error("Navigation: Failed to load logo image", {
      attemptedSrc: e.currentTarget.src,
      baseUrl: import.meta.env.BASE_URL,
      complete: e.currentTarget.complete
    });
    setLogoError(true);
    // Only set placeholder if we weren't already trying to load it
    if (!e.currentTarget.src.includes('placeholder.svg')) {
      e.currentTarget.src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=164&h=164&fit=crop&auto=format";
    }
  };

  // Use an absolute URL for the logo
  const logoUrl = "https://87dcb231-3db3-4071-8dcc-030dc518f406.lovableproject.com/lovable-uploads/1b178297-dbe3-4d30-8a57-e6448cb797dc.png";
  console.log("Navigation: Using logo URL:", logoUrl);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-lg z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={logoUrl}
                alt="The New Home Source"
                className={`h-8 w-auto transition-opacity duration-200 ${
                  logoError ? 'opacity-50' : 'opacity-100'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
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