"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function Lipinski({ onChange }: { onChange: (value: [number | null, number | null]) => void }) {
  const [lipinski, setLipinski] = React.useState([0, 5]);

  const handleLipinski = (event: Event, newValue: number | number[]) => {
  if (Array.isArray(newValue)) {
    setLipinski(newValue as [number, number]);
    onChange(newValue as [number, number]);
  }
};
  
  const MAX = 5;
  const MIN =0;

  const marks = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
];

  return (
    <Box sx={{ width: 350 }}>
      <h3>Lipinski Violations</h3>
      <Slider value={lipinski} 
              onChange={handleLipinski}
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

export default Lipinski;

