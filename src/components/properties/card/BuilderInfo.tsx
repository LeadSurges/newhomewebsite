import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

interface BuilderInfoProps {
  builder?: {
    id: string;
    name: string;
  } | null;
}

export const BuilderInfo = ({ builder }: BuilderInfoProps) => {
  if (!builder) return null;

  return (
    <Link 
      to={`/builders/${builder.id}`}
      className="flex items-center gap-2 text-sm text-primary hover:underline mt-2"
      onClick={(e) => e.stopPropagation()}
    >
      <Building2 className="h-4 w-4" />
      <span>Built by {builder.name}</span>
    </Link>
  );
};