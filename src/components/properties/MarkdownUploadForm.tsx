import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FirecrawlService } from '@/utils/FirecrawlService';

export const MarkdownUploadForm = () => {
  const { toast } = useToast();
  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Processing markdown content');
      const propertyData = FirecrawlService.parseMarkdownContent(markdown);
      
      if (propertyData) {
        await FirecrawlService.processAndUploadData([propertyData]);
        toast({
          title: "Success",
          description: "Property has been uploaded successfully from markdown.",
        });
        setMarkdown('');
      }
    } catch (error: any) {
      console.error('Error processing markdown:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Property from Markdown</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="markdown" className="text-sm font-medium">
              Paste Property Markdown Content
            </label>
            <Textarea
              id="markdown"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="# Property Title..."
              className="min-h-[400px] font-mono"
              required
            />
          </div>
          
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Processing..." : "Upload Property"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};