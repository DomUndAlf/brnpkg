"use client";

import BioProp from "./components/BioProp";
import GenInfo from "./components/GenInfo";
import Sample from "./components/Sample";
import Source from "./components/Source";
import ChemInfo from "./components/ChemInfo";
import { Button } from "@/components/ui/button";
import Downloads from "./components/Downloads";
import { ResultBox } from "./components/Results";
import Wrapper from "./components/Detailpage/Wrapper";
import { useState } from "react";
import { query } from "../app/utils/masterquery"

export default function Home() {
  
  const [source, setSource] = useState("");
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");
  const [commonName, setCommonName] = useState("");
  const [metabolicClass, setMetabolicClass] = useState(""); 
  const [formula, setFormula] = useState("");
  const [bioProp, setBioProp] = useState("");
  const [lipinski, setLipinski] = useState<[number | null, number | null]>([null, null]);
  const [molar, setMolar] = useState<[number | null, number | null]>([null, null]);
  const [accept, setAccept] = useState<[number | null, number | null]>([null, null]);
  const [donor, setDonor] = useState<[number | null, number | null]>([null, null]);
  const [monoiso, setMonoiso] = useState<[number | null, number | null]>([null, null]);
  const [cLogP, setCLogP] = useState<[number | null, number | null]>([null, null]);
  const [tpsa, setTpsa] = useState<[number | null, number | null]>([null, null]);
  const [rotable, setRotable] = useState<[number | null, number | null]>([null, null]);

  const handleSearch = async () => {
const RAW_QUERY = query;

const finalQuery = RAW_QUERY
  .replace("{{species}}", species || "")
  .replace("{{state}}", location || "")
  .replace("{{commonName}}", commonName || "")
  .replace("{{formula}}", formula || "")
  .replace("{{bioactivity}}", bioProp || "")
  .replace("{{sampleType}}", source || "")
  .replace("{{pathway}}", metabolicClass || "")
  // numeric ranges
  .replace("{{lipinskiMin}}", lipinski[0]?.toString() || "")
  .replace("{{lipinskiMax}}", lipinski[1]?.toString() || "")
  .replace("{{logPmin}}", cLogP[0]?.toString() || "")
  .replace("{{logPmax}}", cLogP[1]?.toString() || "")
  .replace("{{molVolMin}}", molar[0]?.toString() || "")
  .replace("{{molVolMax}}", molar[1]?.toString() || "")
  .replace("{{hbaMin}}", accept[0]?.toString() || "")
  .replace("{{hbaMax}}", accept[1]?.toString() || "")
  .replace("{{hbdMin}}", donor[0]?.toString() || "")
  .replace("{{hbdMax}}", donor[1]?.toString() || "")
  .replace("{{monoMin}}", monoiso[0]?.toString() || "")
  .replace("{{monoMax}}", monoiso[1]?.toString() || "")
  .replace("{{tpsaMin}}", tpsa[0]?.toString() || "")
  .replace("{{tpsaMax}}", tpsa[1]?.toString() || "")
  .replace("{{rotMin}}", rotable[0]?.toString() || "")
  .replace("{{rotMax}}", rotable[1]?.toString() || "");

  console.log(finalQuery);

const response = await fetch("http://localhost:4000/sparql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: finalQuery })
});

if (!response.ok) {
  const text = await response.text(); // SPARQL-Server gibt oft HTML/Text bei Fehler
  console.error("SPARQL Server Error:", text);
  return;
}

// Wenn alles ok, dann als JSON parsen
const json = await response.json();
console.log(json);
};



  return (
    <div>
      <header className="bg-green-700 text-white h-15 font-bold text-xl text-center p-4"> BRnpKG </header>
        <div className="flex flex-row justify-center">
          <div  className="flex-1 max-w-xl">
            <GenInfo onNameChange={setCommonName} onFormulaChange={setFormula} onMetaChange={setMetabolicClass} /> 
            <Sample onSpeciesChange={setSpecies} onLocationChange={setLocation} />
            <Source onChange={setSource}/>
            <BioProp onChange={setBioProp}/>
          </div>
          <div  className="flex-1 max-w-xl">
            <ChemInfo 
              onMolChange={setMolar}
              onAcceptChange={setAccept}
              onDonorChange={setDonor}
              onLipinskiChange={setLipinski}
              onMonoIsoChange={setMonoiso}
              onCLogPChange={setCLogP}
              onTpsaChange={setTpsa}
              onRotableChange={setRotable}
              />
          </div>
        </div>

        <div className="flex justify-center gap-5 mt-4">
          <Button className="bg-green-700 p-5 text-white" onClick={() => handleSearch()}>Search</Button>
          <Button className="bg-green-700 p-5 text-white" onClick={() => window.location.reload()}>Reset</Button>
        </div>

        <Downloads />
        <ResultBox />
  <>
    {/* später löschen, ist nur zum testen wie es aussieht */}
    <Wrapper />
    
    </>
    </div>
  );
}

