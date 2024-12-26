import { supabase } from "@/integrations/supabase/client";
import FirecrawlApp from '@mendable/firecrawl-js';

interface CrawlResponse {
  success: boolean;
  data?: any[];
  error?: string;
}

export class FirecrawlService {
  private static async getFirecrawlKey(): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('get-firecrawl-key');
      if (error) throw error;
      return data.key;
    } catch (error) {
      console.error('Error getting Firecrawl key:', error);
      throw new Error('Failed to get Firecrawl API key');
    }
  }

  static async crawlWebsite(url: string): Promise<CrawlResponse> {
    try {
      console.log('Getting Firecrawl API key...');
      const apiKey = await this.getFirecrawlKey();
      
      console.log('Initializing Firecrawl with API key');
      const firecrawl = new FirecrawlApp({ apiKey });
      
      console.log('Starting website crawl for URL:', url);
      const response = await firecrawl.crawlUrl(url, {
        limit: 100,
        scrapeOptions: {
          formats: ['markdown', 'html'],
        }
      });

      console.log('Crawl response:', response);
      return {
        success: true,
        data: response.data || []
      };
    } catch (error) {
      console.error('Error during crawl:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to crawl website'
      };
    }
  }

  static parseMarkdownContent(markdown: string) {
    try {
      console.log("Parsing markdown content:", markdown);
      
      // Extract title
      const titleMatch = markdown.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1].trim() : '';
      
      // Extract price
      const priceMatch = markdown.match(/\$([0-9,]+)/);
      const price = priceMatch ? parseFloat(priceMatch[1].replace(/,/g, '')) : 0;
      
      // Extract location
      const locationMatch = markdown.match(/##\s+([^#\n]+)/);
      const location = locationMatch ? locationMatch[1].trim() : '';
      
      // Extract description (everything after the location until the next heading)
      const descriptionMatch = markdown.match(/##[^#\n]+\n\n([^#]+)/);
      const description = descriptionMatch ? descriptionMatch[1].trim() : '';
      
      // Extract home types
      const homeTypeMatch = markdown.match(/home type: ([^#\n]+)/i);
      const homeType = homeTypeMatch 
        ? homeTypeMatch[1].split(',').map(type => type.trim())
        : [];
      
      console.log("Parsed markdown data:", {
        title,
        price,
        location,
        description,
        home_type: homeType
      });

      return {
        title,
        price,
        location,
        description,
        home_type: homeType
      };
    } catch (error) {
      console.error("Error parsing markdown:", error);
      throw new Error("Failed to parse markdown content");
    }
  }

  static async processAndUploadData(properties: any[]) {
    console.log("Processing properties for upload:", properties);
    
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert(properties);
        
      if (error) throw error;
      
      console.log("Successfully uploaded properties:", data);
      return data;
    } catch (error) {
      console.error("Error uploading properties:", error);
      throw error;
    }
  }
}