import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface FilterDropdownProps {
  label: string
  children: React.ReactNode
  className?: string
}

export function FilterDropdown({ label, children, className }: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className={`h-9 px-3 text-sm w-[140px] ${className}`}
        >
          {label}
          <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-[320px] p-4 bg-white border shadow-lg backdrop-blur-sm" 
        sideOffset={8}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}