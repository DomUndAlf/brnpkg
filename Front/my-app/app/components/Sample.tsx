import { ChevronDown, Leaf, SearchIcon } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { speciesList, locationList } from "../utils/queries.json"
import { useEffect, useState } from "react";

export function Sample() {
  const [species, setSpecies] = useState<Array<{ label: { value: string } }>>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState<Array<{ label: { value: string } }>>([]);
  const [speciesOpen, setSpeciesOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  async function fetchSample(query: string) {
    const res = await fetch("http://localhost:4000/sparql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    });

    const data = await res.json();
    return data.results.bindings;
  }

  useEffect(() => {
    fetchSample(speciesList).then(setSpecies);
  }, []);

  useEffect(() => {
    fetchSample(locationList).then(setLocation);
  }, []);

  const filtered = species.filter((s) =>
    s.label.value.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid w-130 gap-6 m-10 p-5 border rounded-md">
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
              onClick={() => {
                setSearch(s.label.value)
                setSpeciesOpen(false)   // <-- schließt die Liste
              }}>
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
            onClick={() => setSelectedLocation(item.label.value)}>
              {item.label.value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}


export default Sample