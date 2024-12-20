import FirecrawlApp from '@mendable/firecrawl-js';

interface ErrorResponse {
  success: false;
  error: string;
}

interface CrawlStatusResponse {
  success: true;
  status: string;
  completed: number;
  total: number;
  creditsUsed: number;
  expiresAt: string;
  data: any[];
}

type CrawlResponse = CrawlStatusResponse | ErrorResponse;

export class FirecrawlService {
  private static firecrawlApp: FirecrawlApp | null = null;

  static async crawlWebsite(url: string): Promise<{ success: boolean; error?: string; data?: any }> {
    try {
      console.log('Making crawl request to Firecrawl API');
      
      // Using environment variable from Supabase Edge Function
      const apiKey = import.meta.env.VITE_FIRECRAWL_API_KEY;
      
      if (!apiKey) {
        console.error('API key not found');
        return { success: false, error: 'API key not found' };
      }

      if (!this.firecrawlApp) {
        this.firecrawlApp = new FirecrawlApp({ apiKey });
      }

      const crawlResponse = await this.firecrawlApp.crawlUrl(url, {
        limit: 100,
        scrapeOptions: {
          formats: ['markdown', 'html'],
          // Using selectors property instead of cssSelectors
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
      }) as CrawlResponse;

      if (!crawlResponse.success) {
        console.error('Crawl failed:', (crawlResponse as ErrorResponse).error);
        return { 
          success: false, 
          error: (crawlResponse as ErrorResponse).error || 'Failed to crawl website' 
        };
      }

      console.log('Crawl successful:', crawlResponse);
      return { 
        success: true,
        data: crawlResponse 
      };
    } catch (error) {
      console.error('Error during crawl:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to Firecrawl API' 
      };
    }
  }
}