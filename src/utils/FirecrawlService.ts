export class FirecrawlService {
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