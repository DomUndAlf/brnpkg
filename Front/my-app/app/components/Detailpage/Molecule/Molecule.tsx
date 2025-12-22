"use client";


import dynamic from "next/dynamic";

const MoleculeStructure = dynamic(
  () => import("./MoleculeStructure"),
  { ssr: false }
);

type Props = {
  smiles: string;
};

function Molecule({ smiles }: Props) {
  return (
    <div id="component-example-svg" className="container">
      <div className="border rounded-md mt-5">
        <h3 className="text-2xl m-5">Molecule 2D</h3>
          <MoleculeStructure
            id="structure-example-svg-caffeine"
            structure={smiles}
            width={500}
            height={500}
            svgMode
          />
      </div>
    </div>
  );
}

export default Molecule;