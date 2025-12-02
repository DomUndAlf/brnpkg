export interface Binding {
  commonName: { value: string };
  smiles: { value: string };
}

export interface SimpleBinding {
  commonName: string;
  smiles: string;
}