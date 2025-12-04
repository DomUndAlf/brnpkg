import * as OCL from "openchemlib";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const descCache = new Map<string, any>();


export function computeSmiles(smiles: string) {
  if (descCache.has(smiles)) return descCache.get(smiles);

  const mol = OCL.Molecule.fromSmiles(smiles);
  const props = new OCL.MoleculeProperties(mol);

  const mono: Record<string, number> = {
    H: 1.007825,
    C: 12,
    N: 14.003074,
    O: 15.994915,
    F: 18.998403,
    P: 30.973762,
    S: 31.972071,
    Cl: 34.968853,
    Br: 78.918338,
    I: 126.904468,
  };

  let m = 0;
  for (let i = 0; i < mol.getAllAtoms(); i++) {
    const label = mol.getAtomLabel(i);
    m += mono[label] ?? 0;
  }

  let v = 0;
  const mw = mol.getMolweight();
  const logP = props.logP;
  const donors = props.donorCount;
  const acc = props.acceptorCount;

  if (mw > 500) v++;
  if (logP > 5) v++;
  if (donors > 5) v++;
  if (acc > 10) v++;

  const result = {
    molWeight: mw,
    TPSA: props.polarSurfaceArea,
    clogP: logP,
    hDonors: donors,
    hAcceptors: acc,
    nrotB: props.rotatableBondCount,
    monoIsotopicMass: m,
    lipinskiViolations: v
  };

  descCache.set(smiles, result);
  return result;
}
