"use client";

import BioProp from "./components/BioProp";
import GenInfo from "./components/GenInfo";
import Sample from "./components/Sample";
import Source from "./components/Source";
import ChemInfo from "./components/ChemInfo";
import { Button } from "@/components/ui/button";
import Downloads from "./components/Downloads";
import { ResultBox } from "./components/Results";
import { useState } from "react";
import { buildCompoundFilterQuery } from "../app/utils/queryBuilder"
import { SimpleBinding } from "./utils/interfaces";
import { computeSmiles } from "./utils/computeSmiles";
import Publication from "./components/Publication";

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
  const [year, setYear] = useState("");
  

  const [results, setResults] = useState<SimpleBinding[]>([]);

  async function handleSearch() {
  const filters = {
    source,
    species,
    location,
    commonName,
    metabolicClass,
    molecularFormula: formula,
    bioProp,
    year
  };

  const query = buildCompoundFilterQuery(filters);

  const url = "http://localhost:3030/nubbe2KG/query"; // anpassen
  const params = new URLSearchParams();
  params.append("query", query);

  const res = await fetch(`${url}?${params.toString()}`, {
    headers: { Accept: "application/sparql-results+json" },
  });

  const json = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bindings: SimpleBinding[] = json.results.bindings.map((b: any) => ({
      compound: b.compound.value,
      commonName: b.commonName.value,
      smiles: b.smiles.value,
    }));

 const filtered = bindings.filter((item) => {
  const desc = computeSmiles(item.smiles);

  if (molar[0] !== null && desc.molWeight < molar[0]) return false;
  if (molar[1] !== null && desc.molWeight > molar[1]) return false;

  if (accept[0] !== null && desc.hAcceptors < accept[0]) return false;
  if (accept[1] !== null && desc.hAcceptors > accept[1]) return false;

  if (donor[0] !== null && desc.hDonors < donor[0]) return false;
  if (donor[1] !== null && desc.hDonors > donor[1]) return false;

  if (lipinski[0] !== null && desc.lipinskiViolations < lipinski[0]) return false;
  if (lipinski[1] !== null && desc.lipinskiViolations > lipinski[1]) return false;

  if (monoiso[0] !== null && desc.monoIsotopicMass < monoiso[0]) return false;
  if (monoiso[1] !== null && desc.monoIsotopicMass > monoiso[1]) return false;

  if (cLogP[0] !== null && desc.clogP < cLogP[0]) return false;
  if (cLogP[1] !== null && desc.clogP > cLogP[1]) return false;

  if (tpsa[0] !== null && desc.TPSA < tpsa[0]) return false;
  if (tpsa[1] !== null && desc.TPSA > tpsa[1]) return false;

  if (rotable[0] !== null && desc.nrotB < rotable[0]) return false;
  if (rotable[1] !== null && desc.nrotB > rotable[1]) return false;

  return true;
});

  setResults(filtered);
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
          <Publication onChange={setYear}/>
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

      <Downloads results={results}/>
      {results.length > 0 && <ResultBox data={results} />}
    </div>
  );
  }