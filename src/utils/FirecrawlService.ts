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
          formats: ['markdown', 'html'],
          waitFor: 5000,
          timeout: 10000,
          extractors: {
            title: { selector: 'h1, .property-title, .listing-title' },
            description: { selector: '.description, .property-description, [data-description]' },
            price: { selector: '.price, .property-price, [data-price]' },
            location: { selector: '.location, .property-location, address' },
            bedrooms: { selector: '.bedrooms, .beds, [data-bedrooms]' },
            bathrooms: { selector: '.bathrooms, .baths, [data-bathrooms]' },
            squareFeet: { selector: '.square-feet, .sqft, [data-sqft]' },
            propertyType: { selector: '.property-type, .home-type, [data-type]' },
            images: { selector: 'img.property-image, img.listing-image, [data-property-image]', attribute: 'src' },
            floorplans: { selector: 'img.floorplan, img.floor-plan, [data-floorplan]', attribute: 'src' },
            features: { selector: '.features, .amenities, [data-features]' },
            constructionStatus: { selector: '.construction-status, [data-construction]' },
            completionYear: { selector: '.completion-year, [data-completion]' }
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