import { ChevronDown, CircleQuestionMark, SearchIcon } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { fetchSample } from "../utils/fetch";
import { useEffect, useState } from "react";
import { nameList } from "../utils/queries.json"

interface GenInfoProps {
  onNameChange: (name: string) => void;
  onFormulaChange: (formula: string) => void;
}

export function GenInfo({ onNameChange, onFormulaChange }: GenInfoProps) {
  const [name, setName] = useState<Array<{ commonName: { value: string } }>>([]);
  const [searchName, setSearchName] = useState("");
  const [nameOpen, setNameOpen] = useState(false);

  const [formula, setFormula] = useState("");

  useEffect(() => {
    fetchSample(nameList).then(setName);
  }, []);

  const filtered = name.filter((s) =>
    s.commonName.value.toLowerCase().includes(searchName.toLowerCase())
  );

  const handleSpeciesSelect = (value: string) => {
    setSearchName(value);
    onNameChange(value);
    setNameOpen(false);
  };

  return (
    <div className="grid w-130 gap-4 m-10 p-5 border rounded-md">
      <div className="flex items-center gap-2">
        <CircleQuestionMark />
        <h3 className="text-lg">General Information</h3>
      </div>
      <InputGroup>
        <InputGroupInput
          placeholder="Common Name"
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            setNameOpen(true);
          }} />
        <InputGroupAddon align="inline-end">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      {nameOpen && filtered.length > 0 && (
        <div className="border rounded-md mt-1 bg-white max-h-48 overflow-auto">
          {filtered.map((s) => (
            <div
              key={s.commonName.value}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSpeciesSelect(s.commonName.value)}>
              {s.commonName.value}
            </div>
          ))}
        </div>
      )}

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
        <InputGroupInput 
          placeholder="Molecular Formula" 
          value={formula}
          onChange ={(e) => { 
            setFormula(e.target.value)
            onFormulaChange(e.target.value);
          }}
          />
        <InputGroupAddon align="inline-end">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

    </div>
  )
}


export default GenInfo