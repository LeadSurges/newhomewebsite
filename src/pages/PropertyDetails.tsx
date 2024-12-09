import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { 
  Bed, Bath, Maximize, MapPin, Calendar, Building2, 
  Home, DollarSign, Car, Box, Coffee, Dumbbell, Pool, Wifi
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PropertyDetails = () => {
  const { id } = useParams();

  // Expanded mock data to match competitor's information structure
  const property = {
    title: "Concord Canada House",
    price: "$750,000",
    location: "38 Grenville Street, Toronto",
    description: "Concord Canada House is a new condo community by Concord Adex currently under construction at 38 Grenville Street, Toronto. The development is scheduled for completion in 2024. Available units range from 488 to 655 square feet.",
    bedrooms: 2,
    bathrooms: 2,
    sqft: "1,200",
    yearBuilt: "2024",
    developer: "Concord Adex",
    status: "Pre-construction",
    ownership: "Condominium",
    maintenance: "$0.64/sq.ft",
    deposit: "20% before occupancy",
    amenities: [
      "Board Room",
      "Steam Room",
      "Juice Bar",
      "Hot Tub",
      "Party Room",
      "Sauna",
      "Guest Suites",
      "Indoor Pool"
    ],
    features: [
      "9ft ceiling heights throughout",
      "Choice of three interior color schemes",
      "Wide plank laminate flooring",
      "Custom designed kitchen cabinetry",
      "Quartz countertops",
      "Stainless steel appliance package",
      "Porcelain tile flooring in the laundry closet"
    ],
    images: [
      "https://source.unsplash.com/random/1200x800?modern,condo&1",
      "https://source.unsplash.com/random/1200x800?kitchen,modern&2",
      "https://source.unsplash.com/random/1200x800?bedroom,luxury&3",
      "https://source.unsplash.com/random/1200x800?bathroom,modern&4"
    ],
    floorplans: [
      {
        unit: "1A",
        price: "$750,000 CAD",
        sqft: "488",
        beds: 1,
        baths: 1,
        image: "https://source.unsplash.com/random/400x300?floorplan&1"
      },
      {
        unit: "2B",
        price: "$850,000 CAD",
        sqft: "655",
        beds: 2,
        baths: 2,
        image: "https://source.unsplash.com/random/400x300?floorplan&2"
      }
    ],
    similarProperties: [
      {
        id: 2,
        title: "Queen Church",
        price: "$800,000",
        location: "Toronto",
        image: "https://source.unsplash.com/random/400x300?building&1"
      },
      {
        id: 3,
        title: "The Eglinton",
        price: "$650,000",
        location: "Toronto",
        image: "https://source.unsplash.com/random/400x300?building&2"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section with Images */}
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
            {property.images.slice(1, 4).map((image, index) => (
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

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Information */}
            <div className="lg:col-span-2">
              {/* Overview Section */}
              <div className="glass-card p-8 mb-8">
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <p className="text-muted-foreground flex items-center mb-6">
                  <MapPin className="h-4 w-4 mr-2" />
                  {property.location}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                    <span>{property.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>{property.yearBuilt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-muted-foreground" />
                    <span>{property.ownership}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <span>{property.maintenance}</span>
                  </div>
                </div>

                <h2 className="text-xl font-semibold mb-4">Overview</h2>
                <p className="text-muted-foreground mb-8">{property.description}</p>

                {/* Features & Finishes */}
                <Accordion type="single" collapsible>
                  <AccordionItem value="features">
                    <AccordionTrigger>Features & Finishes</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {property.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-accent rounded-full" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Floor Plans Section */}
              <div className="glass-card p-8 mb-8">
                <h2 className="text-xl font-semibold mb-6">Floor Plans</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {property.floorplans.map((plan, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <img src={plan.image} alt={`Unit ${plan.unit}`} className="w-full h-48 object-cover rounded-lg mb-4" />
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-semibold">Unit {plan.unit}</span>
                          <span className="text-accent">{plan.price}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{plan.beds} bed</span>
                          <span>{plan.baths} bath</span>
                          <span>{plan.sqft} sqft</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities Section */}
              <div className="glass-card p-8 mb-8">
                <h2 className="text-xl font-semibold mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-accent rounded-full" />
                      <span className="text-muted-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Similar Properties */}
              <div className="glass-card p-8">
                <h2 className="text-xl font-semibold mb-6">Similar Properties Nearby</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {property.similarProperties.map((similar, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <img src={similar.image} alt={similar.title} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold">{similar.title}</h3>
                        <p className="text-accent">{similar.price}</p>
                        <p className="text-sm text-muted-foreground">{similar.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Contact & Quick Info */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-24">
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-accent mb-2">{property.price}</p>
                  <p className="text-muted-foreground">Starting from</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Developer</span>
                    <span className="font-medium">{property.developer}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Deposit</span>
                    <span className="font-medium">{property.deposit}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium">{property.status}</span>
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