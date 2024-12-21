import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

export const BulkUploadForm = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrapedData, setScrapedData] = useState<any[] | null>(null);

  const processAndUploadData = async (data: any[]) => {
    console.log('Processing scraped data for upload:', data);
    
    try {
      const properties = data.map(item => ({
        title: item.title || 'Untitled Property',
        description: item.description || '',
        price: parseFloat(item.price?.replace(/[^0-9.]/g, '')) || 0,
        location: item.location || '',
        bedrooms: parseInt(item.bedrooms?.replace(/[^0-9]/g, '')) || null,
        bathrooms: parseInt(item.bathrooms?.replace(/[^0-9]/g, '')) || null,
        square_feet: parseInt(item.squareFeet?.replace(/[^0-9]/g, '')) || null,
        image_url: item.images?.join(',') || null,
        // Set a default valid home_type
        home_type: 'Detached',
      }));

      const { error } = await supabase
        .from('properties')
        .insert(properties);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${properties.length} properties have been uploaded successfully.`,
      });
    } catch (error: any) {
      console.error('Error uploading properties:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to upload properties: ${error.message}`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);
    setScrapedData(null);
    
    try {
      console.log('Starting crawl for URL:', url);
      const result = await FirecrawlService.crawlWebsite(url);
      
      if (result.success && result.data) {
        setScrapedData(result.data);
        await processAndUploadData(result.data);
      } else if (!result.success && 'error' in result) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to crawl website",
        });
      }
    } catch (error: any) {
      console.error('Error during bulk upload:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Bulk Upload Properties</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">
              Website URL to Scrape
            </label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/properties"
              required
            />
          </div>
          
          {isLoading && (
            <Progress value={progress} className="w-full" />
          )}
          
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Processing..." : "Start Bulk Upload"}
          </Button>
        </form>

        {scrapedData && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Preview</h3>
            <div className="space-y-2">
              <p>Found {scrapedData.length} properties</p>
              <div className="max-h-60 overflow-auto">
                <pre className="text-xs bg-muted p-2 rounded">
                  {JSON.stringify(scrapedData, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};