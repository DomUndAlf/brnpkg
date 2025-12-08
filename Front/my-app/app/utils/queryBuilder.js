export function buildCompoundFilterQuery(filters) {
  const {
    commonName,
    metabolicClass,     
    molecularFormula,
    species,
    location,           
    source,             
    bioProp,
    year        
  } = filters;

  let where = [];

  where.push(`
    ?compound nubbekg:commonName ?commonName .
    ?compound nubbekg:smiles ?smiles .
    ?analysis a nubbekg:Analysis ;
              nubbekg:aboutSpecimen ?specimen ;
              nubbekg:discovered ?compound .

    ?compound a nubbekg:Compound .
    ?specimen a nubbekg:Specimen .
  `);

  if (commonName) {
    where.push(`
      ?compound nubbekg:commonName ?commonName .
      FILTER (lcase(str(?commonName)) = lcase("${commonName}"))
    `);
  }

    if (metabolicClass) {
    where.push(`
        ?compound nubbekg:partOfMetabolicClass ?mc .
        ?mc nubbekg:partOfMetabolicPathway ?pathway .
        ?pathway rdfs:label ?pathwayLabel .
        FILTER (lcase(str(?pathwayLabel)) = lcase("${metabolicClass}"))
    `);
    }

  if (molecularFormula) {
    where.push(`
      ?compound nubbekg:hasDescriptors ?desc .
      ?desc nubbekg:hasDescriptor ?mfNode .
      ?mfNode a nubbekg:MolecularDescriptor ;
              nubbekg:hasValue ?mfValue .
      FILTER (str(?mfValue) = "${molecularFormula}")
    `);
  }

  if (species) {
    where.push(`
      ?specimen nubbekg:partOfSpecies ?species .
      ?species rdfs:label ?speciesLabel .
      FILTER (lcase(str(?speciesLabel)) = lcase("${species}"))
    `);
  }

  if (location) {
    where.push(`
      ?specimen nubbekg:discoveredIn ?loc .
      ?loc rdfs:label ?locLabel .
      FILTER (lcase(str(?locLabel)) = lcase("${location}"))
    `);
  }

  if (source) {
    where.push(`
      ?specimen nubbekg:sampleType ?sourceType .
      FILTER (lcase(str(?sourceType)) = lcase("${source}"))
    `);
  }

  if (bioProp) {
    where.push(`
    ?analysis nubbekg:hasBioAssay ?assay .
?assay nubbekg:bioactivity ?bioactivity .
?bioactivity rdfs:label ?bioLabel .
FILTER (lcase(str(?bioLabel)) = lcase("${bioProp}"))
    `);
  }

  if (year) {
  where.push(`
      ?analysis nubbekg:reference ?ref .
      BIND(IRI(REPLACE(str(?ref), "reference_", "publication_")) AS ?pub)
      ?pub a nubbekg:Publication ;
           nubbekg:year ?year .
      FILTER(str(?year) = "${year}")
    `);
  }

  return `
PREFIX nubbekg: <http://nubbekg.aksw.org/ontology#>
PREFIX data: <http://nubbekg.aksw.org/data/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?compound ?smiles ?commonName WHERE {
  ${where.join("\n")}
}`;
}


