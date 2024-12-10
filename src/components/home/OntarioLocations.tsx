import { Link } from "react-router-dom";

const locations = [
  { id: 1, name: "Toronto", count: 150 },
  { id: 2, name: "Mississauga", count: 85 },
  { id: 3, name: "Brampton", count: 65 },
  { id: 4, name: "Hamilton", count: 45 },
  { id: 5, name: "Burlington", count: 35 },
  { id: 6, name: "Oakville", count: 40 },
  { id: 7, name: "Milton", count: 30 },
  { id: 8, name: "Richmond Hill", count: 25 },
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
              to={`/properties?location=${location.name}`}
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