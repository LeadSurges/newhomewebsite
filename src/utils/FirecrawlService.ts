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
        limit: 1, // Start with just one page for testing
        scrapeOptions: {
          formats: ['markdown', 'html'],
          selectors: {
            title: "h1",
            description: "meta[name='description']",
            price: ".price, .property-price, [data-price]",
            location: ".location, .property-location, address",
            bedrooms: ".bedrooms, .beds",
            bathrooms: ".bathrooms, .baths",
            squareFeet: ".square-feet, .sqft",
            propertyType: ".property-type, .home-type",
            images: {
              selector: "img",
              attribute: "src"
            }
          },
          waitForSelector: ".property-details, .listing-details",
          maxWaitTime: 10000
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