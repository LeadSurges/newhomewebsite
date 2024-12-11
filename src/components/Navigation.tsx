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
      e.currentTarget.src = `${import.meta.env.BASE_URL}placeholder.svg`;
    }
  };

  // Construct the logo URL once to avoid recreation
  const logoUrl = `${import.meta.env.BASE_URL}lovable-uploads/6aa90a5f-0335-4b6a-b93e-73302bad62c9.png`;
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