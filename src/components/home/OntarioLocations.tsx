import { Link } from "react-router-dom";

export const OntarioLocations = () => {
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
    "Burlington",
    "Oshawa",
    "Barrie",
    "St. Catharines",
    "Cambridge",
    "Kingston",
    "Guelph",
    "Thunder Bay",
    "Waterloo",
    "Brantford",
    "Milton",
    "Niagara Falls",
    "Richmond Hill",
    "Oakville",
    "Burlington",
    "Sudbury",
    "Peterborough",
    "Newmarket",
    "Sarnia",
    "Sault Ste. Marie"
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Top new home locations in Ontario</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {ontarioCities.map((city) => (
            <Link
              key={city}
              to={`/properties?location=${encodeURIComponent(city)}`}
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              {city} new homes
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};