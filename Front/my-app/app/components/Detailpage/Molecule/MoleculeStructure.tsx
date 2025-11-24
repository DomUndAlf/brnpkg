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
  width = 500,
  height = 500,
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

        let svg = mol.get_svg();
        mol.delete();

        // --- SVG skalieren ---
        const parser = new DOMParser();
        const doc = parser.parseFromString(svg, "image/svg+xml");
        const svgEl = doc.documentElement;

        svgEl.setAttribute("width", `${width}px`);
        svgEl.setAttribute("height", `${height}px`);

        if (!svgEl.hasAttribute("viewBox")) {
          svgEl.setAttribute("viewBox", `0 0 ${width} ${height}`);
        }

        svg = new XMLSerializer().serializeToString(svgEl);

        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (e) {
        console.error(e);
        setError("Fehler beim Zeichnen");
      }
    }

    draw();
  }, [structure, width, height]);

  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div
      id={id}
      ref={ref}
      style={{ width, height }}
    />
  );
}
