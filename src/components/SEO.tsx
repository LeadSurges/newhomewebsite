import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  propertyData?: {
    price?: number;
    bedrooms?: number;
    bathrooms?: number;
    squareFeet?: number;
    location?: string;
  };
  breadcrumbs?: Array<{
    name: string;
    item: string;
  }>;
}

export const SEO = ({
  title = "LuxuryHomes | Find Your Dream Home in Ontario",
  description = "Discover luxury new construction homes and premium condos across Ontario. Browse through our curated selection of high-end properties in Toronto, Ottawa, Mississauga and more.",
  keywords = "luxury homes, new construction, condos, real estate, premium properties, Ontario real estate, Toronto homes, Ottawa properties, Mississauga real estate",
  image = "/og-image.png",
  url = window.location.href,
  type = "website",
  propertyData,
  breadcrumbs,
}: SEOProps) => {
  const siteUrl = window.location.origin;
  const canonicalUrl = url.split('?')[0]; // Remove query parameters for canonical URL
  
  // Format price for structured data
  const formatPrice = (price?: number) => {
    if (!price) return undefined;
    return {
      "@type": "PriceSpecification",
      "price": price.toString(),
      "priceCurrency": "CAD"
    };
  };

  // Generate breadcrumb structured data
  const getBreadcrumbData = () => {
    if (!breadcrumbs) return null;
    
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `${siteUrl}${item.item}`
      }))
    };
  };

  // Generate structured data for real estate listings
  const getStructuredData = () => {
    if (type === "property" && propertyData) {
      return {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": title,
        "description": description,
        "image": `${siteUrl}${image}`,
        "url": url,
        "offers": formatPrice(propertyData.price),
        "numberOfRooms": propertyData.bedrooms,
        "numberOfBathroomsTotal": propertyData.bathrooms,
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": propertyData.squareFeet,
          "unitCode": "FTK"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": propertyData.location,
          "addressRegion": "ON",
          "addressCountry": "CA"
        }
      };
    }

    // Default website structured data
    return {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "LuxuryHomes",
      "description": "Premier new construction homes and luxury properties across Ontario",
      "url": siteUrl,
      "logo": `${siteUrl}/og-image.png`,
      "sameAs": [
        "https://www.facebook.com/luxuryhomes",
        "https://www.instagram.com/luxuryhomes",
        "https://www.linkedin.com/company/luxuryhomes"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "ON",
        "addressCountry": "CA"
      }
    };
  };
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:site_name" content="LuxuryHomes" />
      <meta property="og:locale" content="en_CA" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
      
      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="LuxuryHomes" />
      
      {/* Mobile Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#ffffff" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>
      
      {/* Breadcrumb Structured Data */}
      {breadcrumbs && (
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbData())}
        </script>
      )}
    </Helmet>
  );
};