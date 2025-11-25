import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown, Microscope } from "lucide-react";
import { fetchSample } from "../utils/fetch";
import { useEffect, useState } from "react";
import propertyList from "../utils/queries.json"

function BioProp({ onChange }: { onChange: (v: string) => void }) {
  const [properties, setProperties] = useState<Array<{ label: { value: string } }>>([]);
  const [selectedProp, setSelectedProp] = useState("");

    useEffect(() => {
      fetchSample(propertyList.propertyList).then(setProperties);
    }, []);
  

  return (
    <div className="grid w-130 gap-5 m-10 p-5 border rounded-md">
      <div className="flex items-center gap-2">
        <Microscope />
        <h3 className="text-lg">Biological Properties</h3>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full">
          <InputGroup>
            <InputGroupInput placeholder="Biological Properties" value={selectedProp} readOnly />
            <InputGroupAddon align="inline-end">
              <ChevronDown />
            </InputGroupAddon>
          </InputGroup>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {properties.map((item) => (
            <DropdownMenuItem key={item.label.value}
              onClick={() => {
              setSelectedProp(item.label.value); 
              onChange(item.label.value);}}>
              {item.label.value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default BioProp;
