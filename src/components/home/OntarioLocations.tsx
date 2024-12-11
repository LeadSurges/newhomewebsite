import { Link } from "react-router-dom";

const locations = [
  { id: 1, name: "Toronto" },
  { id: 2, name: "Ottawa" },
  { id: 3, name: "Mississauga" },
  { id: 4, name: "Brampton" },
  { id: 5, name: "Hamilton" },
  { id: 6, name: "London" },
  { id: 7, name: "Markham" },
  { id: 8, name: "Vaughan" },
  { id: 9, name: "Kitchener" },
  { id: 10, name: "Windsor" },
  { id: 11, name: "Richmond Hill" },
  { id: 12, name: "Oakville" },
  { id: 13, name: "Burlington" },
  { id: 14, name: "Barrie" },
  { id: 15, name: "Oshawa" },
  { id: 16, name: "Milton" },
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
              className="p-4 text-center transition-transform duration-300 hover:scale-105 rounded-lg"
            >
              <div className="font-medium">New Homes {location.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};