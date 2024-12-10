import { Link } from "react-router-dom";

const locations = [
  { id: 1, name: "Toronto", count: 150 },
  { id: 2, name: "Ottawa", count: 95 },
  { id: 3, name: "Mississauga", count: 85 },
  { id: 4, name: "Brampton", count: 65 },
  { id: 5, name: "Hamilton", count: 45 },
  { id: 6, name: "London", count: 42 },
  { id: 7, name: "Markham", count: 38 },
  { id: 8, name: "Vaughan", count: 35 },
  { id: 9, name: "Kitchener", count: 32 },
  { id: 10, name: "Windsor", count: 30 },
  { id: 11, name: "Richmond Hill", count: 28 },
  { id: 12, name: "Oakville", count: 25 },
  { id: 13, name: "Burlington", count: 22 },
  { id: 14, name: "Barrie", count: 20 },
  { id: 15, name: "Oshawa", count: 18 },
  { id: 16, name: "Milton", count: 15 },
];

export const OntarioLocations = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">
          Explore New Homes Across Ontario
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {locations.map((location) => (
            <Link
              key={location.id}
              to={`/properties?location=${encodeURIComponent(location.name)}`}
              className="p-4 text-center hover:bg-accent rounded-lg transition-colors"
            >
              <div className="font-medium">{location.name}</div>
              <div className="text-sm text-muted-foreground">
                {location.count} new homes
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};