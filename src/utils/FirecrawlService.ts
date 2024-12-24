import FirecrawlApp from "@mendable/firecrawl-js";
import { supabase } from "@/integrations/supabase/client";

interface CrawlResult {
  success: boolean;
  data?: any[];
  error?: string;
}

export class FirecrawlService {
  static async crawlWebsite(url: string): Promise<CrawlResult> {
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

      console.log("Making crawl request to Firecrawl API");
      const response = await client.crawlUrl(url, {
        limit: 1,
        scrapeOptions: {
          waitFor: 5000,
          formats: ['markdown']
        }
      });

      if (!response.success) {
        console.error("Crawl failed:", response.error);
        return { 
          success: false, 
          error: response.error || "Failed to crawl website" 
        };
      }

      // Parse the markdown content to extract property information
      const markdownContent = response.data[0]?.content || '';
      const propertyData = this.parseMarkdownContent(markdownContent);

      console.log("Crawl successful, parsed data:", propertyData);
      return { 
        success: true,
        data: [propertyData]
      };
    } catch (error) {
      console.error("Error during crawl:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to connect to Firecrawl API" 
      };
    }
  }

  private static parseMarkdownContent(markdown: string): any {
    const data: any = {
      images: [],
      floorplans: []
    };

    // Extract images
    const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
    let match;
    while ((match = imageRegex.exec(markdown)) !== null) {
      if (match[1].includes('hero-image')) {
        data.images.push(match[2]);
      } else if (match[1].toLowerCase().includes('floor')) {
        data.floorplans.push(match[2]);
      }
    }

    // Extract title
    const titleMatch = markdown.match(/# (.*?)(\n|$)/);
    if (titleMatch) data.title = titleMatch[1].trim();

    // Extract price range
    const priceMatch = markdown.match(/From \$([\d,]+) to \$([\d,]+)/);
    if (priceMatch) {
      data.price = parseFloat(priceMatch[1].replace(/,/g, ''));
      data.price_range_max = parseFloat(priceMatch[2].replace(/,/g, ''));
    }

    // Extract location
    const locationMatch = markdown.match(/## (.*?), ([A-Z]{2})/);
    if (locationMatch) data.location = locationMatch[0].trim();

    // Extract beds and baths
    const bedsMatch = markdown.match(/(\d+)\s*-\s*(\d+)\s*Beds/);
    const bathsMatch = markdown.match(/(\d+)\s*-\s*(\d+)\s*Baths/);
    if (bedsMatch) {
      data.bedrooms_min = bedsMatch[1];
      data.bedrooms_max = bedsMatch[2];
    }
    if (bathsMatch) {
      data.bathrooms_min = bathsMatch[1];
      data.bathrooms_max = bathsMatch[2];
    }

    // Extract square footage
    const sqftMatch = markdown.match(/(\d+,?\d*)\s*-\s*(\d+,?\d*)\s*SqFt/);
    if (sqftMatch) {
      data.square_feet_min = sqftMatch[1].replace(/,/g, '');
      data.square_feet_max = sqftMatch[2].replace(/,/g, '');
    }

    // Extract description
    const descriptionMatch = markdown.match(/## Overview\n\n([\s\S]*?)(?=\n\n|$)/);
    if (descriptionMatch) data.description = descriptionMatch[1].trim();

    // Extract construction status
    if (markdown.includes('Construction')) {
      data.construction_status = 'Under Construction';
    }

    // Extract home type
    if (markdown.toLowerCase().includes('townhouse')) {
      data.home_type = ['Townhouse'];
    } else if (markdown.toLowerCase().includes('single family')) {
      data.home_type = ['Detached'];
    }

    console.log("Parsed property data:", data);
    return data;
  }
}