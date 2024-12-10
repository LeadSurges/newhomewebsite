import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react";

interface FileUploadFieldProps {
  id: string;
  label: string;
  icon: LucideIcon;
  preview: string | null;
  onChange: (file: File) => void;
}

export const FileUploadField = ({
  id,
  label,
  icon: Icon,
  preview,
  onChange,
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
          onChange={(e) => {
            if (e.target.files?.[0]) {
              onChange(e.target.files[0]);
            }
          }}
        />
        {preview && (
          <div className="mt-2">
            <img src={preview} alt={`${label} Preview`} className="max-w-sm rounded-lg border" />
          </div>
        )}
      </div>
    </div>
  );
};