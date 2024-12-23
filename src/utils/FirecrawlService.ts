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
          waitFor: 5000, // Changed to number as per v1 API
          formats: ['html'],
          evaluate: async (page) => {
            return {
              title: await page.$eval('h1, .property-title, .listing-title', (el) => el.textContent?.trim()),
              description: await page.$eval('.description, .property-description, [data-description]', (el) => el.textContent?.trim()),
              price: await page.$eval('.price, .property-price, [data-price]', (el) => el.textContent?.trim()),
              location: await page.$eval('.location, .property-location, address', (el) => el.textContent?.trim()),
              bedrooms: await page.$eval('.bedrooms, .beds, [data-bedrooms]', (el) => el.textContent?.trim()),
              bathrooms: await page.$eval('.bathrooms, .baths, [data-bathrooms]', (el) => el.textContent?.trim()),
              squareFeet: await page.$eval('.square-feet, .sqft, [data-sqft]', (el) => el.textContent?.trim()),
              propertyType: await page.$eval('.property-type, .home-type, [data-type]', (el) => el.textContent?.trim()),
              images: await page.$$eval('img.property-image, img.listing-image, [data-property-image]', (els) => els.map(el => el.getAttribute('src'))),
              floorplans: await page.$$eval('img.floorplan, img.floor-plan, [data-floorplan]', (els) => els.map(el => el.getAttribute('src'))),
              features: await page.$eval('.features, .amenities, [data-features]', (el) => el.textContent?.trim()),
              constructionStatus: await page.$eval('.construction-status, [data-construction]', (el) => el.textContent?.trim()),
              completionYear: await page.$eval('.completion-year, [data-completion]', (el) => el.textContent?.trim())
            };
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