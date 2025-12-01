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
import { buildFilterValues } from "./utils/buildQuery";

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

  const handleSearch = () => {
  const valuesBlock = buildFilterValues({
  source: source ,
  species: species,
  location: location,
  commonName: commonName,
  formula: formula, 
  bioProp: bioProp,
  lipinski: lipinski,
  molar: molar,
  accept: accept,
  donor: donor,
  monoiso: monoiso,
  cLogP: cLogP,
  tpsa: tpsa,
  rotable: rotable
});

const fullQuery = `
  ${valuesBlock}

PREFIX nubbekg: <http://nubbekg.aksw.org/ontology#>
PREFIX data: <http://nubbekg.aksw.org/data/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT DISTINCT ?compound ?commonName ?smiles WHERE {

  ### ---- COMPOUND BASIS ----
  ?compound a nubbekg:Compound ;
            nubbekg:commonName ?commonName ;
            nubbekg:smiles ?smiles .

  ### ---- FILTER: COMMON NAME ----
  OPTIONAL { VALUES ?commonNameFilter {} }
  FILTER(!BOUND(?commonNameFilter) || lcase(str(?commonName)) = lcase(str(?commonNameFilter)))

  ### ---- FILTER: FORMULA ----
  OPTIONAL {
    ?compound nubbekg:hasDescriptors ?blockF .
    ?blockF nubbekg:hasDescriptor ?descF .
    ?descF a nubbekg:MolecularDescriptor ;
           nubbekg:hasValue ?formulaValue .
  }
  OPTIONAL { VALUES ?formulaFilter {} }
  FILTER(!BOUND(?formulaFilter) || lcase(str(?formulaValue)) = lcase(str(?formulaFilter)))

  ### ---- FILTER: STATE ----
  OPTIONAL {
    ?analysisState a nubbekg:Analysis ;
                   nubbekg:aboutSpecimen ?specS ;
                   nubbekg:discovered ?compound .
    ?specS nubbekg:discoveredIn ?state .
    ?state rdfs:label ?stateLabel .
  }
  OPTIONAL { VALUES ?stateFilter {} }
  FILTER(!BOUND(?stateFilter) || lcase(str(?stateLabel)) = lcase(str(?stateFilter)))

  ### ---- FILTER: SPECIES ----
  OPTIONAL {
    ?analysisSpecies a nubbekg:Analysis ;
                     nubbekg:aboutSpecimen ?specA ;
                     nubbekg:discovered ?compound .
    ?specA nubbekg:species ?speciesLabel .
  }
  OPTIONAL { VALUES ?speciesFilter {} }
  FILTER(!BOUND(?speciesFilter) || lcase(str(?speciesLabel)) = lcase(str(?speciesFilter)))

  ### ---- FILTER: LOCATION ----
  OPTIONAL {
    ?analysisLoc a nubbekg:Analysis ;
                 nubbekg:aboutSpecimen ?specL ;
                 nubbekg:discovered ?compound .
    ?specL nubbekg:location ?locLabel .
  }
  OPTIONAL { VALUES ?locationFilter {} }
  FILTER(!BOUND(?locationFilter) || lcase(str(?locLabel)) = lcase(str(?locationFilter)))

  ### ---- FILTER: BIOACTIVITY ----
  OPTIONAL {
    ?analysisBio a nubbekg:Analysis ;
                 nubbekg:hasBioAssay ?bio ;
                 nubbekg:discovered ?compound .
    ?bio rdfs:label ?bioLabel .
  }
  OPTIONAL { VALUES ?bioFilter {} }
  FILTER(!BOUND(?bioFilter) || lcase(str(?bioLabel)) = lcase(str(?bioFilter)))

  ### ---- PATHWAY / METABOLIC CLASS ----
  OPTIONAL {
    ?compound nubbekg:partOfMetabolicClass ?class .
    ?class nubbekg:partOfMetabolicPathway ?path .
    ?path rdfs:label ?pathLabel .
  }
  OPTIONAL { VALUES ?pathwayFilter {} }
  FILTER(!BOUND(?pathwayFilter) || lcase(str(?pathLabel)) = lcase(str(?pathwayFilter)))

  ### ---- NUMERIC DESCRIPTORS (ranges) ----
  # Helper macro idea: each descriptor is optional + filtered only if VALUES exist.

  ### Lipinski
  OPTIONAL {
    ?compound nubbekg:hasDescriptors ?b1 .
    ?b1 nubbekg:hasDescriptor ?d1 .
    FILTER(CONTAINS(STR(?d1), "lipinski"))
    ?d1 nubbekg:hasValue ?lipValue .
  }
  OPTIONAL { VALUES ?lipMin {} }
  OPTIONAL { VALUES ?lipMax {} }
  FILTER(
    (!BOUND(?lipMin) || xsd:decimal(?lipValue) >= xsd:decimal(?lipMin)) &&
    (!BOUND(?lipMax) || xsd:decimal(?lipValue) <= xsd:decimal(?lipMax))
  )

  ### logP
  OPTIONAL {
    ?compound nubbekg:hasDescriptors ?b2 .
    ?b2 nubbekg:hasDescriptor ?d2 .
    FILTER(CONTAINS(STR(?d2), "logpCoefficient"))
    ?d2 nubbekg:hasValue ?logPValue .
  }
  OPTIONAL { VALUES ?logpMin {} }
  OPTIONAL { VALUES ?logpMax {} }
  FILTER(
    (!BOUND(?logpMin) || xsd:decimal(?logPValue) >= xsd:decimal(?logpMin)) &&
    (!BOUND(?logpMax) || xsd:decimal(?logPValue) <= xsd:decimal(?logpMax))
  )

  ### Molecular Volume
  OPTIONAL {
    ?compound nubbekg:hasDescriptors ?b3 .
    ?b3 nubbekg:hasDescriptor ?d3 .
    FILTER(CONTAINS(STR(?d3), "molecularVolume"))
    ?d3 nubbekg:hasValue ?molarValue .
  }
  OPTIONAL { VALUES ?molarMin {} }
  OPTIONAL { VALUES ?molarMax {} }
  FILTER(
    (!BOUND(?molarMin) || xsd:decimal(?molarValue) >= xsd:decimal(?molarMin)) &&
    (!BOUND(?molarMax) || xsd:decimal(?molarValue) <= xsd:decimal(?molarMax))
  )

  ### HBond acceptor
  OPTIONAL {
    ?compound nubbekg:hasDescriptors ?b4 .
    ?b4 nubbekg:hasDescriptor ?d4 .
    FILTER(CONTAINS(STR(?d4), "hBondAcceptorCount"))
    ?d4 nubbekg:hasValue ?accValue .
  }
  OPTIONAL { VALUES ?accMin {} }
  OPTIONAL { VALUES ?accMax {} }
  FILTER(
    (!BOUND(?accMin) || xsd:decimal(?accValue) >= xsd:decimal(?accMin)) &&
    (!BOUND(?accMax) || xsd:decimal(?accValue) <= xsd:decimal(?accMax))
  )

  ### HBond donor
  OPTIONAL {
    ?compound nubbekg:hasDescriptors ?b5 .
    ?b5 nubbekg:hasDescriptor ?d5 .
    FILTER(CONTAINS(STR(?d5), "hBondDonorCount"))
    ?d5 nubbekg:hasValue ?donValue .
  }
  OPTIONAL { VALUES ?donMin {} }
  OPTIONAL { VALUES ?donMax {} }
  FILTER(
    (!BOUND(?donMin) || xsd:decimal(?donValue) >= xsd:decimal(?donMin)) &&
    (!BOUND(?donMax) || xsd:decimal(?donValue) <= xsd:decimal(?donMax))
  )

  ### Monoisotopic mass
  OPTIONAL {
    ?compound nubbekg:hasDescriptors ?b6 .
    ?b6 nubbekg:hasDescriptor ?d6 .
    FILTER(CONTAINS(STR(?d6), "monoisotopicMass"))
    ?d6 nubbekg:hasValue ?monoValue .
  }
  OPTIONAL { VALUES ?monoMin {} }
  OPTIONAL { VALUES ?monoMax {} }
  FILTER(
    (!BOUND(?monoMin) || xsd:decimal(?monoValue) >= xsd:decimal(?monoMin)) &&
    (!BOUND(?monoMax) || xsd:decimal(?monoValue) <= xsd:decimal(?monoMax))
  )

  ### TPSA
  OPTIONAL {
    ?compound nubbekg:hasDescriptors ?b7 .
    ?b7 nubbekg:hasDescriptor ?d7 .
    FILTER(CONTAINS(STR(?d7), "tpsa"))
    ?d7 nubbekg:hasValue ?tpsaValue .
  }
  OPTIONAL { VALUES ?tpsaMin {} }
  OPTIONAL { VALUES ?tpsaMax {} }
  FILTER(
    (!BOUND(?tpsaMin) || xsd:decimal(?tpsaValue) >= xsd:decimal(?tpsaMin)) &&
    (!BOUND(?tpsaMax) || xsd:decimal(?tpsaValue) <= xsd:decimal(?tpsaMax))
  )

  ### Rotatable bonds
  OPTIONAL {
    ?compound nubbekg:hasDescriptors ?b8 .
    ?b8 nubbekg:hasDescriptor ?d8 .
    FILTER(CONTAINS(STR(?d8), "nrotb"))
    ?d8 nubbekg:hasValue ?rotValue .
  }
  OPTIONAL { VALUES ?rotMin {} }
  OPTIONAL { VALUES ?rotMax {} }
  FILTER(
    (!BOUND(?rotMin) || xsd:decimal(?rotValue) >= xsd:decimal(?rotMin)) &&
    (!BOUND(?rotMax) || xsd:decimal(?rotValue) <= xsd:decimal(?rotMax))
  )

}

`
console.log(fullQuery);

  }


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

