interface PropertyTitleProps {
  title: string;
  size?: "default" | "small";
}

export const PropertyTitle = ({ title, size = "default" }: PropertyTitleProps) => {
  return (
    <h3 className={`font-semibold line-clamp-1 ${
      size === "small" ? "text-base" : "text-lg"
    }`}>
      {title}
    </h3>
  );
};