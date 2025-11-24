"use client";

import { useEffect, useRef, useState } from "react";
import { initRDKit } from "@/app/utils/initRDKit";

interface Props {
  id: string;
  structure: string;
  width?: number;
  height?: number;
  svgMode?: boolean;
}

export default function MoleculeStructure({
  id,
  structure,
  width = 300,
  height = 200,
  svgMode = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function draw() {
      const RDKit = await initRDKit();
      if (!RDKit) {
        setError("RDKit konnte nicht geladen werden");
        return;
      }

      try {
        const mol = RDKit.get_mol(structure);
        if (!mol) {
          setError("Ungültige SMILES");
          return;
        }

        const svg = mol.get_svg();
        mol.delete();

        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (e) {
        console.error(e);
        setError("Fehler beim Zeichnen");
      }
    }

    draw();
  }, [structure]);

  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div
      id={id}
      ref={ref}
      style={{ width, height }}
    />
  );
}
