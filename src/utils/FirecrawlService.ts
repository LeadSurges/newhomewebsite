import { FirecrawlClient } from "@mendable/firecrawl-js";

const client = new FirecrawlClient(import.meta.env.VITE_FIRECRAWL_API_KEY);

export class FirecrawlService {
  static async scrapeWebsite(url: string) {
    try {
      const scrapeOptions = {
        url,
        selectors: {
          title: "h1",
          description: "meta[name='description']",
          price: ".price",
          location: ".location",
        }
      };

      const response = await client.scrape(scrapeOptions);
      return response;
    } catch (error) {
      console.error("Error scraping website:", error);
      throw error;
    }
  }
}