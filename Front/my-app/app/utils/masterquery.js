export const query = `
PREFIX nubbekg: <http://nubbekg.aksw.org/ontology#>
PREFIX data: <http://nubbekg.aksw.org/data/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT DISTINCT ?commonName ?smiles WHERE {

  VALUES (?stateFilter ?speciesFilter ?commonNameFilter ?formulaFilter ?bioFilter
          ?sampleTypeFilter ?pathwayFilter
          ?lipinskiMin ?lipinskiMax
          ?logPmin ?logPmax
          ?molVolMin ?molVolMax
          ?hbaMin ?hbaMax
          ?hbdMin ?hbdMax
          ?monoMin ?monoMax
          ?tpsaMin ?tpsaMax
          ?rotMin ?rotMax)
  {
    ( "{{state}}" "{{species}}" "{{commonName}}" "{{formula}}" "{{bioactivity}}"
      "{{sampleType}}" "{{pathway}}"
      "{{lipinskiMin}}" "{{lipinskiMax}}"
      "{{logPmin}}" "{{logPmax}}"
      "{{molVolMin}}" "{{molVolMax}}"
      "{{hbaMin}}" "{{hbaMax}}"
      "{{hbdMin}}" "{{hbdMax}}"
      "{{monoMin}}" "{{monoMax}}"
      "{{tpsaMin}}" "{{tpsaMax}}"
      "{{rotMin}}" "{{rotMax}}" )
  }

  # Compound-Grunddaten
  ?compound a nubbekg:Compound ;
            nubbekg:commonName ?commonName ;
            nubbekg:smiles ?smiles .

  # Descriptoren
  OPTIONAL {
    ?compound nubbekg:hasDescriptors ?descBlock .
    ?descBlock nubbekg:hasDescriptor ?descriptor .
    ?descriptor nubbekg:hasValue ?valueRaw .
  }

  # Analysis + Specimen + SampleType + State
  OPTIONAL {
    ?analysis a nubbekg:Analysis ;
              nubbekg:aboutSpecimen ?specimen ;
              nubbekg:discovered ?compound .
    OPTIONAL { ?specimen nubbekg:sampleType ?sampleType . }
    OPTIONAL {
      ?specimen nubbekg:discoveredIn ?state .
      ?state rdfs:label ?stateLabel .
    }
    OPTIONAL { ?analysis nubbekg:hasBioAssay ?bio . }
  }

  # Species
  OPTIONAL {
    ?specimen nubbekg:partOfSpecies ?speciesObj .
    ?speciesObj rdfs:label ?speciesLabel .
  }

  # Metabolic Pathway
  OPTIONAL {
    ?compound nubbekg:partOfMetabolicClass ?class .
    ?class nubbekg:partOfMetabolicPathway ?pathway .
    ?pathway rdfs:label ?pathwayLabel .
  }

  # FILTERS
  FILTER(?stateFilter = "" || lcase(str(?stateLabel)) = lcase(?stateFilter))
  FILTER(?speciesFilter = "" || lcase(str(?speciesLabel)) = lcase(?speciesFilter))
  FILTER(?commonNameFilter = "" || lcase(str(?commonName)) = lcase(?commonNameFilter))
  FILTER(?formulaFilter = "" || (CONTAINS(STR(?descriptor),"MolecularDescriptor") && lcase(str(?valueRaw)) = lcase(?formulaFilter)))
  FILTER(?bioFilter = "" || EXISTS { ?bio rdfs:label ?bioFilter })
  FILTER(?sampleTypeFilter = "" || lcase(str(?sampleType)) = lcase(?sampleTypeFilter))
  FILTER(?pathwayFilter = "" || ?pathwayLabel = ?pathwayFilter)

  # Numeric Filters
  FILTER((?lipinskiMin = "" || xsd:decimal(?valueRaw) >= xsd:decimal(?lipinskiMin)) &&
        (?lipinskiMax = "" || xsd:decimal(?valueRaw) <= xsd:decimal(?lipinskiMax)) ||
        !CONTAINS(STR(?descriptor),"lipinski"))

  FILTER((?logPmin = "" || xsd:decimal(?valueRaw) >= xsd:decimal(?logPmin)) &&
         (?logPmax = "" || xsd:decimal(?valueRaw) <= xsd:decimal(?logPmax)) ||
         !CONTAINS(STR(?descriptor),"logpCoefficient"))

  FILTER((?logPmin = "" || xsd:decimal(?valueRaw) >= xsd:decimal(?logPmin)) &&
         (?logPmax = "" || xsd:decimal(?valueRaw) <= xsd:decimal(?logPmax)) ||
         !CONTAINS(STR(?descriptor),"logpCoefficient"))

  FILTER((?molVolMin = "" || xsd:decimal(?valueRaw) >= xsd:decimal(?molVolMin)) &&
         (?molVolMax = "" || xsd:decimal(?valueRaw) <= xsd:decimal(?molVolMax)) ||
         !CONTAINS(STR(?descriptor),"molecularVolume"))

  FILTER((?hbaMin = "" || xsd:decimal(?valueRaw) >= xsd:decimal(?hbaMin)) &&
         (?hbaMax = "" || xsd:decimal(?valueRaw) <= xsd:decimal(?hbaMax)) ||
         !CONTAINS(STR(?descriptor),"hBondAcceptorCount"))

  FILTER((?hbdMin = "" || xsd:decimal(?valueRaw) >= xsd:decimal(?hbdMin)) &&
         (?hbdMax = "" || xsd:decimal(?valueRaw) <= xsd:decimal(?hbdMax)) ||
         !CONTAINS(STR(?descriptor),"hBondDonorCount"))

  FILTER((?monoMin = "" || xsd:decimal(?valueRaw) >= xsd:decimal(?monoMin)) &&
         (?monoMax = "" || xsd:decimal(?valueRaw) <= xsd:decimal(?monoMax)) ||
         !CONTAINS(STR(?descriptor),"monoisotopicMass"))

  FILTER((?tpsaMin = "" || xsd:decimal(?valueRaw) >= xsd:decimal(?tpsaMin)) &&
         (?tpsaMax = "" || xsd:decimal(?valueRaw) <= xsd:decimal(?tpsaMax)) ||
         !CONTAINS(STR(?descriptor),"tpsa"))

  FILTER((?rotMin = "" || xsd:decimal(?valueRaw) >= xsd:decimal(?rotMin)) &&
         (?rotMax = "" || xsd:decimal(?valueRaw) <= xsd:decimal(?rotMax)) ||
         !CONTAINS(STR(?descriptor),"nrotb"))
}

LIMIT 50
OFFSET 0

`;
