"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function HBondD({ onChange }: { onChange: (value: [number | null, number | null]) => void }) {
  const [hBondD, setHBondD] = React.useState([0, 30]);

  const handleHBondD = (event: Event, newValue: number | number[]) => {
  if (Array.isArray(newValue)) {
    setHBondD(newValue as [number, number]);
    onChange(newValue as [number, number]);
  }
};
  const MAX = 30;
  const MIN =0;

  const marks = [
  { value: 0, label: '0' },
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
  { value: 25, label: '25' },
  { value: 30, label: '30' },
];

  return (
    <Box sx={{ width: 350 }}>
      <h3>H-Bond Donors</h3>
      <Slider value={hBondD} 
              onChange={handleHBondD}
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

export default HBondD;

