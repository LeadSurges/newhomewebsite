import FirecrawlApp from "@mendable/firecrawl-js";

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
          queries: [
            { name: 'title', selector: 'h1, .property-title, .listing-title' },
            { name: 'description', selector: '.description, .property-description, [data-description]' },
            { name: 'price', selector: '.price, .property-price, [data-price]' },
            { name: 'location', selector: '.location, .property-location, address' },
            { name: 'bedrooms', selector: '.bedrooms, .beds, [data-bedrooms]' },
            { name: 'bathrooms', selector: '.bathrooms, .baths, [data-bathrooms]' },
            { name: 'squareFeet', selector: '.square-feet, .sqft, [data-sqft]' },
            { name: 'propertyType', selector: '.property-type, .home-type, [data-type]' },
            { name: 'images', selector: 'img.property-image, img.listing-image, [data-property-image]', attribute: 'src' },
            { name: 'floorplans', selector: 'img.floorplan, img.floor-plan, [data-floorplan]', attribute: 'src' },
            { name: 'features', selector: '.features, .amenities, [data-features]' },
            { name: 'constructionStatus', selector: '.construction-status, [data-construction]' },
            { name: 'completionYear', selector: '.completion-year, [data-completion]' }
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