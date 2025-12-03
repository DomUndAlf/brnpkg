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
import { buildCompoundFilterQuery } from "../app/utils/queryBuilder"
import { SimpleBinding } from "./utils/interfaces";

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
  

  const [results, setResults] = useState<unknown[]>([]);

  async function handleSearch() {
  const filters = {
    source,
    species,
    location,
    commonName,
    metabolicClass,
    molecularFormula: formula,
    bioProp
  };

  const query = buildCompoundFilterQuery(filters);

  const url = "http://localhost:3030/nubbe2KG/query"; // anpassen
  const params = new URLSearchParams();
  params.append("query", query);

  const res = await fetch(`${url}?${params.toString()}`, {
    headers: { Accept: "application/sparql-results+json" },
  });

  const json = await res.json();
   const bindings = json.results.bindings;

   const results: SimpleBinding[] = json.results.bindings.map((b: any) => ({
  compound: b.compound.value,
  commonName: b.commonName.value,
  smiles: b.smiles.value,
    }));

  setResults(results);
  console.log(bindings);

}



  return (
    <div>
      <header className="bg-green-700 text-white h-15 font-bold text-xl text-center p-4"> BRnpKG </header>
      <div className="flex flex-row justify-center">
        <div className="flex-1 max-w-xl">
          <GenInfo onNameChange={setCommonName} onFormulaChange={setFormula} onMetaChange={setMetabolicClass} />
          <Sample onSpeciesChange={setSpecies} onLocationChange={setLocation} />
          <Source onChange={setSource} />
          <BioProp onChange={setBioProp} />
        </div>
        <div className="flex-1 max-w-xl">
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
     <ResultBox data={results}/> 
      <>
        {/* später löschen, ist nur zum testen wie es aussieht */}
        <Wrapper />

      </>
    </div>
  );
  }