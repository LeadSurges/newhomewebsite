import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react";

interface FileUploadFieldProps {
  id: string;
  label: string;
  icon: LucideIcon;
  preview: string[];
  onChange: (files: FileList) => void;
  multiple?: boolean;
}

export const FileUploadField = ({
  id,
  label,
  icon: Icon,
  preview,
  onChange,
  multiple = false,
}: FileUploadFieldProps) => {
  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={id} className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          Choose {label}
        </Label>
        <Input
          id={id}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              onChange(e.target.files);
            }
          }}
        />
        {preview && preview.length > 0 && (
          <div className="mt-2 grid grid-cols-2 gap-2">
            {preview.map((url, index) => (
              <img 
                key={index} 
                src={url} 
                alt={`${label} Preview ${index + 1}`} 
                className="max-w-sm rounded-lg border" 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};