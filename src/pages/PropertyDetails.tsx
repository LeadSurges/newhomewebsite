import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { Bed, Bath, Maximize, MapPin, Calendar, Building2 } from "lucide-react";

const PropertyDetails = () => {
  const { id } = useParams();

  // Temporary mock data - would be fetched based on id in real implementation
  const property = {
    title: "Modern Downtown Condo",
    price: "$750,000",
    location: "123 Main St, Downtown Area",
    description:
      "This stunning new construction condo offers modern luxury living in the heart of downtown. Featuring high-end finishes, floor-to-ceiling windows, and an open concept layout perfect for entertaining.",
    bedrooms: 2,
    bathrooms: 2,
    sqft: "1,200",
    yearBuilt: "2024",
    developer: "Premium Developments",
    amenities: [
      "Rooftop Pool",
      "Fitness Center",
      "24/7 Concierge",
      "Pet Spa",
      "Package Room",
      "Bike Storage",
    ],
    images: [
      "https://source.unsplash.com/random/1200x800?modern,condo&1",
      "https://source.unsplash.com/random/1200x800?kitchen,modern&2",
      "https://source.unsplash.com/random/1200x800?bedroom,luxury&3",
    ],
    floorplan: "https://source.unsplash.com/random/1200x800?floorplan,architecture",
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Property Images */}
      <section className="pt-20">
        <div className="grid md:grid-cols-2 gap-4 p-4">
          <div className="relative h-[500px]">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 h-[500px]">
            {property.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${property.title} ${index + 2}`}
                className="w-full h-full object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="glass-card p-8 mb-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                    <p className="text-muted-foreground flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {property.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-accent">
                      {property.price}
                    </p>
                    <p className="text-muted-foreground">Starting from</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-muted-foreground" />
                    <span>{property.bedrooms} beds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-muted-foreground" />
                    <span>{property.bathrooms} baths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize className="h-5 w-5 text-muted-foreground" />
                    <span>{property.sqft} sqft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>{property.yearBuilt}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-muted-foreground">{property.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <div className="h-2 w-2 bg-accent rounded-full" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floorplan Section */}
                <div className="mt-12">
                  <h2 className="text-xl font-semibold mb-6">Floorplan</h2>
                  <div className="rounded-lg overflow-hidden border border-muted">
                    <img
                      src={property.floorplan}
                      alt={`${property.title} Floorplan`}
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    * Floorplan measurements are approximate and subject to change.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-24">
                <div className="flex items-center gap-4 mb-6">
                  <Building2 className="h-8 w-8 text-accent" />
                  <div>
                    <p className="font-medium">Developer</p>
                    <p className="text-muted-foreground">{property.developer}</p>
                  </div>
                </div>
                <Button className="w-full mb-4">Schedule a Tour</Button>
                <Button variant="outline" className="w-full">
                  Request Information
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetails;
