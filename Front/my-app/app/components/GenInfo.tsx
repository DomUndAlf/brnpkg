import {
  ChevronDown,
  CircleQuestionMark,
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

export function GenInfo() {
  return (
    <div className="grid w-130 gap-6 m-10 p-5 border rounded-md">
    <div className="flex items-center gap-2">
        <CircleQuestionMark />
        <h3 className="text-lg">General Information</h3>
    </div>
      <InputGroup>
        <InputGroupInput placeholder="Common Name" />
        <InputGroupAddon align="inline-end">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      <DropdownMenu>
        <DropdownMenuTrigger className="w-full">
          <InputGroup>
            <InputGroupInput placeholder="Metabolic Class" readOnly />
            <InputGroupAddon align="inline-end">
              <ChevronDown />
            </InputGroupAddon>
          </InputGroup>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {/* Items in dropdown menü hier */}
        </DropdownMenuContent>
      </DropdownMenu>
    
      <InputGroup>
        <InputGroupInput placeholder="Molecular Formula" />
        <InputGroupAddon align="inline-end">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

    </div>
  )
}


export default GenInfo