"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function RotableBonds({ onChange }: { onChange: (value: [number | null, number | null]) => void }) {
  const [RotableBonds, setrotableBonds] = React.useState([0, 30]);

  const handlerotableBonds = (event: Event, newValue: number | number[]) => {
  if (Array.isArray(newValue)) {
    setrotableBonds(newValue as [number, number]);
    onChange(newValue as [number, number]);
  }
};
  
  const MAX = 30;
  const MIN = 0;

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
      <h3>Rotatable Bonds</h3>
      <Slider value={RotableBonds} 
              onChange={handlerotableBonds}
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

export default RotableBonds;

