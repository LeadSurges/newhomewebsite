interface PropertyTitleProps {
  title: string;
  location: string;
  size?: "default" | "small";
}

export const PropertyTitle = ({ title, location, size = "default" }: PropertyTitleProps) => {
  return (
    <div>
      <h3 className={`font-semibold line-clamp-1 ${
        size === "small" ? "text-base" : "text-lg"
      }`}>
        {title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-1">{location}</p>
    </div>
  );
};