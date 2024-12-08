import { Link } from "react-router-dom";

const Footer = () => {
  const ontarioCities = [
    "Toronto",
    "Ottawa",
    "Mississauga",
    "Brampton",
    "Hamilton",
    "London",
    "Markham",
    "Vaughan",
    "Kitchener",
    "Windsor",
  ];

  return (
    <footer className="bg-secondary mt-16 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Top new home locations in Ontario</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ontarioCities.map((city) => (
              <Link
                key={city}
                to={`/properties?city=${city}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {city} new homes
              </Link>
            ))}
          </div>
        </div>
        
        <div className="border-t pt-8">
          <p className="text-sm text-muted-foreground">
            © 2024 LuxuryHomes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;