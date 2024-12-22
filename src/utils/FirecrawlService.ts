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
        }
      });
      
      console.log("Crawl response:", response);
      
      // Process the crawled data to extract the fields we need
      if (response.success && response.data) {
        const processedData = response.data.map((item: any) => ({
          title: item.title || '',
          price: item.price || '',
          description: item.description || '',
          location: item.location || '',
          bedrooms: item.bedrooms || '',
          bathrooms: item.bathrooms || '',
          squareFeet: item.squareFeet || '',
          propertyType: item.propertyType || '',
          images: item.images || []
        }));
        
        return {
          success: true,
          data: processedData
        };
      }
      
      return response;
    } catch (error) {
      console.error("Error crawling website:", error);
      throw error;
    }
  }
}