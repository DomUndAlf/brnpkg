    
import OCL from "openchemlib";

export function computeDescriptors(smiles: string) {
  const mol = OCL.Molecule.fromSmiles(smiles);
  return {
    molWeight: mol.getMolecularFormula().absoluteWeight(),
    hBondAcceptors: mol.getHBondAcceptorCount(),
    hBondDonors: mol.getHBondDonorCount(),
    rotatableBonds: mol.getRotatableBondCount(),
    tpsa: mol.calculateTPSA(),
    // cLogP kann man mit OCL berechnen:
    cLogP: mol.calculateLogP(),
    // monoisotopic mass:
    monoisotopicMass: mol.getMolecularFormula().absoluteMonoisotopicMass(),
    // Lipinski violations:
    lipinskiViolations: [
      mol.getMolecularWeight() > 500 ? 1 : 0,
      mol.getHBondDonorCount() > 5 ? 1 : 0,
      mol.getHBondAcceptorCount() > 10 ? 1 : 0,
      mol.calculateLogP() > 5 ? 1 : 0,
    ].reduce((a, b) => a + b, 0),
  };
}