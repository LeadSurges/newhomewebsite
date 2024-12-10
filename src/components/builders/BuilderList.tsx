import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, X, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TYPE_LABELS = {
  builder: "Builder",
  realty: "Realty Company",
  marketing: "Marketing Company",
};

export const BuilderList = () => {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    type: "",
    address: "",
    phone: "",
    website: "",
  });
  
  const { data: builders, isLoading } = useQuery({
    queryKey: ["builders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("builders")
        .select("*")
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  const handleEdit = (builder: any) => {
    setEditingId(builder.id);
    setEditForm({
      name: builder.name,
      description: builder.description || "",
      type: builder.type,
      address: builder.address || "",
      phone: builder.phone || "",
      website: builder.website || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({
      name: "",
      description: "",
      type: "",
      address: "",
      phone: "",
      website: "",
    });
  };

  const handleSaveEdit = async (id: string) => {
    try {
      const { error } = await supabase
        .from("builders")
        .update({
          name: editForm.name,
          description: editForm.description,
          type: editForm.type,
          address: editForm.address,
          phone: editForm.phone,
          website: editForm.website,
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Company has been updated successfully.",
      });

      setEditingId(null);
      setEditForm({
        name: "",
        description: "",
        type: "",
        address: "",
        phone: "",
        website: "",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("builders")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Company has been deleted successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  if (isLoading) {
    return <div>Loading companies...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Existing Companies</h2>
      {builders?.map((builder) => (
        <Card key={builder.id}>
          <CardContent className="p-6">
            {editingId === builder.id ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {builder.logo_url && (
                    <img
                      src={builder.logo_url}
                      alt={builder.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 space-y-4">
                    <Input
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      placeholder="Company Name"
                    />
                    <Select
                      value={editForm.type}
                      onValueChange={(value) =>
                        setEditForm({ ...editForm, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select company type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(TYPE_LABELS).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Textarea
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({ ...editForm, description: e.target.value })
                      }
                      placeholder="Description"
                    />
                    <Input
                      value={editForm.address}
                      onChange={(e) =>
                        setEditForm({ ...editForm, address: e.target.value })
                      }
                      placeholder="Address"
                    />
                    <Input
                      value={editForm.phone}
                      onChange={(e) =>
                        setEditForm({ ...editForm, phone: e.target.value })
                      }
                      placeholder="Phone Number"
                    />
                    <Input
                      value={editForm.website}
                      onChange={(e) =>
                        setEditForm({ ...editForm, website: e.target.value })
                      }
                      placeholder="Website"
                      type="url"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCancelEdit}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="default"
                    size="icon"
                    onClick={() => handleSaveEdit(builder.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {builder.logo_url && (
                    <img
                      src={builder.logo_url}
                      alt={builder.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold">{builder.name}</h3>
                      <Badge variant="secondary">
                        {TYPE_LABELS[builder.type as keyof typeof TYPE_LABELS]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {builder.description}
                    </p>
                    {builder.address && (
                      <p className="text-sm text-muted-foreground">
                        {builder.address}
                      </p>
                    )}
                    {builder.phone && (
                      <p className="text-sm text-muted-foreground">
                        {builder.phone}
                      </p>
                    )}
                    {builder.website && (
                      <a
                        href={builder.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {builder.website}
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(builder)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(builder.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};