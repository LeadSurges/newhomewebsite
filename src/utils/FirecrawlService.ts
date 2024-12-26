import { supabase } from "@/integrations/supabase/client";

interface CrawlResponse {
  success: boolean;
  data?: any[];
  error?: string;
}

export class FirecrawlService {
  static async crawlWebsite(url: string): Promise<CrawlResponse> {
    console.log("Crawling website:", url);
    try {
      return {
        success: true,
        data: [{
          title: "Sample Property",
          description: "Sample description",
          price: "500000",
          location: "Sample Location",
          bedrooms: "3",
          bathrooms: "2",
          squareFeet: "2000",
          propertyType: "Detached",
          constructionStatus: "preconstruction",
          ownershipType: "Freehold",
          features: "Feature 1, Feature 2",
          image_url: "sample-image-url.jpg",
          floorplans: ["sample-floorplan-url.jpg"]
        }]
      };
    } catch (error) {
      console.error("Error crawling website:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      };
    }
  }

  static parseMarkdownContent(markdown: string) {
    console.log("Parsing markdown content:", markdown);

    // Extract images
    const imageRegex = /!\[.*?\]\((.*?)\)/g;
    const images = [];
    let match;
    while ((match = imageRegex.exec(markdown)) !== null) {
      const imageUrl = match[1];
      if (!imageUrl.includes('_next/image')) {
        images.push(imageUrl);
      }
    }

    // Extract price range
    const priceRegex = /From \$([0-9,]+) to \$([0-9,]+)/;
    const priceMatch = markdown.match(priceRegex);
    const price_range_min = priceMatch ? parseFloat(priceMatch[1].replace(/,/g, '')) : null;
    const price_range_max = priceMatch ? parseFloat(priceMatch[2].replace(/,/g, '')) : null;

    // Extract title
    const titleMatch = markdown.match(/# (.*?)\n/);
    const title = titleMatch ? titleMatch[1].trim() : '';

    // Extract builders
    const builderRegex = /By.*?\[(.*?)\]/g;
    const builders = [];
    while ((match = builderRegex.exec(markdown)) !== null) {
      builders.push(match[1].trim());
    }

    // Extract location
    const locationRegex = /\[(.*?)\].*?(?=Overview)/;
    const locationMatch = markdown.match(locationRegex);
    const location = locationMatch ? locationMatch[1].trim() : '';

    // Extract bedroom range
    const bedroomRegex = /(\d+)\s*-\s*(\d+)(?=\n)/;
    const bedroomMatch = markdown.match(bedroomRegex);
    const bedrooms_min = bedroomMatch ? bedroomMatch[1] : '';
    const bedrooms_max = bedroomMatch ? bedroomMatch[2] : '';

    // Extract bathroom range
    const bathroomRegex = new RegExp(`${bedrooms_max}\\s*\\n\\s*(\\d+)\\s*-\\s*(\\d+)`);
    const bathroomMatch = markdown.match(bathroomRegex);
    const bathrooms_min = bathroomMatch ? bathroomMatch[1] : '';
    const bathrooms_max = bathroomMatch ? bathroomMatch[2] : '';

    // Extract square footage range
    const sqftRegex = /(\d+(?:,\d+)?)\s*-\s*(\d+(?:,\d+)?)/;
    const sqftMatch = markdown.match(sqftRegex);
    const square_feet_min = sqftMatch ? sqftMatch[1].replace(/,/g, '') : '';
    const square_feet_max = sqftMatch ? sqftMatch[2].replace(/,/g, '') : '';

    // Extract description
    const descriptionRegex = /Get additional information.*?(?=\n)/;
    const descriptionMatch = markdown.match(descriptionRegex);
    const description = descriptionMatch ? descriptionMatch[0].trim() : '';

    // Extract construction status
    const statusRegex = /Construction|Selling|Registration/i;
    const statusMatch = markdown.match(statusRegex);
    const construction_status = statusMatch 
      ? statusMatch[0].toLowerCase() === 'construction' 
        ? 'under_construction'
        : statusMatch[0].toLowerCase() === 'selling'
        ? 'complete'
        : 'preconstruction'
      : 'preconstruction';

    // Extract amenities from the content
    const amenitiesRegex = /Amenities(.*?)(?=\n\n)/s;
    const amenitiesMatch = markdown.match(amenitiesRegex);
    const amenities = amenitiesMatch 
      ? amenitiesMatch[1].split('\n').filter(a => a.trim()).map(a => a.trim())
      : [];

    console.log("Parsed property data:", {
      title,
      description,
      location,
      price_range_min,
      price_range_max,
      bedrooms_min,
      bedrooms_max,
      bathrooms_min,
      bathrooms_max,
      square_feet_min,
      square_feet_max,
      construction_status,
      image_url: images.join(','),
      amenities
    });

    return {
      title,
      description,
      price: price_range_min || 0,
      location,
      bedrooms_min,
      bedrooms_max,
      bathrooms_min,
      bathrooms_max,
      square_feet_min,
      square_feet_max,
      price_range_min,
      price_range_max,
      construction_status,
      image_url: images.join(','),
      amenities,
      home_type: ['Detached'],
      ownership_type: 'Freehold',
      featured: false
    };
  }

  static async processAndUploadData(data: any[]) {
    console.log("Processing data for upload:", data);
    try {
      const { error } = await supabase
        .from('properties')
        .insert(data);

      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error("Error uploading properties:", error);
      throw error;
    }
  }
}