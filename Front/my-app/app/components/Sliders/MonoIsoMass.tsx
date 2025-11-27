"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function MonoIsoMass({ onChange }: { onChange: (value: [number | null, number | null]) => void }) {
  const [monoIsoMass, setMonoIsoMass] = React.useState([0, 1000]);

  const handleMonoIsoMass = (event: Event, newValue: number | number[]) => {
  if (Array.isArray(newValue)) {
    setMonoIsoMass(newValue as [number, number]);
    onChange(newValue as [number, number]);
  }
};
  
  const MAX = 1000;
  const MIN =0;

  const marks = [
  { value: 0, label: '0' },
  { value: 200, label: '200' },
  { value: 400, label: '400' },
  { value: 600, label: '600' },
  { value: 800, label: '800' },
  { value: 1000, label: '1.000' },
];

  return (
    <Box sx={{ width: 350 }}>
      <h3>Monoisotopic Mass (g/mol)</h3>
      <Slider value={monoIsoMass} 
              onChange={handleMonoIsoMass}
              disableSwap
              marks = {marks}
              valueLabelDisplay="auto"
              min={MIN}
              max={MAX}
               color="success"
              />
    </Box>
  );
}

export default MonoIsoMass;

