import { ChevronDown, Leaf, SearchIcon } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { speciesList, locationList } from "../utils/queries.json"
import { useEffect, useState } from "react";
import { fetchSample } from "../utils/fetch"; 

interface SampleProps {
  onSpeciesChange: (species: string) => void;
  onLocationChange: (location: string) => void;
}

export function Sample({ onSpeciesChange, onLocationChange }: SampleProps) {
  const [species, setSpecies] = useState<Array<{ label: { value: string } }>>([]);
  const [location, setLocation] = useState<Array<{ label: { value: string } }>>([]);
  const [speciesOpen, setSpeciesOpen] = useState(false);
  
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    fetchSample(speciesList).then(setSpecies);
  }, []);

  useEffect(() => {
    fetchSample(locationList).then(setLocation);
  }, []);

  const filtered = species.filter((s) =>
    s.label.value.toLowerCase().includes(search.toLowerCase())
  );

    const handleLocationSelect = (value: string) => {
    setSelectedLocation(value);
    onLocationChange(value);
  };

    const handleSpeciesSelect = (value: string) => {
    setSearch(value);
    onSpeciesChange(value);
    setSpeciesOpen(false);
  };

  return (
    <div className="grid w-130 gap-4 m-10 p-5 border rounded-md">
      <div className="flex items-center gap-2">
        <Leaf />
        <h3 className="text-lg">Sample</h3>
      </div>

      <InputGroup>
        <InputGroupInput
          placeholder="Species"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSpeciesOpen(true);
          }}
        />
        <InputGroupAddon align="inline-end">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      {speciesOpen && filtered.length > 0 && (
        <div className="border rounded-md mt-1 bg-white max-h-48 overflow-auto">
          {filtered.map((s) => (
            <div
              key={s.label.value}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSpeciesSelect(s.label.value)}>
              {s.label.value}
            </div>
          ))}
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger className="w-full">
          <InputGroup>
            <InputGroupInput placeholder="Location" readOnly value={selectedLocation}/>
            <InputGroupAddon align="inline-end">
              <ChevronDown />
            </InputGroupAddon>
          </InputGroup>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {location.map((item) => (
            <DropdownMenuItem key={item.label.value}
            onClick={() => handleLocationSelect(item.label.value)}>
              {item.label.value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}


export default Sample