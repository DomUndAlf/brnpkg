import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { BookOpenText, ChevronDown } from "lucide-react";
import { fetchSample } from "../utils/fetch";
import { useEffect, useState } from "react";
import yearsList from "../utils/queries.json"

function Publication({ onChange }: { onChange: (v: string) => void }) {
  const [properties, setProperties] = useState<Array<{ label: { value: string } }>>([]);
  const [selectedProp, setSelectedProp] = useState("");
  

  useEffect(() => {
    fetchSample(yearsList.yearsList).then(res => {
      const mapped = res.map((item: unknown) => ({
        label: { value: (item as { label?: { value: string } }).label?.value ?? "" }
      }));
      setProperties(mapped);
    });
  }, []);

  return (
    <div className="grid w-130 gap-5 m-10 p-5 border rounded-md">
      <div className="flex items-center gap-2">
        <BookOpenText />
        <h3 className="text-lg">Publication</h3>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full">
          <InputGroup>
            <InputGroupInput placeholder="Year" value={selectedProp} readOnly />
            <InputGroupAddon align="inline-end">
              <ChevronDown />
            </InputGroupAddon>
          </InputGroup>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {properties
            .filter(p => p?.label?.value)
            .map(p => (
              <DropdownMenuItem
                key={p.label.value}
                onClick={() => {
                  setSelectedProp(p.label.value);
                  onChange(p.label.value);
                }}
              >
                {p.label.value}
              </DropdownMenuItem>
            ))
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Publication;
