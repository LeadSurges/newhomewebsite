import { useState } from "react";
import { Link } from "react-router-dom";
import { DesktopNav } from "./navigation/DesktopNav";
import { MobileNav } from "./navigation/MobileNav";
import { MobileMenuButton } from "./navigation/MobileMenuButton";

// Create a base64 encoded placeholder image for instant loading
const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNTAiIGZpbGw9IiNmMGYwZjAiLz48L3N2Zz4=";

// Preload the image immediately when the file is loaded
const logoUrl = `${import.meta.env.BASE_URL}lovable-uploads/6aa90a5f-0335-4b6a-b93e-73302bad62c9.png`;
const preloadImage = new Image();
preloadImage.src = logoUrl;
console.log("Navigation: Started preloading logo image");

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
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
    setImageLoaded(true);
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

  return (
    <nav className="fixed w-full bg-[#ffffff] backdrop-blur-lg z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="relative h-12 w-auto">
                {/* Base64 placeholder shown immediately */}
                <img
                  src={placeholderImage}
                  alt=""
                  className="absolute inset-0 h-full w-auto"
                  style={{ opacity: imageLoaded ? 0 : 1 }}
                />
                <img 
                  src={logoUrl}
                  alt="The New Home Source"
                  className={`h-full w-auto transition-opacity duration-200 ${
                    logoError ? 'opacity-50' : imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </div>
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