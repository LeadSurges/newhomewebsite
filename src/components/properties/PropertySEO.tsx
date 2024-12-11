import { SEO } from "@/components/SEO";

interface PropertySEOProps {
  location?: string;
}

export const PropertySEO = ({ location }: PropertySEOProps) => {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Properties", item: "/properties" },
  ];

  if (location) {
    breadcrumbs.push({
      name: `New Homes in ${location}`,
      item: `/properties/${location.toLowerCase()}`
    });
  }

  return (
    <SEO 
      title={`${location ? `New Homes in ${location}` : 'All Properties'} | LuxuryHomes`}
      description={`Browse our collection of luxury properties and new construction homes in ${location || 'all locations'}. Find your perfect home today.`}
      keywords={`luxury properties, new homes, real estate listings, premium real estate, ${location}`}
      breadcrumbs={breadcrumbs}
    />
  );
};