import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { Builder } from "@/components/properties/types";

interface BuilderSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const BuilderSelect = ({ value, onChange }: BuilderSelectProps) => {
  const { data: builders } = useQuery({
    queryKey: ["builders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("builders")
        .select("*")
        .order("name");

      if (error) throw error;
      return data as Builder[];
    },
  });

  return (
    <div className="space-y-2">
      <Label>Builder</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a builder" />
        </SelectTrigger>
        <SelectContent>
          {builders?.map((builder) => (
            <SelectItem key={builder.id} value={builder.id}>
              {builder.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};