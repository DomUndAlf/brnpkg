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
  const [, setSource] = useState("");
  const [, setSpecies] = useState("");
  const [, setLocation] = useState("");
  // const [genInfo, setGenInto] = useState("");
  const [, setBioProp] = useState("");

  return (
    <div>
      <header className="bg-green-700 text-white h-15 font-bold text-xl text-center p-4"> BRnpKG </header>
        <div className="flex flex-row justify-center">
          <div  className="flex-1 max-w-xl">
            <GenInfo /> 
            {/* hier später onChange */}
            <Sample onSpeciesChange={setSpecies} onLocationChange={setLocation} />
            <Source onChange={setSource}/>
            <BioProp onChange={setBioProp}/>
          </div>
          <div  className="flex-1 max-w-xl">
            <ChemInfo />
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
