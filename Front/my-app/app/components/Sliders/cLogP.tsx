"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function CLogP({ onChange }: { onChange: (value: [number | null, number | null]) => void }) {
  const [CLogP, setCLogP] = React.useState<[number, number]>([-8, 14]);

const handleCLogP = (event: Event, newValue: number | number[]) => {
  if (Array.isArray(newValue)) {
    setCLogP(newValue as [number, number]);
    onChange(newValue as [number, number]);
  }
};

  const MAX = 14;
  const MIN = -8;

  const marks = [
  { value: -8, label: '-8' },
  { value: -4, label: '-4' },
  { value: 0, label: '0' },
  { value: 4, label: '4' },
  { value: 8, label: '8' },
  { value: 12, label: '12' },
  { value: 14, label: '14' },
];

  return (
    <Box sx={{ width: 350 }}>
      <h3>cLogP</h3>
      <Slider value={CLogP} 
              onChange={handleCLogP}
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

export default CLogP;

