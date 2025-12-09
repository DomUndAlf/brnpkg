export function buildCompoundDetailQuery(id: string) {
  return `
PREFIX data: <http://nubbekg.aksw.org/v2/data/>
PREFIX nubbekg: <http://nubbekg.aksw.org/ontology#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

SELECT DISTINCT
  ?commonName ?smiles ?metabolicClass ?superclass ?pathway
  ?inchi ?inchikey ?iupac
  ?tpsa ?lipinski ?hba ?hbd ?nrot
  ?city ?state ?species ?doi
WHERE {

  data:${id} nubbekg:commonName ?commonName .
  data:${id} nubbekg:smiles ?smiles .
  data:${id} nubbekg:partOfMetabolicClass ?mc .

  OPTIONAL { ?mc rdfs:label ?metabolicClass . }
  OPTIONAL { ?mc nubbekg:hasSuperclass ?superclassUri .
             ?superclassUri rdfs:label ?superclass . }
  OPTIONAL { ?mc nubbekg:hasPathway ?pathwayUri .
             ?pathwayUri rdfs:label ?pathway . }

  OPTIONAL {
    data:${id} nubbekg:isIdentifiedBy ?uids .
    OPTIONAL { ?uids nubbekg:inchi ?inchi . }
    OPTIONAL { ?uids nubbekg:inchikey ?inchikey . }
    OPTIONAL { ?uids nubbekg:iupacName ?iupac . }
  }

  OPTIONAL {
    data:${id} nubbekg:hasDescriptors ?desc .
    OPTIONAL { ?desc nubbekg:tpsa ?tpsa . }
    OPTIONAL { ?desc nubbekg:lipinskiRuleOf5Failures ?lipinski . }
    OPTIONAL { ?desc nubbekg:hBondAcceptorCount ?hba . }
    OPTIONAL { ?desc nubbekg:hBondDonorCount ?hbd . }
    OPTIONAL { ?desc nubbekg:nrotb ?nrot . }
  }

  OPTIONAL {
    ?analysis nubbekg:discovered data:${id} .
    ?analysis nubbekg:aboutSpecimen ?specimen .

    OPTIONAL { ?specimen nubbekg:partOfSpecies ?speciesUri .
               ?speciesUri rdfs:label ?species . }

    OPTIONAL { ?specimen nubbekg:discoveredIn ?cityUri .
               ?cityUri rdfs:label ?city . }

    OPTIONAL { ?specimen nubbekg:discoveredIn ?stateUri .
               ?stateUri rdfs:label ?state . }
  }

  OPTIONAL {
    ?analysis nubbekg:reference ?pub .
    OPTIONAL { ?pub nubbekg:doi ?doi . }
  }
}
`;
}
