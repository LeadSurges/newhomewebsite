import FirecrawlApp from '@mendable/firecrawl-js';
import { supabase } from "@/integrations/supabase/client";

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
  static async crawlWebsite(url: string): Promise<{ success: boolean; error?: string; data?: any }> {
    try {
      console.log('Getting Firecrawl API key from Supabase');
      const { data: { secret }, error: secretError } = await supabase.functions.invoke('get-firecrawl-key');
      
      if (secretError || !secret) {
        console.error("Error getting Firecrawl API key:", secretError);
        return { success: false, error: "Failed to get Firecrawl API key" };
      }

      console.log('Making crawl request to Firecrawl API');
      const client = new FirecrawlApp({ apiKey: secret });
      const response = await client.crawlUrl(url, {
        limit: 1,
        scrapeOptions: {
          waitFor: 5000,
          formats: ['markdown']
        }
      });

      if (!response.success) {
        console.error('Crawl failed:', (response as ErrorResponse).error);
        return { 
          success: false, 
          error: (response as ErrorResponse).error || 'Failed to crawl website' 
        };
      }

      // Parse the markdown content
      const markdownContent = response.data[0]?.markdown || '';
      const propertyData = this.parseMarkdownContent(markdownContent);

      console.log('Crawl successful, parsed data:', propertyData);
      return { 
        success: true,
        data: propertyData 
      };
    } catch (error) {
      console.error('Error during crawl:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to Firecrawl API' 
      };
    }
  }

  // Changed from private to public static
  static parseMarkdownContent(markdown: string): any {
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
      data.construction_status = 'under_construction';
    } else {
      data.construction_status = 'preconstruction';
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

  // Added new method to process and upload data
  static async processAndUploadData(properties: any[]): Promise<void> {
    console.log('Processing and uploading property data:', properties);
    
    for (const property of properties) {
      try {
        const { error } = await supabase
          .from('properties')
          .insert([{
            title: property.title,
            description: property.description,
            price: property.price,
            location: property.location,
            bedrooms_min: property.bedrooms_min,
            bedrooms_max: property.bedrooms_max,
            bathrooms_min: property.bathrooms_min,
            bathrooms_max: property.bathrooms_max,
            square_feet_min: property.square_feet_min,
            square_feet_max: property.square_feet_max,
            construction_status: property.construction_status,
            home_type: property.home_type,
            image_url: property.images[0], // Use first image as main image
            floorplan_url: property.floorplans[0], // Use first floorplan
            price_range_max: property.price_range_max,
          }]);

        if (error) throw error;
        console.log('Successfully uploaded property:', property.title);
      } catch (error) {
        console.error('Error uploading property:', error);
        throw new Error(`Failed to upload property: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }
}