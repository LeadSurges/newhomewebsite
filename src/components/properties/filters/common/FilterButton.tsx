import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

interface FilterButtonProps {
  label: string
  icon?: LucideIcon
  onClick?: () => void
  className?: string
  variant?: "default" | "outline" | "ghost"
  children?: React.ReactNode
}

export function FilterButton({ 
  label, 
  icon: Icon, 
  onClick, 
  className = "", 
  variant = "outline",
  children 
}: FilterButtonProps) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={`min-w-[100px] flex items-center gap-2 bg-white border-gray-300 hover:bg-gray-50 ${className}`}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children || label}
    </Button>
  )
}