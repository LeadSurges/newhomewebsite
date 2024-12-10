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
        <Button variant="outline" className={`h-11 px-4 w-full md:w-[200px] ${className}`}>
          {label}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[320px] p-4">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}