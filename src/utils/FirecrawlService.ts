import { supabase } from "@/integrations/supabase/client";

export class FirecrawlService {
  static async crawlWebsite(url: string) {
    // Implement the crawling functionality here
    // This is a placeholder for the actual crawling logic
    console.log("Crawling website:", url);
    // ... (crawling logic)
  }

  static parseMarkdownContent(markdown: string) {
    console.log("Parsing markdown content:", markdown);

    // Extract images
    const imageRegex = /!\[.*?\]\((.*?)\)/g;
    const images = [];
    let match;
    while ((match = imageRegex.exec(markdown)) !== null) {
      const imageUrl = match[1];
      if (!imageUrl.includes('_next/image')) { // Skip next.js processed images
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

    // Extract bathroom range (appears after bedrooms)
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

    // Extract contact information
    const phoneRegex = /\[(\d{3}-\*\*\*-\*\*\*\*)\]/;
    const phoneMatch = markdown.match(phoneRegex);
    const contact_phone = phoneMatch ? phoneMatch[1] : '';

    // Extract address
    const addressRegex = /(\d+.*?(?=,))/;
    const addressMatch = markdown.match(addressRegex);
    const address = addressMatch ? addressMatch[0].trim() : '';

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
      images,
      amenities,
      contact_phone,
      address
    });

    return {
      title,
      description,
      price: price_range_min || 0, // Use min price as default price
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
      images: images.join(','),
      amenities,
      home_type: ['Detached'], // Default to Detached for this type of listing
      ownership_type: 'Freehold', // Default to Freehold
      featured: false,
      contact_phone,
      address
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
