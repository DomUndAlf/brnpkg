import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Microscope } from "lucide-react";

function BioProp() {
  return (
    <div className="grid w-full max-w-sm gap-6 m-10 p-5 border rounded-md">
    <div className="flex items-center gap-2">
        <Microscope />
        <h3>Biological Properties</h3>
    </div>
    <DropdownMenu>
        <DropdownMenuTrigger className="w-full">
          <InputGroup>
            <InputGroupInput placeholder="Biological Properties" readOnly />
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
  );
}

export default BioProp;