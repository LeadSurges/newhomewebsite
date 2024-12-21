import FirecrawlApp from "@mendable/firecrawl-js";

export class FirecrawlService {
  static async crawlWebsite(url: string) {
    try {
      console.log("Starting website crawl for:", url);
      const client = new FirecrawlApp({ 
        apiKey: import.meta.env.VITE_FIRECRAWL_API_KEY 
      });
      
      const response = await client.crawlUrl(url, {
        limit: 100,
        scrapeOptions: {
          formats: ['markdown', 'html'],
          selectors: {
            title: '[data-property="title"], h1, .property-title',
            price: '[data-property="price"], .price, .property-price',
            description: '[data-property="description"], .description, .property-description',
            location: '[data-property="location"], .location, .property-location',
            bedrooms: '[data-property="bedrooms"], .bedrooms, .property-bedrooms',
            bathrooms: '[data-property="bathrooms"], .bathrooms, .property-bathrooms',
            squareFeet: '[data-property="square-feet"], .square-feet, .property-square-feet',
            images: '[data-property="image"], img.property-image'
          }
        }
      });
      
      console.log("Crawl response:", response);
      return response;
    } catch (error) {
      console.error("Error crawling website:", error);
      throw error;
    }
  }
}