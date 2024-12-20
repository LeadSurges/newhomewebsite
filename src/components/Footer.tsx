import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-secondary mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/contact" className="block text-muted-foreground hover:text-foreground">
                Contact Us
              </Link>
              <Link to="/privacy" className="block text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-muted-foreground">
              The New Home Source is your reliable partner in discovering the perfect new construction home. We specialize in connecting homebuyers with top builders ensuring a seamless journey to finding your dream home.
            </p>
          </div>
        </div>
        
        <div className="border-t px-4 py-6">
          <p className="text-sm text-muted-foreground text-center">
            © 2024 The New Home Source. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;