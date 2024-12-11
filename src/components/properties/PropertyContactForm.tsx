import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PropertyContactFormProps {
  propertyTitle: string;
}

export const PropertyContactForm = ({ propertyTitle }: PropertyContactFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const emailContent = `
        <h2>Property Inquiry: ${propertyTitle}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Property:</strong> ${propertyTitle}</p>
      `;

      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          to: "officialleadsurge@gmail.com",
          subject: `Property Inquiry for ${propertyTitle}`,
          html: emailContent,
          replyTo: email
        },
      });

      if (error) throw error;

      toast({
        title: "Request sent successfully",
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error('Error sending request:', error);
      toast({
        variant: "destructive",
        title: "Error sending request",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request More Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="tel"
              placeholder="Your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Request Information"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};