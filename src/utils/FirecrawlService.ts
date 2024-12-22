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
          elements: [
            { selector: 'h1, .property-title, .listing-title', name: 'title' },
            { selector: '.description, .property-description, [data-description]', name: 'description' },
            { selector: '.price, .property-price, [data-price]', name: 'price' },
            { selector: '.location, .property-location, address', name: 'location' },
            { selector: '.bedrooms, .beds, [data-bedrooms]', name: 'bedrooms' },
            { selector: '.bathrooms, .baths, [data-bathrooms]', name: 'bathrooms' },
            { selector: '.square-feet, .sqft, [data-sqft]', name: 'squareFeet' },
            { selector: '.property-type, .home-type, [data-type]', name: 'propertyType' },
            { selector: 'img.property-image, img.listing-image, [data-property-image]', name: 'images', attribute: 'src' },
            { selector: 'img.floorplan, img.floor-plan, [data-floorplan]', name: 'floorplans', attribute: 'src' },
            { selector: '.features, .amenities, [data-features]', name: 'features' },
            { selector: '.construction-status, [data-construction]', name: 'constructionStatus' },
            { selector: '.completion-year, [data-completion]', name: 'completionYear' }
          ]
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