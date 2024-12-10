import { Badge } from "@/components/ui/badge";
import type { Builder } from "@/types/builder";

const TYPE_LABELS = {
  builder: "Builder",
  realty: "Realty Company",
  marketing: "Marketing Company",
};

interface BuilderHeaderProps {
  builder: Builder | null;
}

export const BuilderHeader = ({ builder }: BuilderHeaderProps) => {
  if (!builder) return null;

  return (
    <div className="flex items-start gap-8">
      {builder.logo_url && (
        <img 
          src={builder.logo_url} 
          alt={builder.name} 
          className="w-32 h-32 object-contain rounded-lg bg-white p-2 border"
        />
      )}
      
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-3xl font-bold">{builder.name}</h1>
          <Badge variant="secondary">
            {TYPE_LABELS[builder.type as keyof typeof TYPE_LABELS]}
          </Badge>
        </div>

        <p className="text-lg text-muted-foreground mb-8">
          {builder.description}
        </p>
      </div>
    </div>
  );
};