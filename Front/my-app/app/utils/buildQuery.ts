interface Props {
  source: string | null,
  species: string | null,
  location: string | null,
  commonName: string | null,
  formula: string | null,
  bioProp: string | null,
  lipinski: [number | null, number | null],
  molar: [number | null, number | null],
  accept: [number | null, number | null],
  donor: [number | null, number | null],
  monoiso: [number | null, number | null],
  cLogP: [number | null, number | null],
  tpsa: [number | null, number | null],
  rotable: [number | null, number | null]
}

export function buildFilterValues({ source, species, location, commonName, formula, bioProp, lipinski, molar, accept, donor, monoiso, cLogP, tpsa, rotable}:Props) {
  let values = "";

  const pushValue = (name: string, value: string) => {
    values += `VALUES ?${name} { ${value} }\n`;
  };

  const pushRange = (nameMin: string, nameMax: string, range: [number | null, number | null]) => {
    const [min, max] = range;
    if (min !== null) pushValue(nameMin, min.toString());
    if (max !== null) pushValue(nameMax, max.toString());
  };

  if (source) pushValue("stateFilter", `"${source}"`);
  if (species) pushValue("speciesFilter", `"${species}"`);
  if (location) pushValue("locationFilter", `"${location}"`);
  if (commonName) pushValue("commonNameFilter", `"${commonName}"`);
  if (formula) pushValue("formulaFilter", `"${formula}"`);
  if (bioProp) pushValue("bioFilter", `"${bioProp}"`);

  pushRange("lipMin", "lipMax", lipinski);
  pushRange("molarMin", "molarMax", molar);
  pushRange("accMin", "accMax", accept);
  pushRange("donMin", "donMax", donor);
  pushRange("monoMin", "monoMax", monoiso);
  pushRange("logpMin", "logpMax", cLogP);
  pushRange("tpsaMin", "tpsaMax", tpsa);
  pushRange("rotMin", "rotMax", rotable);

  return values;
}
