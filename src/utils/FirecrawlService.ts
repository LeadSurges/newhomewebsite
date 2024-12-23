import FirecrawlApp from "@mendable/firecrawl-js";
import { supabase } from "@/integrations/supabase/client";

export class FirecrawlService {
  static async crawlWebsite(url: string) {
    try {
      console.log("Getting Firecrawl API key from Supabase");
      const { data: { secret }, error: secretError } = await supabase.functions.invoke('get-firecrawl-key');
      
      if (secretError || !secret) {
        console.error("Error getting Firecrawl API key:", secretError);
        throw new Error("Failed to get Firecrawl API key");
      }

      console.log("Initializing Firecrawl client");
      const client = new FirecrawlApp({ 
        apiKey: secret
      });
      
      const response = await client.crawlUrl(url, {
        limit: 1,
        scrapeOptions: {
          waitFor: 5000,
          formats: ['html'],
          selectors: {
            title: 'h1, .property-title, .listing-title',
            description: '.description, .property-description, [data-description]',
            price: '.price, .property-price, [data-price]',
            location: '.location, .property-location, address',
            bedrooms: '.bedrooms, .beds, [data-bedrooms]',
            bathrooms: '.bathrooms, .baths, [data-bathrooms]',
            squareFeet: '.square-feet, .sqft, [data-sqft]',
            propertyType: '.property-type, .home-type, [data-type]',
            images: {
              selector: 'img.property-image, img.listing-image, [data-property-image]',
              attribute: 'src'
            },
            floorplans: {
              selector: 'img.floorplan, img.floor-plan, [data-floorplan]',
              attribute: 'src'
            },
            features: '.features, .amenities, [data-features]',
            constructionStatus: '.construction-status, [data-construction]',
            completionYear: '.completion-year, [data-completion]'
          }
        }
      });
      
      console.log("Crawl response:", response);
      return response;
    } catch (error) {
      console.error("Error in FirecrawlService:", error);
      throw error;
    }
  }
}