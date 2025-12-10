export function buildReferencesQuery(compoundId: string): string {
  return `
PREFIX data: <http://nubbekg.aksw.org/data/>
PREFIX nubbekg: <http://nubbekg.aksw.org/ontology#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?doi ?species ?state ?city ?bioactivity
WHERE {
  ?analysis nubbekg:discovered data:${compoundId} .
  ?analysis nubbekg:aboutSpecimen ?specimen .

  OPTIONAL {
    ?specimen nubbekg:partOfSpecies ?speciesURI .
    ?speciesURI rdfs:label ?species .
  }

  OPTIONAL {
    ?specimen nubbekg:discoveredIn ?stateLoc .
    ?stateLoc a nubbekg:State ;
              rdfs:label ?state .
  }

  OPTIONAL {
    ?specimen nubbekg:discoveredIn ?cityLoc .
    ?cityLoc a nubbekg:City ;
             rdfs:label ?city .
  }

  OPTIONAL {
    ?analysis nubbekg:reference ?ref .
    BIND(IRI(REPLACE(STR(?ref), "reference", "publication")) AS ?pub)
    ?pub nubbekg:doi ?doi .
  }

  OPTIONAL {
    ?analysis nubbekg:hasBioAssay ?assay .
    ?assay nubbekg:bioactivity ?bioact .
    ?bioact rdfs:label ?bioactivity .
  }
}`;
}



export function buildMetabolicClassQuery(compoundId: string): string {
  return `
PREFIX data: <http://nubbekg.aksw.org/data/>
PREFIX nubbekg: <http://nubbekg.aksw.org/ontology#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT
  (COALESCE(?classLabel, REPLACE(STRAFTER(STR(?mc), "mc_"), "%20", " ")) AS ?class)
  (COALESCE(?superLabel, REPLACE(STRAFTER(STR(?super), "mc_"), "%20", " ")) AS ?superclass)
  (COALESCE(?pathwayLabel, REPLACE(STRAFTER(STR(?pw), "pathway_"), "%20", " ")) AS ?pathway)
WHERE {
  data:${compoundId} nubbekg:partOfMetabolicClass ?mc .

  OPTIONAL { ?mc rdfs:label ?classLabel . }

  OPTIONAL { 
    ?mc rdfs:subClassOf ?super .
    OPTIONAL { ?super rdfs:label ?superLabel . }
  }

  OPTIONAL { 
    ?mc nubbekg:partOfMetabolicPathway ?pw .
    OPTIONAL { ?pw rdfs:label ?pathwayLabel . }
  }
}`;
}

export function buildChemDetailsQuery(compoundId: string): string {
  return `
PREFIX data: <http://nubbekg.aksw.org/data/>
PREFIX nubbekg: <http://nubbekg.aksw.org/ontology#>

SELECT ?shortLabel ?value
WHERE {
  data:${compoundId} nubbekg:hasDescriptors ?descGroup .

  ?descGroup nubbekg:hasDescriptor ?descriptor .
  OPTIONAL { ?descriptor nubbekg:hasValue ?value }

  BIND(REPLACE(STRAFTER(STR(?descriptor), "http://nubbekg.aksw.org/data/"), "_.*$", "") AS ?shortLabel)

}
`;
}

