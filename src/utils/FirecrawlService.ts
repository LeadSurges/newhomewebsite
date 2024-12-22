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
          // Using CSS selectors in the elements array instead of a selectors object
          elements: [
            { name: 'title', selector: 'h1' },
            { name: 'description', selector: 'meta[name="description"]' },
            { name: 'price', selector: '.price, .property-price, [data-price]' },
            { name: 'location', selector: '.location, .property-location, address' },
            { name: 'bedrooms', selector: '.bedrooms, .beds' },
            { name: 'bathrooms', selector: '.bathrooms, .baths' },
            { name: 'squareFeet', selector: '.square-feet, .sqft' },
            { name: 'propertyType', selector: '.property-type, .home-type' },
            { name: 'images', selector: 'img', attribute: 'src' }
          ],
          waitFor: '.property-details, .listing-details',
          timeout: 10000 // Changed from string '10000' to number 10000
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