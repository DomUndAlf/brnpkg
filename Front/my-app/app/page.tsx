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

export default function Home() {
  // const [source, setSource] = useState("");
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");
  const [commonName, setCommonName] = useState("");
  // const [, setMetabolicClass] = useState(""); 
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

  return (
    <div>
      <header className="bg-green-700 text-white h-15 font-bold text-xl text-center p-4"> BRnpKG </header>
        <div className="flex flex-row justify-center">
          <div  className="flex-1 max-w-xl">
            <GenInfo onNameChange={setCommonName} onFormulaChange={setFormula} /> 
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
          <Button className="bg-green-700 p-5 text-white">Search</Button>
          <Button className="bg-green-700 p-5 text-white">Reset</Button>
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
