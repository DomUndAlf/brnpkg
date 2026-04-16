import { SimpleBinding } from "./interfaces";
import OCL from "openchemlib";

function toArray<T>(input: T | T[]): T[] {
  return Array.isArray(input) ? input : [input];
}


export function downloadCSV(res: SimpleBinding | SimpleBinding[]) {
  const results = toArray(res);
  if (!results.length) return;

  const headers = Object.keys(results[0])  as (keyof SimpleBinding)[];
  const csvRows = [
    headers.join(','),
    ...results.map(row =>
      headers.map(h => `"${row[h]}"`).join(',')
    )
  ];

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'results.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadSDF(results: SimpleBinding[]) {
  if (!results.length) return;

  try {
    const sdfStrings = results.map(r => {
      try {
        const mol = OCL.Molecule.fromSmiles(r.smiles);
        let molfile = mol.toMolfile();

        molfile += `>  <commonName>\n${r.commonName}\n\n`;
        
        return molfile;
      } catch (e) {
        console.error("Fehler beim Parsen von SMILES:", r.smiles, e);
        return '';
      }
    }).filter(Boolean);

    if (!sdfStrings.length) return;

    const blob = new Blob([sdfStrings.join('\n$$$$\n')], { type: 'chemical/x-mdl-sdfile' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'results.sdf';
    a.click();
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error("Fehler beim Erstellen der SDF-Datei:", e);
  }
}


