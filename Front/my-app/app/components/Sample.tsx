import {
  ChevronDown,
  Leaf,
  SearchIcon,
} from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

export function Sample() {
  return (
    <div className="grid w-130 gap-6 m-10 p-5 border rounded-md">
      <div className="flex items-center gap-2">
        <Leaf />
        <h3 className="text-lg">Sample</h3>
      </div>
      
      <InputGroup>
        <InputGroupInput placeholder="Species" />
        <InputGroupAddon align="inline-end">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      <DropdownMenu>
        <DropdownMenuTrigger className="w-full">
          <InputGroup>
            <InputGroupInput placeholder="Location" readOnly />
            <InputGroupAddon align="inline-end">
              <ChevronDown />
            </InputGroupAddon>
          </InputGroup>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* Items in dropdown menü hier */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}


export default Sample